import { useState, useEffect } from "react";
// firebase imports
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import ProfilePictureUpload from "../components/ProfilePictureUpload";

const UserProfile = () => {
  const auth = getAuth(); // <-- Initialize getAuth() to get the currentUser

  const [changeDetails, setChangeDetails] = useState(false);
  const [userData, setUserData] = useState(null);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName.split(" ")[0],
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
  }, [auth.currentUser.uid]);

  // onChange fn
  const onChange = () => {};

  return (
    <div>
      <h1>Please complete your profile</h1>
      <div>
        <ProfilePictureUpload />
        <form>
          <input
            type="text"
            id="name"
            disabled={changeDetails}
            value={name}
            onChange={onChange}
          />
          <input
            type="text"
            id="address"
            disabled={changeDetails}
            value={userData?.address || ""}
            onChange={onChange}
          />
          <p>{userData?.address}</p>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
