import { makeAutoObservable } from "mobx";

export class Interaction {
  id = 0;
  user_id = "";
  blog_post_id = 0;
  type = -1;

  /**
   * Update the value of the interaction type (0: like, 1: dislike)
   * @param type - Interaction type.
   */
  update(type) {
    this.type = type;
  }

  /**
   * Init class
   * @param id - The id of the interaction.
   * @param user_id - The id of the user who created the interaction
   * @param blog_post_id - The id of the blog post that the interaction is on.
   * @param type - 'like' (0) or 'dislike' (1)
   */
  constructor(id, user_id, blog_post_id, type) {
    makeAutoObservable(this);
    this.id = id;
    this.user_id = user_id;
    this.blog_post_id = blog_post_id;
    this.type = type;
  }
}
