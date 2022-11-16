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
        console.log(response);
        return response.json();
      })
      .then((data) => {
        return data;
      });
  }
}
