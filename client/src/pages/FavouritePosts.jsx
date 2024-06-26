import PostItem from "../featues/posts/PostItem";
import Spinner from "../ui/Spinner";
import { useGetMarkPosts } from "../featues/posts/useGetMarkPosts";

function FavouritePosts() {
  const postIDS = JSON.parse(localStorage.getItem("mark"));
  const { isLoading, data } = useGetMarkPosts(postIDS);

  if (isLoading) return <Spinner />;
  const { data: posts } = data;

  return (
    <div className="w-full">
      {posts.length > 0 ? (
        <ul className="grid grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostItem key={post.title} post={post} />
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center pt-60 text-2xl font-semibold text-neutral-500">You have no save post!</div>
      )}
    </div>
  );
}

export default FavouritePosts;
