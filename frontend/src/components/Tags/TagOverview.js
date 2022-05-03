import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TagCard from "./TagCard";
// import Tag from "./Tag";
// import ProfileOverview from "./ProfileOverview";
// import CommentCard from "./CommentCard";
import "../../App.css";

function TagOverview() {
  let tempTags = [
    {
      tagName: "javascript",
      description: "For questions regarding programming in ECMAScript",
      noOfQuestions: 100,
    },
    {
      tagName: "python",
      description: "For questions regarding programming in ECMAScript",
      noOfQuestions: 100,
    },
    {
      tagName: "node",
      description: "For questions regarding programming in ECMAScript",
      noOfQuestions: 100,
    },
  ];
  const [tags, setTags] = useState(tempTags);
  const [profile, setProfile] = useState(null);
  let tagnames = [
    "javascript",
    "arrays",
    "sorting",
    "comparison",
    "javascript",
    "arrays",
    "sorting",
    "comparison",
    "javascript",
    "arrays",
  ];

  useEffect(() => {
      
  }, []);

  return (
    <Container>
      <div>
        <div className="container bootstrap snippets bootdey">
          <h1 className="text-primary">Tags Page</h1>
          <hr />
          <div>
            A tag is a keyword or label that categorizes your question with
            other, similar questions. Using the right tags makes it easier for
            others to find and answer your question.
          </div>
        </div>
        <hr />
        <div class="d-flex fw-wrap">
          <form className="d-flex" ps-relative mb12>
            <input
              className="form-control me-4"
              type="search"
              placeholder="Filter by TagName"
              aria-label="Search"
            ></input>
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <div
            class="flex--item ml-auto mb12 d-flex s-btn-group js-filter-btn"
            role="group"
            aria-label="Basic example"
          >
            <button type="button" class="btn btn-secondary">
              Popular
            </button>
            <button type="button" class="btn btn-secondary">
              Name
            </button>
            <button type="button" class="btn btn-secondary">
              New
            </button>
          </div>
        </div>

        {tags && (
          <Row>
            {tags.map((tag) => {
              return (
                <Col md={3}>
                  {" "}
                  <TagCard
                    key={tag.id}
                    id={tag.id}
                    name={tag.name}
                    price={tag.price}
                    tag={tag}
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </Container>
  );
}

export default TagOverview;
