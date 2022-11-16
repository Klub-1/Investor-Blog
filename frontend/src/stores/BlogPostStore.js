import { action, computed, makeObservable, observable } from "mobx";
import { API } from "../dal/api";
import { BlogPost } from "../model/BlogPost";
import { Comment } from "../model/Comment";
import { Interaction } from "../model/Interaction";

export class BlogPostStore {
  blogposts = [];
  filter = "";
  api = new API();

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

  createBlogPost(user_id, title, content, tags) {
    let data = this.api.createBlogPost(user_id, title, content, tags);

    const blogpost = new BlogPost(
      data.id,
      data.user_id,
      data.title,
      data.content,
      data.comments,
      data.interactions
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
