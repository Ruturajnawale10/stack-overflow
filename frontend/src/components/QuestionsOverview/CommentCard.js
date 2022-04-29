import React, { useState, useEffect } from "react";
import "../../App.css";

function CommentCard(props) {
  console.log(props);
  let comment =
    "This script allows you to do just that unless you want to write your own comparison function or sorter.";
  let name = "Marco Demaio";
  let date = new Date().toLocaleDateString();

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
                {name}
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
