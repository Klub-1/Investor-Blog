import { makeAutoObservable } from "mobx";
import { API } from "../Api/api";
import AuthStore from "../stores/AuthStore";
import { Comment } from "./Comment";
import { Interaction } from "./Interaction";

export class BlogPost {
  id = 0;
  user_id = 0;
  username = "";
  title = "";
  content = "";
  tags = "";
  comments = [];
  interactions = [];

  api = new API();

  /**
   * Sets the username variable to value
   * @param value - Username
   */
  setAuthor(value) {
    this.username = value;
  }

  /**
   * Checks if the user is logged in:
   *       If the value of the user id is -1 we check if the user is logged in.
   *       If the id of the user who created the post the username is set to "Ukendt bruger"
   *       If the id of the user who created the post is the same as the id of the current user, the username is set to "Dig"
   *       If the id of the user who created the post is not the same as the id of the current user, the username is set to the username of the user who created the post
   */
  async getAuthor() {
    if (AuthStore.user.id === -1) {
      await AuthStore.checkAuth();
    }

    if (this.user_id === -1) {
      this.setAuthor("Ukendt bruger");
      return;
    }

    const author_id = AuthStore.user.id;

    if (this.user_id === author_id) {
      this.setAuthor("dig");
    } else {
      const res = await this.api.getUserName(this.user_id);
      this.setAuthor(res);
    }
  }

  /**
   * Checks if the user has liked the post
   * @returns If the user has liked the post.
   */
  userLiked() {
    return this.interactions.some((interaction) => {
      return (
        interaction.type === 0 && interaction.user_id === AuthStore.user.id
      );
    });
  }

  /**
   * Checks if the user has disliked the post
   * @returns If the user has disliked the post.
   */
  userDisliked() {
    return this.interactions.some((interaction) => {
      return (
        interaction.type === 1 && interaction.user_id === AuthStore.user.id
      );
    });
  }

  /**
   * Checks if the user is logged in, then is create the comment in the database and adds it to the list of comments
   * @param comment - the text of the comment
   */
  async createComment(comment) {
    await AuthStore.checkAuth();
    const user_id = AuthStore.user.id;
    const id = await this.api.createComment(user_id, this.id, comment);
    const newComment = new Comment(id, user_id, this.id, comment);
    this.comments.push(newComment);
  }

  /**
   * It returns the number of comments the post has
   * @returns The number of comments in the comments array.
   */
  commentsCount() {
    return this.comments.length;
  }

  /**
   * It returns the number of likes for the post
   * @returns The number of likes on the post.
   */
  getLikeCount() {
    const count = this.interactions.filter((interaction) => {
      return interaction.type === 0;
    }).length;
    return count;
  }

  /**
   * It returns the number of dislikes for the post
   * @returns The number of dislikes on the post.
   */
  getDislikeCount() {
    const count = this.interactions.filter((interaction) => {
      return interaction.type === 1;
    }).length;
    return count;
  }

  /**
   * Creates a new interaction in the database and adds it to the interactions array
   * @param type - The type of interaction. As a int (0: like, 1: dislike).
   */
  async createInteraction(type) {
    const user_id = AuthStore.user.id;
    const id = await this.api.postInteraction(user_id, this.id, type);

    this.interactions.push(new Interaction(id, user_id, this.id, type));
  }

  /**
   * It removes the interaction from the database and from the interactions array
   */
  async removeInteraction() {
    const user_id = AuthStore.user.id;
    await this.api.deleteInteraction(user_id, this.id);
    this.interactions = this.interactions.filter((i) => i.user_id !== user_id);
  }

  /**
   * It updates the interaction of the current user for the current post
   * @param type - The type of interaction. As a int (0: like, 1: dislike).
   */
  async updateInteraction(type) {
    const user_id = AuthStore.user.id;
    await this.api.putInteraction(this.user_id, this.id, type);
    this.interactions.forEach((i) => {
      if (user_id === i.user_id) {
        i.update(type);
      }
    });
  }

  /**
   * If the interaction type is -1, it means that there of no interaction for the current user for the current post.
   * else update the interaction
   * Delete the interaction if the type is the same as the current interaction type
   * @param type - 0 for like, 1 for dislike
   */
  async registerInteraction(type) {
    let interactionType = -1;
    if (this.userLiked()) {
      interactionType = 0;
    } else if (this.userDisliked()) {
      interactionType = 1;
    }
    await AuthStore.checkAuth();

    if (type === interactionType) {
      this.removeInteraction();
      return;
    }

    if (!this.userLiked() && !this.userDisliked()) {
      this.createInteraction(type);
    } else if (interactionType !== type) {
      this.updateInteraction(type);
    }
  }

  /**
   * Initialize the post with data
   * @param id - The id of the post
   * @param user_id - The id of the user who created the post
   * @param title - The title of the post
   * @param content - The content of the post.
   * @param tags - an array of strings
   * @param comments - an array of comments
   * @param interactions - an array of interactions
   */
  constructor(id, user_id, title, content, tags, comments, interactions) {
    makeAutoObservable(this);
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.comments = comments;
    this.interactions = interactions;

    this.getAuthor();
  }
}
