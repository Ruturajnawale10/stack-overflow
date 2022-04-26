import React, { useState, useEffect } from "react";
import upArrow from "../../images/upArrow.png";
import downArrow from "../../images/downArrow.png";
import activity from "../../images/clock-rotate-left-solid.svg";
import check from "../../images/check.png";
import ProfileOverview from "./ProfileOverview";
import CommentCard from "./CommentCard";
import "../../App.css";

function AnswerCard(props) {
  let [tick, setTick] = useState(null);
  const [profile, setProfile] = useState(null);
  const [comment, setComment] = useState(null);
  let isAccepted = true;

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
          <div class="col-md-1" style={{ marginTop: "10px" }}>
            <div class="row">
              <img
                src={upArrow}
                style={{ width: "63px", height: "40px" }}
              ></img>
            </div>

            <div class="row">
              <p
                style={{
                  fontSize: "30px",
                  marginLeft: "8px",
                  marginTop: "3px",
                }}
              >
                0
              </p>
            </div>

            <div class="row">
              <img
                src={downArrow}
                style={{ width: "63px", height: "40px" }}
              ></img>
            </div>

            {tick}

            <div class="row">
              <img
                src={activity}
                style={{ width: "60px", height: "50px", marginTop: "20px" }}
              ></img>
            </div>
          </div>
          <div
            class="col-md-10"
            style={{ marginTop: "10px", marginLeft: "20px" }}
          >
            <p>
              If you'd like to render curly braces as plain text within a JSX
              document simply use the HTML character codes. Left Curly Brace
              &#123; : &#onetwothree; Right Curly Brace &#125; : &#onetwofive;
            </p>

            <div class="row" style={{ marginTop: "30px", marginLeft: "65%" }}>
              {profile}
            </div>

            <div class="row" style={{ marginTop: "10px" }}>
              <p>{comment}</p>
            </div>
          </div>
        </div>
        <hr class="solid" />
      </div>
    </div>
  );
}

export default AnswerCard;
