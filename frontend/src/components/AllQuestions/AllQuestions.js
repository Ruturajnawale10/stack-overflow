import React, { useState, useEffect } from "react";
import AnswerCard from "./AnswerCard";
import ProfileOverview from "./ProfileOverview";
import { NavLink as Link } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import DataTable from "react-data-table-component";
function AllQuestions() {
  const [answers, setAnswers] = useState(null);
  const [comment, setComment] = useState(null);
  const [tags, setTags] = useState(null);
  const [profile, setProfile] = useState(null);
  const [alenght, setAlength] = useState(null);
  let answersData = "";
  //var alenght=0;
  useEffect(() => {
    axios.get("http://localhost:3001/question/", { data: "hi" }).then((res) => {
      console.log(res);
      if (res) {
        console.log(res.data);
        answersData = res.data;
        setAlength(res.data.length);
        setAnswers(
          <div class="row">
            {answersData.map((answer) => (
              <div key={answer} id="answercard">
                <AnswerCard item={answer} />
              </div>
            ))}
          </div>
        );
      } else {
      }
    });

    console.log("answerdata");
    console.log(answersData);
    console.log("answerdata");
    setProfile(<ProfileOverview />);
  }, []);

  const handleInteresting = (e) => {
    axios
      .get("http://localhost:3001/question/Interesting", { data: "hi" })
      .then((res) => {
        if (res) {
          console.log("Interesting");
          console.log(res.data);
          console.log("Interesting");
          answersData = res.data;
          setAnswers(
            <div class="row">
              {answersData.map((answer) => (
                <div key={answer} id="answercard">
                  <AnswerCard item={answer} />
                </div>
              ))}
            </div>
          );
        } else {
        }
      });
  };

  const handleHot = (e) => {
    axios
      .get("http://localhost:3001/question/Hot", { data: "hi" })
      .then((res) => {
        if (res) {
          console.log("hot");
          console.log(res.data);
          console.log("hot");
          answersData = res.data;
          setAnswers(
            <div class="row">
              {answersData.map((answer) => (
                <div key={answer} id="answercard">
                  <AnswerCard item={answer} />
                </div>
              ))}
            </div>
          );
        } else {
        }
      });
  };

  const handleScore = (e) => {
    console.log("score");
    console.log(e);
    console.log("score");
    axios
      .get("http://localhost:3001/question/Score", { data: "hi" })
      .then((res) => {
        if (res) {
          console.log(res.data);
          answersData = res.data;
          setAnswers(
            <div class="row">
              {answersData.map((answer) => (
                <div key={answer} id="answercard">
                  <AnswerCard item={answer} />
                </div>
              ))}
            </div>
          );
        } else {
        }
      });
  };

  const handleUnanswered = (e) => {
    axios
      .get("http://localhost:3001/question/Unanswered", { data: "hi" })
      .then((res) => {
        if (res) {
          console.log(res.data);
          answersData = res.data;
          setAnswers(
            <div class="row">
              {answersData.map((answer) => (
                <div key={answer} id="answercard">
                  <AnswerCard item={answer} />
                </div>
              ))}
            </div>
          );
        } else {
        }
      });
  };

  return (
    <div>
      <div class="container">
        <div class="row">
          <h2> All Questions</h2>
          <div class="col">
            <div
              class="btn-group float-end"
              role="group"
              aria-label="Basic outlined example"
            >
              <form>
                <button
                  class="btn btn-primary m-2"
                  formAction="./questions/ask"
                >
                  {" "}
                  Ask Question{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col float-end">
            <div
              class="btn-group float-end"
              role="group"
              aria-label="Basic outlined example"
            >
              <button
                onClick={handleInteresting}
                type="button"
                class="btn btn-outline-secondary"
              >
                Interesting
              </button>
              <button
                onClick={handleHot}
                type="button"
                class="btn btn-outline-secondary"
              >
                Hot
              </button>
              <button
                onClick={handleScore}
                type="button"
                class="btn btn-outline-secondary"
              >
                Score
              </button>
              <button
                onClick={handleUnanswered}
                type="button"
                class="btn btn-outline-secondary"
              >
                Unanswered
              </button>
            </div>
          </div>
        </div>

        <hr class="solid" />

        <div class="row" style={{ marginTop: "10px" }}>
          <h4>{alenght}</h4>
          {answers}
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;
