import React, { useState, useEffect } from "react";
import ProfileOverview from "./ProfileOverview";
import CommentCard from "./CommentCard";
import "../../App.css";
//import Tag from "./Tag";
function AnswerCard(props) {
  let [tick, setTick] = useState(null);
  const [profile, setProfile] = useState(null);
  const [comment, setComment] = useState(null);
  const [tags, setTags] = useState(null);
  let isAccepted = true;
  let tagnames = props.item.tags;



  return (
    <div class="chat-message-right pb-4">
    <div>
      <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"></img>
      <div class="text-muted small text-nowrap mt-2">2:33 am</div>
    </div>
    <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
      <div class="font-weight-bold mb-1">You</div>
      Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
    </div>
  </div>
  );
}

export default AnswerCard;
