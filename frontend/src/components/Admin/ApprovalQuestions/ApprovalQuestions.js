import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard.js";

function ApprovalQuestions() {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    //axios.defaults.headers.common["authorization"] =
    //localStorage.getItem("token");
    axios.get("/admin/questions/review").then((response) => {
      setQuestions(
        <div class="row">
          {response.data.map((question) => (
            <div key={question} id="questioncard">
              <QuestionCard question={question} />
            </div>
          ))}
        </div>
      );
    });
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      <div class="container">
      <h2>Questions Pending For Approval</h2>
        <hr class="solid" />
        {questions}
      </div>
    </div>
  );
}

export default ApprovalQuestions;
