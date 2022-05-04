import React, { useState, useEffect } from "react";
import "../../../App.css";
function QuestionsPerDayCard(props) {
  return (
    <div>
      <div class="row" style={{ marginTop: "10px" }}>
        <div
          class="col-md-7"
          style={{ marginTop: "10px", marginLeft: "180px" }}
        >
          <h4>
            <a href="#" id="link">
              {props.question.day}
            </a>
          </h4>
        </div>
        <div class="col-md-2" style={{ marginTop: "10px" }}>
          <h4 style={{ fontWeight: "bold" }}>
            {props.question.questionsPosted}
          </h4>
        </div>
      </div>
      <hr class="solid" />
    </div>
  );
}

export default QuestionsPerDayCard;
