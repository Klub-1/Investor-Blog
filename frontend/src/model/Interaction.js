import { makeObservable, observable } from "mobx";

export class Interaction {
  id = 0;
  user_id = "";
  blog_post_id = 0;
  like = false;
  dislike = false;

  constructor(id, user_id, blog_post_id, like, dislike) {
    makeObservable(this, {
      id: observable,
      user_id: observable,
      blog_post_id: observable,
      like: observable,
      dislike: observable,
    });

    this.id = id;
    this.user_id = user_id;
    this.blog_post_id = blog_post_id;
    this.like = like;
    this.dislike = dislike;
  }
}
