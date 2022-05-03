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
    <div class="userblock">
      <div class="container">
        <div class="row">
          <div class="col-md-12" style={{height:"28px"}}>
            <p style={{textAlign:"left", color:"#8f9294"}}>afsdasfd {date}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <img src={profileImage} style={{ blockSize: "50px" }}></img>
          </div>
          <div class="col-md-9">
            <div class="row">
              <a href="#" id="link">{name}</a>
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
              {silverBadges}</div>
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
