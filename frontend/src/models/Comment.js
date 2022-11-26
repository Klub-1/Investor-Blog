import { makeAutoObservable } from "mobx";
import AuthStore from "../stores/AuthStore";

export class Comment {
  id = 0;
  user_id = "";
  blog_post_id = 0;
  comment = "";

  async isCommentFromUser() {
    const user_id = AuthStore.user.username;
    return user_id === this.user_id;
  }

  constructor(id, user_id, blog_post_id, comment) {
    makeAutoObservable(this);
    this.id = id;
    this.user_id = user_id;
    this.blog_post_id = blog_post_id;
    this.comment = comment;
  }
}
