import { action, computed, makeObservable, observable } from "mobx";
import { API } from "../Api/api";
import AuthStore from "./AuthStore";
import { BlogPost } from "../models/BlogPost";
import { Comment } from "../models/Comment";
import { Interaction } from "../models/Interaction";

class BlogPostStore {
  blogposts = [];
  filter = "";
  api = new API();

  get filteredBlogPosts() {
    return this.blogposts.filter((blogpost) => {
      return (
        blogpost.title.toLowerCase().includes(this.filter.toLowerCase()) ||
        blogpost.content.toLowerCase().includes(this.filter.toLowerCase())
      );
    });
  }

  /**
   * Set the value of filter to the value of the param
   * @param value - The new value of the filter.
   */
  setFilterValue(value) {
    this.filter = value;
  }

  /**
   * Adds a blog post to the list of blog posts
   * @param blogpost - The blogpost object that you want to add to the blogposts array.
   */
  pushToBlogposts(blogpost) {
    this.blogposts.push(blogpost);
  }

  /**
   * It creates a blog post in the backend and push it to the blogposts array
   * @param title - The title of the blog post
   * @param content - The content of the blog post.
   * @param tags - The tags of the blog post.
   */
  async createBlogPost(title, content, tags) {
    await AuthStore.checkAuth();

    const user_id = AuthStore.user.id;

    const data = await this.api.createBlogPost(user_id, title, content, tags);

    const blogpost = new BlogPost(
      data.id,
      user_id,
      title,
      content,
      tags,
      [],
      []
    );

    this.pushToBlogposts(blogpost);
  }

  /**
   * Init the blogposts array with the data from the param
   * @param _blogposts - an array of blogposts
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
   * Init class and array of blogposts
   */
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
export default new BlogPostStore();
