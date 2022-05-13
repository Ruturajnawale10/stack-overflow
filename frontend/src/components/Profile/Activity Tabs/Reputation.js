//This tab handles editing the user's profile information
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import {Button, Row, Col, ListGroup} from "react-bootstrap";
import moment from 'moment';



function ReputationTab(props) {
  const [userActivity, setuserActivity] = useState();
  const [user, setUser] = useState();


  useEffect(() => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

    axios
      .get("/user/profile", { params: {userID: localStorage.getItem("userID") } })
      .then((response)=>{
        console.log("userDetails are : " + JSON.stringify(response.data));
        setUser(response.data);
      });


    axios.get("/userActivity", { params: {userID: localStorage.getItem("userID") } })
    .then((response)=>{
      let inputUserActivity = response.data;
      console.log("userActivity is : " + JSON.stringify(inputUserActivity));
      setuserActivity(inputUserActivity);
    });

  }, []);
  

  return (
    <div>
      <div>Inside Reputation Tab</div>
      <h3>{user && user.reputation} Reputation</h3>
      <ListGroup>
                <ListGroup.Item style={{backgroundColor: "whitesmoke"}}>
                    <Row className="align-items-center">
                        <Col xs={3}>
                            <h6>event</h6>
                        </Col>
                        <Col xs={1}>
                            <h6>points</h6>
                        </Col>
                        <Col xs={5}>
                            <h6>question</h6>
                        </Col>
                        <Col xs={1}>
                            <h6>date</h6>
                        </Col>
                        
                    </Row>
                </ListGroup.Item>
                {userActivity && (userActivity.map(activity => {
                        return(
                            <ListGroup.Item key={activity.eventID}>
                                <Row >
                                    <Col xs={3} >
                                        {activity.event}
                                    </Col>
                                    <Col xs={1}>
                                    {activity.points}
                                    </Col>
                                    <Col xs={5}>
                                    {activity.questionTitle}
                                    </Col>
                                    <Col xs={1}>
                                    {moment(activity.date).fromNow()}
                                    </Col>
                                    
                                </Row>
                            </ListGroup.Item>
                        )
                    }))
                    
                }
            </ListGroup>
    </div>


  );


}

export default ReputationTab;
