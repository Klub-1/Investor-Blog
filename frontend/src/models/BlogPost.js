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

  async createInteraction(interaction) {
    const id = await this.api.postInteraction(interaction);
    interaction.id = id;
    this.interactions.push(interaction);
  }

  async removeInteraction(interaction) {
    await this.api.deleteInteraction(interaction.user_name, this.id);
    this.interactions = this.interactions.filter(
      (i) => i.user_id !== interaction.user_id
    );
  }

  async updateInteraction(interaction) {
    await this.api.putInteraction(
      interaction.user_name,
      this.id,
      interaction.type
    );
    this.interactions.forEach((i) => {
      if (interaction.user_id === i.user_id) {
        i.update(interaction.type);
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
    const user_id = AuthStore.user.id;

    const interaction = new Interaction(-1, user_id, this.id, type);

    if (type === interactionType) {
      this.removeInteraction(interaction);
      return;
    }

    if (!this.userLiked() && !this.userDisliked()) {
      this.createInteraction(interaction);
    } else if (interactionType !== type) {
      this.updateInteraction(interaction);
    }
  }

  constructor(
    id,
    user_id,
    username,
    title,
    content,
    tags,
    comments,
    interactions
  ) {
    makeAutoObservable(this);
    this.id = id;
    this.user_id = user_id;
    this.username = username;
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.comments = comments;
    this.interactions = interactions;
  }
}
