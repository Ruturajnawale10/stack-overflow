import React, { useState, useEffect } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import "../../App.css";
import profileImage from "../../images/smiling-minato.jpg";
import gold from "../../images/gold.jpg";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";

function ProfileOverview(props) {
  let date = new Date("06/30/2019");
  let date2 = new Date();
  let today = date2 - date;
  //pass question date here along with user data
  let name = "Tyrone Slothrop";
  let reputation = 36000;
  let goldBadges = 3;
  let silverBadges = 15;
  let bronzeBadges = 8;
  console.log("inside profile overview")
  console.log(props)
  console.log("inside profile overview")
  
  return (
    <>
        <Row>
          <p style={{textAlign:"right", color:"black"}}>
            <img src={profileImage} style={{ height: "20px", width: "20px" }}></img> <a href="#" id="link">{name}</a> <strong>{reputation} </strong> asked {date.toLocaleDateString()}
          

          </p>
        </Row>
    </>
  );
}

export default ProfileOverview;
