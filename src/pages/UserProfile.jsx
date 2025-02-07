import { useState, useEffect } from "react";
// firebase imports
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const UserProfile = () => {
  // Get the current logged in user
  const auth = getAuth();

  const [changeDetails, setChangeDetails] = useState(false);
  const [userData, setUserData] = useState(null);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  // Get user data from firestore
  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setUserData(docSnap.data());
      }
    };

    fetchUser();
  }, []);

  // onChange fn
  const onChange = () => {};

  return (
    <div>
      <h1>Please complete your profile</h1>
      <div>
        <form>
          <input
            type="text"
            id="name"
            disabled={!changeDetails}
            value={name}
            onChange={onChange}
          />
          <p>{userData.lastName}</p>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
