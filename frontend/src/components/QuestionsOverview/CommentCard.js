import React, { useState, useEffect } from "react";
import "../../App.css";

function CommentCard(props) {
  let date = new Date(props.comment.commentDate).toLocaleDateString();

  return (
    <div>
      <div class="container">
        <div class="row" style={{ marginTop: "10px" }}>
          <p>
            {" "}
            {props.comment.description} &emsp; - &emsp;
            <span style={{ color: "#146aa7" }}>
              {" "}
              <a href="#" id="link">
                {props.comment.commentByUserName}
              </a>
            </span>{" "}
            &emsp;
            <span style={{ color: "#8f9294" }}>{date}</span>
          </p>
        </div>
      </div>
      <hr class="solid" />
    </div>
  );
}

export default CommentCard;
