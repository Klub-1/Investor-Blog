from typing import Optional
from pydantic import BaseModel


# Schemas are designed from the fastapi documentation
# https://fastapi.tiangolo.com/tutorial/sql-databases/#__tabbed_1_3


class BlogPostBase(BaseModel):
    title: str
    content: str | None = None
    likes: Optional[int] = None
    dislikes: Optional[int] = None


class BlogPostCreate(BlogPostBase):
    pass


class BlogPost(BlogPostBase):
    id: int
    user_id: str

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    id: str
    username: str
    email: str
    hashed_password: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: str
    blogposts: list[BlogPost] = []

    class Config:
        orm_mode = True
