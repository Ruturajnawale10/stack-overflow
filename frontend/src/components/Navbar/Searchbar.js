import React, { useState, useEffect } from "react";
import {Modal, Button, Container, Row, Col, Form, Card} from "react-bootstrap";
import {useNavigate, useParams, Link} from "react-router-dom";
import {FaSearch} from "react-icons/fa";


const SearchBar = () => {
    let navigate = useNavigate();
    const [input, setInput] = useState("");

    useEffect(() => {
        console.log("INPUT:", input);
    }, [])

    const submitHandler = (e) => {
        if(input?.length === 0){

        }else{
            if(input[0] === "[" && input[input?.length - 1] === "]"){
                //search for tags
                const tag = input.slice(1,-1);
                navigate(`/tags/${tag}`);
            }else if(input.split(":")[0] === "user"){
                //search for user
                const inputs = input.split(":");
                const userID = inputs[1] || null ;
                //console.log("search type: user >>>  user:", userID);
                navigate(`/search/user/${userID}`)
            }else if(input[0] === '"' && input[input.length - 1] === '"'){
                //search with a phrase
                const phrase = input.slice(1,-1);
                navigate(`/search/phrase/${phrase}`)
            }else if(input.split(":")[0] === "is"){
                const inputs = input.split(":");
                const type = inputs[1].split(" ")[0] || null ;
                const phrase = inputs[1].split(" ")[1]
                console.log("type",type)
                if(type==="question"){
                    navigate(`/search/Questiontype/${phrase}`)
                }
                else{
                    navigate(`/search/AnswerType/${phrase}`)
                }
            }else if(input.split(":")[0] === "isaccepted"){
                const inputs = input.split(":");
                const type = inputs[1].split(" ")[0] || null;
                const phrase = inputs[1].split(" ")[1]
                if(type==="yes"){
                    navigate(`/search/status/${phrase}`)
                }
                else{
                    navigate(`/search/statusNo/${phrase}`)
                }
                console.log(type)

            }
        }

    }


    return(
        <div>
            <Form onSubmit={submitHandler}>  
            <Row fluid>
                <Col xs="auto">
                <Form.Group className="mb-3" controlId="searchinput">
                    <Form.Control 
                        type="text" 
                        placeholder="Search..." 
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value)
                            console.log(e.target.value)
                        }}
                    />
                </Form.Group>
                </Col>
                <Col xs={1}>
                <Button type="submit" variant="primary">
                    <FaSearch/>
                </Button>
                </Col>
            </Row>
            </Form>
        </div>
    )
}

export default SearchBar;