import React, { useState, useEffect } from "react";
import axios from "axios";
import AnswerCard from "./AnswerCard";
import Tag from "./Tag";
import ProfileOverview from "./ProfileOverview";
import CommentCard from "./CommentCard";
import "../../App.css";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsBookmarkStarFill } from "react-icons/bs";
import { MdOutlineHistory } from "react-icons/md";

function QuestionsOverview() {
  const [answers, setAnswers] = useState(null);
  const [answerCount, setAnswerCount] = useState(null);
  const [comment, setComment] = useState(null);
  const [tags, setTags] = useState(null);
  const [profile, setProfile] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [viewCount, setViewCount] = useState(null);
  const [askedDate, setAskedDate] = useState(null);
  let userID = "mock_user_id_123";

  let noVote = "#a9acb0";
  let vote = "darkorange";
  const [voteUpStatus, setVoteUpStatus] = useState(noVote);
  const [voteDownStatus, setVoteDownStatus] = useState(noVote);

  useEffect(() => {
    //axios.defaults.headers.common["authorization"] =
    //localStorage.getItem("token");
    axios
      .get("/question/overview", {
        params: {
          questionID: "62679caa6a5ff0b364718083",
        },
      })
      .then((response) => {
        setDescription(<p>{response.data.description}</p>);
        setTitle(response.data.title);
        setViewCount(response.data.viewCount);
        setAnswerCount(response.data.answers.length);
        //let askedDate1 = new Date(response.data.creationDate);
        //let currDate = new Date();
        //let askedDiff = currDate.getYear() - askedDate1.getYear();
        //setAskedDate(askedDiff);
        setAnswers(
          <div class="row">
            {response.data.answers.map((answer) => (
              <div key={answer} id="answercard">
                <AnswerCard answer={answer} />
              </div>
            ))}
          </div>
        );

        setTags(
          <div class="row">
            {response.data.tags.map((tagName) => (
              <Tag tagName={tagName} />
            ))}
          </div>
        );

        setProfile(<ProfileOverview />);

        setComment(
          <div class="row">
            {response.data.comments.map((comment) => (
              <div key={comment} id="commentcard">
                <CommentCard comment={comment} />
              </div>
            ))}
          </div>
        );
      });
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
        <div class="row">
          <h2> {title} </h2>
        </div>
        <div class="row">
          <div class="col-md-2">Asked 12 years, 9 months ago</div>
          {/* {askedDate} */}
          <div class="col-md-2">Modified 8 days ago</div>
          <div class="col-md-2">Viewed {viewCount} times</div>
        </div>

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

            <div class="row">
              <BsBookmarkStarFill
                size={30}
                fill={"#a9acb0"}
                style={{ marginTop: "15px" }}
              />
            </div>

            <div class="row">
              <MdOutlineHistory
                size={39}
                fill={"#a9acb0"}
                style={{ marginTop: "23px" }}
              />
            </div>
          </div>
          <div
            class="col-md-10"
            style={{ marginTop: "10px", marginLeft: "20px" }}
          >
            <p>{description}</p>

            <div class="row" style={{ marginTop: "10px", marginLeft: "20px" }}>
              {tags}
            </div>

            <div class="row" style={{ marginTop: "30px", marginLeft: "65%" }}>
              {profile}
            </div>
            <hr class="solid" />
            <div class="row" style={{ marginTop: "10px" }}>
              <p>{comment}</p>
            </div>
          </div>
        </div>

        <hr class="solid" />

        <div class="row" style={{ marginTop: "10px" }}>
          <h4>{answerCount} answers</h4>
          {answers}
        </div>
      </div>
    </div>
  );
}

export default QuestionsOverview;
