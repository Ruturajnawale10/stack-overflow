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
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [profile, setProfile] = useState([]);
  const [notOwnerID, setNotOwnerID] = useState(
    localStorage.getItem("notOwnerID")
  );
  useEffect(() => {
    var data;
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
  }, []);
  if (userID == notOwnerID) {
    return (
      <div>
        <div class="row" style={{ height: "144px", width: "800px" }}>
          <div class="col-md-1">
            <img
              src={profileImage}
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
              src={profileImage}
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
