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
    return (
      AuthStore.user.id === this.user_id ||
      this.username === AuthStore.user.username
    );
  }

  async getUserName() {
    const res = await this.api.getUserName(this.user_id);
    if (!res) {
      this.username = "Ukendt bruger";
    } else {
      this.username = res;
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
