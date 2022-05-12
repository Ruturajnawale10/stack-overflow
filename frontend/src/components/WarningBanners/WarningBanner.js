import React, {useState} from "react";
import "../../App.css";

function WarningBanner(props) {
    const [display, setDisplay] = useState({display:"block"});
  return (
    <div>
      <div id="liveAlertPlaceholder"></div>
      <div class="alert alert-primary alert-dismissible" role="alert" style={display}> {props.msg} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {{setDisplay({display:"none"})}}}></button></div>
    </div>
  );
}

export default WarningBanner;
