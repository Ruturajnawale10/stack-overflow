import React, { useState, useEffect } from "react";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";
import ProfileOverview from "./ProfileOverview";
import CommentCard from "./CommentCard";
import AddCommentAnswer from "./AddCommentAnswer";
import "../../App.css";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { MdOutlineHistory } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function AnswerCard(props) {
  let [tick, setTick] = useState(null);
  const [profile, setProfile] = useState(null);
  const [comment, setComment] = useState(null);
  const [commentSection, setCommentSection] = useState(null);
  let userID = localStorage.getItem("userID");

  let noVote = "#a9acb0";
  let vote = "darkorange";
  const [voteUpStatus, setVoteUpStatus] = useState(noVote);
  const [voteDownStatus, setVoteDownStatus] = useState(noVote);
  const [voteCount, setVoteCount] = useState(0);
  let acceptedAnswerBtn = null;

  let isAccepted = false;
  if (
    props.answer.acceptedAnswerID !== null &&
    props.answer.acceptedAnswerID === props.answer._id
  ) {
    isAccepted = true;
  }

  const addAsAccepted = (e) => {
    axios.post("/question/answer/addaccepted", {
      questionID: props.answer.questionID,
      answerID: props.answer._id,
      userID: props.answer.userID,
      acceptedAnswerID: props.answer.acceptedAnswerID,
    });
    window.location.reload();
  };

  if (!isAccepted) {
    acceptedAnswerBtn = (
      <button type="button" class="btn btn-success" onClick={addAsAccepted}>
        Add as accepted answer
      </button>
    );
  }

  useEffect(() => {
    setVoteCount(props.answer.upVotes.length - props.answer.downVotes.length);
    if (isAccepted) {
      setTick(
        <div class="row">
          <FaCheck size={35} fill="darkgreen" />
        </div>
      );
    }
    setProfile(
      <ProfileOverview
        userID={props.answer.userID}
        date={props.answer.creationDate}
      />
    );
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
          questionID: props.answer.questionID,
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
        answeredByUserID: props.answer.userID,
      });
      if (voteDownStatus === vote) {
        setVoteDownStatus(noVote);
        setVoteCount(voteCount + 2);
        axios.post("/vote/answer/removedownvote", {
          questionID: props.answer.questionID,
          userID: userID,
          answerID: props.answer._id,
          answeredByUserID: props.answer.userID,
        });
      }
    } else {
      setVoteUpStatus(noVote);
      setVoteCount(voteCount - 1);
      axios.post("/vote/answer/removeupvote", {
        questionID: props.answer.questionID,
        userID: userID,
        answerID: props.answer._id,
        answeredByUserID: props.answer.userID,
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
        answeredByUserID: props.answer.userID,
      });
      if (voteUpStatus === vote) {
        setVoteUpStatus(noVote);
        setVoteCount(voteCount - 2);
        axios.post("/vote/answer/removeupvote", {
          questionID: props.answer.questionID,
          userID: userID,
          answerID: props.answer._id,
          answeredByUserID: props.answer.userID,
        });
      }
    } else {
      setVoteDownStatus(noVote);
      setVoteCount(voteCount + 1);
      axios.post("/vote/answer/removedownvote", {
        questionID: props.answer.questionID,
        userID: userID,
        answerID: props.answer._id,
        answeredByUserID: props.answer.userID,
      });
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
            <MDEditor.Markdown source={props.answer.description} />

            <div class="row" style={{ marginTop: "30px", marginLeft: "65%" }}>
              {profile}
            </div>

            <div class="row" style={{ marginTop: "10px" }}>
              <p>{comment}</p>

              {commentSection}
              <button
                type="button"
                id="comment-button"
                class="btn btn-link d-flex justify-content-left"
                style={{ color: "grey" }}
                onClick={() => {
                  setCommentSection(
                    <AddCommentAnswer
                      answer={{
                        userID: userID,
                        questionID: props.answer.questionID,
                        answerID: props.answer._id,
                      }}
                    />
                  );
                }}
              >
                Add a comment
              </button>
            </div>

            <div class="row" style={{ marginTop: "30px", marginLeft: "65%" }}>
              {acceptedAnswerBtn}
            </div>
          </div>
        </div>
        <hr class="solid" />
      </div>
    </div>
  );
}

export default AnswerCard;
