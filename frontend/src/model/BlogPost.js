import { makeAutoObservable } from "mobx";
import { API } from "../dal/api";

export class BlogPost {
  id = 0;
  user_id = "";
  title = "";
  content = "";
  comments = [];
  interactions = [];

  api = new API();

  createComment(user_id, comment) {
    let newComment = this.api.createComment(user_id, this.id, comment);
    this.comments.push(newComment);
  }

  constructor(id, user_id, title, content, comments, interactions) {
    makeAutoObservable(this);
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.content = content;
    this.comments = comments;
    this.interactions = interactions;
  }
}
