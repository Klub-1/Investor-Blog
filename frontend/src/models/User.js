import { makeAutoObservable } from "mobx";
import { BlogPost } from "../models/BlogPost";
import { Comment } from "../models/Comment";
import { Interaction } from "../models/Interaction";

export class User {
  id = 0;
  username = "";
  blogposts = [];
  email = "";

  /**
   * Create a list of blogposts
   * @param _blogposts - an array of blogposts to initialize the blogposts array with
   */
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

  /**
   * Init user class
   * @param id - The id of the user.
   * @param username - The username of the user.
   * @param email - The email of the user
   * @param blogposts - an array of blogposts
   */
  constructor(id, username, email, blogposts) {
    makeAutoObservable(this);
    this.id = id;
    this.username = username;
    this.email = email;
    this.initBlogPosts(blogposts);
  }
}
