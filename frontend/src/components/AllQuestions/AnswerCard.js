import React, { useState, useEffect } from "react";
import {Container, Row, Col} from 'react-bootstrap';
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
      <Row>
        {tagnames.map((tagName) => (
          <Tag tagName={tagName} />
        ))}
      </Row>
    );
    setProfile(<ProfileOverview item={props} />);
  }, []);

  return (
    <div>
      <Container>
        <Row style={{ marginTop: "10px" }}>
          <Col xs={2} className="text-end">
            <h6>
              <div >{props.item.upVotes.length} votes </div>
              <div > {props.item.answers.length}{" "}answers </div>
              <div >{props.item.viewCount} views</div>
            </h6>
          </Col>
          <Col>
            <Row className="text-wrap">
              <h4>
                <a href={"/questions/" + props.item._id} id="link">
                  {props.item.title}
                </a>
              </h4>
            </Row>
            <Row>
              <Col xs={7}>
                <div >
                {tags}
              </div>
              </Col>
              <Col>
                <div > {profile}</div>
              </Col>
      
            </Row>
          </Col>
        </Row>
        <hr class="solid" />
      </Container>
    </div>
  );
}

export default AnswerCard;
