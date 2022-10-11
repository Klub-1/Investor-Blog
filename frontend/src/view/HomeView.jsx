import React from "react";
import { BlogPost } from "../components/BlogPost";
import { BlogPostData } from "../Data/TestData/BlogPostData";

export const HomeView = () => {
  return (
    <div className="flex flex-col items-center justify-center overflow-y-scroll">
      {BlogPostData.map((post) => (
        <BlogPost {...post} />
      ))}
    </div>
  );
};
