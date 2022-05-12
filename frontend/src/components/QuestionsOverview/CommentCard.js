import MDEditor from "@uiw/react-md-editor";
import React, { useState, useEffect } from "react";
import moment from 'moment';
import "../../App.css";

function CommentCard(props) {


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
                  `${moment(props.comment.commentDate).format('MMMM D, YYYY HH:mm')}`
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
