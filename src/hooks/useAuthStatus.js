import { useEffect, useState, useRef } from "react";
// Firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const isMounted = useRef(true); // For mounting issues - cleanup

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();

      // If a user is found logged in, set setLoggedIn to true
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        // If no user found, set setLoggedIn to false
        setCheckingStatus(false);
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return { loggedIn, checkingStatus };
};

export default useAuthStatus;
