import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../App.css";
import profileImage from "../../images/smiling-minato.jpg";
import ProfileTab from "./ProfileTab";
import { Tab, Tabs } from "react-bootstrap";
import SettingsTab from "./Settings";
import ActivityTab from "./ActivityTab";
import moment from "moment";
function ProfileOverview(props) {
  const [key, setKey] = useState("profile");
  const [tags, setTags] = useState([]);
  const [scores, setScores] = useState([]);
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [profile, setProfile] = useState([]);
  const [notOwnerID, setNotOwnerID] = useState(
    localStorage.getItem("notOwnerID")
  );
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
    axios.get("/user/profile", { params: data }).then((response) => {
      if (response) {
        setProfile(response.data);
      } else {
        console.log("Error retrieving profile");
      }
    });

    async function fetchData() {
      data1 = data;
      const request = await axios
        .post("/user/profile/tags", data)
        .then((response) => {
          if (response) {
            setTags(response.data);
            myTags = response.data;
            axios
              .post("/user/profile/tags/scores", { data1, myTags })
              .then((response) => {
                if (response) {
                  setScores(response.data);
                  myScores = response.data;
                  axios
                    .post("/user/profile/update/badges", { data1, myScores })
                    .then((response) => {
                      if (response) {
                        console.log(response.data);
                      } else {
                        console.log("Error retrieving profile");
                      }
                    });
                } else {
                  console.log("Error calculating  scores");
                }
              });
          } else {
            console.log("Error getting tags");
          }
        });
      console.log(request);
    }
    fetchData();
  }, []);
  if (userID == notOwnerID) {
    return (
      <div>
        <div class="row" style={{ height: "144px", width: "800px" }}>
          <div class="col-md-1">
            <img
              src={profile.profileImageName}
              style={{ height: "128px", width: "128px" }}
            ></img>
          </div>
          <div
            class="col-md-3"
            style={{
              height: "70x",
              width: "400px",
              marginLeft: "80px",
            }}
          >
            <p style={{ fontSize: "32px", margin: "4px; 4px; 12px" }}>
              {profile.displayName}
            </p>
            <p style={{ fontSize: "13px", margin: "0px", color: "#6A737C" }}>
              Member since {moment(profile.joiningDate, "YYYYMMDD").fromNow()}
            </p>
            <p style={{ fontSize: "13px", margin: "0px", color: "#6A737C" }}>
              Last seen {moment(profile.lastSeen, "YYYYMMDD").fromNow()}
            </p>
            <p style={{ fontSize: "13px", margin: "0px", color: "#6A737C" }}>
              {profile.location}
            </p>
          </div>
        </div>
        <div class="row">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            variant="pills"
          >
            <Tab eventKey="profile" title="Profile">
              <ProfileTab />
            </Tab>
            <Tab eventKey="activity" title="Activity">
              <ActivityTab />
            </Tab>
            <Tab eventKey="settings" title="Settings">
              <SettingsTab />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div class="row" style={{ height: "144px", width: "800px" }}>
          <div class="col-md-1">
            <img
              src={profile.profileImageName}
              style={{ height: "128px", width: "128px" }}
            ></img>
          </div>
          <div
            class="col-md-3"
            style={{
              height: "70x",
              width: "400px",
              marginLeft: "80px",
            }}
          >
            <p style={{ fontSize: "32px", margin: "4px; 4px; 12px" }}>
              {profile.displayName}
            </p>
            <p style={{ fontSize: "13px", margin: "0px", color: "#6A737C" }}>
              Member since {moment(profile.joiningDate, "YYYYMMDD").fromNow()}
            </p>
            <p style={{ fontSize: "13px", margin: "0px", color: "#6A737C" }}>
              Last seen {moment(profile.lastSeen, "YYYYMMDD").fromNow()}
            </p>
            <p style={{ fontSize: "13px", margin: "0px", color: "#6A737C" }}>
              {profile.location}
            </p>
          </div>
        </div>
        <div class="row">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            variant="pills"
          >
            <Tab eventKey="profile" title="Profile">
              <ProfileTab />
            </Tab>
            <Tab eventKey="activity" title="Activity">
              <ActivityTab />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default ProfileOverview;
