import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

function FilterProvider({ children }) {
  const [filterField, setFilterField] = useState([]);

  function handleFilter(filterItem) {
    if (filterField.includes(filterItem))
      setFilterField((prev) => prev.filter((item) => item.toLowerCase() !== filterItem.toLowerCase()));
    else setFilterField((prev) => [...prev, filterItem]);
  }

  return <FilterContext.Provider value={{ filterField, handleFilter }}>{children}</FilterContext.Provider>;
}

function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) throw new Error("FilterProvider is used outside of the provider!");
  return context;
}

export { FilterProvider, useFilter };
