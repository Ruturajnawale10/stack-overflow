import React, { useState, useEffect } from "react";
import "../../App.css";

function OnlineUsers(props) {

  return(
    <a href="#" class="list-group-item list-group-item-action border-0">
    <div class="badge bg-success float-right">5</div>
    <div class="d-flex align-items-start">
      <img src="https://bootdey.com/img/Content/avatar/avatar5.png" class="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40"></img>
      <div class="flex-grow-1 ml-3">
        Vanessa Tucker
        <div class="small"><span class="fas fa-circle chat-online"></span> Online</div>
      </div>
    </div>
  </a>
  )
}

export default OnlineUsers;
