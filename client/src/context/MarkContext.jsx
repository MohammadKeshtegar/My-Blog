import { createContext, useContext, useEffect, useState } from "react";

const MarkContext = createContext();

function MarkProvider({ children }) {
  const [markList, setMarkList] = useState(function () {
    const storeMarks = localStorage.getItem("mark");
    return storeMarks ? JSON.parse(storeMarks) : [];
  });

  useEffect(
    function () {
      localStorage.setItem("mark", JSON.stringify(markList));
    },
    [markList]
  );

  function updateMarkList(mark) {
    if (markList.find((item) => mark === item)) {
      setMarkList((markList) => markList.filter((markItem) => markItem !== mark));
    } else {
      setMarkList((markList) => [...markList, mark]);
    }
  }

  return <MarkContext.Provider value={{ markList, updateMarkList }}>{children}</MarkContext.Provider>;
}

function useMark() {
  const context = useContext(MarkContext);
  if (context === undefined) throw new Error("MarkContext is used outside of the provider");
  return context;
}

export { useMark, MarkProvider };
