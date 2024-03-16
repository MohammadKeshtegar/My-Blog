import { useFilter } from "../../context/FilterContext";
import { usePosts } from "./usePosts";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import PostItem from "./PostItem";
import Tags from "../../ui/Tags";
import { useSearch } from "../../context/SearchContext";

function Posts() {
  const { isLoading, data, error } = usePosts();
  const { filterField } = useFilter();
  const { query } = useSearch();

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMsg={error} />;

  let posts = data.data;

  if (filterField.length > 0)
    posts = posts.filter((post) => filterField.includes(post.category.toLowerCase()));

  if (query) posts = posts.filter((post) => post.title.includes(query));

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-semibold text-2xl">All posts</h1>

        <div className="flex gap-2">
          <Tags />
        </div>
      </div>

      <div className="w-full">
        <ul className="grid grid-cols-4 gap-8">
          {posts.map((post) => (
            <PostItem key={post.title} post={post} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Posts;
