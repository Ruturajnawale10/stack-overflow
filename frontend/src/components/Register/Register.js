import React, { Component, useState } from "react";
import { Form, Container, Alert, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import DangerWarningBanner from "../WarningBanners/DangerWarningBanner.js";
import { useNavigate, useLocation, Link } from "react-router-dom";


const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$');

class Register extends Component {
  
  constructor(props){
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      DangerWarningBanner: "",
      passwordValid: false

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  


 async handleSubmit(event){

    event.preventDefault();

    const {displayName, email, password, confirmPassword} = this.state; 

    console.log(validPassword.test(password));

    const user = {displayName: displayName, email: email, password: password}
    console.log(user)

    if(validPassword.test(password)){
    axios.post("/user/register", {
      email: email,
      password: password,
      displayName: displayName
    }).then(response => {
      if (response.status === 200) {
      window.location = '/login';
    }
  })
  .catch(error => {
    console.log(error.response)
  });
  }
  else{
    console.log("made it here");
    this.setState({passwordValid: true});
    }
}
  
  render() {

    return ( 
    <div>
        <Container>
        {this.state.DangerWarningBanner}
        {this.state.passwordValid && (
          <Row>
            <Col></Col>
            <Col xs={6}>
              <Alert
                style={{
                  color: "black",
                  backgroundColor: "cornsilk",
                  borderColor: "darkgoldenrod",
                }}
                className="text-center"
              >
                <h5>
                  Not a valid password. Please try again!
                </h5>
                <p>Passwords must contain at least eight characters, including at least 1 letter and 1 number.</p>
              </Alert>
            </Col>
            <Col></Col>
          </Row>
          )}
        <div class="container" style={{width:"40%"}}>
            <br />
        <div>
            <h1 style={{textAlign: "center"}}>Join the Stack Overflow community</h1>
        </div>
        <br/>
            <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formDisplayName">
              <Form.Label>Display name</Form.Label>
              <Form.Control type="text" placeholder="Enter Display Name" name="displayName" value={this.state.displayName} onChange={this.handleChange}  autoFocus/>
            </Form.Group>
            <br/>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange}  />
            </Form.Group>
            <br/>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
              <Form.Text className="text-muted">
               Passwords must contain at least eight characters, including at least 1 letter and 1 number.
              </Form.Text>
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
          <br />
          <Form.Text className="text-muted">
             By clicking “Sign up”, you agree to our terms of service, privacy policy and cookie policy
              </Form.Text>
        </div>
        <br />
        <br />
        <div class="container" style={{textAlign:"center"}}>
        Already have an account? <a href="/">Log In </a>
        <br />
        <br />
        Are you an employer? <a href="/">Sing up on Talent</a>
        </div>
        </Container>
    </div>
      );
    } 
}

export default Register;
