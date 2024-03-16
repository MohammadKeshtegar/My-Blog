import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectFromAuth() {
  const email = useSelector((state) => state.user?.email) || false;

  return email ? <Navigate to="/" /> : <Outlet />;
}

export default ProtectFromAuth;
