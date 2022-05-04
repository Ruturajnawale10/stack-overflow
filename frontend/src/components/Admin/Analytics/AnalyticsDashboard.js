import React, { useState, useEffect } from "react";
import QuestionViewCard from "./QuestionViewsCard";
import QuestionsPerDayCard from "./QuestionsPerDayCard";
import TagsCard from "./TagsCard";
import UserCard from "./UserCard";
import axios from "axios";
import "../../../App.css";

function Dashboard() {
  const [questions, setquestions] = useState(null);
  let responseData = "";
  useEffect(() => {
    getQuestionsPerDay();
  }, []);

  const getQuestionsPerDay = (e) => {
    axios.get("/admin/analytics/questionsperday").then((res) => {
      responseData = res.data;

      let days = Array(8).fill({});

      const today = new Date();
      days[0] = {
        ...days[i],
        questionsPosted: res.data[0],
        day: "Today",
      };
      for (var i = 1; i < 8; i++) {
        const yesterday = new Date(today);
        days[i] = {
          ...days[i],
          questionsPosted: res.data[i],
          day: yesterday.toDateString(),
        };
        yesterday.setDate(yesterday.getDate() - 1);
        today.setDate(today.getDate() - 1);
      }

      setquestions(
        <div>
          <div class="row">
            <div
              class="col-md-8"
              style={{ marginTop: "10px", marginLeft: "70px" }}
            >
              <h4 style={{ marginLeft: "100px" }}>Last 7 days</h4>
            </div>
            <div class="col-md-2" style={{ marginTop: "10px" }}>
              <h4>No of Questions Posted</h4>
            </div>
            <hr class="solid" />
            {days.map((question, index) => (
              <div key={question} id="QuestionViewCard">
                <QuestionsPerDayCard question={question} />
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  const handleQuestionsPerDay = (e) => {
    getQuestionsPerDay();
  };

  const handleMostViewed = (e) => {
    axios.get("/admin/analytics/questions/mostviewed").then((res) => {
      if (res) {
        responseData = res.data;
        setquestions(
          <div>
            <div class="row">
              <div
                class="col-md-8"
                style={{ marginTop: "10px", marginLeft: "70px" }}
              >
                <h4 style={{ marginLeft: "100px" }}>Questions</h4>
              </div>
              <div class="col-md-2" style={{ marginTop: "10px" }}>
                <h4>Total Views</h4>
              </div>
              <hr class="solid" />
              {responseData.map((question, index) => (
                <div key={question} id="QuestionViewCard">
                  <QuestionViewCard question={question} index={index} />
                </div>
              ))}
            </div>
          </div>
        );
      } else {
      }
    });
  };

  const handleMostViewedTags = (e) => {
    axios.get("/admin/analytics/tags/mostused").then((res) => {
      if (res) {
        responseData = res.data;
        setquestions(
          <div>
            <div class="row">
              <div
                class="col-md-8"
                style={{ marginTop: "10px", marginLeft: "70px" }}
              >
                <h4 style={{ marginLeft: "100px" }}>Tags</h4>
              </div>
              <div class="col-md-2" style={{ marginTop: "10px" }}>
                <h4>No of questions tag used in</h4>
              </div>
              <hr class="solid" />
              {responseData.map((tag, index) => (
                <div key={tag} id="QuestionViewCard">
                  <TagsCard tag={tag} index={index} />
                </div>
              ))}
            </div>
          </div>
        );
      } else {
      }
    });
  };

  const handleHighestReputationUsers = (e) => {
    axios.get("/admin/analytics/users/reputation/highest").then((res) => {
      if (res) {
        responseData = res.data;
        setquestions(
          <div>
            <div class="row">
              <div
                class="col-md-8"
                style={{ marginTop: "10px", marginLeft: "70px" }}
              >
                <h4 style={{ marginLeft: "100px" }}>Users</h4>
              </div>
              <div class="col-md-2" style={{ marginTop: "10px" }}>
                <h4>Reputations</h4>
              </div>
              <hr class="solid" />
              {responseData.map((user, index) => (
                <div key={user} id="UserCard">
                  <UserCard user={user} index={index} />
                </div>
              ))}
            </div>
          </div>
        );
      } else {
      }
    });
  };

  const handleLowestReputationUsers = (e) => {
    axios.get("/admin/analytics/users/reputation/lowest").then((res) => {
      if (res) {
        responseData = res.data;
        setquestions(
          <div>
            <div class="row">
              <div
                class="col-md-8"
                style={{ marginTop: "10px", marginLeft: "70px" }}
              >
                <h4 style={{ marginLeft: "100px" }}>Users</h4>
              </div>
              <div class="col-md-2" style={{ marginTop: "10px" }}>
                <h4>Reputations</h4>
              </div>
              <hr class="solid" />
              {responseData.map((user, index) => (
                <div key={user} id="UserCard">
                  <UserCard user={user} index={index} />
                </div>
              ))}
            </div>
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
          <h2 style={{ color: "darkorange" }}> Analytics</h2>
          <div class="col">
            <div
              class="btn-group float-end"
              role="group"
              aria-label="Basic outlined example"
            ></div>
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
                onClick={handleQuestionsPerDay}
                type="button"
                class="btn btn-outline-secondary"
                autoFocus="true"
              >
                Questions/day
              </button>
              <button
                onClick={handleMostViewed}
                type="button"
                class="btn btn-outline-secondary"
              >
                10 Most Viewed
              </button>
              <button
                onClick={handleMostViewedTags}
                type="button"
                class="btn btn-outline-secondary"
              >
                10 Most used Tags
              </button>
              <button
                onClick={handleHighestReputationUsers}
                type="button"
                class="btn btn-outline-secondary"
              >
                10 Highest reputation Users
              </button>
              <button
                onClick={handleLowestReputationUsers}
                type="button"
                class="btn btn-outline-secondary"
              >
                10 Lowest reputation Users
              </button>
            </div>
          </div>
        </div>

        <hr class="solid" />

        <div class="row" style={{ marginTop: "10px" }}>
          {questions}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
