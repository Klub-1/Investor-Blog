from sqlalchemy.orm import Session

from backend.model import models, schemas


# These functions are taken from fastapi documentation:
# https://fastapi.tiangolo.com/tutorial/sql-databases/#__tabbed_1_3


def get_user(db: Session, user_id: str):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(username=user.username, email=user.email, hashed_password=user.hashed_password)
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

def create_interaction(db: Session, interaction: schemas.Interactions, user_id: int, blog_post_id: int):
    db_item = models.Interactions(**interaction.dict(), user_id=user_id, blog_post_id=blog_post_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def update_interaction(db: Session, interaction: schemas.InteractionsUpdate, user_id: int, blog_post_id: int):
    db_item = db.query(models.Interactions).filter(models.Interactions.user_id==user_id).filter(models.Interactions.blog_post_id==blog_post_id).first()
    if db_item is None:
        return None
    db_item.type = interaction.type
    db.commit()
    db.refresh(db_item)
    return db_item
    
def delete_interaction(db: Session, user_id: int, blog_post_id: int):
    db.query(models.Interactions).filter(models.Interactions.user_id==user_id).filter(models.Interactions.blog_post_id==blog_post_id).delete()
    db.commit()
    return {"message": "Deleted"}

    
def create_comment(db: Session, comment: schemas.CommentsCreate, user_id: int, blog_post_id: int):
    db_item = models.Comments(user_id=user_id, blog_post_id=blog_post_id, comment=comment.comment)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item