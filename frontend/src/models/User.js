import { makeAutoObservable } from "mobx";

import { BlogPost } from "../models/BlogPost";
import { Comment } from "../models/Comment";
import { Interaction } from "../models/Interaction";

export class User {
  id = 0;
  username = "";
  blogposts = [];
  comments = [];
  interactions = [];
  email = "";

  initBlogPosts(_blogposts) {
    this.blogposts = _blogposts.map((blogpost) => {
      return new BlogPost(
        blogpost.id,
        blogpost.user_id,
        blogpost.title,
        blogpost.content,
        blogpost.tags,
        blogpost.comments.map((comment) => {
          return new Comment(
            comment.id,
            comment.user_id,
            comment.blog_post_id,
            comment.comment
          );
        }),

        blogpost.interactions.map((interaction) => {
          return new Interaction(
            interaction.id,
            interaction.user_id,
            interaction.blog_post_id,
            interaction.type
          );
        })
      );
    });
  }

  initInteractions(_interactions) {
    this.interactions = _interactions.map((interaction) => {
      return new Interaction(
        interaction.id,
        interaction.user_id,
        interaction.blog_post_id,
        interaction.type
      );
    });
  }

  initComments(_comments) {
    this.comments = _comments.map((comment) => {
      return new Comment(
        comment.id,
        comment.user_id,
        comment.blog_post_id,
        comment.comment
      );
    });
  }

  constructor(id, username, blogposts, comments, interactions, email) {
    makeAutoObservable(this);
    this.id = id;
    this.username = username;
    this.email = email;
    this.initBlogPosts(blogposts);
    this.initInteractions(interactions);
    this.initComments(comments);
  }
}
