import { makeAutoObservable } from "mobx";
import { API } from "../Api/api";
import AuthStore from "../stores/AuthStore";
import { Comment } from "./Comment";
import { Interaction } from "./Interaction";

export class BlogPost {
  id = 0;
  user_id = "";
  username = "";
  title = "";
  content = "";
  tags = "";
  comments = [];
  interactions = [];

  api = new API();

  // USER
  async getAuthor() {
    if (this.user_id === -1) {
      this.username = "Ukendt bruger";
      return;
    }

    if (
      this.user_id === AuthStore.user.id ||
      this.username === AuthStore.user.username
    ) {
      this.username = "dig";
    } else {
      const res = await this.api.getUserName(this.user_id);
      this.username = res.username;
    }
  }

  userLiked() {
    return this.interactions.some((interaction) => {
      return (
        interaction.type === 0 && interaction.user_id === AuthStore.user.id
      );
    });
  }

  userDisliked() {
    return this.interactions.some((interaction) => {
      return (
        interaction.type === 1 && interaction.user_id === AuthStore.user.id
      );
    });
  }

  // COMMENTS

  async createComment(comment) {
    await AuthStore.checkAuth();
    const user_id = AuthStore.user.id;
    const id = await this.api.createComment(user_id, this.id, comment);
    const newComment = new Comment(id, user_id, this.id, comment);
    this.comments.push(newComment);
  }

  commentsCount() {
    return this.comments.length;
  }

  // INTERACTIONS

  getLikeCount() {
    const count = this.interactions.filter((interaction) => {
      return interaction.type === 0;
    }).length;
    return count;
  }

  getDislikeCount() {
    const count = this.interactions.filter((interaction) => {
      return interaction.type === 1;
    }).length;
    return count;
  }

  async createInteraction(type) {
    const user_id = AuthStore.user.id;
    const id = await this.api.postInteraction(user_id, this.id, type);

    this.interactions.push(new Interaction(id, user_id, this.id, type));
  }

  async removeInteraction() {
    const user_id = AuthStore.user.id;
    await this.api.deleteInteraction(user_id, this.id);
    this.interactions = this.interactions.filter((i) => i.user_id !== user_id);
  }

  async updateInteraction(type) {
    const user_id = AuthStore.user.id;
    await this.api.putInteraction(this.user_id, this.id, type);
    this.interactions.forEach((i) => {
      if (user_id === i.user_id) {
        i.update(type);
      }
    });
  }

  async registerInteraction(type) {
    let interactionType = -1;
    if (this.userLiked()) {
      interactionType = 0;
    } else if (this.userDisliked()) {
      interactionType = 1;
    }
    await AuthStore.checkAuth();

    if (type === interactionType) {
      this.removeInteraction();
      return;
    }

    if (!this.userLiked() && !this.userDisliked()) {
      this.createInteraction(type);
    } else if (interactionType !== type) {
      this.updateInteraction(type);
    }
  }

  constructor(id, user_id, title, content, tags, comments, interactions) {
    makeAutoObservable(this);
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.comments = comments;
    this.interactions = interactions;

    this.getAuthor();
  }
}
