import React, { useState, useEffect } from "react";
import upArrow from "../../images/upArrow.png";
import downArrow from "../../images/downArrow.png";
import bookmark from "../../images/bookmark-regular.svg";
import activity from "../../images/clock-rotate-left-solid.svg";
import AnswerCard from "./AnswerCard";
import Tag from "./Tag";
import ProfileOverview from "./ProfileOverview";
import CommentCard from "./CommentCard";
import axios from 'axios';
import "../../App.css";
import DataTable from 'react-data-table-component';
function AllQuestions() {
  const [answers, setAnswers] = useState(null);
  const [comment, setComment] = useState(null);
  const [tags, setTags] = useState(null);
  const [profile, setProfile] = useState(null);

  let answersData='';
  useEffect(() => {
    axios.get('http://localhost:3001/question/',{data:"hi"})
    .then(res => {
        if(res){
            console.log(res.data)
             answersData = [res.data];
            setAnswers(
              <div class="row">
                {answersData.map((answer) => (
                  <div key={answer} id="answercard">
                    <AnswerCard item={answer} />
                  </div>
                ))}
              </div>
            );
           
        }else{

        }
    });  


    console.log("answerdata")
    console.log(answersData)
    console.log("answerdata")
    setProfile(<ProfileOverview />);


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
  <button type="button" class="btn btn-outline-secondary">Interesting</button>
  <button type="button" class="btn btn-outline-secondary">Hot</button>
  <button type="button" class="btn btn-outline-secondary">Score</button>
  <button type="button" class="btn btn-outline-secondary">Unanswered</button>

</div>
</div>
        </div>

        <hr class="solid" />

        <div class="row" style={{ marginTop: "10px" }}>
          <h4>1</h4>
          {answers}

        </div>

      </div>
    </div>
  );
}

export default AllQuestions;
