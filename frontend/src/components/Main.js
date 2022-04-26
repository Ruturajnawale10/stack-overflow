import React, {Component} from "react";
import {Routes, Route} from "react-router-dom";
import Login from "./Login/Login";
import Navbar from "./Navbar/Navbar";
import AllQuestions from "./AllQuestions/AllQuestions";

class Main extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route exact path="/" element={<Navbar/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/AllQuestions" element={<AllQuestions/>}/>
                </Routes>
            </div>
        );
    }
}

export default Main;