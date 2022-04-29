import React, { useState, useEffect } from "react";
import axios from "axios";
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
  let userID = "626798764096f05e749e8de8";
  let questionID = "62679caa6a5ff0b364718083";

  let noVote = "#a9acb0";
  let vote = "darkorange";
  const [voteUpStatus, setVoteUpStatus] = useState(noVote);
  const [voteDownStatus, setVoteDownStatus] = useState(noVote);
  const [voteCount, setVoteCount] = useState(0);

  let isAccepted = true;

  useEffect(() => {
    setVoteCount(props.answer.upVotes.length - props.answer.downVotes.length);
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

    axios
      .get("/vote/answer/status", {
        params: {
          questionID: questionID,
          userID: userID,
          answerID: props.answer._id,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data === "UPVOTE") {
            setVoteUpStatus(vote);
          } else if (response.data === "DOWNVOTE") {
            setVoteDownStatus(vote);
          }
        }
      });
  }, []);

  const changeVoteUpStatus = (e) => {
    if (voteUpStatus === noVote) {
      setVoteUpStatus(vote);
      setVoteCount(voteCount + 1);
      axios.post("/vote/answer/upvote", {
        questionID: props.answer.questionID,
        userID: userID,
        answerID: props.answer._id,
      });
      if (voteDownStatus === vote) {
        setVoteDownStatus(noVote);
        setVoteCount(voteCount + 2);
        axios.post("/vote/answer/removedownvote", {
          questionID: props.answer.questionID,
          userID: userID,
          answerID: props.answer._id,
        });
      }
    } else {
      setVoteUpStatus(noVote);
      setVoteCount(voteCount - 1);
      axios.post("/vote/answer/removeupvote", {
        questionID: props.answer.questionID,
        userID: userID,
        answerID: props.answer._id,
      });
    }
  };

  const changeVoteDownStatus = (e) => {
    if (voteDownStatus === noVote) {
      setVoteDownStatus(vote);
      setVoteCount(voteCount - 1);
      axios.post("/vote/answer/downvote", {
        questionID: props.answer.questionID,
        userID: userID,
        answerID: props.answer._id,
      });
      if (voteUpStatus === vote) {
        setVoteUpStatus(noVote);
        setVoteCount(voteCount - 2);
        axios.post("/vote/answer/removeupvote", {
          questionID: props.answer.questionID,
          userID: userID,
          answerID: props.answer._id,
        });
      }
    } else {
      setVoteDownStatus(noVote);
      setVoteCount(voteCount + 1);
      axios.post("/vote/answer/removedownvote", {
        questionID: props.answer.questionID,
        userID: userID,
        answerID: props.answer._id,
      });
    }
  };

  return (
    <div>
      <div class="container">
        <div class="row" style={{ marginTop: "10px" }}>
          {props.answer.description}
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
              <p id="vote"> {voteCount} </p>
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
