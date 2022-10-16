from typing import Union

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.model.models import BlogPost

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





blogposts = {
    "1": {
        "header": "Overskrift asd",
        "content": "main content of the blog",
        "likes": 2,
        "dislikes": 3,
        # TODO: fix
        "user": "user",
        "comments": "comment",
        "tags": "tags"
    },
    "2": {
        "header": "Overskrift 2",
        "content": "main content of the 222 blog",
        "likes": 2,
        "dislikes": 3,
        # TODO: fix
        "user": "user",
        "comments": "comment",
        "tags": "tags"
    }
}


@app.get("/")
def read_root():
    return {"Hello": "Investor World!"}


@app.get("/blogposts/")
def get_blogposts():
    return blogposts


@app.get("/blogpost/{blogpost_id}")
async def get_blogpost(blogpost_id: str):
    try:
        return blogposts[blogpost_id]
    except KeyError:
        raise HTTPException(status_code=404, detail="Blogpost not found")


@app.post("/blogpost/")
def create_blogpost(blogpost: BlogPost):
    blogposts[str(len(blogposts)+1)] = blogpost
    return blogpost

@app.put("/like/{blogpost_id}")
async def like_blogpost(blogpost_id: str):
    blogposts[blogpost_id]["likes"] += 1
    return blogposts[blogpost_id]

@app.put("/dislike/{blogpost_id}")
async def dislike_blogpost(blogpost_id: str):
    blogposts[blogpost_id]["dislikes"] += 1
    return blogposts[blogpost_id]