import { FaBookmark } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { useState } from "react";

import { useCreateComment } from "./useCreateComment";
import { useMark } from "../../context/MarkContext";
import FillButton from "../../ui/FillButton";
import StarRating from "../../ui/StarRating";
import PostRating from "../../ui/PostRating";
import PostImage from "../../ui/PostImage";
import Spinner from "../../ui/Spinner";
import Comment from "../../ui/Comment";
import { usePost } from "./usePost";

const COMMENT_LENGTH = 400;

function Post() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { email, role, id } = useSelector((state) => state.user);
  const { isLoading, data } = usePost();
  const { handleSubmit } = useForm();
  const { isCreating, createComment } = useCreateComment();
  const { markList, updateMarkList } = useMark();

  if (isLoading) return <Spinner />;

  const post = data.data;
  const defaultImage = post.imageCover.startsWith("imageCover");
  const mark = markList.map((item) => post._id === item._id);

  function onSubmit() {
    createComment({ averageRating: rating, comment, postId: post._id });
  }

  return (
    <div>
      <div>
        <PostImage
          defaultImage={defaultImage}
          imageCover={post.imageCover}
          styles="h-[600px] rounded mx-auto mb-10"
        />
      </div>

      <div className="py-3 px-40">
        <div className="flex justify-between items-center w-[97%] border-t border-neutral-700 pt-3">
          <div className="flex gap-3">
            <h1 className="uppercase text-3xl bg-gradient-to-b from-emerald-600 to-emerald-500 inline-block text-transparent bg-clip-text font-semibold">
              {post.title}
            </h1>
            <PostRating size={20} color="rgb(5, 150, 105)" maxRating={5} defaultRating={post.averageRating} />
          </div>

          <FaBookmark
            onClick={() => updateMarkList(post._id)}
            className={`text-xl cursor-pointer ${
              mark ? "text-emerald-500" : "text-neutral-500"
            } hover:text-emerald-400 transition-all`}
          />
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.description }} className="my-5 post-content"></div>

        {email ? (
          !post.comments.find((comment) => comment.userId._id === id) ? (
            role !== "admin" && (
              <div className="border border-emerald-700 rounded p-3 mt-16">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex items-center gap-2 text-neutral-400 ml-1 mb-3">
                    <p>Rating:</p>
                    <StarRating size={20} color="rgb(5, 150, 105)" maxRating={5} onSetRating={setRating} />
                  </div>

                  <textarea
                    maxLength={COMMENT_LENGTH}
                    className="rounded bg-neutral-700 w-full placeholder:text-neutral-500 p-2 focus:outline-none focus:ring-[1px] focus:ring-emerald-700"
                    rows="4"
                    placeholder="Write a comment..."
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 ml-2">
                      {COMMENT_LENGTH - comment.length} characters remains
                    </span>

                    <FillButton type="submit" buttonStyles="ml-auto mt-5 px-8">
                      {isCreating ? "Sending..." : "Send"}
                    </FillButton>
                  </div>
                </Form>
              </div>
            )
          ) : (
            <p className="text-xl text-emerald-600 mt-10">Your already wrote a comment for this post!</p>
          )
        ) : (
          <p className="text-xl text-emerald-600 mt-10">Please login to leave a comment!</p>
        )}

        {post.comments.length > 0 && (
          <Comment>
            <Comment.Header>Comments</Comment.Header>
            <Comment.List
              comments={post.comments}
              render={(comment) => <Comment.Item comment={comment} key={comment._id} />}
            />
          </Comment>
        )}
      </div>
    </div>
  );
}

export default Post;
