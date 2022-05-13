import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TagCard from "./TagCard";
import axios from "axios";
import "../../App.css";

function TagOverview() {
  
  const [tags, setTags] = useState();
  const [searchValue, setSearchValue] = useState('');
  

  useEffect(() => {
    axios.get("/tags/getTags").then((response, err) => {
      console.log("data from getTags is : " + JSON.stringify(response.data));
      setTags(response.data);
    });
    //   window.location.reload(false);
  }, []);

  const handlePopularSort =(e)=>{

    axios.get('/tags/popular')
    .then(res => {
        if(res){
            console.log("tags popular data is : " + JSON.stringify(res.data));
            setTags(res.data)
        }else{

        }
    });
  }

  const handleNameSort =(e)=>{
      
    axios.get('/tags/name',{type:"hi"})
    .then(res => {
        if(res){
            console.log(res.data)
            console.log("tags name data is : " + JSON.stringify(res.data));
            setTags(res.data)
        }else{

        }
    });
  }

  const handleNewSort =(e)=>{
      
    axios.get('/tags/new',{type:"hi"})
    .then(res => {
        if(res){
            console.log(res.data)
            console.log("tags new data is : " + JSON.stringify(res.data));
            setTags(res.data)
        }else{

        }
    });
  }

  const onChangeSearch = (e)=>{
      setSearchValue(e.target.value);
  }

  const handleSearch =(searchTerm)=>{
      console.log('serach', searchTerm);
  }

  return (
    <Container>
      <div>
        <div className="container bootstrap snippets bootdey">
          <h2 className="text-primary">Tags Page</h2>
          <hr />
          <div>
            A tag is a keyword or label that categorizes your question with
            other, similar questions. Using the right tags makes it easier for
            others to find and answer your question.
          </div>
        </div>
        <hr />
        <div
          class="btn-group float-end"
          role="group"
          aria-label="Basic outlined example"
        >
          <button type="button" onClick={handlePopularSort} class="btn btn-outline-secondary">
            Popular
          </button>
          <button type="button" onClick={handleNameSort} class="btn btn-outline-secondary">
            Name
          </button>
          <button type="button" onClick={handleNewSort} class="btn btn-outline-secondary">
            New
          </button>
        </div>
        <div className="d-flex fw-wrap search-container">
          <div className="d-flex search-inner" ps-relative mb12>
            <input
              className="form-control me-4"
              type="search"
              placeholder="Filter by TagName"
              aria-label="Search"
              value={searchValue}
              onChange={onChangeSearch}
            ></input>
            
            {/* <button className="btn btn-outline-success" onClick={handleSearch(searchValue)} type="submit">
              Search
            </button> */}
          </div>
          {/* {tags && <div className="dropdown">
              {tags.map((tag)=>{
                  <div className="dropdown-row">{tag.tagName}</div>
              })}
          </div>} */}
          

        </div>

        {tags && (
          <Row>
            {tags.filter((tag)=>{
              if(searchValue==""){
                return tag;
              }else if(tag.tagName.
                toLowerCase().includes(searchValue.toLowerCase())){
                  return tag;
                }
            })
            .map((tag) => {
              return (
                <Col md={3}>
                  {" "}
                  <TagCard
                    key={tag.id}
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
