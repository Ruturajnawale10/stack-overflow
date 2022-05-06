//This tab handles editing the user's profile information
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function QuestionsTab() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    var data;
    var userID;
    if (!localStorage.getItem("notOwnerID")) {
      data = {
        userID: localStorage.getItem("userID"),
      };
    } else if (
      localStorage.getItem("userID") == localStorage.getItem("notOwnerID")
    ) {
      data = {
        userID: localStorage.getItem("userID"),
      };
    } else {
      data = {
        userID: localStorage.getItem("notOwnerID"),
      };
    }

    axios.post("/question/getAll", data).then((response) => {
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
        <h4>{questions.length} Questions</h4>
        {questions.map((question) => {
          return (
            <div class="container p-5 my-5 border">
              <div class="row">
                <div
                  class="col-sm-2"
                  style={{ height: "17px", width: "100px" }}
                >
                  <p style={{ fontSize: "13px" }}>
                    {question.upVotes.length} votes
                  </p>
                </div>
                <div
                  class="col-sm-2"
                  style={{ height: "17px", width: "100px" }}
                >
                  <p style={{ fontSize: "13px" }}>
                    {question.answers.length} answers
                  </p>
                </div>
                <div
                  class="col-sm-2"
                  style={{ height: "17px", width: "100px" }}
                >
                  <p style={{ fontSize: "13px" }}>{question.viewCount} views</p>
                </div>
                <div class="row">
                  <a href="#" style={{ fontSize: "17px" }}>
                    {question.title}
                  </a>
                </div>
                <div class="row">
                  <div class="col">
                    {question.tags.map((tag) => {
                      return (
                        <button class="col tagblock">
                          <p>{tag}</p>
                        </button>
                      );
                    })}
                    <p>
                      asked{" "}
                      {moment(question.creationDate).format(
                        "MMMM Do YYYY, h:mm"
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
    return <div class="square border-1">User has not asked any questions</div>;
  }
}

export default QuestionsTab;