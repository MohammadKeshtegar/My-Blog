import PostCard from "./PostCard";

function PostItem({ post }) {
  return (
    <li>
      <PostCard post={post} />
    </li>
  );
}

export default PostItem;
