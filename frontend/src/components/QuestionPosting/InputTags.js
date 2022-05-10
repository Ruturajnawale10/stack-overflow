import React, { useState, useEffect } from "react";
import {Card, ButtonGroup, Button, Form, Row, Container} from "react-bootstrap";
import {FiX} from "react-icons/fi";
import axios from "axios";

const InputTags = ({tags, setTags}) => {
    const [input, setInput] = useState("");
    const [availableTags, setAvailableTags] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    
    //Mock tag for displaying tags
    const tempTags = ['mongoDb', 'javascript', 'compilers', 'python', 'perl', 'React', 'C++', 'C', 'C#']

    useEffect(() => {

        if(availableTags.length === 0){
            axios.get("/tags/getTags").then((response, err) => {
                //console.log("data from getTags is : " + JSON.stringify(response.data));
                setAvailableTags([...response.data]);
            });
        }

        if(input.length > 0){
            console.log('input.length > 0')
            getSuggestions();
        }else{
            console.log('input.length == 0')
            setSuggestions([]);
        }
        //console.log('new suggestions:', suggestions);
    }, [tags, input]); 

    const onChangeInputHandler = (e) => {
        setInput(e.target.value);
    }

    const getSuggestions = () => {
        setSuggestions([]);
        const filtered = availableTags.filter(tag => tag.tagName.toLowerCase().includes(input.toLowerCase()));  
        setSuggestions(filtered);
    }

    const onKeyDownHandler = (e) => {
        const {key} = e;

        if(key === " " && input.length > 0 && tags.length < 5){
            //condition if user type space & input is non zero & number of tags is less than 5
            //add to tags array & clear input after checking if tag is already in tags array
            e.preventDefault();
            if(!tags.find(tag => tag.toLowerCase() == input.toLowerCase())){
                if(suggestions.find(tag => tag.tagName.toLowerCase() === input.toLowerCase())){
                    setTags(tags => [...tags, input])
                }
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

    const addSuggestionHandler = (e) => {
        e.preventDefault();
        if(tags.length < 5){
            if(!tags.find(tag => tag.toLowerCase() == e.target.value.toLowerCase())){
                setTags(tags => [...tags, e.target.value.toLowerCase()]);
            }
        }
        setInput("");

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
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownHandler}
            />
            
            <ButtonGroup className="my-2">
                {
                    suggestions.map(suggestion =>{
                        return(
                            <Button 
                                className="mx-1 text-start"
                                value={suggestion.tagName}
                                style={{color: "#39739D", backgroundColor: "#E1ECF4", borderColor:"#E1ECF4"}}           
                                onClick={addSuggestionHandler}
                            >
                                    {suggestion.tagName} &nbsp; ({suggestion.noOfQuestions})
                            </Button>
                        )
                    })
                }
               
            </ButtonGroup>
            {
                (suggestions.length === 0 && input.length > 0 ) &&
                <div>No results for '{input}'</div>
            }
        </>
    )
}

export default InputTags;