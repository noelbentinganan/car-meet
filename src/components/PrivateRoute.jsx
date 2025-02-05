import { Navigate, Outlet } from "react-router-dom";

// Custom hook
import useAuthStatus from "../hooks/useAuthStatus";

const PrivateRoute = () => {
  // Check loggednIn, checkingStatus from useAuthStatus hook
  const { loggedIn, checkingStatus } = useAuthStatus();

  // If checkingStatus is true, show Checking Status...
  if (checkingStatus) {
    return <div>Checking Status...</div>;
  }

  // If loggedIn is true, go to Outlet, else direct the user to /sign-in
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
