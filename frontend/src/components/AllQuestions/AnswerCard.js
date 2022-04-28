import React, { useState, useEffect } from "react";
import upArrow from "../../images/upArrow.png";
import downArrow from "../../images/downArrow.png";
import activity from "../../images/clock-rotate-left-solid.svg";
import check from "../../images/check.png";
import ProfileOverview from "./ProfileOverview";
import CommentCard from "./CommentCard";
import "../../App.css";
import Tag from "./Tag";
function AnswerCard(props) {
  let [tick, setTick] = useState(null);
  const [profile, setProfile] = useState(null);
  const [comment, setComment] = useState(null);
  const [tags, setTags] = useState(null);
  let isAccepted = true;
  let tagnames = [
    "javascript",
    "arrays",
    "sorting",
    "comparison"
  ];

  useEffect(() => {
    if (isAccepted) {
      setTick(
        <div class="row">
          <img
            src={check}
            style={{ width: "63px", height: "40px", marginTop: "10px" }}
          ></img>
        </div>
      );
    }
   setTags(
      <div class="row">
        {tagnames.map((tagName) => (
          <Tag tagName={tagName} />
        ))}
      </div>
    );
    setProfile(<ProfileOverview />);
    let commentData = [1, 2];
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
        <div class="row" style={{ marginTop: "10px" }}>
   
          <div
            class="col"
            style={{ marginTop: "10px", marginLeft: "20px" }}
          >
            <h6>0 votes 0 answers 2 views</h6>
            <h4><a href="#" id="link">How two add two ints</a></h4>
            <p>
              If you'd like to render curly braces as plain text within a JSX
              document simply use the HTML character codes. Left Curly Brace
              &#123; : &#onetwothree; Right Curly Brace &#125; : &#onetwofive;
            </p>
            <div class="row" style={{ marginTop: "10px", marginLeft: "20px" }}>
              {tags}
            </div>
            <div class="row" style={{ marginTop: "30px", marginLeft: "65%" }}>
              {profile}
              
            </div>

  
          </div>
        </div>
        <hr class="solid" />
      </div>
    </div>
  );
}

export default AnswerCard;
