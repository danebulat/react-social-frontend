import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function RequireAuth({ children }) {
  let location = useLocation();
  let { user } = useContext(AuthContext);

  //runs on page refresh, check if user is in local storage
  if (!user) {
    const storedUser = localStorage.getItem("currentUser");
    if (!user) {
      //no user in local storage
      return <Navigate to="/register" state={{ from: location }} replace />;
    }
    else {
      //user found in local storage
      return children;
    }
  } else {
    //user set in auth context
    return children;
  }
}
