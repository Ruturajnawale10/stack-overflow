//This tab handles editing the user's profile information
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function BookmarksTab() {
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

    axios.get("/user/profile/bookmarks", { params: data }).then((response) => {
      if (response) {
        console.log(response.data[0]);
        setQuestions(response.data[0]);
      } else {
        console.log("Error retrieving bookmarks");
      }
    });
  }, []);

  if (questions.length > 0) {
    return (
      <div>
        <h4>{questions.length} Bookmarks</h4>
        {questions.map((question) => {
          return (
            <div class="container p-3 border">
              <div class="row">
                <div
                  class="col-sm-2"
                  style={{ height: "17px", width: "100px" }}
                >
                  <p style={{ fontSize: "13px", color: "green" }}>
                    {question.answers.length} answers
                  </p>
                </div>
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
                  <p style={{ fontSize: "13px", color: "orange" }}>
                    {question.viewCount} views
                  </p>
                </div>
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
                        <a
                          href={"/tags/" + tag}
                          class="btn my-2 px-2 py-1 col-sm-auto"
                          rel="tag"
                          role="button"
                          style={{
                            color: "#39739D",
                            fontWeight: "450",
                            backgroundColor: "#E1ECF4",
                          }}
                        >
                          {tag}
                        </a>
                      );
                    })}
                    <p>
                      {moment(question.creationDate).format(
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
      <div class="container p-4 border">User has not bookmarked questions</div>
    );
  }
}

export default BookmarksTab;
