import { makeAutoObservable } from "mobx";

export class BlogPost {
  id = 0;
  user_id = "";
  title = "";
  content = "";
  tags = "";
  comments = [];
  interactions = [];

  constructor(id, user_id, title, content, tags, comments, interactions) {
    makeAutoObservable(this);
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.comments = comments;
    this.interactions = interactions;
  }
}
