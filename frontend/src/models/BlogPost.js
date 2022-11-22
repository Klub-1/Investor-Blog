import { makeAutoObservable } from "mobx";
import { API } from "../Api/api";
import AuthStore from "../stores/AuthStore";
import { Comment } from "./Comment";
import { Interaction } from "./Interaction";

export class BlogPost {
  id = 0;
  user_id = "";
  title = "";
  content = "";
  tags = "";
  comments = [];
  interactions = [];

  api = new API();

  // USER
  userLiked() {
    return this.interactions.some((interaction) => {
      return interaction.type === 0 && interaction.user_id === this.user_id;
    });
  }

  userDisliked() {
    return this.interactions.some((interaction) => {
      return interaction.type === 1 && interaction.user_id === this.user_id;
    });
  }

  authorIsUser() {
    const user_id = AuthStore.getUserName();
    return user_id === this.user_id;
  }

  // COMMENTS

  async createComment(comment) {
    const user_id = AuthStore.getUserName();
    const id = await this.api.createComment(user_id, this.id, comment);
    const newComment = new Comment(id, user_id, this.id, comment);
    console.table(newComment.user_id);
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
    await this.api.deleteInteraction(interaction);
    this.interactions = this.interactions.filter(
      (i) => i.user_id !== interaction.user_id
    );
  }

  async updateInteraction(interaction) {
    const id = await this.api.putInteraction(interaction);
    interaction.id = id;
    this.interactions.forEach((i) => {
      if (interaction.user_id === i.user_id) {
        i.update(interaction.type);
      }
    });
  }

  registerInteraction(type) {
    let interactionType = -1;
    if (this.userLiked()) {
      interactionType = 0;
    } else if (this.userDisliked()) {
      interactionType = 1;
    }

    const user_id = this.auth.getUserName();

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

  constructor(id, user_id, title, content, tags, comments, interactions) {
    makeAutoObservable(this);
    if (id < 0) {
      this.id = Math.random() * Math.PI * 10;
    } else {
      this.id = id;
    }
    this.user_id = user_id;
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.comments = comments;
    this.interactions = interactions;
  }
}
