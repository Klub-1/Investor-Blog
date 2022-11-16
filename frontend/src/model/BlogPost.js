export class BlogPost {
  id = 0;
  user_id = "";
  title = "";
  content = "";
  comments = [];
  interactions = [];

  constructor(id, user_id, title, content, comments, interactions) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.content = content;
    this.comments = comments;
    this.interactions = interactions;
  }
}
