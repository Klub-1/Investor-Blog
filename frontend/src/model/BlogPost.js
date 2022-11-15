import { computed, makeObservable, observable } from "mobx";

export class BlogPost {
  id = 0;
  user_id = "";
  title = "";
  content = "";
  comments = [];
  interactions = [];

  get likes() {
    console.log(this.interactions);
    return this.interactions.filter((interaction) => interaction.like).length;
  }

  get dislikes() {
    return this.interactions.filter((interaction) => interaction.dislike)
      .length;
  }

  constructor(id, user_id, title, content, comments, interactions) {
    makeObservable(this, {
      id: observable,
      user_id: observable,
      title: observable,
      content: observable,
      comments: observable,
      interactions: observable,
      likes: computed,
      dislikes: computed,
    });

    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.content = content;
    this.comments = comments;
    this.interactions = interactions;
  }
}
