import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function LoggedInRedirect({ children }) {
  let location = useLocation();
  let { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  else {
    return children;
 }
}
