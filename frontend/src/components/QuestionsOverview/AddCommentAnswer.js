import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import MDEditor from '@uiw/react-md-editor';

function AddCommentAnswer(props) {
  const [comment, setComment] = useState('');

  const submitData = (e) => {
    axios.post("/question/answer/comment/add", {
      questionID: props.answer.questionID,
      userID: props.answer.userID,
      answerID: props.answer.answerID,
      comment: comment,
    });
    window.location.reload(false);
  };

  return (
    <div class="container p-3" style={{ border: "3px solid #666666" }}>
       <MDEditor
        value={comment}
        onChange={setComment}
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

export default AddCommentAnswer;
