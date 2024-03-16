import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  return <SearchContext.Provider value={{ query, setQuery }}>{children}</SearchContext.Provider>;
}

function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) throw new Error("SearchContext is used outside of the provider!");
  return context;
}

export { useSearch, SearchProvider };
