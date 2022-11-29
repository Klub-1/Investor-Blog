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
    this.id = id
    this.user_id = user_id;
    this.blog_post_id = blog_post_id;
    this.type = type;
  }
}
