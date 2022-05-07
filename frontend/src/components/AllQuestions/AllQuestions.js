import React, { useState, useEffect } from "react";
import AnswerCard from "./AnswerCard";
import ProfileOverview from "./ProfileOverview";
import axios from "axios";
import "../../App.css";
import DataTable from "react-data-table-component";

function AllQuestions() {
  const [answers, setAnswers] = useState(null);
  const [tags, setTags] = useState(null);
  const [profile, setProfile] = useState(null);
  const [alenght, setAlength] = useState(null);
  let answersData = "";

  const getInterestingQuestions = () => {
    axios.get("/question/interesting").then((res) => {
      if (res) {
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
    setProfile(<ProfileOverview />);
  };

  useEffect(() => {
    getInterestingQuestions();
  }, []);

  const handleInteresting = (e) => {
    getInterestingQuestions();
  };

  const handleHot = (e) => {
    axios.get("/question/hot").then((res) => {
      if (res) {
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
  };

  const handleScore = (e) => {
    axios.get("/question/score", { data: "hi" }).then((res) => {
      if (res) {
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
  };

  const handleUnanswered = (e) => {
    axios.get("/question/unanswered").then((res) => {
      if (res) {
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
  };

  const columns = [
    {
      name: "",
      selector: (row) => answers,
      width: "100%",
    },
  ];
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
                autoFocus
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
          <DataTable
            columns={columns}
            data={["a"]}
            pagination
            paginationServer
          />

          {/*<!--answers-->*/}
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;
