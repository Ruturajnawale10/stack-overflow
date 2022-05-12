import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import QuestionsOverview from "../components/QuestionsOverview/QuestionsOverview.js";
import AllQuestions from "../components/AllQuestions/AllQuestions";
import TagOverview from "../components/Tags/TagOverview.js";
import TagPage from "../components/Tags/TagPage.js";
import QuestionPosting from "../components/QuestionPosting/QuestionPosting.js";
import AddTag from "./Admin/AddTags";
import Sidebar from "./Sidebar/Sidebar";
import LayoutComponent from "./LayoutComponent/LayoutComponent";
import ApprovalQuestions from "./Admin/ApprovalQuestions/ApprovalQuestions";
import QuestionsReview from "./Admin/ApprovalQuestions/QuestionsReview";
import AnalyticsDashboard from "./Admin/Analytics/AnalyticsDashboard";
import ProfileOverview from "./Profile/ProfileOverview";
import UserSearch from "./Users/UserSearch";
import Register from "./Register/Register";
import Logout from "./Logout";
import Messages from "../components/Messages/Messages.js";
import PostActivity from "./PostActivity/PostActivity";

class Main extends Component {
  render() {
    return (
      <div>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        ></link>
        {/* <Navbar/> */}
        {/* <Sidebar/> */}
        <LayoutComponent>
          <Routes>
            {/* <Route exact path="/" element={<Navbar/>}/> */}

            <Route path="/" element={<AllQuestions />} />
            <Route exact path="/login" element={<Login />} />
            <Route
              path="/questions/:questionID"
              element={<QuestionsOverview />}
            />
            <Route
              path="/tags/:inputTag"
              element={<TagPage />}
            />
            <Route path="/allQuestions" element={<AllQuestions />} />
            <Route path="/questions" element={<AllQuestions />} />
            <Route path="/questions/ask" element={<QuestionPosting />} />
            <Route path="posts/:questionID" element={<PostActivity/>}/>
            <Route path="posts/:questionID/:answerID" element={<PostActivity/>}/>
            <Route path="/tags" element={<TagOverview />} />
            <Route path="/user" element={<UserSearch />} />
            <Route path="/profile" element={<ProfileOverview />} />
            <Route path="/admin/tags/add" element={<AddTag />} />
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/logout" element={<Logout/>}/>
            <Route exact path="/Messages" element={<Messages/>}/>
            <Route
              path="/admin/questions/review"
              element={<ApprovalQuestions />}
            />
            <Route
              path="/admin/questions/review/:questionID"
              element={<QuestionsReview />}
            />
            <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
          </Routes>
        </LayoutComponent>
      </div>
    );
  }
}

export default Main;
