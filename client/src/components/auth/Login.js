import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAuth } from "../../store/actions/userAuthActions";

const Login = ({ setCurrentUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("sean94@gmail.com");
  const [password, setPassword] = useState("Seancal123");

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

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
      dispatch(loginAuth(email, password));
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
