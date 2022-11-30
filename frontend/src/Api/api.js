import { Constants } from "../Util/Constants";

export class API {
  constant = new Constants();
  url = this.constant.BACKEND_URL();

  /**
   * This function makes a GET request to the server, and returns the blogposts as a JSON object
   * @returns An array of blog posts
   */
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

  /**
   * Makes a POST request to the server, with a blogpost as the body, and returns the created blogpost as text
   * @param user_id - The id of the user who is creating the blog post.
   * @param title - The title of the blog post
   * @param content - The content of the blog post.
   * @param tags - an array of strings
   * @returns The id of the blog post that was created.
   */
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

  /**
   * Makes a POST request to the server, with a comment as the body, and returns the created comment as a JSON object
   * @param user_id - the id of the user who is creating the comment
   * @param blog_post_id - The id of the blog post that the comment is being made on.
   * @param comment - the comment that the user is posting
   * @returns The response from the server.
   */
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

  /**
   * Makes a POST request to the server, with the interaction as the body, and returns the id of the created interaction as text
   * @param user_id - the id of the user who is interacting with the post
   * @param blog_post_id - the id of the blog post that the user is interacting with
   * @param type - "like" (0) or "dislike" (1)
   * @returns The id of the interaction
   */
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

  /**
   * Makes a PUT request to the server, with the interaction as the body, and returns the id of the updated interaction as text
   * @param user_id - The id of the user who is interacting with the blog post.
   * @param blog_post_id - The id of the blog post that the user is interacting with.
   * @param type - "like" (0) or "dislike" (1)
   */
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

  /**
   * Makes a DELETE request to the server
   * @param user_id - The id of the user who is interacting with the blog post.
   * @param blog_post_id - The id of the blog post that the user is interacting with.
   */
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

  /**
   Makes a GET request to get the username name from the server
   * @param id - The id of the user you want to get the username of.
   * @returns The username of the user with the given id.
   */
  async getUserName(id) {
    const res = await fetch(this.url + "/users/username/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const username = await res.json();
      return username.username;
    } else {
      return "Ukendt bruger";
    }
  }

  /**
   * Makes a GET request to the server, and returns the user as a JSON object
   * The token is fetched from the local storage
   * @returns The user object
   */
  async getUser() {
    const res = await fetch(
      this.url + "/user?token=" + localStorage.getItem("portal-jwt-Token")
    );
    const json = await res.json();
    return json;
  }

  /**
   * Makes a GET request to the server, and returns all users in the database as a JSON object
   * @returns An array of users as a json object.
   */
  async getAllUsers() {
    const res = await fetch(this.url + "/users");
    const json = await res.json();
    return json;
  }

  /**
   * It takes in an email, username, and password, and returns a token
   * @param email - the email of the user
   * @param username - The username of the user
   * @param password - password
   * @returns User token
   */
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

  /**
   * Makes a get request to the server, and returns all stocks in the database as a JSON object
   * @returns An array of stocks as a json object.
   */
  async getStocks() {
    const res = await fetch("http://localhost:8000/stocks/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const stocks = await res.json();
    return stocks;
  }

  /**
   * Makes a POST request to the server, to log the user in, and returns the user token
   * @param email - The email of the user
   * @param password - The password of the user
   * @returns User token
   */
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

  /**
   * It checks if a user exists in the database by sending a GET request to the server
   * @param email - The email of the user you want to check if exists.
   * @returns True - if the user exists in the database
   *          False - if the user does not exist in the database
   */
  async checkIfUserExists(email) {
    const res = await fetch(this.url + "/checkifuserexists?email=" + email);
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Makes a POST request to the server, to create a stock in the database and return the stock as a json object
   * @param stock_name - The name of the stock you want to search for.
   * @returns The stock object as a json object.
   */
  async searchStock(stock_name) {
    const res = await fetch(this.url + "/stocks/" + stock_name, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const stock = await res.json();
    return stock;
  }

  /**
   * Makes a GET request to the server, and stocks that the user has as their favourites as a JSON object
   * @param user_id - the user's id
   * @returns An array of stock objects.
   */
  async getUserFavorites(user_id) {
    const res = await fetch(
      this.url + "/stocks/" + user_id + "/get_favorites",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const favorites = await res.json();
    return favorites;
  }

  /**
   * Makes a POST request to the server, to add a stock to the user's favourites
   * @param user_id - the user's id
   * @param stocks_name - the name of the stock you want to add to your favorites
   * @returns The stock as a json object.
   */
  async createFavorite(user_id, stocks_name) {
    const res = await fetch(
      this.url + "/stocks/" + user_id + "/create_favorite/" + stocks_name,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const favorite = await res.json();
    return favorite;
  }

  /**
   * Makes a DELETE request to the server, to delete a stock from the user's favourites
   * @param user_id - the user's id
   * @param stocks_name - the name of the stock you want to delete from your favorites
   * @returns The status code of the request.
   */
  async deleteFavorite(user_id, stocks_name) {
    const res = await fetch(
      this.url + "/stocks/" + user_id + "/delete_favorite/" + stocks_name,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const status = res.status;
    return status;
  }
}
