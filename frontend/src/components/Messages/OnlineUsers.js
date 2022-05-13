import React, { useState, useEffect } from "react";
import "../../App.css";

function OnlineUsers(props) {

  //console.log("inside onlineusers")
 // console.log(props)
 //console.log(props.item.displayName)
 // console.log("inside onlineusers")
  return(
    <a href="#" class="list-group-item list-group-item-action border-0">
    <div class="badge bg-success float-right"></div>
    <div class="d-flex align-items-start">
    
      <img src= {props.item.profileImageName} class="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40"></img>
      <div class="flex-grow-1 ml-3">
       {props.item.displayName}
        <div class="small"><span class="fas fa-circle chat-online"></span> </div>
      </div>
    </div>
  </a>
  )
}

export default OnlineUsers;
