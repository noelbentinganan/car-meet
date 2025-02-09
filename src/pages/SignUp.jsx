import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// firebase imports
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import GoogleOAuth from "../components/GoogleOAuth";

const SignUp = () => {
  // User form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
  });
  const { firstName, lastName, address, email, password } = formData;

  const navigate = useNavigate();

  // onChange fn
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // onSubmit fn
  const onSubmit = async (e) => {
    e.preventDefault();

    // const data = { ...formData }; // For testing - get the data that has been input to email and password
    // console.log(data);

    try {
      // Initialize getAuth fn
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ! For database needs
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: firstName,
      });

      // Save to firestore process:
      // 1.
      const formDataCopy = { ...formData }; // Copy all formData
      delete formDataCopy.password; // Remove the password so that it will not save to firestore
      formDataCopy.timestamp = serverTimestamp(); // Add timestamp property to formDataCopy object and use serverTimestamp

      // 2.
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      console.log(formDataCopy);

      navigate("/user-profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Form
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="First name"
          id="firstName"
          value={firstName}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Last name"
          id="lastName"
          value={lastName}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Address"
          id="address"
          value={address}
          onChange={onChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={onChange}
        />

        <button>Sign Up</button>
      </form>
      <GoogleOAuth />
    </div>
  );
};

export default SignUp;
