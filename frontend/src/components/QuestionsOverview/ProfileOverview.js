import React, { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import profileImage from "../../images/smiling-minato.jpg";
import gold from "../../images/gold.jpg";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";

function ProfileOverview(props) {
  const [displayName, setDisplayName] = useState(null);
  const [reputation, setReputation] = useState(null);
  const [goldBadges, setGoldBadges] = useState(null);
  const [silverBadges, setSilverBadges] = useState(null);
  const [bronzeBadges, setBronzeBadges] = useState(null);

  // todo: fetch and set proper asked qyestion/answer date
  let date = new Date(props.date).toLocaleDateString();

  useEffect(() => {
    axios
      .get("/user/profile", {
        params: { userID: props.userID },
      })
      .then((response) => {
        setDisplayName(response.data.displayName);
        setReputation(response.data.reputation);
        setGoldBadges(response.data.goldBadges.length);
        setSilverBadges(response.data.silverBadges.length);
        setBronzeBadges(response.data.bronzeBadges.length);
      });
  }, []);

  return (
    <div class="userblock">
      <div class="container">
        <div class="row">
          <div class="col-md-12" style={{ height: "28px" }}>
            <p style={{ textAlign: "left", color: "#8f9294" }}>{date}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <img src={profileImage} style={{ blockSize: "50px" }}></img>
          </div>
          <div class="col-md-9">
            <div class="row">
              <a href="#" id="link">
                {displayName}
              </a>
            </div>
            <div class="row">
              <div class="col-md-3" id="reputation">
                {reputation}
              </div>
              <div class="col-md-3">
                <img src={gold} style={{ blockSize: "10px" }}></img>
                {goldBadges}
              </div>
              <div class="col-md-3">
                <img src={silver} style={{ blockSize: "10px" }}></img>
                {silverBadges}
              </div>
              <div class="col-md-3">
                <img src={bronze} style={{ blockSize: "10px" }}></img>
                {bronzeBadges}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileOverview;
