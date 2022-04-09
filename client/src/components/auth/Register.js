import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerAuth } from "../../store/actions/userAuthActions";

const Register = ({ setCurrentUser }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated");
      // navigate("/home");
    } else {
      // navigate("/login");
    }
  }, []);
  return (
    <div>
      <h1>Register</h1>
      <Link to="/login"> Login to Boyler Social</Link>
    </div>
  );
};

export default Register;
