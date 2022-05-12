import React, { useState, useEffect } from "react";
import ProfileOverview from "./ProfileOverview";
import CommentCard from "./CommentCard";
import "../../App.css";
//import Tag from "./Tag";
function MyMessage(props) {




  return (
    <div class="chat-message-right pb-4">
    <div>
      <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"></img>
     You
      <div class="text-muted small text-nowrap mt-2">  {props.item.createdAt}</div>
    </div>
    <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
     
      {props.item.content}
    </div>
  </div>
  );
}

export default MyMessage;
