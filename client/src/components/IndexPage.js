import React, { useEffect } from "react";

const IndexPage = (props) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      props.history.push("/home");
    } else {
      props.history.push("/login");
    }
    // eslint-disable-next-line
  }, [0]);
  return <div></div>;
};

export default IndexPage;
