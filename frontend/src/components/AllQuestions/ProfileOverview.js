import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import "../../App.css";
import profileImage from "../../images/smiling-minato.jpg";
import moment from "moment";
import axios from "axios";

function ProfileOverview(props) {
  const [displayName, setDisplayName] = useState(null);
  const [reputation, setReputation] = useState(null);

  let date = new Date(props.question.modifiedDate);
 
  let today = moment(date, "MMMM Do, YYYY @ h:mm:ss").fromNow();

  useEffect(() => {
    axios
      .get("/user/profile", {
        params: { userID: props.question.askedByUserID },
      })
      .then((response) => {
        setDisplayName(response.data.displayName);
        setReputation(response.data.reputation);
      });
  }, []);

  return (
    <>
      <Row>
        <p style={{ textAlign: "right", color: "black" }}>
          <img
            src={profileImage}
            style={{ height: "20px", width: "20px" }}
          ></img>{" "}
          <a href="#" id="link">
            {displayName}
          </a>{" "}
          <p style={{ fontWeight: "bold", display: "inline" }}>
            {reputation} &emsp; asked {today}
          </p>
        </p>
      </Row>
    </>
  );
}

export default ProfileOverview;
