import React, { useState, useEffect } from "react";
import ProfileOverview from "./ProfileOverview";
import CommentCard from "./CommentCard";
import "../../App.css";
import Tag from "./Tag";
function AnswerCard(props) {
  let [tick, setTick] = useState(null);
  const [profile, setProfile] = useState(null);
  const [comment, setComment] = useState(null);
  const [tags, setTags] = useState(null);
  let isAccepted = true;
  let tagnames = props.item.tags;

  useEffect(() => {
    console.log("Cards");
    console.log(props);
    console.log(props.item.tags);
    console.log("Cards");
    setTags(
      <div class="row">
        {tagnames.map((tagName) => (
          <Tag tagName={tagName} />
        ))}
      </div>
    );
    setProfile(<ProfileOverview item={props} />);
  }, []);

  return (
    <div>
      <div class="container">
        <div class="row" style={{ marginTop: "10px" }}>
          <div class="col" style={{ marginTop: "10px", marginLeft: "20px" }}>
            <h6>
              {props.item.upVotes.length} votes {props.item.answers.length}{" "}
              answers {props.item.viewCount} views
            </h6>
            <h4>
              <a href={"/questions/" + props.item._id} id="link">
                {props.item.title}
              </a>
            </h4>
            <div class="row" style={{ marginTop: "10px", marginLeft: "20px" }}>
              {tags}
            </div>
            <div class="row" style={{ marginTop: "30px", marginLeft: "65%" }}>
              {profile}
            </div>
          </div>
        </div>
        <hr class="solid" />
      </div>
    </div>
  );
}

export default AnswerCard;
