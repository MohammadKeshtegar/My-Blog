import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useMark } from "../../context/MarkContext";
import PostImage from "../../ui/PostImage";

function PostCard({ post }) {
  const defaultImage = post.imageCover.startsWith("imageCover");
  const postCategory = post.category.split("-");
  const { markList, updateMarkList } = useMark();
  const mark = markList.find((markItem) => markItem._id === post._id);

  return (
    <div className="bg-neutral-700/30 w-80 hover:ring-1 hover:ring-neutral-500 rounded-md overflow-hidden shadow-md hover:scale-105 hover:shadow-lg transition-all hover:cursor-pointer relative group">
      <Link to={`/post/${post.slug}`}>
        <div className={defaultImage ? "" : "brightness-[.6]"}>
          <PostImage defaultImage={defaultImage} imageCover={post.imageCover} styles="w-full h-44" />
        </div>

        <div className="p-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl capitalize font-semibold text-left flex flex-wrap items-center gap-2">
              {post.title}{" "}
              <span className="text-neutral-500 text-xs lowercase">
                ({post.averageRating} / {post.averageQuantity} rating)
              </span>
            </h2>
            <div className="flex gap-1">
              {postCategory.map((category) => (
                <span className="text-[10px] tracking-wider bg-emerald-500/50 text-emerald-300 rounded-xl uppercase py-1 px-2">{category}</span>
              ))}
            </div>
          </div>

          <p className="text-xs text-left text-wrap mb-3 text-neutral-500 font-semibold">{post.shortDescription}</p>
        </div>
      </Link>
      <div
        onClick={() => updateMarkList(post)}
        className={`absolute left-0 p-1.5 rounded-ee text-xl ${
          mark ? "text-emerald-500" : ""
        } bg-neutral-500 -top-full transition-all group-hover:top-0 hover:text-emerald-400`}
      >
        <FaBookmark />
      </div>
    </div>
  );
}

export default PostCard;
