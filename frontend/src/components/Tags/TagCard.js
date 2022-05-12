import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TagCard(props) {
  const [tag, setTag] = useState(props.tag);
  //   console.log("tag in card is : " + tag);

  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "15vw"
  };

  return (
    <div className="card m-2 d-grid grid__4 lg:grid__3 md:grid__2 sm:grid__1 g12" style={cardStyle}>
      <div className="card-body">
        <div></div>
        <div class="d-flex jc-space-between col-md-auto">
          <div class="flex--item tagblock">
            <a
              href={"/tags/" + tag.tagName}
              class="post-tag"
              title="show questions tagged 'javascript'"
              rel="tag"
            >
              {tag.tagName}
            </a>
          </div>
        </div>
        <div className="flex--item fc-medium mb12 v-truncate4">
          {tag.description.length>125 && (tag.description).slice(0, 124) + "..."}
          {tag.description.length<=125 && (tag.description)}
        </div>
      </div>
      <div class="mt-auto d-flex jc-space-between fs-caption fc-black-400 card-footer">
        <div class="flex--item"><p style={{ color: 'grey' }}>{tag.noOfQuestions} total questions</p></div>
        <div class="flex--item s-anchors s-anchors__inherit">
            <p style={{ color: 'grey' }}>{tag.noOfTodaysQuestions} questions asked today
          {" "}
          
          {tag.noOfWeeksQuestions} this week</p>
          
          
        </div>
      </div>
    </div>
  );
}

export default TagCard;
