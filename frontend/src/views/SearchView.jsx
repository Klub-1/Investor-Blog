import React from "react";
import BlogPost from "../components/BlogPost";
import BlogPostStore from "../stores/BlogPostStore";
import { observer } from "mobx-react-lite";

export const SearchView = observer(() => {
  const filterPosts = (e) => {
    const searchFor = e.target.value;

    BlogPostStore.setFilterValue(searchFor);
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
        {BlogPostStore.filteredBlogPosts.map((post) => (
          <BlogPost key={post.id + Math.random()} post={post} />
        ))}
      </div>
    </div>
  );
});
