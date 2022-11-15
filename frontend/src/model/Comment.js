import { makeObservable, observable } from "mobx";

export class Comment {
  id = 0;
  user_id = "";
  blog_post_id = 0;
  comment = "";

  constructor(id, user_id, blog_post_id, comment) {
    makeObservable(this, {
      id: observable,
      user_id: observable,
      blog_post_id: observable,
      comment: observable,
    });

    this.id = id;
    this.user_id = user_id;
    this.blog_post_id = blog_post_id;
    this.comment = comment;
  }
}
