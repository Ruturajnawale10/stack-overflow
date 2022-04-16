import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Container } from "react-bootstrap";

class Login extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {email, password } = this.state;
    console.log(email, password);
  }

  handleReg(event){
    event.preventDefault();
    window.location = "/register";
  }

  render() {

    return ( 
      
    <div>
        <Container>
        <div class="mx-auto mb24 p24 wmx3 bg-white bar-lg bs-xl mb24" style={{width:"40%"}}>
            <img src="/so.png" alt="My logo" />
            <br />
        <div>
            <h1 class="ta-center fs-title mx-auto">Login</h1>
        </div>
        <br />
        <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="d-flex justify-content-start" >Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} />
        </Form.Group>
         <br />
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="d-flex justify-content-start">Password  
          <Container className="d-flex justify-content-end"  >
          <a class="d-flex justify-content-start" href="/">Forgot Password?</a> 
              </Container>
            </Form.Label> 
          <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
        <br/>
        <br></br>
        <Form.Text className="text-muted">
            Dont have an account? <a href='/register'>Sign Up</a>
          </Form.Text>
          <br></br>
          <br></br>
          <Form.Text className="text-muted">
            Are you an employer? <a href='/'>Sign up on Talent</a>
          </Form.Text>
        </div>
        </Container>
    </div>
      );
    } 
}
export default Login;