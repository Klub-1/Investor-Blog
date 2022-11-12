import React from "react";
import { useEffect, useState } from "react";

import { BlogPost } from "../components/BlogPost";

export const HomeView = () => {
  const [blogposts, setBlogposts] = useState([]);

  function getBlogPosts() {
    fetch("http://localhost:8000/blogposts/", {
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
        setBlogposts(data);
      });
  }

  useEffect(() => {
    getBlogPosts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center overflow-y-scroll">
      {blogposts.map((post) => (
        <BlogPost key={post.id} {...post} />
      ))}
    </div>
  );
};
