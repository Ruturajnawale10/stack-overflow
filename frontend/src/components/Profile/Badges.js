//This tab handles editing the user's profile information
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import bronzeBadgeLogo from "../../images/bronzeBadgeLogo.jpg";
import silverBadgeLogo from "../../images/silverBadgeLogo.jpg";
import goldBadgeLogo from "../../images/goldBadgeLogo.jpg";
import gold from "../../images/gold.jpg";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";
function Badges(props) {
  const [profile, setProfile] = useState([]);
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [notOwnerID, setNotOwnerID] = useState(
    localStorage.getItem("notOwnerID")
  );
  const [bronzeNum, setBronzeNum] = useState(0);
  const [silverNum, setSilverNum] = useState(0);
  const [goldNum, setGoldNum] = useState(0);

  const [tags, setTags] = useState([]);
  const [bronzeBadges, setBronzeBadges] = useState([]);
  const [silverBadges, setSilverBadges] = useState([]);
  const [goldBadges, setGoldBadges] = useState([]);
  useEffect(() => {
    var data;
    var data1;
    var myTags = [];

    if (notOwnerID.length == 0) {
      data = {
        userID,
      };
    } else if (userID == notOwnerID) {
      data = {
        userID,
      };
    } else {
      data = {
        userID: localStorage.getItem("notOwnerID"),
      };
    }

    data1 = data;

    axios.post("/user/profile/tags", data).then((response) => {
      if (response) {
        setTags(response.data);
        myTags = response.data;
        axios
          .post("/user/profile/bronze/total", { data1, myTags })
          .then((response) => {
            if (response) {
              setBronzeNum(response.data);
            } else {
              console.log("Error getting Bronze Scores");
            }
          });
      } else {
        console.log("Error getting tags");
      }
    });
    axios.post("/user/profile/tags", data).then((response) => {
      if (response) {
        setTags(response.data);
        myTags = response.data;
        axios
          .post("/user/profile/silver/total", { data1, myTags })
          .then((response) => {
            if (response) {
              setSilverNum(response.data);
            } else {
              console.log("Error getting Silver scores");
            }
          });
      } else {
        console.log("Error getting tags");
      }
    });
    axios.post("/user/profile/tags", data).then((response) => {
      if (response) {
        setTags(response.data);
        myTags = response.data;
        axios
          .post("/user/profile/gold/total", { data1, myTags })
          .then((response) => {
            if (response) {
              setGoldNum(response.data);
            } else {
              console.log("Error getting Gold scores");
            }
          });
      } else {
        console.log("Error getting tags");
      }
    });
    axios.post("/user/profile/tags", data).then((response) => {
      if (response) {
        setTags(response.data);
        myTags = response.data;
        axios
          .post("/user/profile/top/bronze/badges", { data1, myTags })
          .then((response) => {
            if (response) {
              setBronzeBadges(response.data);
            } else {
              console.log("Error getting Bronze Badges");
            }
          });
      } else {
        console.log("Error getting tags");
      }
    });
    axios.post("/user/profile/tags", data).then((response) => {
      if (response) {
        setTags(response.data);
        myTags = response.data;
        axios
          .post("/user/profile/top/silver/badges", { data1, myTags })
          .then((response) => {
            if (response) {
              setSilverBadges(response.data);
            } else {
              console.log("Error getting silver Badges");
            }
          });
      } else {
        console.log("Error getting tags");
      }
    });
    axios.post("/user/profile/tags", data).then((response) => {
      if (response) {
        setTags(response.data);
        myTags = response.data;
        axios
          .post("/user/profile/top/gold/badges", { data1, myTags })
          .then((response) => {
            if (response) {
              setGoldBadges(response.data);
            } else {
              console.log("Error getting Gold Badges");
            }
          });
      } else {
        console.log("Error getting tags");
      }
    });
  }, []);
  return (
    <div class="row">
      <div class="col-sm-4">
        <div class="container p-3 border">
          <img
            src={goldBadgeLogo}
            style={{ height: "50px", width: "50px" }}
          ></img>
          {goldNum} gold badges
          <div class="col-sm-4">
            {goldBadges.map(function (val, index) {
              return (
                <a
                  href={"/tags/" + val}
                  class="btn my-2 px-2 py-1 col-sm-auto"
                  rel="tag"
                  role="button"
                  style={{
                    color: "#39739D",
                    fontWeight: "450",
                    backgroundColor: "#E1ECF4",
                  }}
                >
                  <img src={gold} style={{ blockSize: "10px" }}></img> {val}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="container p-3 border">
          <img
            src={silverBadgeLogo}
            style={{ height: "50px", width: "50px" }}
          ></img>
          {silverNum} silver badges
          <div class="col-sm-4">
            {silverBadges.map(function (val, index) {
              return (
                <a
                  href={"/tags/" + val}
                  class="btn my-2 px-2 py-1 col-sm-auto"
                  rel="tag"
                  role="button"
                  style={{
                    color: "#39739D",
                    fontWeight: "450",
                    backgroundColor: "#E1ECF4",
                  }}
                >
                  <img src={silver} style={{ blockSize: "10px" }}></img> {val}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="container p-3 border">
          <img
            src={bronzeBadgeLogo}
            style={{ height: "50px", width: "50px" }}
          ></img>
          {bronzeNum} bronze badges
          <div class="col-sm-4">
            {bronzeBadges.map(function (val, index) {
              return (
                <a
                  href={"/tags/" + val}
                  class="btn my-2 px-2 py-1 col-sm-auto"
                  rel="tag"
                  role="button"
                  style={{
                    color: "#39739D",
                    fontWeight: "450",
                    backgroundColor: "#E1ECF4",
                  }}
                >
                  <img src={bronze} style={{ blockSize: "10px" }}></img> {val}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Badges;
