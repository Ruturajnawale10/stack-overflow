import React, { useState, useEffect } from "react";
import "../../../App.css";
function TagsCard(props) {
  return (
    <div>
      <div class="row" style={{ marginTop: "10px" }}>
        <div class="col-md-1" style={{ marginTop: "10px", marginLeft: "20px" }}>
          <h4>{props.index + 1}</h4>
        </div>
        <div class="col-md-8" style={{ marginTop: "10px" }}>
          <h4>
            <a href={"/tags/" + props.tag.tagName} id="link">
              {props.tag.tagName}
            </a>
            <div class="col-md-8"> <h6>{props.tag.description}</h6></div>
           
          </h4>
        </div>
        <div class="col-md-2" style={{ marginTop: "10px" }}>
          <h4 style={{ fontWeight: "bold" }}>{props.tag.noOfQuestions}</h4>
        </div>
      </div>
      <hr class="solid" />
    </div>
  );
}

export default TagsCard;
