import { Link } from "react-router-dom";

import { usePosts } from "../featues/posts/usePosts";
import PostCard from "../featues/posts/PostCard";
import FillButton from "../ui/FillButton";
import Spinner from "../ui/Spinner";

function Home() {
  const { isLoading, data } = usePosts();

  if (isLoading) return <Spinner />;

  const posts = data.data.slice(0, 6);

  return (
    <div className="px-32">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to My blog</h1>
        <p>You can find useful content about Javascript, html, css, React, Nodejs and Djanog here.</p>
      </div>

      <div>
        <h3 className="text-left text-2xl font-semibold mb-7">The newest posts</h3>

        <div className="grid grid-cols-3 gap-10">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        {posts.length > 6 && (
          <div className="w-full my-16 flex justify-center">
            <Link to="/posts" className="">
              <FillButton>See all posts</FillButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
