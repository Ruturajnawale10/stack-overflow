import MDEditor from "@uiw/react-md-editor";
import React, { useState, useEffect } from "react";
import "../../App.css";

function CommentCard(props) {
  let date = new Date(props.comment.commentDate).toLocaleDateString();

  return (
    <div>
      <div class="container">
        <div class="row" style={{ marginTop: "10px" }}>
          <a>
            <MDEditor.Markdown 
              source={
                props.comment.description.concat(
                  " -", 
                  ` <a href="#" id="link">${props.comment.commentByUserName}</a>`,
                  "    ",
                  `${date}`
                  )
            } /> 
           
          </a>
        </div>
      </div>
      <hr class="solid" />
    </div>
  );
}

export default CommentCard;
