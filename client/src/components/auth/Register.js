import React from "react";
import { Link } from "react-router-dom";
const Register = ({ setCurrentUser }) => {
  return (
    <div>
      <h1>Register</h1>
      <Link to="/login"> Login to Boyler Social</Link>
    </div>
  );
};

export default Register;
