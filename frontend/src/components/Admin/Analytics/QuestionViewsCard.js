import React, { useState, useEffect } from "react";
import "../../../App.css";
function QuestionViewCard(props) {
  return (
    <div>
      <div class="row" style={{ marginTop: "10px" }}>
        <div class="col-md-1" style={{ marginTop: "10px", marginLeft: "20px" }}>
          <h4>{props.index + 1}</h4>
        </div>
        <div class="col-md-8" style={{ marginTop: "10px" }}>
          <h4>
            <a href="#" id="link">
              {props.question.title}
            </a>
          </h4>
        </div>
        <div class="col-md-2" style={{ marginTop: "10px" }}>
          <h4 style={{ fontWeight: "bold" }}>{props.question.viewCount}</h4>
        </div>
      </div>
      <hr class="solid" />
    </div>
  );
}

export default QuestionViewCard;
