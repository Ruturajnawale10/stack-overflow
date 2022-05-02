import React, { useState, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import {Button} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import axios from "axios";
import AnswerCard from "./AnswerCard";
import Tag from "./Tag";
import ProfileOverview from "./ProfileOverview";
import CommentCard from "./CommentCard";
import AddCommentQuestion from "./AddCommentQuestion";
import "../../App.css";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsBookmarkStarFill } from "react-icons/bs";
import { MdOutlineHistory } from "react-icons/md";

function QuestionsOverview() {
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState(null);
  const [answerCount, setAnswerCount] = useState(null);
  const [comment, setComment] = useState(null);
  const [commentSection, setCommentSection] = useState(null);
  const [tags, setTags] = useState(null);
  const [profile, setProfile] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [viewCount, setViewCount] = useState(0);
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

  //let questionID = "62679caa6a5ff0b364718083";
  let {questionID} = useParams();
  if(!questionID){
    questionID = "62679caa6a5ff0b364718083";
  }

  const [voteCount, setVoteCount] = useState(0);

  var DateDiff = {
    inDays: function (d1, d2) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();

      return Math.floor((t2 - t1) / (24 * 3600 * 1000));
    },

    inMonths: function (d1, d2) {
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();

      return d2M - d1M;
    },

    inYears: function (d1, d2) {
      return d2.getFullYear() - d1.getFullYear();
    },
  };

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
        setDescription(response.data.description);
        setTitle(response.data.title);
        // setViewCount(response.data.viewCount);
        setAnswerCount(response.data.answers.length);
        setVoteCount(
          response.data.upVotes.length - response.data.downVotes.length
        );
        let askedDate1 = new Date(response.data.creationDate);

        let currDate = new Date(Date.now());
        let yearsDiff = DateDiff.inYears(askedDate1, currDate);
        let monthsDiff = DateDiff.inMonths(askedDate1, currDate);
        let daysDiff = DateDiff.inDays(askedDate1, currDate);
        let diffDate = "";
        if (yearsDiff === 0) {
          if (monthsDiff === 0) {
            diffDate += daysDiff + " days";
          } else {
            diffDate += monthsDiff + " months";
          }
        } else {
          if (monthsDiff === 0) {
            diffDate += yearsDiff + " years ago";
          } else if (monthsDiff > 0) {
            diffDate += yearsDiff + " years, " + monthsDiff + " months";
          } else {
            diffDate +=
              yearsDiff - 1 + " years, " + (monthsDiff + 12) + " months";
          }
        }
        setAskedDate(diffDate);
        setAnswers(
          <div class="row">
            {response.data.answers.map((answer) => (
              <div key={answer} id="answercard">
                <AnswerCard answer={{ ...answer, questionID: questionID }} />
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

    axios
      .get("/question/viewcount", {
        params: {
          questionID: questionID,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setViewCount(response.data);
        }
      });

    //to enable this API, have a topic called "question_views" created in kafka
    // and then uncomment the below addasviewed request
    // Note: The broker service runs on port 9092

    // axios.post("/question/addasviewed", {
    //   questionID: questionID,
    //   userID: userID,
    // });
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

  const submitAnswerHandler = (e) => {
    //TODO: Post to backend
    const newAnswer = {
      description: answer,    
      questionID: questionID,
      userID: userID,
    }
    console.log('submitAnswerHandler:', newAnswer);
    if(answer.length != 0){
      axios.post("/answer/post_answer", 
          newAnswer
      ).then((response) => {
          if(response.status === 201){
              //on successful creation of answer refresh
              window.location.reload(true);
          }
      })
    }
  };


  return (
    <div>
      <div class="container">
        <div class="row">
          <h2> {title} </h2>
        </div>
        <div class="row">
          <div class="col-md-3" style={{ display: "flex" }}>
            <p id="date">Asked</p>
            <p style={{ marginLeft: "10px" }}>{askedDate} ago</p>
          </div>

          <div class="col-md-2" style={{ display: "flex" }}>
            <p id="date">Modified</p>{" "}
            <p style={{ marginLeft: "10px" }}>8 days ago</p>
          </div>
          <div class="col-md-2" style={{ display: "flex" }}>
            <p id="date">Viewed </p>
            <p style={{ marginLeft: "10px" }}>{viewCount} times </p>
          </div>
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
            <div>
              <MDEditor.Markdown 
                source={description} 
                //rehypePlugins={[[rehypeSanitize]]}
              />
            </div>

            <div class="row" style={{ marginTop: "10px", marginLeft: "20px" }}>
              {tags}
            </div>

            <div class="row" style={{ marginTop: "30px", marginLeft: "65%" }}>
              {profile}
            </div>
            <hr class="solid" />
            <div class="row" style={{ marginTop: "10px" }}>
              <p>{comment}</p>

              {commentSection}
              <button
                type="button"
                id="comment-button"
                class="btn btn-link d-flex justify-content-left"
                style={{ color: "grey" }}
                onClick={() => {
                  setCommentSection(<AddCommentQuestion question={{userID: userID, questionID: questionID}}/>);
                }}
              >
                Add a comment
              </button>
            </div>
          </div>
        </div>

        <hr class="solid" />

        <div class="row" style={{ marginTop: "10px" }}>
          <h4>{answerCount} answers</h4>
          {answers}
        </div>
        <br/>
        <div class="row" style={{ marginTop: "10px" }}>
          <h3>Your Answer</h3>
          <MDEditor
            value={answer}
            onChange={setAnswer}
          />

          <Button
            type="button"
            id="answer-button"
            class="btn d-flex justify-content-left"
           
            onClick={submitAnswerHandler}
          >
            Post your Answer
          </Button>
        </div>

      </div>
    </div>
  );
}

export default QuestionsOverview;
