import React, { useState, useEffect } from "react";
import upArrow from "../../images/upArrow.png";
import downArrow from "../../images/downArrow.png";
import bookmark from "../../images/bookmark-regular.svg";
import activity from "../../images/clock-rotate-left-solid.svg";
import AnswerCard from "./AnswerCard";
import Tag from "./Tag";
import ProfileOverview from "./ProfileOverview";
import CommentCard from "./CommentCard";
import "../../App.css";
import DataTable from 'react-data-table-component';
function AllQuestions() {
  const [answers, setAnswers] = useState(null);
  const [comment, setComment] = useState(null);
  const [tags, setTags] = useState(null);
  const [profile, setProfile] = useState(null);
  let tagnames = [
    "javascript",
    "arrays",
    "sorting"
  ];

  useEffect(() => {
    let answersData = [1, 2, 3, 4,5,6,7,8,9];
    setAnswers(
      <div class="row">
        {answersData.map((answer) => (
          <div key={answer} id="answercard">
            <AnswerCard item={answer} />
          </div>
        ))}
      </div>
    );

    setTags(
      <div class="row">
        {tagnames.map((tagName) => (
          <Tag tagName={tagName} />
        ))}
      </div>
    );

    setProfile(<ProfileOverview />);

    let commentData = [1, 2, 3, 4];
    setComment(
      <div class="row">
        {commentData.map((comment) => (
          <div key={comment} id="commentcard">
            <CommentCard item={comment} />
          </div>
        ))}
      </div>
    );
  }, []);

  return (
    
    <div>
      
      <div class="container">
        <div class="row">

        <h2> All Questions</h2>
        <div class="col">
    <div class="btn-group float-end" role="group" aria-label="Basic outlined example">
                     <button type="button" class="btn btn-primary m-2">Ask Question</button>
                     </div>
    </div>
    

        </div>
        <div class="row">

        <div class="col float-end">
        <div class="btn-group float-end" role="group" aria-label="Basic outlined example">
  <button type="button" class="btn btn-outline-secondary">Newest</button>
  <button type="button" class="btn btn-outline-secondary">Active</button>
  <button type="button" class="btn btn-outline-secondary">Bountied</button>
  <button type="button" class="btn btn-outline-secondary">Unanswered</button>
<button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Filter
</button>
</div>
</div>
        </div>

        <hr class="solid" />

        <div class="row" style={{ marginTop: "10px" }}>
          <h4>22 questions</h4>
          {answers}

        </div>

      </div>
    </div>
  );
}

export default AllQuestions;
