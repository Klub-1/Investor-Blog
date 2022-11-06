from typing import Union


from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from datetime import datetime, timedelta, timezone
import requests
import jwt
from bs4 import BeautifulSoup

from backend.api import crud
from backend.model import  models, schemas
from backend.database.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

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
    print("test")
    return {"Hello": "Investor World!"}

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
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
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# END COPIED FROM DOCUMENTATION
# ________________________________________________

@app.post("/users/{user_id}/blogposts/", response_model=schemas.BlogPost)
def create_blogpost_for_user(
        user_id: int, blogpost: schemas.BlogPostCreate, db: Session = Depends(get_db)
):
    return crud.create_user_blogpost(db=db, blogpost=blogpost, user_id=user_id)


@app.get("/blogposts/", response_model=list[schemas.BlogPost])
def read_blogposts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    blogposts = crud.get_blogposts(db, skip=skip, limit=limit)
    return blogposts

@app.post("/tags/", response_model=schemas.Tag)
def create_tag(tag: schemas.TagCreate, db: Session = Depends(get_db)):
    db_tag = crud.get_tag_by_ticker(db, tag_ticker=tag.stock_ticker)
    if db_tag:
        raise HTTPException(status_code=400, detail="Tag already registered")
    return crud.create_tag(db=db, tag=tag)


@app.get("/login")
async def login():
    URI = "https://auth.dtu.dk/dtu/?service=http://4.233.122.101:8000/redirect"
    return RedirectResponse(url=URI)

@app.get("/redirect")
async def redirect(ticket : str):
    body = "https://auth.dtu.dk/dtu/servicevalidate?service=http://4.233.122.101:8000/redirect&ticket="+ticket
    body = requests.get(url=body)
    print(body.content.decode("utf-8"))
    element = BeautifulSoup( body.content.decode("utf-8"))
    #todo CHANGE SECRET KEY
    token = jwt.encode({'id': element.find("cas:user").text ,"exp": datetime.now(tz=timezone.utc) +  timedelta(seconds=30)}, 'secret', algorithm='HS256')
    #token = jwt.encode({'id': element.find("cas:user").text,'mail' : element.find("mail").text , 'name': element.find("gn").text , 'lastname': element.find("sn").text ,"exp": datetime.now(tz=timezone.utc) +  timedelta(seconds=30)}, 'secret', algorithm='HS256')
    #if(crud.get_user(db=SessionLocal(), user_id = element.find("cas:user").text) == None):
    #    crud.create_user(db=SessionLocal(), user=schemas.UserCreate(email=element.find("mail").text,id=element.find("cas:user").text, username=element.find("gn").text+" "+element.find("sn").text))
    if(crud.get_user(db=SessionLocal(), user_id = element.find("cas:user").text) == None):
        crud.create_user(db=SessionLocal(), user="",user_id=element.find("cas:user").text, username="")
    #print(token)
    #returnn user to frontend with token in url
    return RedirectResponse(url="https://investorblog.diplomportal.dk/?token="+token)
    
@app.get("/verify")
async def verify(token : str):
    print("verify "+ token)
    try:
        #todo CHANGE SECRET KEY
        decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
        print(decoded)
        return decoded
    except jwt.ExpiredSignatureError:
        return "Token expired"
    except jwt.InvalidTokenError:
        return "Invalid token"

@app.get("/tags/", response_model=list[schemas.Tag])
def read_tags(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tags = crud.get_tags(db, skip=skip, limit=limit)
    return tags
