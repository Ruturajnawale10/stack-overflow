import React, { useState, useEffect } from "react";
import "../../App.css";

function Tag(props) {
  return (
    <button
      class="my-2 px-2 py-1 col-sm-auto tagblock"
      style={{
        color: "#39739D",
        fontWeight: "450",
        backgroundColor: "#E1ECF4",
        transform: "scale(1.07,1.15)",
      }}
    >
      {props.tagName}
    </button>
  );
}

export default Tag;
