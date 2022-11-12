import React, { useState, useEffect } from "react";
import { BlogPost } from "../components/BlogPost";

export const SearchView = () => {
  const [blogs, setBlogs] = useState([]);
  const [tempBlogs, setTempBlogs] = useState([]);

  function getBlogPosts() {
    fetch("http://localhost:8000/blogposts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setBlogs(data);
        setTempBlogs(data);
      });
  }

  useEffect(() => {
    getBlogPosts();
  }, []);

  const filterPosts = (e) => {
    const searchFor = e.target.value.toLowerCase();

    if (searchFor.length !== 0) {
      // We have something to search for
      const filteredBlogsBody = tempBlogs.filter((blog) => {
        // Filter every body in lowercase to easier match
        return blog.content.toLowerCase().includes(searchFor);
      });
      setBlogs(filteredBlogsBody);
    } else {
      // Reset blog posts
      setBlogs(tempBlogs);
    }
  };

  return (
    <div>
      {/*  -----------Search Bar content ----------- */}

      <div className="h-fit w-full shadow rounded-lg bg-white mb-5 md:mb-10 p-3">
        <div className="h-4/6 flex justify-center items-center p-3">
          <h1 className="font-bold text-2xl md:text-4xl">Search for a post</h1>
        </div>
        <div className="flex justify-center">
          <p className="text-gray-700 text-base mb-4">
            Search by text in the description.
          </p>
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 mb-3"
            id="SearchInputField"
            onChange={filterPosts}
            placeholder="Søg..."
          />
        </div>
      </div>
      {/*  -----------Sorted blog posts ----------- */}
      <div className="flex flex-col items-center justify-center overflow-y-scroll">
        {blogs.map((post) => (
          <BlogPost key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};
