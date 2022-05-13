import axios from "axios";
import React, { Component, useEffect } from "react";
import { Form } from "react-bootstrap";
import {
  Nav,
  NavBarLogoImage,
  NavbarSearch,
  NavbarLink,
  NavMenu,
  NavButton,
  NavButtonLink,
  SearchInput,
  SearchHelp,
  Top,
  Bottom,
  ColumnOne,
  ColumnTwo,
} from "./NavbarElements";
import SearchBar from "./Searchbar";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { check: false , query: ""};
    // window.addEventListener('click',(e)=>this.hideComponent(e));
  }

  hideComponent(e) {
    if (this.state.check === true) {
      this.setState({ check: false });
    }
  }
  handleProfileClick() {
    localStorage.setItem("notOwnerID", localStorage.getItem("userID"));
  }
  
  handleParseInput = (e) => {
    console.log("made it here 123")
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state.query)
  }
  handleSubmit = (e) => {
    console.log(this.state.query)
    let final_query = this.state.query;

    // search via Tag
    if(final_query.slice(0,1) === "["){
      var n1 = final_query.lastIndexOf(']');
      var result1 = final_query.substring(1, n1);
      console.log(result1 + " this is tag result");
      const data1 = {"tag": result1.trim()};
      window.location = "/tags/" + result1;
      // axios.post("/user/profile/questions", data1).then((response) => {
      //   if (response) {
      //     console.log(response.data);
      //   } else {
      //     console.log("Error retrieving questions");
      //   }
      // });
    }

     // search via User
    if(final_query.slice(0,4) === "user" || final_query.slice(0,4) === "USER" ){
      // console.log(final_query.slice(-4) + " This is when -4");
      var n = final_query.lastIndexOf(':');
      var result = final_query.substring(n + 1);
      console.log("this is result " + result.trim());
      const data = {"user" : result.trim()};
      axios.post("/user/profile/questions", data).then((response) => {
        if (response) {
          console.log(response.data);
        } else {
          console.log("Error retrieving questions");
        }
      });
    }

  }
  render() {
    let loggedInDiv = null;
    let loggedOutDiv = null;
    if (localStorage.getItem("token")) {
      loggedOutDiv = (
        <NavButton>
          <NavButtonLink to="/logout">Logout</NavButtonLink>
        </NavButton>
      );
    } else {
      loggedOutDiv = (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <NavButton>
            <NavButtonLink to="/login">Login</NavButtonLink>
          </NavButton>
          <NavButton>
            <NavButtonLink to="/register">Register</NavButtonLink>
          </NavButton>
        </div>
      );
    }
    return (
      <Nav>
        <NavbarLink to="/">
          <NavBarLogoImage src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.png"></NavBarLogoImage>
        </NavbarLink>
        <NavMenu>
          <NavbarLink onClick={this.handleProfileClick} to="/profile">
            Profile
          </NavbarLink>
          <NavbarLink to="/messages">My Messages</NavbarLink>
        </NavMenu>
        <NavbarSearch
          onClick={(e) =>
            this.setState((prevState) => ({ check: !prevState.check }))
          }
        ><SearchInput name="query" onChange={this.handleParseInput}></SearchInput>
          {this.state.check ? (
            <SearchHelp>
              <Top>
                <ColumnOne>
                  <p>[tag] search within a tag</p>
                  <p>user: 1234 search by author</p>
                  <p>"Words here" exact phrase</p>
                </ColumnOne>
                <ColumnTwo>
                  <p>is: question type of post</p>
                  <p>isaccepted:yes search within status</p>
                </ColumnTwo>
              </Top>
              <Bottom>
                <NavButton>
                  <NavButtonLink to="/" onClick={this.handleSubmit}>Ask a Question</NavButtonLink>
                </NavButton>
              </Bottom>
            </SearchHelp>
          ) : (
            ""
          )}
        </NavbarSearch>
        {loggedInDiv}
        {loggedOutDiv}
      </Nav>
    );
  }
}

export default Navbar;
