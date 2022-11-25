
import { makeAutoObservable } from "mobx";

export class Comment {
  id = 0;
  user_id = "";
  blog_post_id = 0;
  comment = "";

  async isCommentFromUser() {
    const user_id = await this.auth.getUserName();
    return user_id === this.user_id;
  }

  constructor(id, user_id, blog_post_id, comment) {
    makeAutoObservable(this);
    if (id < 0) {
      this.id = Math.random() * Math.PI * 10;
    } else {
      this.id = id;
    }
    this.user_id = user_id;
    this.blog_post_id = blog_post_id;
    this.comment = comment;
  }
}
