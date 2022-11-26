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

SERVER_LOCATION = "http://localhost:8000"
FRONTEND_LOCATION = "http://localhost:3000"
DEV_MODE = getenv("DEVMODE")
if DEV_MODE == "false":
    SERVER_LOCATION = "https://investorblog.diplomportal.dk/api"
    FRONTEND_LOCATION = "https://investorblog.diplomportal.dk"


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

app = None
if DEV_MODE == "false":
    app = FastAPI(openapi_prefix="/api")
else:
    app = FastAPI()

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

@app.delete("/users/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    status = crud.delete_user(db, user_id=user_id)
    if status is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"status": "User deleted"}


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

@app.get("/users/username/{user_id}")
def get_username(user_id: int, db: Session = Depends(get_db)):
    response = crud.get_username_by_id(db=db, user_id=user_id)
    if response is None:
        raise HTTPException(status_code=500, detail="Error getting username")
    return response


@app.get("/campusnet/login")
async def login():
    URI = "https://auth.dtu.dk/dtu/?service="+  SERVER_LOCATION +"/campusnet/redirect"
    return RedirectResponse(url=URI)


@app.get("/campusnet/redirect")
async def redirect(ticket: str):
    body = "https://auth.dtu.dk/dtu/servicevalidate?service="+  SERVER_LOCATION +"/campusnet/redirect&ticket="+ticket
    body = requests.get(url=body)
    element = BeautifulSoup(body.content.decode("utf-8"))
    if(crud.get_user_by_username(db=SessionLocal(), username = element.find("cas:user").text) == None):
        db_user = crud.create_user(db=SessionLocal(), user=schemas.UserCreate(email = element.find("cas:user").text+ "@dtu.dk",username = element.find("cas:user").text, password = ""))
        token = jwt.encode({'id': db_user.id, "exp": datetime.now(
        tz=timezone.utc) + timedelta(seconds=1800)}, 'secret', algorithm='HS256')
    else:
        db_user = crud.get_user_by_username(db=SessionLocal(),username= element.find("cas:user").text)
        token = jwt.encode({'id': db_user.id, "exp": datetime.now(
        tz=timezone.utc) + timedelta(seconds=1800)}, 'secret', algorithm='HS256')
        
    return RedirectResponse(url=FRONTEND_LOCATION+"?token="+token)

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

@app.get("/user")
async def getuser(token: str):
    if(token[0] == '"'):
        token = token[1:]
    if(token[-1] == '"'):
        token = token[:-1]
    try:
        # todo CHANGE SECRET KEY
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        user = crud.get_user(db=SessionLocal(), user_id = decoded["id"])
        return {"user": schemas.UserInformation(id = user.id , email=user.email , username= user.username, blogposts= user.blogposts, commennts = user.comments), "status": "valid"}
    except jwt.ExpiredSignatureError:
        return {"user": "", "status": "Token expired"}
    except jwt.InvalidTokenError:
        return {"user": "", "status": "Invalid token"}


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

@app.get("/user/id")
async def getid(token: str):
    if(token[0] == '"'):
        token = token[1:]
    if(token[-1] == '"'):
        token = token[:-1]
    try:
        # todo CHANGE SECRET KEY
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        return {"id": crud.get_user(db=SessionLocal(), user_id = decoded["id"]).id, "status": "valid"}
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

#@app.get("/stocks")
#def read_stocks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):    
#    stocks = crud.get_stocks_from_db(db, skip=skip, limit=limit)
#    return stocks

@app.post("/stocks/{stock_name}")
def create_stock(stock_name: str, db: Session = Depends(get_db)):
    url = "https://www.alphavantage.co/query?function=PPO&symbol="+stock_name+"&interval=daily&series_type=close&fastperiod=10&matype=1&apikey=92DD3OTK7XOQK3GT"
    r = requests.get(url)
    stocks = r.json()  
    apippo = stocks.get("Technical Analysis: PPO").get("2020-11-20").get("PPO")
    db_stock = crud.check_if_stock_exists(db, stockid=stock_name)
    stock = models.Stock(stock_name=stock_name, ppo=apippo)
    if db_stock:        
        return crud.update_stock(db=db, stock=stock, stock_name=stock_name, stockppo=apippo)   
    return crud.create_stock(db=db, stock=stock)

@app.post("/stocks/{user_id}/create_favorite", response_model=schemas.FavoriteBase, status_code=201)
def create_favorite_stock(
    user_id: str, stock_name: str, favorite: schemas.FavoriteCreate, db: Session = Depends(get_db)
):
    favorite = crud.create_favorite(db=db, favorite=favorite, user_id=user_id, stock_name=stock_name)
    if stock_name is None:
        raise HTTPException(status_code=500, detail="Can't find stock")
    return favorite

@app.delete("/stocks/{user_id}/delete_favorite", response_model=schemas.FavoriteRemove)
def delete_favorite_stock(
    user_id: str, stock_name: str, favorite: schemas.FavoriteRemove, db: Session = Depends(get_db)
    ):
    favorite = crud.remove_favorite(db=db, favorite=favorite, user_id=user_id, stock_name=stock_name)
    if favorite is None:
        raise HTTPException(status_code=404, detail="Favorite stock not found")
    return {"status": "Favorite stock has been removed"}

@app.get("/stocks/{user_id}/get_favorites")
def get_favorite_stock(
        user_id: str, db: Session = Depends(get_db)
    ):
    list_of_names = crud.get_favorite_stock_names_from_db(db, user_id=user_id)
    list_of_fav = []
    for stock_name in list_of_names:
        url = "https://www.alphavantage.co/query?function=PPO&symbol="+stock_name+"&interval=daily&series_type=close&fastperiod=10&matype=1&apikey=92DD3OTK7XOQK3GT"
        r = requests.get(url)
        stocks = r.json()  
        apippo = stocks.get("Technical Analysis: PPO").get("2020-11-20").get("PPO")       
        stock = models.Stock(stock_name=stock_name, ppo=apippo)
        list_of_fav.append(crud.update_stock(db=db, stock=stock, stock_name=stock_name, stockppo=apippo))
    return list_of_fav
