import { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
// firebase imports
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import GoogleOAuth from "../components/GoogleOAuth";
import useAuthStatus from "../hooks/useAuthStatus";

const SignIn = () => {
  // formData
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const { loggedIn, checkingStatus } = useAuthStatus();

  const navigate = useNavigate();

  // Redirect user to homepage if already logged in
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  });

  // onChange fn
  // 1. This will target the input values
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // onSubmit fn
  const onSubmit = async (e) => {
    e.preventDefault();

    // const data = { email, password }; // For testing - get the data that has been input to email and password
    // console.log(data);

    try {
      const auth = getAuth(); // <-- Initialize getAuth() to get the currentUser

      // Get the user and password - This will now create a new user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Validation
      if (userCredential.user) {
        console.log(userCredential.user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
        />

        <Link to="/forgot-password">Forgot Password</Link>
        <button>Sign In</button>
      </form>
      <Link to="/sign-up" className="registerLink">
        Sign Up Instead
      </Link>

      <GoogleOAuth />
    </>
  );
};

export default SignIn;
