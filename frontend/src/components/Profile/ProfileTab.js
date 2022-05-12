//This tab includes about, Badges, Top Tags, Posts, stats(reputation),
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import gold from "../../images/gold.jpg";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";

function ProfileTab(props) {
  const [profile, setProfile] = useState([]);
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [notOwnerID, setNotOwnerID] = useState(
    localStorage.getItem("notOwnerID")
  );
  const [tags, setTags] = useState([]);
  const [scores, setScores] = useState({});
  const [askedNum, setAsked] = useState(0);
  const [answeredNum, setAnswered] = useState(0);
  const [reachNum, setReach] = useState(0);
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
    axios
      .get("/user/profile/questions/asked", { params: data })
      .then((response) => {
        if (response) {
          console.log(response.data);
          setAsked(response.data);
        } else {
          console.log("Error retrieving total questions");
        }
      });
    axios
      .get("/user/profile/questions/answered", { params: data })
      .then((response) => {
        if (response) {
          console.log(response.data);
          setAnswered(response.data);
        } else {
          console.log("Error retrieving total answers");
        }
      });
    axios
      .get("/user/profile/questions/reach", { params: data })
      .then((response) => {
        if (response) {
          console.log(response.data);
          setReach(response.data);
        } else {
          console.log("Error retrieving reach");
        }
      });
  }, []);
  return (
    <div>
      <h4>Stats</h4>
      <div class="container p-3 border">
        <div class="row">
          <div class="col-sm-3">{profile.reputation} reputation</div>
          <div class="col-sm-3">{reachNum} reached</div>
          <div class="col-sm-3">{answeredNum} answers</div>
          <div class="col-sm-3">{askedNum} questions</div>
        </div>
      </div>
      <h4>About</h4>
      <div class="container p-3 border">
        {!profile.aboutMe && (
          <p style={{ textAlign: "center" }}>
            About me section is currently blank for this user
          </p>
        )}
        <p>{profile.aboutMe}</p>
      </div>
      <h4>Badges</h4>
      <div class="container p-3 border"></div>
      <h4>Top Tags</h4>
      <div class="container p-3 border">
        {Object.keys(scores).length === 0 && (
          <div>User has not participated in any tags</div>
        )}
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
                      {key}
                    </button>
                  </div>

                  <div class="col-sm-3">
                    <img src={gold} style={{ blockSize: "10px" }}></img>
                  </div>
                  <div class="col-sm-3"></div>
                  <div class="col-sm-3" style={{ textAlign: "center" }}>
                    {value} score
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
                      {key}
                    </button>
                  </div>

                  <div class="col-sm-3">
                    <img src={silver} style={{ blockSize: "10px" }}></img>
                  </div>
                  <div class="col-sm-3"></div>
                  <div class="col-sm-3" style={{ textAlign: "center" }}>
                    {value} score
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
                      {key}
                    </button>
                  </div>

                  <div class="col-sm-3">
                    <img src={bronze} style={{ blockSize: "10px" }}></img>
                  </div>
                  <div class="col-sm-3"></div>
                  <div class="col-sm-3" style={{ textAlign: "center" }}>
                    {value} score
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default ProfileTab;
