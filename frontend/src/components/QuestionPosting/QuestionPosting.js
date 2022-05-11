import React, { useState, useEffect } from "react";
import {Modal, Button, Container, Row, Col, Form, Card} from "react-bootstrap";
import {useNavigate, Navigate, Link} from "react-router-dom";
import MDEditor, {commands} from "@uiw/react-md-editor";
import {FiAlertCircle} from "react-icons/fi"

import InputTags from "./InputTags";
import axios from "axios";


const QuestionPosting = () => {
    let navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [titleWarning, setTitleWarning] = useState(false);
    const [bodyWarning, setBodyWarning] = useState(false);
    const [tagsWarning, setTagsWarning] = useState(false);
    const [loginModalShow, setLoginModelShow] = useState(false);
    
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        //Get userID
        if(localStorage.getItem("userID")){
            setUserID(localStorage.getItem("userID"));
        }else{
            setLoginModelShow(true);
            navigate('/login?redirectfrom=/questions/ask');
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        const question = {
            userID: userID,
            title: title,
            body: body,
            tags: tags
        };
        
        if(title.length < 15 || body.length < 30 || tags.length === 0){
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
        }else{
            setTitleWarning(false); 
            setBodyWarning(false);
            setTagsWarning(false);

            let isImageInserted = question.body.includes("![]");
            question.isWaitingForReview = isImageInserted;
            axios.defaults.headers.common["authorization"] =
                localStorage.getItem("token");
            axios.post("/question/post_question", 
                question
            ).then((response) => {
                if(response.status === 201){
                    //on successful creation of question redirect to that question page
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
                size="sm"
                show={loginModalShow}
                onHide={() => setLoginModelShow(false)}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header>
                <Modal.Title>
                    Please login to ask a question
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You can <Link  to="/login"> login here.</Link> <br/>
                    No account? You can <Link  to="/register"> register here.</Link>
                </Modal.Body>
            </Modal>
            <div style={{backgroundColor: "whitesmoke"}}>
                <Container className="py-5 px-3" >
                    <Row>
                        <h2>Ask a public question</h2>
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
                                <InputTags tags={tags} setTags={setTags}/>
                                {tagsWarning && <div style={{color: 'red'}}><FiAlertCircle/>&emsp;Please enter at least one tag. Tags are seperated by a space and must already exist.</div>}
                            </Form.Group>
                            
                        </Container>
                        <div className="pb-5">   
                            <Button type="submit" className="">Post your question</Button>
                            { (titleWarning || bodyWarning || tagsWarning) && <div className="py-2" style={{color: 'red'}}><FiAlertCircle/>&emsp;Your question couldn't be submitted. Please see the errors above.</div>}
                        </div>
                    </Form>
                </Container>
            </div>
        </>
        
    )
}

export default QuestionPosting;