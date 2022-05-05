import React, { useState, useEffect } from "react";
import "../../App.css";

function Tag(props) {

  return(
  <button class="my-1 px-2 py-1 col-sm-auto tagblock" style={{color: "dodgerblue", borderColor: "dodgerblue", backgroundColor: "aliceblue"}}>
    {props.tagName}
  </button>
  )
}

export default Tag;
