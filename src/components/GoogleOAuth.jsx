import { useLocation, useNavigate } from "react-router-dom";
// firebase imports
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

const GoogleOAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      // Initialize resources
      const auth = getAuth();
      // Instatiate GoogleAuthProvider fn
      const provider = new GoogleAuthProvider();

      // Result
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // Validation - if the snap doest exist or the user does not exist - then, CREATE google user
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate("/edit-profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>
        Sign {location.pathname === "/sign-up" ? "up" : "in"} with{" "}
        <button onClick={onGoogleClick}>Google</button>
      </p>
    </div>
  );
};

export default GoogleOAuth;
