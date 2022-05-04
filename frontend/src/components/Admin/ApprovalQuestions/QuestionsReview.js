import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import axios from "axios";
import Tag from "../../QuestionsOverview/Tag.js";
import ProfileOverview from "../../QuestionsOverview/ProfileOverview.js";
import profileImage from "../../../images/smiling-minato.jpg";
import { getDateDiff } from "../../../Utils/DateDiff.js";
import { useNavigate } from "react-router-dom";
import "../../../App.css";

function QuestionsReview() {
  const [profile, setProfile] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [askedDate, setAskedDate] = useState(null);
  const [tags, setTags] = useState(null);
  var [redirectVar, setRedirectVar] = useState(null);
  let navigate = useNavigate();

  let { questionID } = useParams();
  if (!questionID) {
    questionID = "62679caa6a5ff0b364718083";
  }

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

        let startDate = new Date(response.data.creationDate);

        let diffDate = getDateDiff(startDate);
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

  const approveQuestion = (e) => {
    axios
      .post("/admin/question/approve", {
        questionID: questionID,
      })
      .then(() => {
        setRedirectVar(
          navigate("/admin/questions/review", { replace: true })
        );
      });
  };

  return (
    <div>
      {redirectVar}
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
          <button
            class="btn btn-primary"
            style={{ marginTop: "5px" }}
            onClick={approveQuestion}
          >
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
