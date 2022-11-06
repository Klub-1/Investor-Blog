import React from "react";
import { useState } from "react";

import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";

import { FiArrowRight } from "react-icons/fi";

import { MdOutlineAddComment, MdAddComment } from "react-icons/md";

export const BlogPost = (post) => {
  const [addComment, setAddComment] = useState(false);
  const [liked, setLiked] = useState(post.liked);
  const [disliked, setDisLiked] = useState(post.disliked);
  return (
          <div className="h-fit w-full  shadow rounded-lg bg-white mb-5 md:mb-10">
      <div className="p-5">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl md:text-4xl">{post.title}</h1>

          <div className="flex gap-3 md:gap-4">
            <button
              className="text-2xl md:text-5xl"
              onClick={() => setLiked(!liked)}
            >
              {liked ? (
                <AiFillLike className="text-[#7382D9]" />
              ) : (
                <AiOutlineLike />
              )}
            </button>

            <button
              className="text-2xl md:text-5xl"
              onClick={() => setDisLiked(!disliked)}
            >
              {disliked ? (
                <AiFillDislike className="text-[#FF82A0]" />
              ) : (
                <AiOutlineDislike />
              )}
            </button>

            <button
              className="text-2xl md:text-5xl"
              onClick={() => setAddComment(!addComment)}
            >
              {addComment ? (
                <MdAddComment className="text-[#FF82A0]" />
              ) : (
                <MdOutlineAddComment />
              )}
            </button>
          </div>
        </div>
        <h1 className="text-base">By {post.author}</h1>

        <div className="pt-5 text-2xl">{post.body}</div>
      </div>
      {addComment ? <AddComment /> : null}
      <CommentSection comments={post.comments} />
    </div>
  );
};

const AddComment = () => {
  return (
    <div>
      <div className="h-2 w-full bg-[#EFF2F9]" />
      <div className="p-3 flex">
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
          placeholder="Kommmentar"
        />
        <button
          type="submit"
          class="text-white bg-[#7382D9] hover:bg-[#7382D9] font-medium rounded-lg text-sm w-auto ml-1 px-5 py-2.5 text-center"
        >
          <FiArrowRight className="text-white" />
        </button>
      </div>
    </div>
  );
};

const CommentSection = ({ comments }) => {
  const [showComments, setShowComments] = useState(false);
  return (
    <div>
      <div>{showComments ? <Comments comments={comments} /> : null}</div>
      <button
        className="w-full h-1/4 bg-[#7382D9] rounded-b-lg text-white p-2 font-extrabold text-xl"
        onClick={() => setShowComments(!showComments)}
      >
        {showComments ? "Skjul kommentarer" : "Se kommentarer"}
      </button>
    </div>
  );
};

const Comments = ({ comments }) => {
  return (
    <div>
      <div className="h-2 w-full bg-[#EFF2F9]" />
      {comments.length > 0 && (
        <div className="pb-5">
          {comments.map((data) => (
            <div className="px-5 pt-5">
              <h1 className="text-xl">{data.comment}</h1>
              <h1 className="text-base">By {data.name}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
