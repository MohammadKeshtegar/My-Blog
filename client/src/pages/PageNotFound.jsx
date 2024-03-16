import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <div className="py-40 text-center bg-neutral-800 h-screen text-white">
      <h1 className="text-3xl">This page does not exist 😢</h1>
      <button
        onClick={handleClick}
        className="text-emerald-500 hover:text-emerald-600 hover:underline text-xl mt-3"
      >
        &larr; Back
      </button>
    </div>
  );
}

export default PageNotFound;
