from sqlalchemy.orm import Session

from backend.model import models, schemas

# These functions are taken from fastapi documentation:
# https://fastapi.tiangolo.com/tutorial/sql-databases/#__tabbed_1_3

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(username=user.username, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
def get_blogposts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.BlogPost).offset(skip).limit(limit).all()

def create_user_blogpost(db: Session, blogpost: schemas.BlogPostCreate, user_id: int):
    db_item = models.BlogPost(**blogpost.dict(), user_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_tag_by_ticker(db: Session, tag_ticker: int):
    return db.query(models.Tag).filter(models.Tag.stock_ticker == tag_ticker).first()

def get_tags(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Tag).offset(skip).limit(limit).all()

def create_tag(db: Session, tag: schemas.TagCreate):
    db_tag = models.Tag(stock_ticker=tag.stock_ticker)
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag