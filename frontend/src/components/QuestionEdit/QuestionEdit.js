import React, { useState, useEffect } from "react";
import {Modal, Button, Container, Row, Col, Form, Card} from "react-bootstrap";
import {useNavigate, useParams, Link} from "react-router-dom";
import MDEditor, {commands} from "@uiw/react-md-editor";
import {FiAlertCircle} from "react-icons/fi"

import InputTags from "../QuestionPosting/InputTags";
import axios from "axios";


const QuestionEdit = () => {
    let navigate = useNavigate();
    const {questionID} = useParams();

    const [question, setQuestion] = useState(null);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [reason, setReason] = useState("");

    const [titleWarning, setTitleWarning] = useState(false);
    const [bodyWarning, setBodyWarning] = useState(false);
    const [tagsWarning, setTagsWarning] = useState(false);
    const [reasonWarning, setReasonWarning] = useState(false);

    const [cancelModalShow, setCancelModelShow] = useState(false);

    const [userID, setUserID] = useState(null);

    useEffect(() => {
        //Get userID
        if(localStorage.getItem("userID")){
            setUserID(localStorage.getItem("userID"));
        }else{
            navigate('/login?redirectfrom=/questions/ask');
        }
        
        //get question data
        if(!question){
            axios.get("/question/overview", {
                params: {
                    questionID: questionID,
                },
            }).then((response) => {
                if(response.status === 200){
                    setQuestion(response.data);
                    setTitle(response.data.title);    
                    setBody(response.data.description);     
                    setTags(response.data.tags);   
                }
            })
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        const edit = {
            userID: userID,
            questionID: questionID,
            title: title,
            body: body,
            tags: tags,
            reason: reason,
        };
        
        if(title.length < 15 || body.length < 30 || tags.length === 0 || reason.length < 10){
            if(title.length < 15){
                setTitleWarning(true);
            }else{
                setTitleWarning(false);
            }
            if(body.length < 30){
                setBodyWarning(true);
            }else{
                setBodyWarning(false);
            }
            if(tags.length === 0){
                setTagsWarning(true);
            }else{
                setTagsWarning(false);
            }
            if(reason.length < 10){
                setReasonWarning(true);
            }else{
                setReasonWarning(false);
            }
        }else{
            setTitleWarning(false); 
            setBodyWarning(false);
            setTagsWarning(false);
            setReasonWarning(false);

            //remove all tags from original question
            question.tags.forEach(tag => {
                const data = {
                    tag: tag
                };
                axios.post("/tags/removeQuestion", 
                    data
                    ).then((response) => {
                        if(response.status === 200){
                            console.log(response);
                    }})
            })
            /**
             todo: ? Does an edit need a reapproval?
            let isImageInserted = question.body.includes("![]");
            edit.isWaitingForReview = isImageInserted;
            axios.defaults.headers.common["authorization"] =
                localStorage.getItem("token");
             */
            axios.put("/question/edit_question", 
                edit
            ).then((response) => {
                if(response.status === 200){
                    //on successful edit of question 
                    //add new tags to count  + redirect to that question page
                    tags.forEach(tag => {
                        const data = {
                            tag: tag
                        };
                        axios.post("/tags/addQuestion", 
                        data
                        ).then((response) => {
                            if(response.status === 200){
                                console.log(response);
                        }})
                    })
                    navigate(`/questions/${response.data._id}`);
                }
            })
        }
    }

    return(
        <>
            <Modal
                show={cancelModalShow}
                onHide={() => setCancelModelShow(false)}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header>
                <Modal.Title>
                    Are you sure? Changes won't be saved
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Button className="px-4 mx-4" onClick={(e) => {navigate(`/questions/${questionID}`)}}>
                            Yes
                        </Button>
                        <Button  className="px-4 mx-4" onClick={(e) => {setCancelModelShow(false)}}>
                            No    
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            <div style={{backgroundColor: ""}}>
                <Container className="py-5 px-3" >
                    <Row>
                        <h2>Editing: {question?.title}</h2>
                    </Row>
                    <Form onSubmit={submitHandler}>  
                        <Container style={{backgroundColor: "white"}} className="mt-5 mb-5 pt-3 pb-4 px-3">
                        
                            <Form.Group className="mb-2" >
                                <Form.Label>
                                    <h5>Title</h5>
                                </Form.Label>
                                <Form.Text>
                                    <p>Be specific and imagine you’re asking a question to another person</p>
                                </Form.Text>
                                <Form.Control 
                                    type="text" 
                                    value={title}
                                    placeholder="e.g. Is there an R function for finding the index of an element in a vector?" 
                                    onChange={(e)=>{setTitle(e.target.value)}}
                                />
                                {titleWarning && <div style={{color: 'red'}}><FiAlertCircle/>&emsp;Title must be at least 15 characters.</div>}
                            </Form.Group>     

                            
                            <Form.Group>
                                <Form.Label className="mb-2" >
                                    <h5>Body</h5>
                                </Form.Label>
                                <Form.Text>
                                    <p>Include all the information someone would need to answer your question</p>
                                </Form.Text>
                                <div className="mb-3" >
                                    <MDEditor
                                        value={body}
                                        onChange={setBody}
                                        preview="edit"
                                        commands={[
                                            commands.bold,
                                            commands.italic,
                                            commands.strikethrough,
                                            commands.divider,
                                            commands.divider,
                                            commands.link,
                                            commands.image,
                                            commands.divider,
                                            commands.divider,
                                            commands.code,
                                            commands.codeBlock,
                                            commands.divider,
                                            commands.divider,
                                            commands.unorderedListCommand,
                                            commands.orderedListCommand,
                                            commands.checkedListCommand,
                                          ]}
                                    
                                    />
                                    {bodyWarning && <div style={{color: 'red'}}><FiAlertCircle/>&emsp;Body must be at least 30 characters; you entered {body.length}.</div>}
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mb-2">
                                    <h5>Tags</h5>
                                </Form.Label>
                                <Form.Text>
                                    <p>Add up to 5 tags to describe what your question is about</p>
                                </Form.Text>
                                {<InputTags tags={tags} setTags={setTags}/>}
                                {tagsWarning && <div style={{color: 'red'}}><FiAlertCircle/>&emsp;Please enter at least one tag. Tags are seperated by a space and must already exist.</div>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="mb-2">
                                    <h5>Edit Summary</h5>
                                </Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={reason}
                                    placeholder="Briefly explain your changes (corrected spelling, fixed grammar, improved formatting" 
                                    onChange={(e)=>{setReason(e.target.value)}}
                                />
                                {reasonWarning && <div style={{color: 'red'}}><FiAlertCircle/>&emsp;Reason must be at least 10 characters.</div>}
                            </Form.Group>
                            
                        </Container>
                        <div className="pb-5">   
                            <Button type="submit" className="">Save Edits</Button> <Button onClick={(e) => setCancelModelShow(true)} style={{color: "dodgerblue", borderColor: "white", backgroundColor: "white"}}>Cancel</Button>
                            { (titleWarning || bodyWarning || tagsWarning || reasonWarning) && <div className="py-2" style={{color: 'red'}}><FiAlertCircle/>&emsp;Your edit couldn't be submitted. Please see the errors above.</div>}
                        </div>
                    </Form>
                </Container>
            </div>
        </>
        
    )
}

export default QuestionEdit;