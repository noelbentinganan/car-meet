import { useLocation, useNavigate } from "react-router-dom";
// firebase imports
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

const GoogleOAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    // Initialize resources
    const auth = getAuth();
    // Instatiate GoogleAuthProvider fn
    const provider = new GoogleAuthProvider();

    // Result
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    // Validation
    // Continue hereeeee
  };
  return (
    <div>
      <p>Sign in with {location.pathname === "/sign-up" ? "up" : "in"}</p>
      <button onClick={onGoogleClick}>Google Btn</button>
    </div>
  );
};

export default GoogleOAuth;
