import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfileOverview from "./ProfileOverview";
import axios from "axios";
import "../../App.css";
import Tag from "./Tag";

function QuestionCard(props) {
  const [profile, setProfile] = useState(null);
  const [tags, setTags] = useState(null);
  const [viewCount, setViewCount] = useState(null);
  let tagnames = props.question.tags;

  useEffect(() => {
    setTags(
      <Row>
        {tagnames.map((tagName) => (
          <Tag key={tagName} tagName={tagName} />
        ))}
      </Row>
    );
    setProfile(<ProfileOverview question={props.question} />);

    axios
      .get("/question/viewcount", {
        params: { questionID: props.question._id },
      })
      .then((response) => {
        setViewCount(response.data);
      });
  }, []);

  return (
    <div>
      <Container>
        <Row style={{ marginTop: "10px" }}>
          <Col xs={2} className="text-end">
            <h6>
              <div>{props.question.netVotesCount} votes </div>
              <div style={{ color: "#03030390" }}>
                {" "}
                {props.question.answers.length} answers{" "}
              </div>
              <div style={{ color: "#03030390" }}>
                {" "}
                {props.question.viewCount} views
              </div>
            </h6>
          </Col>
          <Col>
            <Row className="text-wrap">
              <h4>
                <a href={"/questions/" + props.question._id} id="link">
                  {props.question.title}
                </a>
              </h4>
            </Row>
            <Row>
              <Col xs={7}>
                <div>{tags}</div>
              </Col>
              <Col>
                <div> {profile}</div>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr class="solid" />
      </Container>
    </div>
  );
}

export default QuestionCard;
