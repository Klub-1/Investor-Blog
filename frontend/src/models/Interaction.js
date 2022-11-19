export class Interaction {
  id = 0;
  user_id = "";
  blog_post_id = 0;
  like = false;
  dislike = false;

  constructor(id, user_id, blog_post_id, like, dislike) {
    this.id = id;
    this.user_id = user_id;
    this.blog_post_id = blog_post_id;
    this.like = like;
    this.dislike = dislike;
  }
}
