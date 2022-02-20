import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("sean94@gmail.com");
  const [password, setPassword] = useState("Seancal123");

  const loginUser = () => {
    console.log(email, password);
  };

  const checkLoginDetails = (e) => {
    console.log(e);

    e.preventDefault();

    const errors = [];

    if (email.length === 0) {
      errors.push("Please enter a email.");
    }

    if (password.length === 0) {
      errors.push("Please enter a password.");
    }
    if (errors.length === 0) {
      // information passes client side validation, send to server

      // alert('log in info has been validated and is being sent to server');
      loginUser();
    } else {
      // set and display errors
      // setValidationErrors(errors);
      console.log(errors);
    }
  };

  return (
    <div>
      <h1>Login to Boyler Social</h1>

      <Link to="/register"> Register for Boyler Social</Link>

      <input
        className=""
        type="text"
        name="email"
        placeholder="email or email"
        value={email}
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="input__sign-in"
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="btn btn-fill" onClick={checkLoginDetails}>
        Log in
      </button>
    </div>
  );
};

export default Login;
