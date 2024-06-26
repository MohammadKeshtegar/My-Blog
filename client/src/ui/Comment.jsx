import { createContext } from "react";

const CommentContext = createContext();

function Comment({ children }) {
  return (
    <CommentContext.Provider value={{}}>
      <div className="bg-neutral-800 my-5 mx-2 rounded p-2">{children}</div>
    </CommentContext.Provider>
  );
}

function CommentHeader({ children }) {
  return <h2 className="text-xl font-semibold mb-3 ml-1">{children}</h2>;
}

function CommentList({ comments, render }) {
  return <ul>{comments.map(render)}</ul>;
}

function CommentItem({ comment }) {
  return (
    <li className="bg-neutral-700 rounded-sm my-2 py-2 px-3">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 ">
          <img
            src={comment.userId.photo.includes("default") ? "/default-user.png" : `http://127.0.0.1:3000/images/users/${comment?.userId?.photo}`}
            alt="user"
            className="h-9 rounded-full"
          />
          <div>
            <h3 className="text-neutral-400 capitalize">
              {comment.userId.name} ({comment.userRating})
            </h3>
          </div>
        </div>

        <span className="text-neutral-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="text-neutral-300">{comment.content}</p>
    </li>
  );
}

Comment.Header = CommentHeader;
Comment.List = CommentList;
Comment.Item = CommentItem;

export default Comment;
