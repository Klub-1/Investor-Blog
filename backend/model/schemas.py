from pydantic import BaseModel

# Schemas are designed from the fastapi documentation
# https://fastapi.tiangolo.com/tutorial/sql-databases/#__tabbed_1_3

class BlogPostBase(BaseModel):
    title: str
    content: str | None = None

class BlogPostCreate(BlogPostBase):
    pass
class BlogPost(BlogPostBase):
    id: int

    likes: int
    dislikes: int

    user_id: int
    tag_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    blogposts: list[BlogPost] = []

    class Config:
        orm_mode = True

class TagBase(BaseModel):
    stock_ticker: str

class TagCreate(TagBase):
    pass

class Tag(TagBase):
    id: int

    blogposts: list[BlogPost] = []

    class Config:
        orm_mode = True
