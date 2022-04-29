import React, { useState, useEffect } from "react";
import ProfileOverview from "./ProfileOverview";
import CommentCard from "./CommentCard";
import "../../App.css";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { MdOutlineHistory } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function AnswerCard(props) {
  let [tick, setTick] = useState(null);
  const [profile, setProfile] = useState(null);
  const [comment, setComment] = useState(null);
  let userID = "mock_user_id_123";

  let noVote = "#a9acb0";
  let vote = "darkorange";
  const [voteUpStatus, setVoteUpStatus] = useState(noVote);
  const [voteDownStatus, setVoteDownStatus] = useState(noVote);

  let isAccepted = true;

  useEffect(() => {
    if (isAccepted) {
      setTick(
        <div class="row">
          <FaCheck size={35} fill="darkgreen" />
        </div>
      );
    }
    setProfile(<ProfileOverview />);
    setComment(
      <div class="row">
        {props.answer.comments.map((comment) => (
          <div key={comment} id="commentcard">
            <CommentCard comment={comment} />
          </div>
        ))}
      </div>
    );
  }, []);

  const changeVoteUpStatus = (e) => {
    if (voteUpStatus === noVote) {
      setVoteUpStatus(vote);
      if (voteDownStatus === vote) {
        setVoteDownStatus(noVote);
      }
    } else {
      setVoteUpStatus(noVote);
    }
  };

  const changeVoteDownStatus = (e) => {
    if (voteDownStatus === noVote) {
      setVoteDownStatus(vote);
      if (voteUpStatus === vote) {
        setVoteUpStatus(noVote);
      }
    } else {
      setVoteDownStatus(noVote);
    }
  };

  return (
    <div>
      <div class="container">
        <div class="row" style={{ marginTop: "10px" }}>
          <div class="col-md-1" style={{ marginTop: "10px" }}>
            <div
              class="row"
              onClick={() => {
                changeVoteUpStatus();
              }}
            >
              <TiArrowSortedUp size={60} fill={voteUpStatus} />
            </div>

            <div class="row">
              <p id="vote">0</p>
            </div>

            <div
              class="row"
              onClick={() => {
                changeVoteDownStatus();
              }}
            >
              <TiArrowSortedDown size={60} fill={voteDownStatus} />
            </div>

            {tick}

            <div class="row">
              <MdOutlineHistory
                size={39}
                fill="#a9acb0"
                style={{ marginTop: "10px" }}
              />
            </div>
          </div>
          <div
            class="col-md-10"
            style={{ marginTop: "10px", marginLeft: "20px" }}
          >
            <p>{props.answer.description}</p>

            <div class="row" style={{ marginTop: "30px", marginLeft: "65%" }}>
              {profile}
            </div>

            <div class="row" style={{ marginTop: "10px" }}>
              <p>{comment}</p>
            </div>
          </div>
        </div>
        <hr class="solid" />
      </div>
    </div>
  );
}

export default AnswerCard;
