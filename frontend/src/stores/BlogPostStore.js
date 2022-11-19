import { action, computed, makeObservable, observable } from "mobx";
import { API } from "../Api/api";
import { AuthHandler } from "../Auth/AuthHandler";
import { BlogPost } from "../models/BlogPost";
import { Comment } from "../models/Comment";
import { Interaction } from "../models/Interaction";

export class BlogPostStore {
  blogposts = [];
  filter = "";
  api = new API();
  auth = new AuthHandler();

  get filteredBlogPosts() {
    return this.blogposts.filter(
      (blogpost) =>
        blogpost.title.toLowerCase().includes(this.filter.toLowerCase()) ||
        blogpost.content.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  setFilterValue(value) {
    this.filter = value;
  }

  createComment(blog_post_id, comment) {
    const user_id = this.auth.getToken();
    const data = this.api.createComment(user_id, blog_post_id, comment);
    const newComment = new Comment(data.id, user_id, blog_post_id, comment);
    this.blogposts.forEach((blogpost) => {
      if (blogpost.id === blog_post_id) {
        blogpost.comments.push(newComment);
      }
    });
  }

  createBlogPost(title, content, tags) {
    const user_id = this.auth.getToken();

    const data = this.api.createBlogPost(user_id, title, content, tags);

    const blogpost = new BlogPost(
      data.id,
      user_id,
      title,
      content,
      tags,
      [],
      []
    );

    this.blogposts.push(blogpost);
  }

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
            interaction.like,
            interaction.dislike
          );
        })
      );
    });
  }

  constructor() {
    makeObservable(this, {
      blogposts: observable,
      filter: observable,
      setFilterValue: action,
      filteredBlogPosts: computed,
      createBlogPost: action,
      initBlogPosts: action,
    });

    this.api.getBlogPosts().then((blogposts) => {
      this.initBlogPosts(blogposts);
    });
  }
}
