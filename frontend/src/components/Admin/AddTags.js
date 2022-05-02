import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function AddTag() {
  const [tagName, setTagName] = useState(null);
  const [tagDescription, setTagDescription] = useState(null);
  var [redirectVar, setRedirectVar] = useState(null);
  let navigate = useNavigate();

  const submitData = (e) => {
    axios.post("/admin/tags/add", {
      tagName: tagName,
      tagDescription: tagDescription,
    });
    setRedirectVar(navigate("../tags", { replace: true }));
  };

  return (
    <div
      class="container p-4"
      style={{ border: "3px solid #666666", marginTop: "50px" }}
    >
      {redirectVar}
      <h2>Add a new tag</h2>
      <label for="tagname">Name of the tag</label>
      <input
        type="text"
        id="tagname"
        class="form-control"
        onChange={(e) => {
          setTagName(e.target.value);
        }}
      />

      <br></br>
      <label for="tagdescription">Add a good description for your tag</label>
      <textarea
        type="text"
        id="tagdescription"
        class="form-control"
        onChange={(e) => {
          setTagDescription(e.target.value);
        }}
      />
      <div>
        <button
          class="btn btn-primary"
          style={{ marginTop: "5px" }}
          onClick={submitData}
        >
          Add Tag
        </button>
        <button
          class="btn btn-secondary"
          style={{ marginTop: "5px", marginLeft: "10px" }}
          onClick={() => window.location.reload()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddTag;
