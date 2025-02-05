import { useState } from "react";
import { Link } from "react-router-dom";
// firebase imports
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  // onChange fn
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  // onSubmit fn
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Initialize getAuth
      const auth = getAuth();

      // 2. Use sendPasswordResetEmail fn - combine auth + email
      await sendPasswordResetEmail(auth, email);
      console.log(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
        />

        <Link to="/sign-in">Sign In Instead</Link>

        <button>Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
