import { useSearch } from "../context/SearchContext";

function Search() {
  const { setQuery } = useSearch();

  return (
    <input
      type="text"
      className="text-xs placeholder:text-neutral-400 text-neutral-300 font-medium rounded-md w-64 focus:shadow-md bg-neutral-700 focus:border-none focus:outline-none focus:ring-1 focus:ring-neutral-500 border-none p-3"
      placeholder="Search post title..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
