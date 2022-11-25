from os import getenv
from typing import Union

from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from datetime import datetime, timedelta, timezone
import requests
import jwt
import bcrypt
from bs4 import BeautifulSoup

from prometheus_fastapi_instrumentator import Instrumentator

import logging
import sentry_sdk
from sentry_sdk.integrations.logging import LoggingIntegration


from backend.api import crud
from backend.model import models, schemas
from backend.database.database import SessionLocal, engine

# Sentry loggin code sourced from the sentry docs:
# https://docs.sentry.io/platforms/python/guides/logging/

# All of this is already happening by default!
sentry_logging = LoggingIntegration(
    level=logging.INFO,        # Capture info and above as breadcrumbs
    event_level=logging.ERROR  # Send errors as events
)
sentry_sdk.init(
    dsn=getenv("SENTRY_PATH"),

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production,
    traces_sample_rate=1.0,
)
# ------------------------------------------------------

models.Base.metadata.create_all(bind=engine)

app = FastAPI(openapi_prefix="/api")

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# FROM THIS LINE WE HAVE USED THE DOCUMENTATION:
# https://fastapi.tiangolo.com/tutorial/sql-databases/#__tabbed_4_2
# ________________________________________________

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    logging.info("Hello world log")
    return {"Hello": "Investor World!"}


@app.post("/users/", response_model=schemas.User, status_code=201)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        logging.warning("Tried to create a user that already exists")
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        logging.warning("Get call for user that does not exist")
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


# END COPIED FROM DOCUMENTATION
# ________________________________________________


@app.post("/users/{user_id}/blogposts/", response_model=schemas.BlogPost, status_code=201)
def create_blogpost_for_user(
    user_id: int, blogpost: schemas.BlogPostCreate, db: Session = Depends(get_db)
):
    blogpost = crud.create_user_blogpost(
        db=db, blogpost=blogpost, user_id=user_id)
    if blogpost is None:
        raise HTTPException(status_code=500, detail="Error creating blogpost")
    return blogpost


@app.get("/blogposts/", response_model=list[schemas.BlogPost])
def read_blogposts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    blogposts = crud.get_blogposts(db, skip=skip, limit=limit)
    if blogposts is None:
        raise HTTPException(status_code=404, detail="Blogposts not found")
    return blogposts


@app.delete("/users/{user_id}/blogpost/{blog_post_id}")
def delete_blogpost_interaction(user_id: str, blog_post_id: int, db: Session = Depends(get_db)):
    blogpost = crud.delete_user_blogpost(
        db=db, user_id=user_id, blog_post_id=blog_post_id)
    if blogpost is None:
        raise HTTPException(status_code=404, detail="Blogpost not found")
    return {"status": "Blogpost deleted"}


@app.post("/users/{user_id}/interactions/{blog_post_id}", response_model=schemas.Interactions, status_code=201)
def create_blogpost_interaction(
    user_id: int, blog_post_id: int, interaction: schemas.InteractionsCreate, db: Session = Depends(get_db)
):
    interaction = crud.create_interaction(
        db=db, interaction=interaction, user_id=user_id, blog_post_id=blog_post_id)
    if interaction is None:
        raise HTTPException(
            status_code=500, detail="Error creating interaction")
    return interaction


@app.put("/users/{user_id}/interactions/{blog_post_id}", response_model=schemas.Interactions)
def update_blogpost_interaction(
    user_id: int, blog_post_id: int, interaction: schemas.InteractionsCreate, db: Session = Depends(get_db)
):
    interaction = crud.update_interaction(
        db=db, interaction=interaction, user_id=user_id, blog_post_id=blog_post_id)
    if interaction is None:
        raise HTTPException(status_code=404, detail="Interaction not found")
    return interaction


@app.delete("/users/{user_id}/interactions/{blog_post_id}")
def delete_blogpost_interaction(
    user_id: int, blog_post_id: int, db: Session = Depends(get_db)
):
    interaction = crud.delete_interaction(
        db=db, user_id=user_id, blog_post_id=blog_post_id)
    if interaction is None:
        raise HTTPException(status_code=404, detail="Interaction not found")
    return {"status": "Interaction deleted"}


