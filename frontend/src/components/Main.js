import React, {Component} from "react";
import {Routes, Route} from "react-router-dom";
import Login from "./Login/Login";
import Navbar from "./Navbar/Navbar";
import QuestionsOverview from "../components/QuestionsOverview/QuestionsOverview.js";
import TagOverview from "../components/Tags/TagOverview.js";
import QuestionPosting from "../components/QuestionPosting/QuestionPosting.js";

class Main extends Component {
    render() {
        return (
            <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>

                <Routes>
                    <Route exact path="/" element={<Navbar/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route path="/questions/:id" element={<QuestionsOverview/>}/>
                    <Route path="/questions/ask" element={<QuestionPosting/>}/>
                    <Route path="/tags" element={<TagOverview/>}/>
                </Routes>
            </div>
        );
    }
}

export default Main;