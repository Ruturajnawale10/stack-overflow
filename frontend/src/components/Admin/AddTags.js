import React, { useState } from "react";
import axios from "axios";
import WarningBanner from "../WarningBanners/WarningBanner.js";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function AddTag() {
  const [tagName, setTagName] = useState(null);
  const [tagDescription, setTagDescription] = useState(null);
  var [redirectVar, setRedirectVar] = useState(null);
  const [warningBannerDiv, setWarningBannerDiv] = useState(null);
  let navigate = useNavigate();

  const submitData = (e) => {
    axios
      .post("/admin/tags/add", {
        tagName: tagName,
        tagDescription: tagDescription,
      })
      .then((res) => {
        if (res.data === "DUPLICATE") {
          setWarningBannerDiv(
            <WarningBanner msg="Tag already present in system" />
          );
        } else {
          setRedirectVar(navigate("../tags", { replace: true }));
        }
      });
  };

  return (
    <div
      class="container p-4"
      style={{ border: "3px solid #666666", marginTop: "50px" }}
    >
      {redirectVar}
      {warningBannerDiv}
      <h2>Add a new tag</h2>
      <label for="tagname">Name of the tag</label>
      <input
        type="text"
        id="tagname"
        class="form-control"
        onChange={(e) => {
          setTagName(e.target.value);
        }}
        autoFocus
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
