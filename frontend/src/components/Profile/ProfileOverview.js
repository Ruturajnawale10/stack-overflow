import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../App.css";
import profileImage from "../../images/smiling-minato.jpg";
import ProfileTab from "./ProfileTab";
import { Tab, Tabs } from "react-bootstrap";
import SettingsTab from "./Settings";
import ActivityTab from "./ActivityTab";

function ProfileOverview(props) {
  const [user, setUser] = useState(null);
  const [key, setKey] = useState("profile");
  const emailID = "user1@gmail.com";
  useEffect(() => {
    //fetch user profile
    //axios.get("/user/profile", {
    // params: user
    //})
  }, []);
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
          <p style={{ fontSize: "32px", margin: "4px; 4px; 12px" }}>UserName</p>
          <p style={{ fontSize: "13px", margin: "0px", color: "#6A737C" }}>
            Member for 10 months
          </p>
          <p style={{ fontSize: "13px", margin: "0px", color: "#6A737C" }}>
            Last seen this week
          </p>
          <p style={{ fontSize: "13px", margin: "0px", color: "#6A737C" }}>
            San Jose
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
}

export default ProfileOverview;
