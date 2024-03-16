import { Link } from "react-router-dom";
import FillButton from "../../ui/FillButton";

function PasswordEmail() {
  return (
    <div className="bg-neutral-700 text-neutral-200 w-3/4 rounded-sm mx-auto mt-20 p-4">
      <h2 className="text-neutral-100 mb-5">Hello user!</h2>

      <p>Forgot your password? Submit a PATCH requeest with your password and confirmPassword to:</p>
      <p>http://127.0.0.1:3000/email</p>

      <a>
        {/* <FillButton buttonStyles="px-5 my-5">Reset your password</FillButton> */}
        <button
          className={`bg-emerald-500 hover:bg-emerald-400 transition-all py-2 rounded-sm text-white border-none focus:ring focus:ring-emerald-300 focus:border-none hover:shadow-md disabled:opacity-50 px-5 my-5`}
          type="button"
        >
          Reset your password
        </button>
      </a>

      <p>If your didn't forgot your password please ignore this email!</p>
    </div>
  );
}

export default PasswordEmail;
