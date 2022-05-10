//This tab handles editing the user's profile information
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function AnswersTab() {
  const [questions, setQuestions] = useState([]);
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [notOwnerID, setNotOwnerID] = useState(
    localStorage.getItem("notOwnerID")
  );

  useEffect(() => {
    var data;
    if (notOwnerID.length == 0) {
      data = {
        userID,
      };
    } else if (userID == notOwnerID) {
      data = {
        userID,
      };
    } else {
      data = {
        userID: localStorage.getItem("notOwnerID"),
      };
    }

    axios.get("/user/profile/answers", { params: data }).then((response) => {
      if (response) {
        console.log(response.data);
        setQuestions(response.data);
      } else {
        console.log("Error retrieving questions");
      }
    });
  }, []);

  if (questions.length > 0) {
    return (
      <div>
        <h4>{questions.length} Answers</h4>
        {questions.map((question) => {
          return (
            <div class="container p-3 border">
              <div class="row">
                <div
                  class="col-sm-2"
                  style={{ height: "17px", width: "100px" }}
                >
                  <p style={{ fontSize: "13px" }}>
                    {question.upVotes.length} votes
                  </p>
                </div>

                {question.answers.map((answer) => {
                  if (answer._id == question.acceptedAnswerID) {
                    return (
                      <div
                        class="col-sm-2"
                        style={{ height: "17px", width: "150px" }}
                      >
                        <p
                          disabled
                          style={{
                            fontSize: "13px",
                            color: "green",
                            background: "box",
                          }}
                        >
                          Accepted
                        </p>
                      </div>
                    );
                  }
                })}

                <div class="row">
                  <a
                    href={"/questions/" + question._id}
                    style={{ fontSize: "17px" }}
                  >
                    {question.title}
                  </a>
                </div>
                <div class="row">
                  <div class="col">
                    {question.tags.map((tag) => {
                      return (
                        <button
                          class="my-2 px-2 py-1 col-sm-auto tagblock"
                          style={{
                            color: "#39739D",
                            fontWeight: "450",
                            backgroundColor: "#E1ECF4",
                          }}
                        >
                          {tag}
                        </button>
                      );
                    })}
                    <p>
                      asnwered{" "}
                      {moment(question.answers.creationDate).format(
                        "MMMM Do, YYYY @ h:mm"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div class="container p-4 border">
        User has not answered any questions
      </div>
    );
  }
}

export default AnswersTab;
