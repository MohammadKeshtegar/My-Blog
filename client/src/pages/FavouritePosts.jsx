import PostItem from "../featues/posts/PostItem";

function FavouritePosts() {
  const posts = localStorage.getItem("mark");
  const postsObj = JSON.parse(posts);

  return (
    <div className="w-full">
      <ul className="grid grid-cols-3 gap-8">
        {postsObj.map((post) => (
          <PostItem key={post.title} post={post} />
        ))}
      </ul>
    </div>
  );
}

export default FavouritePosts;
