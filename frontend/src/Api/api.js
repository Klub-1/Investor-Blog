import { Constants } from "../Util/Constants";

export class API {
  url = Constants.BACKEND_URL;

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

  async postInteraction(user_id, blog_post_id, type) {
    const res = await fetch(
      this.url + "/users/" + user_id + "/interactions/" + blog_post_id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
        }),
      }
    );
    const json = await res.json();
    return json.id;
  }

  async putInteraction(user_id, blog_post_id, type) {
    await fetch(
      this.url + "/users/" + user_id + "/interactions/" + blog_post_id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
        }),
      }
    );
  }

  async deleteInteraction(user_id, blog_post_id) {
    await fetch(
      this.url + "/users/" + user_id + "/interactions/" + blog_post_id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  async getUser() {
    const res = await fetch(
      this.url + "/user?token=" + localStorage.getItem("portal-jwt-Token")
    );
    const json = await res.json();
    return json;
  }

  async getUserNameById(user_id) {
    const res = await fetch(this.url + "/users/username/" + user_id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const text = await res.json();
    return text;
  }

  // ?: NOT USED
  async getUserID() {
    const res = await fetch(
      this.url + "/user/id?token=" + localStorage.getItem("portal-jwt-Token")
    );
    const json = await res.json();
    return json;
  }

  async registerUser(email, username, password) {
    const res = await fetch(this.url + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });
    const token = await res.text();
    return token;
  }

  async getStocks(){

    const res = await fetch("http://localhost:8000/stocks/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const stocks = await res.json();
    return stocks
  }
  
  async login(email, password) {
    const res = await fetch(this.url + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const token = await res.text();
    return token;
  }

  async checkIfUserExists(email) {
    const res = await fetch(this.url + "/checkifuserexists?email=" + email);
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  }
}
