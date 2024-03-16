import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const email = useSelector((state) => state.user.email) || false;

  return email ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;
