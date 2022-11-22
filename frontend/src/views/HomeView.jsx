import React from "react";
import { observer } from "mobx-react-lite";

import BlogPost from "../components/BlogPost";
import BlogPostStore from "../stores/BlogPostStore";

const HomeView = () => {
  return (
    <div className="flex flex-col items-center justify-center overflow-y-scroll">
      {BlogPostStore.blogposts.map((post) => (
        <BlogPost key={post.id + Math.random()} post={post} />
      ))}
    </div>
  );
};

export default observer(HomeView);
