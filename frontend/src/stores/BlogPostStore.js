import { makeAutoObservable } from "mobx";
import { API } from "../dal/api";
import { BlogPost } from "../model/BlogPost";
import { Comment } from "../model/Comment";
import { Interaction } from "../model/Interaction";

export class BlogPostStore {
  blogposts = [];
  api = new API();

  createBlogPost(title, content, author) {
    const blogpost = new BlogPost(title, content, author);
    this.blogposts.push(blogpost);
  }

  setBlogPosts(blogposts) {
    blogposts.map((blogpost) => {
      const comments = blogpost.comments.map(
        (comment) =>
          new Comment(
            comment.id,
            comment.user_id,
            comment.blog_post_id,
            comment.comment
          )
      );

      const interactions = blogpost.interactions.map(
        (interaction) =>
          new Interaction(
            interaction.id,
            interaction.user_id,
            interaction.blog_post_id,
            interaction.like,
            interaction.dislike
          )
      );

      const post = new BlogPost(
        blogpost.id,
        blogpost.user_id,
        blogpost.title,
        blogpost.content,
        comments,
        interactions
      );
      this.blogposts.push(post);
    });
  }

  constructor() {
    makeAutoObservable(this);

    fetch("http://localhost:8000/blogposts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        this.setBlogPosts(data);
      });
  }
}
