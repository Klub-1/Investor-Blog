export class API {
  url = "http://localhost:8000";

  getBlogPosts() {
    return fetch("http://localhost:8000/blogposts/", {
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
    return fetch("http://localhost:8000/users/" + user_id + "/blogposts/", {
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
      "http://localhost:8000/users/" + user_id + "/comments/" + blog_post_id,
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
}
