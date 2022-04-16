import React, { Component } from "react";
import { Form, Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

class Register extends Component {
  
  constructor(props){
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm_password: ""
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

    const {firstName, lastName, email, password, confirm_password} = this.state; 

    const user = {firstName: firstName, lastName: lastName, email: email, password: password}
    console.log(user)
  };

  render() {

    return ( 
      
    <div>
        <Container>
        <div class="container" style={{width:"40%"}}>
            <br />
        <div>
            <h1>Join the Stack Overflow community</h1>
        </div>
        <br/>
            <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formDisplayName">
              <Form.Label>Display name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" name="firstName" value={this.state.firstName} onChange={this.handleChange}  />
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
        <div class="container" >
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
