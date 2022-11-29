from sqlalchemy.orm import Session
import requests
from backend.model import models, schemas


# These functions are taken from fastapi documentation:
# https://fastapi.tiangolo.com/tutorial/sql-databases/#__tabbed_1_3


def get_user(db: Session, user_id: str):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_username_by_id(db: Session, user_id: int):
    return db.query(models.User.username).filter(models.User.id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(username=user.username, email=user.email, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).get(user_id)
    if db_user is None:
        return None
    db.delete(db_user)
    db.commit()
    return {"message": "Deleted"}

def get_blogposts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.BlogPost).offset(skip).limit(limit).all()


def create_user_blogpost(db: Session, blogpost: schemas.BlogPostCreate, user_id: int):
    db_item = models.BlogPost(**blogpost.dict(), user_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item



def delete_user_blogpost(db: Session, user_id: int, blog_post_id: int):
    db.query(models.BlogPost).filter(models.BlogPost.user_id == user_id).filter(
        models.BlogPost.id == blog_post_id).delete()
    db.commit()
    return {"message": "Deleted"}

def create_interaction(db: Session, interaction: schemas.Interactions, user_id: int, blog_post_id: int):
    db_item = models.Interactions(
        **interaction.dict(), user_id=user_id, blog_post_id=blog_post_id)
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

def check_if_stock_exists(db: Session, stockid: str):
    exists = db.query(models.Stock).filter(models.Stock.stock_name==stockid).first() is not None
    return exists

def update_stock(db: Session, stock_name: str, stockppo: float):
    print("Start af update_stock i crud")
    stock_item = db.query(models.Stock).filter(models.Stock.stock_name==stock_name).first()
    if stock_item is None:
        return None
    setattr(stock_item, 'ppo', stockppo)
    db.commit()
    db.refresh(stock_item)
    return stock_item

def create_stock(db: Session, stock: schemas.StockCreate):
    db_stock =  models.Stock(stock_name=stock.stock_name, ppo=stock.ppo)
    db.add(db_stock)
    db.commit()
    db.refresh(db_stock)
    return db_stock

def get_stock_from_db(db: Session, stock_name: str):
    return db.query(models.Stock).filter(models.Stock.stock_name==stock_name).first()

def create_favorite(db: Session, fav: schemas.FavoriteCreate):
    db_fav = models.Favorite(user_id=fav.user_id, stock_id=fav.stock_id)
    db.add(db_fav)
    db.commit()
    db.refresh(db_fav)
    return db_fav

def delete_favorite(db: Session, user_id: int, stock_name: str):
    db.query(models.Favorite).filter_by(user_id=user_id, stock_id=stock_name).delete()
    db.commit()
    return {"message": "Stock removed from favorites"}

def get_favorite_stock_names_from_db(db: Session, user_id: int):
    list_of_fav = db.query(models.Favorite).filter(models.Favorite.user_id==user_id).all()
    stocks = []
    for stock in list_of_fav:
        stocks.append(db.query(models.Stock).filter(models.Stock.stock_name==stock.stock_id).first())     
    return stocks
    