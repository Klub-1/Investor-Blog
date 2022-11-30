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

  /**
   * Checks if the user is logged in:
   *       If the value of the user id is -1 we check if the user is logged in.
   *       If the id of the user who created the comment the username is set to "Ukendt bruger"
   *       If the id of the user who created the comment is the same as the id of the current user, the username is set to "Dig"
   *       If the id of the user who created the comment is not the same as the id of the current user, the username is set to the username of the user who created the comment
   */
  async getUserName() {
    if (AuthStore.user.id === -1) {
      await AuthStore.checkAuth();
    }

    if (this.user_id === -1) {
      this.username = "Ukendt bruger";
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

  /**
   * Create the instance of the comment and gets the username of the user who has commented the blogpost
   * @param id - The id of the comment
   * @param user_id - The id of the user who made the comment
   * @param blog_post_id - The id of the blog post that the comment is on.
   * @param comment - The content of the comment
   */
  constructor(id, user_id, blog_post_id, comment) {
    makeAutoObservable(this);
    this.id = id;
    this.user_id = user_id;
    this.blog_post_id = blog_post_id;
    this.comment = comment;

    this.getUserName();
  }
}
