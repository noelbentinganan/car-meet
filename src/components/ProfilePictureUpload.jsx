import { useState } from "react";
// firebase imports
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";

const ProfilePictureUpload = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState();
  const [profilePic, setProfilePic] = useState("");

  const auth = getAuth();
  const storage = getStorage();

  // onChange fn
  const onChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // handleSubmit fn
  const handleSubmit = () => {
    // if no image, discontinue fn
    if (!image) return;

    const storageRef = ref(storage, `profilePicture/${auth.currentUser.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setProfilePic(downloadURL);

        // Update Firebase Auth Profile
        await updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        });

        console.log("Profile Picture Updated:", downloadURL);
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={onChange} />
      <button onClick={handleSubmit}>Upload</button>
      {progress > 0 && <p>Uploading: {progress.toFixed(2)}%</p>}
      {profilePic && <img src={profilePic} alt="Profile" width="100" />}
    </div>
  );
};

export default ProfilePictureUpload;
