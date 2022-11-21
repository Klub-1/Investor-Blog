export class API {
  url = "https://investorblog.diplomportal.dk/api";

  getBlogPosts() {
    return fetch(url + "/blogposts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  }

  createBlogPost(user_id, title, content, tags) {
    return fetch(url + "/users/" + user_id + "/blogposts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        tags: tags,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  }

  createComment(user_id, blog_post_id, comment) {
    return fetch(
      url + "/users/" + user_id + "/comments/" + blog_post_id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: comment,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  }

  postInteraction(interaction) {
    return fetch(
      url + "/users/" +
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
    )
      .then((response) => {
        return response.status;
      })
      .then((data) => {
        interaction.id = data.id;
        return interaction;
      });
  }

  putInteraction(interaction) {
    return fetch(
      url + "/users/" +
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
    )
      .then((response) => {
        return response.status;
      })
      .then((data) => {
        return data;
      });
  }

  deleteInteraction(interaction) {
    return fetch(
      url + "/users/" +
        interaction.user_id +
        "/interactions/" +
        interaction.blog_post_id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.status;
      })
      .then((data) => {
        return data;
      });
  }
}
