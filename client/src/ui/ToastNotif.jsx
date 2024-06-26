import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastNotif() {
  return <ToastContainer position="top-right" hideProgressBar={false} closeOnClick={true} theme="dark" pauseOnHover={false} />;
}

export default ToastNotif;
