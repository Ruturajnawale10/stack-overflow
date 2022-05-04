import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Product(props) {
  const [tag, setTag] = useState(props.tag);
//   console.log("tag in card is : " + tag);

  return (
    <div className="card m-2">
      <div className="card-body">
        <div></div>
        <button class="col-md-auto tagblock">
          <p>{tag.tagName}</p>
        </button>
        <div>Description : {tag.description} </div>
      </div>
      <div className="card-footer">
      </div>
    </div>
  );
}

export default Product;
