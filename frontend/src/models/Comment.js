import { makeAutoObservable } from "mobx";
import { API } from "../Api/api";
import AuthStore from "../stores/AuthStore";

export class Comment {
  id = 0;
  user_id = "";
  username = "";
  blog_post_id = 0;
  comment = "";
  api = new API();

  async isCommentFromUser() {
    const user_id = AuthStore.user.id;
    return user_id === this.user_id;
  }

  constructor(id, user_id, blog_post_id, comment) {
    makeAutoObservable(this);
    this.id = id;
    this.user_id = user_id;
    this.blog_post_id = blog_post_id;
    this.comment = comment;

    const res = this.api.getUserName(this.user_id);
    this.username = res.username;
  }
}
