import React, { useState, useEffect } from "react";
import {Button, Row, Col, ListGroup} from "react-bootstrap";
import {useNavigate, Navigate, Link, useParams} from "react-router-dom";
import MDEditor, {commands} from "@uiw/react-md-editor";
import { FaCheck } from "react-icons/fa";
import {BiRightArrow} from "react-icons/bi";
import {TiMediaPlay} from "react-icons/ti"
import moment from 'moment';
import axios from "axios";


const PostActivity = () => {
    let navigate = useNavigate();
    const {questionID, answerID} = useParams();
    let userID = localStorage.getItem("userID");

    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [title, setTitle] = useState("");
    const [license, setLicense] = useState("CC BY-SA 4.0")
    const [events, setEvents] = useState([]);
    const [sortedEvents, setSortedEvents]=  useState([]);
    const [toggleDateFormat, setToggleDateFormat] = useState(false);


    useEffect(() => {

        //get question data and save
        if(!question){
            axios.get("/question/overview", {
                params: {
                    questionID: questionID,
                },
            }).then((response) => {
                if(response.status === 200){
                    setQuestion(response.data);
                    setTitle(response.data.title);
                
                }
            })
        }

        if(question && events.length === 0){
            //if answerID exist, this is an answer post
            if(answerID){
                addAnswerEvents(question);
            //if answerID doesn't exist, this is a question post    
            }else{
                addQuestionEvents(question);
            }
        }
        
        //Sort Events by date
        if(events.length > 0){
            setSortedEvents(events.slice().sort((a, b) => new Date(b.when) - new Date(a.when)));

        }
        
    }, [question, events])

    const addAnswerEvents = (question) => {
        //get answer data
        const answer = question.answers.filter(answer => answer._id === answerID)[0];
        setAnswer(answer);

        //get user data
        axios
        .get("/user/profile", {
            params: {userID: answer.userID},
        })
        .then((response) => {
            //Add intial answer post to events
            const event = {
                eventID: answer._id,
                userID: answer.userID,
                when: answer.creationDate,
                what: "history",
                by: response.data.displayName,
                license: license,
                comment: "",
            }
            setEvents(events => [...events, event]);
        });

        //add all comments with 'comment' label as event
        answer.comments?.forEach(comment => {

            const event = {
                eventID: comment._id,
                userID: comment.commentByUserID,
                when: comment.commentDate,
                what: "comment",
                by: comment.commentByUserName,
                license: "",
                comment: comment.description
            }
            setEvents(events => [...events, event]);
            
        })
    }

    const addQuestionEvents = (question) => {
        axios
        .get("/user/profile", {
            params: { userID: question.askedByUserID },
        })
        .then((response) => {
            //add initial question
            const event = {
                eventID: questionID,
                userID: question.askedByUserID,
                when: question.creationDate,
                what: "history",
                by: response.data.displayName,
                license: license,
                comment: "",
            }
            setEvents(events => [...events, event]);

            //add edits of initial question
            question.activity.forEach(activity => {
                const event = {
                    eventID: activity._id,
                    userID: activity.byUserID,
                    when: activity.date,
                    what: activity.what,
                    by: response.data.displayName,
                    license: activity.license,
                    comment: activity.comment,
                }
                console.log("ACTIVTY", activity)
    
                setEvents(events => [...events, event]);
            })
        });

        //add all answers with 'answer' labels as event
        question.answers.forEach(answer => {
            axios
            .get("/user/profile", {
                params: { userID: answer.userID },
            })
            .then((response) => {
                const event = {
                    eventID: answer._id,
                    userID: answer.userID,
                    when: answer.creationDate,
                    what: "answer",
                    by: response.data.displayName,
                    license: "",
                    comment: `score: ${answer.upVotes.length + answer.downVotes.length}`
                }
                setEvents(events => [...events, event]);
            })
        })

        //add all comments with 'comment' label as event
        question.comments.forEach(comment => {

            const event = {
                eventID: comment._id,
                userID: comment.commentByUserID,
                when: comment.commentDate,
                what: "comment",
                by: comment.commentByUserName,
                license: "",
                comment: comment.description
            }
            setEvents(events => [...events, event]);
            
        })

    }

    return(
        <div className="py-5 px-5">
            <Row>
                <h6>Timeline for <Link style={{ textDecoration: "none" }} to={`/questions/${questionID}`}>{title}</Link></h6>
            </Row>
            <Row>
                <p>Current License: <a style={{ textDecoration: "none" }} href={'https://creativecommons.org/licenses/by-sa/4.0/'}>{license}</a></p>
            </Row>
            <hr/>
            <Row>
                <h6>{events.length} events</h6>
            </Row>
            <ListGroup>
                <ListGroup.Item style={{backgroundColor: "whitesmoke"}}>
                    <Row className="align-items-center">
                        <Col xs={2}>
                            <h6>when <Button className="align-items-center" style={{height: "3vh", boxShadow: "none", color: "dodgerblue", backgroundColor: "whitesmoke", borderColor: "whitesmoke"}} onClick={(e) => {setToggleDateFormat(!toggleDateFormat)}}> <h6>toggle format</h6> </Button></h6>
                        </Col>
                        <Col xs={2}>
                            <h6>what</h6>
                        </Col>
                        <Col xs={1}>
                            <h6>by</h6>
                        </Col>
                        <Col xs={1}>
                            <h6>license</h6>
                        </Col>
                        <Col xs={6}>
                            <h6>comment</h6>
                        </Col>
                    </Row>
                </ListGroup.Item>
                {
                    sortedEvents.map(event => {
                        return(
                            <ListGroup.Item key={event.eventID}>
                                <Row >
                                    <Col xs={2} className="text-end">
                                        {!toggleDateFormat && moment(event.when).fromNow()}
                                        {toggleDateFormat && moment(event.when).format('YYYY-MM-DD HH:mm:ss')}
                                    </Col>
                                    <Col xs={2}>
                                        <Row>
                                        <Col xs={5}>
                                            {event.what === "history" && 
                                                <Button size="sm" className="px-1 " style={{color: "black", backgroundColor: "lightgrey", borderColor: "lightgrey"}} disabled={true}>{event.what}</Button>
                                            }
                                            {event.what === "comment" &&
                                                <Button size="sm" className="px-1 " style={{color: "white", backgroundColor: "grey", borderColor: "grey"}} disabled={true}>{event.what}</Button>
                                            
                                            }
                                            {event.what === "answer" &&
                                                <Button size="sm" className="px-1 " style={{color: "white", backgroundColor: "mediumseagreen", borderColor: "mediumseagreen"}} disabled={true}>{event.what}</Button>
                                            
                                            }
                                        </Col>
                                        <Col>
                                            {(event.what === "history" && questionID === event.eventID && answerID === undefined) && <div>asked</div>}
                                            {(event.what === "history" && questionID !== event.eventID && answerID === undefined) && <div>  <TiMediaPlay size={28} style={{color: "lightgrey"}}/>edited</div>}
                                            {(event.what === "history" && answerID !== undefined) && <div>answered</div>}
                                            {event.what === "comment" && <div>added</div>}
                                        </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={1}>
                                        {answerID === undefined ?
                                        (
                                            (event.userID === question.askedByUserID)  ? 
                                                (<Button onClick={(e)=>{navigate(`/users/${event.userID}`)}}size="sm" className="px-1" style={{color: "dodgerblue", backgroundColor: "#E1ECF4", borderColor:"#E1ECF4"}}>{event.by}</Button> )
                                                : (<Link style={{ textDecoration: "none" }} to={`/users/${event.userID}`}>{event.by}</Link>)
                                        ):(
                                            
                                            (event.userID === answer.userID)  ? 
                                            (<Button onClick={(e)=>{navigate(`/users/${event.userID}`)}}size="sm" className="px-1" style={{color: "dodgerblue", backgroundColor: "#E1ECF4", borderColor:"#E1ECF4"}}>{event.by}</Button> )
                                            : (<Link style={{ textDecoration: "none" }} to={`/users/${event.userID}`}>{event.by}</Link>)
                                         
                                        )
                                        }
                                    </Col>
                                    <Col xs={1}>
                                        {event.license.length > 0 &&
                                            <a style={{ textDecoration: "none" }} href={'https://creativecommons.org/licenses/by-sa/4.0/'}>{event.license}</a>
                                        }
                                    </Col>
                                    <Col xs={6}>
                                        <Row>
                                        <Col xs="auto">
                                            <MDEditor.Markdown
                                                source={event.comment}
                                            /> 
                                        </Col>
                                        <Col xs={1}>
                                            {(question.acceptedAnswerID === event.eventID && event.what !== "history")&& 
                                                <FaCheck size={15} style={{color: "green"}}/>
                                            }
                                        </Col>
                                        </Row>

                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </div>
    )
}
export default PostActivity;