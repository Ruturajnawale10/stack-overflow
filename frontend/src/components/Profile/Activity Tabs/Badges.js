//This tab handles editing the user's profile information
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import gold from "../../../images/gold.jpg";
import silver from "../../../images/silver.png";
import bronze from "../../../images/bronze.png";

function BadgesTab(props) {
  const [profile, setProfile] = useState([]);
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [notOwnerID, setNotOwnerID] = useState(
    localStorage.getItem("notOwnerID")
  );
  const [tags, setTags] = useState([]);
  const [scores, setScores] = useState({});
  useEffect(() => {
    var data;
    var data1;
    var myTags = [];
    var myScores = {};
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
          .post("/user/profile/tags/scores", { data1, myTags })
          .then((response) => {
            if (response) {
              setScores(response.data);
              myScores = response.data;
            } else {
              console.log("Error calculating  scores");
            }
          });
      } else {
        console.log("Error getting tags");
      }
    });
    axios.get("/user/profile", { params: data }).then((response) => {
      if (response) {
        console.log(response.data);
        setProfile(response.data);
      } else {
        console.log("Error retrieving questions");
      }
    });
  }, []);
  if (Object.keys(scores).length > 0) {
    return (
      <div>
        <h4>{Object.keys(scores).length} Badges</h4>
        <div class="container p-3 border">
          {Object.entries(scores).map(([key, value]) => {
            if (value > 20) {
              return (
                <div>
                  <div class="row">
                    <div class="col-sm-3">
                      <button
                        class="my-2 px-2 py-1 col-sm-auto tagblock"
                        style={{
                          color: "#39739D",
                          fontWeight: "450",
                          backgroundColor: "#E1ECF4",
                        }}
                      >
                        <img src={gold} style={{ blockSize: "10px" }}></img>{" "}
                        {key}
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else if (value > 10 && value <= 20) {
              return (
                <div>
                  <div class="row">
                    <div class="col-sm-3">
                      <button
                        class="my-2 px-2 py-1 col-sm-auto tagblock"
                        style={{
                          color: "#39739D",
                          fontWeight: "450",
                          backgroundColor: "#E1ECF4",
                        }}
                      >
                        <img src={silver} style={{ blockSize: "10px" }}></img>{" "}
                        {key}
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div>
                  <div class="row">
                    <div class="col-sm-3">
                      <button
                        class="my-2 px-2 py-1 col-sm-auto tagblock"
                        style={{
                          color: "#39739D",
                          fontWeight: "450",
                          backgroundColor: "#E1ECF4",
                        }}
                      >
                        <img src={bronze} style={{ blockSize: "10px" }}></img>{" "}
                        {key}
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div class="container p-4 border">User has not earned any badges</div>
    );
  }
}

export default BadgesTab;
