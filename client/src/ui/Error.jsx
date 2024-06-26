import { useRouteError } from "react-router-dom";

function Error({ errorMsg }) {
  const errors = useRouteError();

  console.error(errors);

  const error = errorMsg || errors.data || errors.message;

  return (
    <div className="bg-neutral-900/90 h-screen text-white text-2xl flex items-center justify-center">
      <div className="p-5 shadow-md bg-neutral-900 rounded-sm inline-flex items-center justify-center gap-5 w-[50%]">
        <span>💥</span>
        <h2>{error}</h2>
        <span>💥</span>
      </div>
    </div>
  );
}

export default Error;
