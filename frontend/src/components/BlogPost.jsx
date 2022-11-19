import { observer } from "mobx-react-lite";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../App";

import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";

import { FiArrowRight } from "react-icons/fi";

import { MdOutlineAddComment, MdAddComment } from "react-icons/md";
import { AuthHandler } from "../Auth/AuthHandler";

const BlogPost = observer(({ post }) => {
  const store = useContext(StoreContext);

  const [addComment, setAddComment] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  return (
    <div className="h-fit w-full  shadow rounded-lg bg-white mb-5 md:mb-10">
      <div className="p-5">
        <div className="md:flex md:justify-between">
          <div>
            <h1 className="font-bold text-2xl md:text-4xl">{post.title}</h1>
            <h1 className="text-base">By {post.user_id}</h1>
          </div>

          <div className="flex gap-3 md:gap-4 pt-4 md:pt-0 justify-center">
            <div className="justify-center content-center text-center">
              <button
                className="text-2xl md:text-5xl"
                onClick={() => {
                  setLike(!like);
                  setDislike(false);
                }}
              >
                {like ? (
                  <AiFillLike className="text-[#7382D9]" />
                ) : (
                  <AiOutlineLike />
                )}
              </button>

              <h1>{0}</h1>
            </div>

            <div className="justify-center content-center text-center">
              <button
                className="text-2xl md:text-5xl"
                onClick={() => {
                  setLike(false);
                  setDislike(!dislike);
                }}
              >
                {dislike ? (
                  <AiFillDislike className="text-[#FF82A0]" />
                ) : (
                  <AiOutlineDislike />
                )}
              </button>

              <h1>{0}</h1>
            </div>

            <div className="justify-center content-center text-center">
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

              <h1>{post.comments.length}</h1>
            </div>
          </div>
        </div>

        <div className="pb-5 text-2xl">{post.content}</div>

        <h1 className="font-bold text-1xl md:text-2xl">{post.tags}</h1>
      </div>
      {addComment ? <AddComment post={post} /> : null}
      <CommentSection comments={post.comments} />
    </div>
  );
});

const AddComment = ({ post }) => {
  const [comment, setComment] = useState("");

  const store = useContext(StoreContext);

  function postComment() {
    store.createComment(post.id, comment);
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
  const auth = new AuthHandler();
  const id = auth.getToken();
  return (
    <div>
      <div className="h-2 w-full bg-[#EFF2F9]" />
      {comments.length > 0 && (
        <div className="pb-5">
          {comments.map((data) => (
            <div
              key={data.id}
              className={`px-5 pt-5 ${
                data.user_id === id ? "text-right" : "text-left"
              }`}
            >
              <h1 className="text-xl">{data.comment}</h1>
              <h1 className="text-base">By {data.user_id}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPost;
