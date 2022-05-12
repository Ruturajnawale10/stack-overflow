import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";

import QuestionCard from "../AllQuestions/QuestionCard";
import ProfileOverview from "../AllQuestions/ProfileOverview";

import "../../App.css";

const Search = () => {
    const {type, input} = useParams();
    const [questions, setQuestions] = useState(null);
    const [allQuestions, setAllQuestions] = useState(null);
    const [resultCount, setResultCount] = useState(0);

    const [profile, setProfile] = useState(null);
    console.log("type: ", type, ", input:", input)

    useEffect(() =>{
        if(type === "user" && questions  === null){
            //get questions by userID
            const userID = input;
            console.log("userID in userInput", userID)
            axios.get("/question/getQuestionByUserID", {
                params: {
                    userID: userID
                },
            }).then((response) => {
                if(response.status === 200){
                    const questionData = response.data;
                    console.log("QuestionData", questionData)
                    setAllQuestions(questionData);
                    setResultCount(questionData.length);
                    setQuestions(
                        <div class="row">
                          {questionData.map((question) => (
                             
                            <div key={question} id="QuestionCard">
                              <QuestionCard key={question} question={question} />
                            </div>
                            ))}
                        </div>
                      );
                }
            })
        }else if(type === "phrase"){
            const phrase = input;
            axios.get("/question/getQuestionByExactPhrase", {
                params: {
                    phrase: phrase
                }
            }).then((response) => {
                if(response.status === 200){
                    const questionData = response.data;
                    console.log("QuestionData", questionData)
                    setAllQuestions(questionData);
                    setResultCount(questionData.length);
                    setQuestions(
                        <div class="row">
                          {questionData.map((question) => (
                            <div key={question} id="QuestionCard">
                              <QuestionCard key={question} question={question} />
                            </div>
                            ))}
                        </div>
                      );
                }
            })

        }else if(type === "type"){
            const postType = input;
            // get all questions? 
            axios.get("/question/interesting").then((res) => {
                if (res) {
                  const questionData = res.data;
                  setResultCount(res.data.length);
                  setQuestions(
                    <div class="row">
                      {questionData.map((question) => (
                        <div key={question} id="QuestionCard">
                          <QuestionCard question={question} />
                        </div>
                      ))}
                    </div>
                  );
                } else {
                }
            });
        }else if(type === "status"){
            const status = input;
            
        }

    }, [])

    const columns = [
        {
          name: "",
          selector: (row) => questions,
          width: "100%",
        },
      ];


    const handleSortByNewest = () => {

    }

    const handleSortByVotes = () => {


    }

    const compare_score = (a, b) => {
        if (a.upVotes < b.upVotes) {
          return -1;
        }
        if (a.upVotes > b.upVotes) {
          return 1;
        }
        return 0;
      };

    return (
        <div>
          <div className="container">
            <div className="row">
              <h5> Results for {type} search for '{input}'</h5>
              <br></br>
              <br></br>
              <br></br>
              
              <div className="col">
                <div
                  className="btn-group float-end"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <form>
                    <button
                      className="btn btn-primary m-2"
                      formAction="./questions/ask"
                    >
                      {" "}
                      Ask Question{" "}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col float-end">
                <div
                  className="btn-group float-end"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <button
                    onClick={handleSortByNewest}
                    type="button"
                    className="btn btn-outline-secondary"
                    autoFocus
                  >
                    Newest
                  </button>
        
                  <button
                    onClick={handleSortByVotes}
                    type="button"
                    className="btn btn-outline-secondary"
                  >
                    Votes
                  </button>
                </div>
              </div>
            </div>

            <h6>Total result found: {resultCount}</h6>
    
            <div className="row" style={{ marginTop: "10px" }}>
              <DataTable
                columns={columns}
                data={["a"]}
                pagination
                paginationServer
              />
            </div>
          </div>
        </div>
    );
}

export default Search;