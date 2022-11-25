from pydantic import BaseModel
from sqlalchemy.orm import relationship
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

from backend.database.database import Base


# Models are created from the fastapi documentation:
# https://fastapi.tiangolo.com/tutorial/sql-databases/


class Interactions(Base):
    """An interaction is created by a user, pointing to the BlogPost"""
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(Integer, index=True)
    
    blog_post_id = Column(String, ForeignKey("blogposts.id", ondelete="CASCADE", onupdate="CASCADE"))
    blogpost = relationship("BlogPost", back_populates="interactions")
    
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE", onupdate="CASCADE"))
    user = relationship("User", backref="posts")
    user = relationship("User", back_populates="interactions")
    
class Comments(Base):
    """A comment is created by a user, pointing to the BlogPost"""
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    comment = Column(String, index=True)
    
    blog_post_id = Column(String, ForeignKey("blogposts.id", ondelete="CASCADE", onupdate="CASCADE"))
    blogpost = relationship("BlogPost", back_populates="comments")
    
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE", onupdate="CASCADE"))
    user = relationship("User", back_populates="comments")

class User(Base):
    """A User is connected to their own blog posts"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True) # AUTO GENERATED
    username = Column(String, unique=True, index=True) # COMPUSNET: S205124 - MAILOGIN: Selected by user
    email = Column(String, unique=True, index=True) # COMPUSNET: NULL - MAILOGIN: Selected by user
    password = Column(String, index=True) # COMPUSNET: NULL - MAILOGIN: Selected by user
    blogposts = relationship("BlogPost", back_populates="user")
    comments = relationship("Comments", back_populates="user")
    interactions = relationship("Interactions", back_populates="user")


class BlogPost(Base):
    """A blogpost is created by a user, pointing to its owner"""
    __tablename__ = "blogposts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String, index=True)
    
    tags = Column(String, index=True)
    
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE", onupdate="CASCADE"))
    user = relationship("User", back_populates="blogposts", )
    
    comments = relationship("Comments", back_populates="blogpost")
    interactions = relationship("Interactions", back_populates="blogpost")