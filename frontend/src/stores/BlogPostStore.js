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
    return this.blogposts.filter((blogpost) => {
      return (
        blogpost.title.toLowerCase().includes(this.filter.toLowerCase()) ||
        blogpost.content.toLowerCase().includes(this.filter.toLowerCase())
      );
    });
  }

  setFilterValue(value) {
    this.filter = value;
  }

  getInteractionsCount(blog_post_id, type) {
    return this.blogposts
      .find((blogpost) => blogpost.id === blog_post_id)
      .interactions.filter((interaction) => interaction.type === type).length;
  }

  hasUserInteracted(blog_post_id) {
    const user_id = this.auth.getToken();
    const interaction = this.blogposts
      .find((blogpost) => blogpost.id === blog_post_id)
      .interactions.find((interaction) => interaction.user_id === user_id);

    if (interaction) {
      return interaction.type;
    } else {
      return -1;
    }
  }

  createInteraction(interaction) {
    // Create interaction
    this.api.postInteraction(interaction);
    this.blogposts.forEach((blogpost) => {
      if (blogpost.id === interaction.blog_post_id) {
        blogpost.createInteraction(interaction);
      }
    });
  }

  deleteInteraction(interaction) {
    // Delete interaction
    this.api.deleteInteraction(interaction);
    this.blogposts.forEach((blogpost) => {
      if (blogpost.id === interaction.blog_post_id) {
        blogpost.removeInteraction(interaction);
      }
    });
  }

  updateInteractions(interaction) {
    // Update interaction
    this.api.putInteraction(interaction);
    this.blogposts.forEach((blogpost) => {
      if (blogpost.id === interaction.blog_post_id) {
        blogpost.updateInteraction(interaction);
      }
    });
  }

  registerInteraction(blog_post_id, type) {
    let interactionType = this.hasUserInteracted(blog_post_id);
    const user_id = this.auth.getToken();

    if (type === interactionType) {
      type = -1;
    }

    const interaction = new Interaction(-1, user_id, blog_post_id, type);

    if (type === -1) {
      if (interactionType !== -1) {
        this.deleteInteraction(interaction);
      }
    } else if (interactionType === -1) {
      this.createInteraction(interaction);
    } else if (interactionType !== type) {
      this.updateInteractions(interaction);
    }
  }

  createComment(blog_post_id, comment) {
    const user_id = this.auth.getToken();
    this.api.createComment(user_id, blog_post_id, comment);
    const newComment = new Comment(-1, user_id, blog_post_id, comment);
    this.blogposts.forEach((blogpost) => {
      if (blogpost.id === blog_post_id) {
        blogpost.createComment(newComment);
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
            interaction.type
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
