import React, { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import profileImage from "../../images/smiling-minato.jpg";
import moment from 'moment';

import {FaCircle} from 'react-icons/fa';
import gold from "../../images/gold.jpg";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";


function ProfileOverview({userID, date}) {
  const [displayName, setDisplayName] = useState(null);
  const [reputation, setReputation] = useState(null);
  const [goldBadges, setGoldBadges] = useState(null);
  const [silverBadges, setSilverBadges] = useState(null);
  const [bronzeBadges, setBronzeBadges] = useState(null);

  var handleUserPage = (e) => {
    e.preventDefault();
    console.log("made it here");
    console.log("made it here");
    const eTarget = e.currentTarget.value;
    console.log(eTarget)
    localStorage.setItem("notOwnerID", userID);
    window.location = "/profile";
  }

  useEffect(() => {
    axios
      .get("/user/profile", {
        params: { userID: userID },
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
      <div class="my-1 container">
        <div class="row">
          <div class="col-md-12" style={{ height: "28px" }}>
            <p style={{ textAlign: "left", color: "#8f9294" }}>asked {moment(date).format('MMMM Do YYYY, h:mm:ss a')}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <img src={profileImage} style={{ blockSize: "50px" }}></img>
          
          </div>
          <div class="col-md-9">
            <div class="row text-start">
              <a href="/profile" onClick={handleUserPage} value={userID} id="link">
                {displayName}
              </a>
            </div>
            <div class="row">
              <div class="col-md-3" id="reputation">
                {reputation}
              </div>
              <div class="col-md-3">
                <FaCircle className="mx-1" size={10} style={{color: "gold"}}/>
                {goldBadges}
              </div>
              <div class="col-md-3">
                <FaCircle className="mx-1" size={10} style={{color: "silver"}}/>
                {silverBadges}
              </div>
              <div class="col-md-3">
                <FaCircle className="mx-1" size={10} style={{color: "peru"}}/>
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
