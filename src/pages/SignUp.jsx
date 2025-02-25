import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
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
    password1: "",
  });
  const { firstName, lastName, address, email, password, password1 } = formData;

  const { loggedIn, checkingStatus } = useAuthStatus();

  // Redirect user to homepage if already logged in
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  });

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

      // Password validation
      if (password !== password1) {
        console.log("Password does not match.");
      } else {
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
        delete formDataCopy.password && delete formDataCopy.password1; // Remove the password so that it will not save to firestore
        formDataCopy.timestamp = serverTimestamp(); // Add timestamp property to formDataCopy object and use serverTimestamp

        // 2.
        await setDoc(doc(db, "users", user.uid), formDataCopy);

        console.log(formDataCopy);

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <section className="signup-form container-m signup-form-m">
        <p className="text-md text-600 my-3">User Information</p>
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
          <input
            type="password"
            placeholder="Confirm password"
            id="password1"
            value={password1}
            onChange={onChange}
          />

          {password !== password1 ? (
            <p className="alert">Password does not match, please try again.</p>
          ) : (
            ""
          )}

          <button className="signup-btn">Sign Up</button>
        </form>

        <p className="text-xs text-600">Or</p>
        <GoogleOAuth />
        <p className="text-xs">
          Already have an account?{" "}
          <Link className="a-link" to="/sign-in">
            Sign In
          </Link>
        </p>
      </section>
    </div>
  );
};

export default SignUp;
