import { makeAutoObservable } from "mobx";
import { API } from "../Api/api";
import AuthStore from "../stores/AuthStore";

export class Comment {
  id = 0;
  user_id = 0;
  username = "";
  comment_from_user = false;
  blog_post_id = 0;
  comment = "";
  api = new API();

  async getUserName() {
    if (AuthStore.user.id === -1) {
      await AuthStore.checkAuth();
    }

    if (this.user_id === -1) {
      this.username = "Anonymous";
    }

    if (this.user_id === AuthStore.user.id) {
      this.username = "dig";
      this.comment_from_user = true;
    } else {
      const res = await this.api.getUserName(this.user_id);
      this.username = res;
      this.comment_from_user = false;
    }
  }

  constructor(id, user_id, blog_post_id, comment) {
    makeAutoObservable(this);
    this.id = id;
    this.user_id = user_id;
    this.blog_post_id = blog_post_id;
    this.comment = comment;

    this.getUserName();
  }
}
