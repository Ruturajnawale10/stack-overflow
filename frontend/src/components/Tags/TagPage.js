import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import QuestionCard from "../AllQuestions/QuestionCard";
import ProfileOverview from "../AllQuestions/ProfileOverview";
import axios from "axios";
import "../../App.css";

function TagPage() {
  let { inputTag } = useParams();
  console.log("input tag is " + inputTag);
  
  const [questions, setquestions] = useState(null);
//   console.log("questions tag is " + JSON.stringify(questions));
  const [allQuestions, setAllQuestions] = useState(null);
  const [alenght, setAlength] = useState(null);
  const [profile, setProfile] = useState(null);
  const [tag, setTag] = useState(null);
  let questionData = "";

  const getQuestionsByTag = (inputTag) => {
    console.log("inside getQuestionsByTag");
    axios
      .get("/question/getQuestionByTag", {
        params: {
          tag: "" + inputTag + "",
        },
      })
      .then((res) => {
        if (res) {
        //   console.log("res is : " + JSON.stringify(res));

          questionData = res.data;
          setAlength(res.data.length);
          questionData.sort(compare_interesting);
          setAllQuestions(questionData);
          setquestions(
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
    setProfile(<ProfileOverview />);
  };

  const getTagInfo = (inputTag)=>{
      console.log("inside getTagInfo");
    axios
    .get("/tags/getTagByName", {
      params: {
        tag: "" + inputTag + "",
      },
    }).then((res) =>{
        if (res) {
            // console.log("tag is : " + JSON.stringify(res.data[0]));
            setTag(res.data[0]);
            console.log(tag.description)
        }
    })
  };

  useEffect(() => {
    console.log("inside use effect ");
    getQuestionsByTag(inputTag);
    getTagInfo(inputTag);
  }, []);

  const compare_interesting = (a, b) => {
    if (a.viewCount < b.viewCount) {
      return -1;
    }
    if (a.viewCount > b.viewCount) {
      return 1;
    }
    return 0;
  };

  const compare_hot = (a, b) => {
    if (a.viewCount < b.viewCount) {
      return -1;
    }
    if (a.viewCount > b.viewCount) {
      return 1;
    }
    return 0;
  };
  const compare_score = (a, b) => {
    if (a.upVotes < b.upVotes) {
      return -1;
    }
    if (a.upVotes > b.upVotes) {
      return 1;
    }
    return 0;
  };
  //questions.sort(compare_interesting);
  const getInterestingQuestions = () => {
    
    questionData = allQuestions;
    setAlength(allQuestions.length);
    questionData.sort(compare_interesting);
    setAllQuestions(questionData);
    setquestions(
        <div class="row">
          {questionData.map((question) => (
            <div key={question} id="QuestionCard">
              <QuestionCard question={question} />
            </div>
          ))}
        </div>
      );
    setProfile(<ProfileOverview />);
  };

  const handleInteresting = (e) => {
    getInterestingQuestions();
  };

  const handleHot = (e) => {
    questionData = allQuestions;
    setAlength(allQuestions.length);
    questionData.sort(compare_hot);
    setquestions(
        <div class="row">
          {questionData.map((question) => (
            <div key={question} id="QuestionCard">
              <QuestionCard question={question} />
            </div>
          ))}
        </div>
      );
    setProfile(<ProfileOverview />);
  };

  const handleScore = (e) => {
    questionData = allQuestions;
    setAlength(allQuestions.length);
    questionData.sort(compare_score);
    setquestions(
        <div class="row">
          {questionData.map((question) => (
            <div key={question} id="QuestionCard">
              <QuestionCard question={question} />
            </div>
          ))}
        </div>
      );
    setProfile(<ProfileOverview />);
  };

  const handleUnquestioned = (e) => {
    axios.get("/question/unquestioned").then((res) => {
      if (res) {
        questionData = res.data;
        setAlength(res.data.length);
        setquestions(
          <div className="row">
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
  };

  const columns = [
    {
      name: "",
      selector: (row) => questions,
      width: "100%",
    },
  ];
  return (
    <div>
      <div className="container">
        <div className="row">
          <h2> Questions tagged [{inputTag}]</h2>
          <br></br>
          <br></br>
          <br></br>
          <div>{tag && tag.description}</div>
          <h4>Total Questions {allQuestions && allQuestions.length}</h4>
          
          <div className="col">
            <div
              className="btn-group float-end"
              role="group"
              aria-label="Basic outlined example"
            >
              <form>

                <button
                  className="btn btn-primary m-2"
                  formAction="/questions/ask"
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
                onClick={handleInteresting}
                type="button"
                className="btn btn-outline-secondary"
                autoFocus
              >
                Interesting
              </button>
              <button
                onClick={handleHot}
                type="button"
                className="btn btn-outline-secondary"
              >
                Hot
              </button>
              <button
                onClick={handleScore}
                type="button"
                className="btn btn-outline-secondary"
              >
                Score
              </button>
              <button
                onClick={handleUnquestioned}
                type="button"
                className="btn btn-outline-secondary"
              >
                Unanswered
              </button>
            </div>
          </div>
        </div>

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

export default TagPage;