@app.post("/users/{user_id}/comments/{blog_post_id}", response_model=schemas.Comments, status_code=201)
def create_blogpost_comment(
    user_id: int, blog_post_id: int, comment: schemas.CommentsCreate, db: Session = Depends(get_db)
):
    response = crud.create_comment(
        db=db, comment=comment, user_id=user_id, blog_post_id=blog_post_id)
    if response is None:
        raise HTTPException(status_code=500, detail="Error creating comment")
    return response


@app.get("/campusnet/login")
async def login():
    URI = "https://auth.dtu.dk/dtu/?service=https://investorblog.diplomportal.dk/api/campusnet/redirect"
    return RedirectResponse(url=URI)


@app.get("/campusnet/redirect")
async def redirect(ticket: str):
    body = "https://auth.dtu.dk/dtu/servicevalidate?service=https://investorblog.diplomportal.dk/api/campusnet/redirect&ticket="+ticket
    body = requests.get(url=body)
    element = BeautifulSoup(body.content.decode("utf-8"))
    if(crud.get_user_by_username(db=SessionLocal(), username = element.find("cas:user").text) == None):
        db_user = crud.create_user(db=SessionLocal(), user=schemas.UserCreate(email = element.find("cas:user").text+ "@dtu.dk",username = element.find("cas:user").text, password = ""))
        token = jwt.encode({'id': db_user.id, "exp": datetime.now(
        tz=timezone.utc) + timedelta(seconds=1800)}, 'secret', algorithm='HS256')
    return RedirectResponse(url="https://investorblog.diplomportal.dk?token="+token)

#body with email username and password
@app.post("/register")
async def register(user: schemas.UserBase, db: Session = Depends(get_db)):
    if(crud.get_user(db=SessionLocal(), user_id = user.email) == None):
        mySalt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(user.password.encode('utf-8'),mySalt)
        user.password = hashed
        db_user = crud.create_user(db=SessionLocal(), user=user)
        token = jwt.encode({'id': db_user.id, "exp": datetime.now(
        tz=timezone.utc) + timedelta(seconds=1800)}, 'secret', algorithm='HS256')
        return token
    else:
        raise HTTPException(status_code=400, detail="Email already registered") 

@app.post("/login")
async def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db=SessionLocal(), email = user.email)
    if(user == None):
        raise HTTPException(status_code=400, detail="User not found")
    if((bcrypt.checkpw(user.password.encode('utf-8'), db_user.password))):
        return jwt.encode({'id': db_user.id, "exp": datetime.now(
        tz=timezone.utc) + timedelta(seconds=1800)}, 'secret', algorithm='HS256')


@app.get("/checkifuserexists")
async def checkifuserexists(email: str):
    if(crud.get_user_by_email(db=SessionLocal(), email = email) == None):
        raise HTTPException(status_code=409, detail="Email does not exist")
    else:
        return jwt.encode({'id': crud.get_user_by_email(db=SessionLocal(), email = email).id, "exp": datetime.now(tz=timezone.utc) + timedelta(seconds=1800)}, 'secret', algorithm='HS256')

@app.get("/user/username")
async def verify(token: str):
    #if "" in token remove it
    if(token[0] == '"'):
        token = token[1:]
    if(token[-1] == '"'):
        token = token[:-1]
    try:
        # todo CHANGE SECRET KEY
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        return {"username": crud.get_user(db=SessionLocal(), user_id = decoded["id"]).username, "status": "valid"}
    except jwt.ExpiredSignatureError:
        return {"username": "", "status": "Token expired"}
    except jwt.InvalidTokenError:
        return {"username": "", "status": "Invalid token"}



@app.get("/verify")
async def verify(token: str):
    #if "" in token remove it
    if(token[0] == '"'):
        token = token[1:]
    if(token[-1] == '"'):
        token = token[:-1]
    try:
        # todo CHANGE SECRET KEY
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        return True
    except jwt.ExpiredSignatureError:
        return "Token expired"
    except jwt.InvalidTokenError:
        return "Invalid token"


@app.get("/test_logging")
def test_logging():
    logging.info("Running logger test:")
    division_error = 1 / 0
    return {"test": "log"}


Instrumentator().instrument(app).expose(app)
