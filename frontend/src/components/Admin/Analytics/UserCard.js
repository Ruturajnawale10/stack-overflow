import React, { useState, useEffect } from "react";
import "../../../App.css";
function UserCard(props) {
  var handleUserPage = (e) => {
    localStorage.setItem("notOwnerID", props.user._id);
  };

  return (
    <div>
      <div class="row" style={{ marginTop: "10px" }}>
        <div class="col-md-1" style={{ marginTop: "10px", marginLeft: "20px" }}>
          <h4>{props.index + 1}</h4>
        </div>
        <div class="col-md-8" style={{ marginTop: "10px" }}>
          <h4>
            <a
              href="/profile"
              onClick={handleUserPage}
              value={props.user._id}
              id="link"
            >
              {props.user.displayName}
            </a>
            <div class="col-md-8">
              {" "}
              <h6>{props.user.location}</h6>
            </div>
          </h4>
        </div>
        <div class="col-md-2" style={{ marginTop: "10px" }}>
          <h4 style={{ fontWeight: "bold" }}>{props.user.reputation}</h4>
        </div>
      </div>
      <hr class="solid" />
    </div>
  );
}

export default UserCard;
