import React, { useState, useEffect } from "react";
import {ButtonGroup, Button, Form, Row, Container} from "react-bootstrap";
import {FiX} from "react-icons/fi";

const InputTags = ({tags, setTags}) => {
    
    const [input, setInput] = useState("");

    useEffect(() => {

    }, [tags]); 

    const onChangeHandler = (e) => {
        console.log("onChangeHandler")
        setInput(e.target.value);
    }

    const onKeyDownHandler = (e) => {
        const {key} = e;

        if(key === " " && input.length > 0 && tags.length < 5){
            //condition if user type space & input is non zero & number of tags is less than 5
            //add to tags array & clear input after checking if tag is already in tags array
            e.preventDefault();
            if(!tags.find(tag => tag == input)){
                setTags(tags => [...tags, input])
            }
            setInput("");
        }else if(key === " " && input.length > 1 && tags.length == 5){
            e.preventDefault();
            //condition if user types space & input is non zero and number of tags == 5
            //clear input since no more tags can be added 

            setInput("");
        }else if(key === " " && input.length == 0){
            e.preventDefault();
            //condidtion if user types space but there is no input
            //reset input
            setInput("");

        }
    }

    const removeTagHandler = (e) => {
        e.preventDefault();
        const removeTag = e.currentTarget.value;
        const filtered = tags.filter(tag => tag != removeTag);
        //console.log("filtered:", filtered)
        setTags(filtered);
    }

    return(
        <>
            <div className="pb-2">
                {tags.map((tag) => {
                    return(
                        <Button 
                            value={tag}
                            style={{color: "#39739D", backgroundColor: "#E1ECF4", marginLeft:"8px", borderColor:"#E1ECF4"}} 
                            onClick={removeTagHandler} 
                        >
                            {tag}  <FiX value={tag} style={{strokeWidth: 3}}/>
                        </Button>
                    )
                })}
            </div>
            <Form.Control 
                type="text"
                value={input}
                placeholder="e.g. (iphone mongodb angularjs)" 
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
            />
       
        </>
    )
}

export default InputTags;