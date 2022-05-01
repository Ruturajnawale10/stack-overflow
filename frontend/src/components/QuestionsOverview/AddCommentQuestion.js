import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";

function AddCommentQuestion(props) {
  const [comment, setComment] = useState(null);

  const submitData = (e) => {
    axios.post("/question/comment/add", {
      questionID: props.question.questionID,
      userID: props.question.userID,
      comment: comment,
    });
    window.location.reload(false);
  };

  return (
    <div class="container p-3" style={{ border: "3px solid #666666" }}>
      <textarea
        type="text"
        id="comment"
        class="form-control"
        onChange={(e) => {
          setComment(e.target.value);
        }}
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
