import { makeAutoObservable } from "mobx";

export class BlogPost {
  id = 0;
  user_id = "";
  title = "";
  content = "";
  tags = "";
  comments = [];
  interactions = [];

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

  createComment(comment) {
    this.comments.push(comment);
  }

  createInteraction(interaction) {
    this.interactions.push(interaction);
  }

  removeInteraction(interaction) {
    this.interactions = this.interactions.filter(
      (i) => i.user_id !== interaction.user_id
    );
  }

  updateInteraction(interaction) {
    this.interactions.forEach((i) => {
      if (interaction.user_id === i.user_id) {
        i.update(interaction.type);
      }
    });
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
