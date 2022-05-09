//this file handles activites by the user includding answers, questions, tags, badges, bookmarks, and reputation
import React, { Component, useState } from "react";
import { Tab, Tabs, Nav, Col, Row } from "react-bootstrap";
import axios from "axios";
import AnswersTab from "./Activity Tabs/Answers";
import BadgesTab from "./Activity Tabs/Badges";
import BookmarksTab from "./Activity Tabs/Bookmarks";
import QuestionsTab from "./Activity Tabs/Questions";
import ReputationTab from "./Activity Tabs/Reputation";
import TagsTab from "./Activity Tabs/Tags";

function ActivityTab(props) {
  const [key, setKey] = useState("answers");
  return (
    <div>
      <Tab.Container
        id="left-tabs-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="answers">Answers</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="questions">Questions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tags">Tags</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="badges">Badges</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="bookmarks">Bookmarks</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="reputation">Reputation</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col lg={9}>
            <Tab.Content>
              <Tab.Pane eventKey="answers">
                <AnswersTab />
              </Tab.Pane>
              <Tab.Pane eventKey="questions">
                <QuestionsTab />
              </Tab.Pane>
              <Tab.Pane eventKey="tags">
                <TagsTab />
              </Tab.Pane>
              <Tab.Pane eventKey="badges">
                <BadgesTab />
              </Tab.Pane>
              <Tab.Pane eventKey="bookmarks">
                <BookmarksTab />
              </Tab.Pane>
              <Tab.Pane eventKey="reputation">
                <ReputationTab />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default ActivityTab;
