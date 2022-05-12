import React, { useState, useEffect } from "react";
import ProfileOverview from "./ProfileOverview";
import CommentCard from "./CommentCard";
import "../../App.css";
//import Tag from "./Tag";
function AnswerCard(props) {




  return (
    <div class="chat-message-right pb-4">
    <div>
     
      {props.item.fromUser}
      <div class="text-muted small text-nowrap mt-2">  {props.item.createdAt}</div>
    </div>
    <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
     
      {props.item.content}
    </div>
  </div>
  );
}

export default AnswerCard;
