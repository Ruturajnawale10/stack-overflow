import React, { useState, useEffect } from "react";
import "../../../App.css";

function QuestionCard(props) {
  return (
    <div>
      <div class="container questioncard">
        <div class="row" style={{ marginTop: "10px" }}>
          <h4>
            <a id="link" href={"/admin/questions/review/" + props.question._id}>
              {props.question.title}
            </a>
          </h4>
        </div>
      </div>
      <hr class="solid" />
    </div>
  );
}

export default QuestionCard;
