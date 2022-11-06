from pydantic import BaseModel
from sqlalchemy.orm import relationship
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

from backend.database.database import Base


# Models are created from the fastapi documentation:
# https://fastapi.tiangolo.com/tutorial/sql-databases/


class User(Base):
    """A User is connected to their own blog posts"""
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    blogposts = relationship("BlogPost", back_populates="user")


class BlogPost(Base):
    """A blogpost is created by a user, pointing to its owner"""
    __tablename__ = "blogposts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String, index=True)

    likes = Column(Integer, index=True)
    dislikes = Column(Integer, index=True)

    user_id = Column(String, ForeignKey("users.id"))
    user = relationship("User", back_populates="blogposts")
