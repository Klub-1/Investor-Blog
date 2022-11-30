import { observer } from "mobx-react-lite";
import React from "react";
import { useState } from "react";
import AuthStore from "../stores/AuthStore";

import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";

import { FiArrowRight } from "react-icons/fi";

import { MdOutlineAddComment, MdAddComment } from "react-icons/md";

const BlogPost = observer(({ post }) => {
  const [addComment, setAddComment] = useState(false);

  return (
    <div className="h-fit w-full  shadow rounded-lg bg-white mb-5 md:mb-10">
      <div className="p-5">
        <div className="z-auto md:flex md:justify-between">
          <div>
            <h1 className="font-bold text-2xl md:text-4xl">{post.title}</h1>
            <h1 className="text-base">Slået op af {post.username}</h1>
          </div>

          <div className="flex gap-3 md:gap-4 pt-4 md:pt-0 justify-center">
            <div className="justify-center content-center text-center">
              {AuthStore.isAuth ? (
                <button
                  className="text-2xl md:text-5xl"
                  onClick={() => {
                    post.registerInteraction(0);
                  }}
                >
                  {post.userLiked() ? (
                    <AiFillLike className="text-[#C5C8D9]" />
                  ) : (
                    <AiOutlineLike className="hover:text-[#C5C8D9]" />
                  )}
                </button>
              ) : (
                <button className="text-2xl md:text-5xl" disabled={true}>
                  <AiOutlineLike />
                </button>
              )}

              <h1>{post.getLikeCount()}</h1>
            </div>

            <div className="justify-center content-center text-center">
              {AuthStore.isAuth ? (
                <button
                  className="text-2xl md:text-5xl"
                  onClick={() => {
                    post.registerInteraction(1);
                  }}
                >
                  {post.userDisliked() ? (
                    <AiFillDislike className="text-[#C5C8D9]" />
                  ) : (
                    <AiOutlineDislike className="hover:text-[#C5C8D9]" />
                  )}
                </button>
              ) : (
                <button className="text-2xl md:text-5xl" disabled={true}>
                  <AiOutlineDislike />
                </button>
              )}

              <h1>{post.getDislikeCount()}</h1>
            </div>

            <div className="justify-center content-center text-center">
              {AuthStore.isAuth ? (
                <button
                  className="text-2xl md:text-5xl"
                  onClick={() => setAddComment(!addComment)}
                >
                  {addComment ? (
                    <MdAddComment className="text-[#7382D9]" />
                  ) : (
                    <MdOutlineAddComment className="hover:text-[#7382D9]" />
                  )}
                </button>
              ) : (
                <button className="text-2xl md:text-5xl" disabled={true}>
                  <MdOutlineAddComment />
                </button>
              )}

              <h1>{post.commentsCount()}</h1>
            </div>
          </div>
        </div>

        <div className="pb-5 text-2xl">{post.content}</div>

        <h1 className="font-semibold text-sm md:text-1xl">{post.tags}</h1>
      </div>
      {addComment ? <AddComment post={post} /> : null}
      <CommentSection comments={post.comments} />
    </div>
  );
});

const AddComment = ({ post }) => {
  const [comment, setComment] = useState("");

  function postComment() {
    post.createComment(comment);
    setComment("");
  }

  return (
    <div>
      <div className="h-2 w-full bg-[#EFF2F9]" />
      <div className="p-3 flex">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
          placeholder="Kommmentar"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="text-white bg-[#7382D9] hover:bg-[#7382D9] font-medium rounded-lg text-sm w-auto ml-1 px-5 py-2.5 text-center"
          onClick={() => postComment()}
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
      {comments.length > 0 ? (
        <div>
          <div>{showComments ? <Comments comments={comments} /> : null}</div>
          <button
            className="w-full h-1/4 bg-[#7382D9] rounded-b-lg text-white p-2 font-extrabold text-xl"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments
              ? comments.length === 1
                ? "Skjul kommentar"
                : "Skjul kommentarer"
              : comments.length === 1
              ? "Vis kommentar"
              : "Vis kommentarer"}
          </button>
        </div>
      ) : null}
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
            <div
              key={data.id}
              className={`px-5 pt-5 ${
                data.comment_from_user ? "text-right" : "text-left"
              }`}
            >
              <h1 className="text-xl">{data.comment}</h1>
              <h1 className="text-base">Slået op af {data.username}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPost;
