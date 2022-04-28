import React, { useState, useEffect } from "react";
import "../../App.css";
import profileImage from "../../images/smiling-minato.jpg";
import gold from "../../images/gold.jpg";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";

function ProfileOverview(props) {
  let date = new Date().toLocaleDateString();
  //pass question date here along with user data
  let name = "Tyrone Slothrop";
  let reputation = 36000;
  let goldBadges = 3;
  let silverBadges = 15;
  let bronzeBadges = 8;

  return (
    <div class="userblockforallquestions">
      <div class="container">

        <div class="row">
          <div class="col-md-3">
            <img src={profileImage} style={{ blockSize: "50px" }}></img>
          </div>
          <div class="col-md-3" id="reputation">
          <a href="#" id="link">{name}</a>
            </div>
            <div class="col-md-3" id="reputation">
                {reputation}
            </div>
            <div class="col-md-3" style={{height:"28px"}}>
            <p style={{textAlign:"right", color:"black"}}>asked {date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileOverview;
