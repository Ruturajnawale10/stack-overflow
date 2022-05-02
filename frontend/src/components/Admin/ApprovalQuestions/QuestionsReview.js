import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import axios from "axios";
import Tag from "../../QuestionsOverview/Tag.js";
import ProfileOverview from "../../QuestionsOverview/ProfileOverview.js";
import profileImage from "../../../images/smiling-minato.jpg";
import "../../../App.css";

function QuestionsReview() {
  const [profile, setProfile] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [askedDate, setAskedDate] = useState(null);
  const [tags, setTags] = useState(null);

  let { questionID } = useParams();
  if (!questionID) {
    questionID = "62679caa6a5ff0b364718083";
  }

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
        setTags(
          <div class="row">
            {response.data.tags.map((tagName) => (
              <Tag tagName={tagName} />
            ))}
          </div>
        );
        setProfile(<ProfileOverview />);
      });
  }, []);

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
        </div>

        <div
          style={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={profileImage} style={{ blockSize: "200px" }}></img>
        </div>
        <br></br>

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

        <div style={{ marginTop: "40px", float: "right", marginRight: "80px" }}>
          <h3>Approve this question?</h3>
          <button class="btn btn-primary" style={{ marginTop: "5px" }}>
            Approve
          </button>
          <button
            class="btn btn-secondary"
            style={{ marginTop: "5px", marginLeft: "10px" }}
            onClick={() => window.location.reload()}
          >
            Deny
          </button>
        </div>
        <hr class="solid" />
        <br />
      </div>
    </div>
  );
}

export default QuestionsReview;
