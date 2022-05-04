import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  var [redirectVar, setRedirectVar] = useState(null);
  let navigate = useNavigate();

  axios.defaults.headers.common["authorization"] =
    localStorage.getItem("token");
  localStorage.removeItem("token");
  localStorage.removeItem("userID");
  axios
    .post("/user/logout")
    .then((response) => {
        console.log("Ohhho  ", response)
      setRedirectVar(navigate("/", { replace: true }, {}));
    });

  return <div>{redirectVar}1111</div>;
}

export default Logout;
