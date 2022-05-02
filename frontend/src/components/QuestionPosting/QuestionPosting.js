import React, { useState, useEffect } from "react";
import {Alert, Button, Container, Row, Col, Form, Card} from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

import InputTags from "./InputTags";
import axios from "axios";


const QuestionPosting = () => {
    let navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [warning, setWarning] = useState(false);
    
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        //Get user details
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        const question = {
            userID: userID,
            title: title,
            body: body,
            tags: tags
        };
        
        if(title === '' || body === ''){
            setWarning(true);
        }else{
            setWarning(false);
            axios.post("/question/post_question", 
                question
            ).then((response) => {
                if(response.status === 201){
                    //on successful creation of question redirect to that question page
                    navigate(`/questions/${response.data._id}`);
                }
            })
        }

    }

    return(
        <div style={{backgroundColor: "whitesmoke"}}>

            <Container >
                <Row>
                    <h2>Ask a public question</h2>
                </Row>
                {warning &&
                <Alert variant="warning">
                    Please fill both Title and Body!
                </Alert>
                }
                <Form onSubmit={submitHandler}>  
                    <Container style={{backgroundColor: "white"}} className="mt-5 mb-5 pt-3 pb-4">
                    
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
                            />
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
                        </Form.Group>
                    </Container>
                    <div className="pb-5">   
                        <Button type="submit" className="">Post your question</Button>
                    </div>
                </Form>
                
                
            </Container>
        </div>
        
    )
}

export default QuestionPosting;