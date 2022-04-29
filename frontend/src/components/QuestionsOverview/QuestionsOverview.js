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
  const [isBookMark, setisBookMark] = useState(false);
  let userID = "626798764096f05e749e8de8";

  let noVote = "#a9acb0";
  let vote = "darkorange";
  const [voteUpStatus, setVoteUpStatus] = useState(noVote);
  const [voteDownStatus, setVoteDownStatus] = useState(noVote);

  let noBookMark = "#a9acb0";
  let bookMark = "#ebac46";
  const [bookMarkStatus, setBookMarkStatus] = useState(noBookMark);
  let questionID = "62679caa6a5ff0b364718083";
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    //axios.defaults.headers.common["authorization"] =
    //localStorage.getItem("token");
    axios
      .get("/question/overview", {
        params: {
          questionID: questionID,
        },
      })
      .then((response) => {
        setDescription(<p>{response.data.description}</p>);
        setTitle(response.data.title);
        setViewCount(response.data.viewCount);
        setAnswerCount(response.data.answers.length);
        setVoteCount(
          response.data.upVotes.length - response.data.downVotes.length
        );
        //let askedDate1 = new Date(response.data.creationDate);
        //let currDate = new Date();
        //let askedDiff = currDate.getYear() - askedDate1.getYear();
        //setAskedDate(askedDiff);
        setAnswers(
          <div class="row">
            {response.data.answers.map((answer) => (
              <div key={answer} id="answercard">
                <AnswerCard answer={{...answer, questionID: questionID} } />
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

    axios
      .get("/question/bookmark/status", {
        params: {
          questionID: questionID,
          userID: userID,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data === "IS BOOKMARK") {
            setBookMarkStatus(bookMark);
          }
        }
      });

    axios
      .get("/vote/question/status", {
        params: {
          questionID: questionID,
          userID: userID,
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
      axios.post("/vote/question/upvote", {
        questionID: questionID,
        userID: userID,
      });
      setVoteUpStatus(vote);
      setVoteCount(voteCount + 1);
      if (voteDownStatus === vote) {
        axios.post("/vote/question/removedownvote", {
          questionID: questionID,
          userID: userID,
        });
        setVoteDownStatus(noVote);
        setVoteCount(voteCount + 2);
      }
    } else {
      axios.post("/vote/question/removeupvote", {
        questionID: questionID,
        userID: userID,
      });
      setVoteUpStatus(noVote);
      setVoteCount(voteCount - 1);
    }
  };

  const changeVoteDownStatus = (e) => {
    if (voteDownStatus === noVote) {
      axios.post("/vote/question/downvote", {
        questionID: questionID,
        userID: userID,
      });
      setVoteDownStatus(vote);
      setVoteCount(voteCount - 1);
      if (voteUpStatus === vote) {
        axios.post("/vote/question/removeupvote", {
          questionID: questionID,
          userID: userID,
        });
        setVoteUpStatus(noVote);
        setVoteCount(voteCount - 2);
      }
    } else {
      axios.post("/vote/question/removedownvote", {
        questionID: questionID,
        userID: userID,
      });
      setVoteDownStatus(noVote);
      setVoteCount(voteCount + 1);
    }
  };

  const changeBookMarkStatus = (e) => {
    // axios.defaults.headers.common["authorization"] =
    //   localStorage.getItem("token");
    if (isBookMark) {
      setisBookMark(false);
      setBookMarkStatus(noBookMark);
      axios.post("/question/bookmark/remove", {
        questionID: questionID,
        userID: userID,
      });
    } else {
      setisBookMark(true);
      setBookMarkStatus(bookMark);
      axios.post("/question/bookmark/add", {
        questionID: questionID,
        userID: userID,
      });
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

            <div
              class="row"
              onClick={() => {
                changeBookMarkStatus();
              }}
            >
              <BsBookmarkStarFill
                size={30}
                fill={bookMarkStatus}
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
