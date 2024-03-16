import { useState } from "react";
import { useFilter } from "../context/FilterContext";

function Tag({ children, value }) {
  const [active, setActive] = useState(false);
  const { handleFilter } = useFilter();

  function handleClick() {
    setActive((active) => !active);
    handleFilter(value);
  }

  return (
    <div>
      <span
        onClick={handleClick}
        htmlFor={value}
        className={`bg-emerald-500 py-1 px-2 rounded-md cursor-pointer transition-all hover:bg-emerald-600 shadow-[0_1px_3px_rgba(0,0,0,0.2)] ${
          active ? "ring ring-emerald-300" : ""
        }`}
      >
        {children}
      </span>
    </div>
  );
}

export default Tag;
