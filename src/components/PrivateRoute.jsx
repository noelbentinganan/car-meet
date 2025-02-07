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
  // This will check if a user will go to an unauthorized url, this will redirect them to the /sign-in page
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
