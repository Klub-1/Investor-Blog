import { makeAutoObservable } from "mobx";

export class Interaction {
  id = 0;
  user_id = "";
  blog_post_id = 0;
  type = -1;

  update(type) {
    this.type = type;
  }

  constructor(id, user_id, blog_post_id, type) {
    makeAutoObservable(this);
    if (id < 0) {
      this.id = Math.random() * Math.PI * 10;
    } else {
      this.id = id;
    }
    this.user_id = user_id;
    this.blog_post_id = blog_post_id;
    this.type = type;
  }
}
