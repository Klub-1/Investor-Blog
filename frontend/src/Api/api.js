export class API {
  url = "http://localhost:8000";

  async getBlogPosts() {
    const res = await fetch(this.url + "/blogposts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    return json;
  }

  async createBlogPost(user_id, title, content, tags) {
    const res = await fetch(this.url + "/users/" + user_id + "/blogposts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        tags: tags,
      }),
    });
    const json = await res.json();
    return json.id;
  }

  async createComment(user_id, blog_post_id, comment) {
    const res = await fetch(
      this.url + "/users/" + user_id + "/comments/" + blog_post_id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: comment,
        }),
      }
    );
    const json = await res.json();
    return json;
  }

  async postInteraction(interaction) {
    const res = await fetch(
      this.url +
        "/users/" +
        interaction.user_id +
        "/interactions/" +
        interaction.blog_post_id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: interaction.type,
        }),
      }
    );
    const json = await res.json();
    return json.id;
  }

  async putInteraction(interaction) {
    const res = await fetch(
      this.url +
        "/users/" +
        interaction.user_id +
        "/interactions/" +
        interaction.blog_post_id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: interaction.type,
        }),
      }
    );

    const json = await res.json();
    return json.id;
  }

  async deleteInteraction(interaction) {
    const res = await fetch(
      this.url +
        "/users/" +
        interaction.user_id +
        "/interactions/" +
        interaction.blog_post_id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.status;
  }

  async getUserName() {
    const res = await fetch(
      this.url +
        "/user/username?token=" +
        localStorage.getItem("portal-jwt-Token")
    );
    const json = await res.json();
    return json;
  }
}
