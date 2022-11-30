import React from "react";
import { useState } from "react";
import BlogPostStore from "../stores/BlogPostStore";
import { useNavigate } from "react-router-dom";

const AddView = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();

  function postDataToBackend() {
    if (title === "" || content === "") {
      return;
    }

    BlogPostStore.createBlogPost(title, content, tags);

    setTitle("");
    setContent("");
    setTags("");

    // SOURCE: https://stackoverflow.com/a/31079244
    navigate("/");
  }

  return (
    <div className="h-fit w-full shadow rounded-lg bg-white mb-5 md:mb-10">
      <div className="p-3">
        <h1 className="w-full text-center font-bold text-2xl md:text-4xl mb-6 mt-3">
          Her kan du oprette et nyt indlæg!
        </h1>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 mb-3"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          rows={8}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
          placeholder="Indlæg"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 mt-3"
          placeholder="Tags (F.eks.: APPL, Positivt, Køb)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button
        className="w-full h-1/4 bg-[#7382D9] rounded-b-lg text-white p-2 font-extrabold text-xl"
        onClick={() => postDataToBackend()}
      >
        Opret indlæg
      </button>
    </div>
  );
};

export default AddView;
