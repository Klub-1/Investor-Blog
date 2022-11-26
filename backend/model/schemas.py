from typing import Optional
from pydantic import BaseModel


# Schemas are designed from the fastapi documentation
# https://fastapi.tiangolo.com/tutorial/sql-databases/#__tabbed_1_3

    
class InteractionsBase(BaseModel):
    # like = 0
    # dislike = 1
    type: int


class InteractionsCreate(InteractionsBase):
    pass

class InteractionsUpdate(InteractionsBase):
    pass

class Interactions(InteractionsBase):
    id: int
    user_id: int
    blog_post_id: int

    class Config:
        orm_mode = True
        
        
class CommentsBase(BaseModel):
    comment: str

class CommentsCreate(CommentsBase):
    pass

class Comments(CommentsBase):
    id: int
    user_id: int
    blog_post_id: int

    class Config:
        orm_mode = True
        
class BlogPostBase(BaseModel):
    title: str
    content: str | None = None
    tags: str


class BlogPostCreate(BlogPostBase):
    pass


class BlogPost(BlogPostBase):
    id: int
    user_id: int
    comments: list[Comments] = []
    interactions: list[Interactions] = []

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: str
    password: str
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    username: str
    email: str
    password: str
    class Config:
        orm_mode = True

class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int
    blogposts: list[BlogPost] = []
    comments: list[Comments] = []
    interactions: list[Interactions] = []

    class Config:
        orm_mode = True
        
class UserInformation(BaseModel):
    id: int
    username: str
    blogposts: list[BlogPost] = []
    comments: list[Comments] = []
    interactions: list[Interactions] = []
    email: str

    class Config:
        orm_mode = True