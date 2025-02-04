import { useState } from "react";
// firebase imports

const SignIn = () => {
  // formData
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  // onChange fn
  // 1. This will target the input values
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // onSubmit fn
  const onSubmit = (e) => {
    e.preventDefault();

    // const data = { email, password }; // For testing - get the data that has been input to email and password
    // console.log(data);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          onChange={onChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={onChange}
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default SignIn;
