import React, { useState, useEffect } from "react";
import "../../App.css";

function Tag(props) {

  return(
  <button class="col-sm-auto tagblock">
    <p>{props.tagName}</p>
  </button>
  )
}

export default Tag;
