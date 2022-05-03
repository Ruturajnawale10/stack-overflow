import React, { useState, useEffect } from "react";
import "../../../App.css"

function QuestionCard(props) {
  return (
    <div>
      <div class="container questioncard">
        <div class="row" style={{ marginTop: "10px" }}>
          <a class="questioncard" href={"/admin/questions/approval/" + props.question._id}>{props.question.title}</a>
        </div>
      </div>
      <hr class="solid" />
    </div>
  );
}

export default QuestionCard;
