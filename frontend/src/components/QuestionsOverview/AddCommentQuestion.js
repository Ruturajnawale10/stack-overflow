import React, { useState, useEffect } from "react";
import axios from "axios";
import WarningBanner from "../WarningBanners/WarningBanner.js";
import "../../App.css";
import MDEditor, { commands } from "@uiw/react-md-editor";

function AddCommentQuestion(props) {
  const [comment, setComment] = useState("");
  const [warningBannerDiv, setWarningBannerDiv] = useState(null);
  let userID = localStorage.getItem("userID");

  const submitData = (e) => {
    axios.post("/question/comment/add", {
      questionID: props.question.questionID,
      userID: props.question.userID,
      userName: localStorage.getItem("userName"),
      comment: comment,
    });
    window.location.reload(false);
  };

  return (
    <div class="container p-3">
      {warningBannerDiv}
      <MDEditor
        value={comment}
        onChange={setComment}
        preview="edit"
        commands={[
          commands.bold,
          commands.italic,
          commands.strikethrough,
          commands.divider,
          commands.link,
          commands.code,
        ]}
      />
      <div>
        <button
          class="btn btn-primary"
          style={{ marginTop: "5px" }}
          onClick={submitData}
        >
          Add comment
        </button>
        <button
          class="btn btn-secondary"
          style={{ marginTop: "5px", marginLeft: "10px" }}
          onClick={() => window.location.reload()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddCommentQuestion;
