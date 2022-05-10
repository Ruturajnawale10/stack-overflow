import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { Form, Container, Alert, Row, Col} from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [questionAskWarning, setQuestionAskWarning] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();
  console.log(location?.search?.split('=')[1]);

  useEffect(()=>{
    if(location?.search?.split('=')[1] === '/questions/ask'){
      setQuestionAskWarning(true);
    }
    if(localStorage.getItem("userID")){
      navigate('/')
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(email, password);
    axios.post('/user/login', {
      email: email,
      password: password
    }).then(response => {
      console.log(response)
      setToken(response.data)
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("userID", response.data.userID);
      localStorage.setItem("isAdmin", response.data.isAdmin);
      localStorage.setItem("userName", response.data.userName);
      window.location = "/";
  })
  .catch(error => {
    console.log(error);
    setMessage(error);
  });
  }

  function handleReg(event){
    event.preventDefault();
    window.location = "/register";
  }



    return ( 
    <div>
      <Container className="py-4" >
        { questionAskWarning &&

          <Row>
            <Col></Col>
            <Col xs={6}>
            <Alert style={{color: "black", backgroundColor: "cornsilk", borderColor: "darkgoldenrod"}} className="text-center" >
            <h5>You must be logged in to ask a question on Stack Overflow</h5>
              <p>
                Log in below or <Link  to="/register"> sign up </Link>
              </p>
            </Alert>
            </Col>
            <Col ></Col>
          </Row>
        }
        <div class="mx-auto mb24 p24 wmx3 bg-white bar-lg bs-xl mb24" style={{width:"40%"}}>
            <img src="/so.png" alt="My logo" style={{display:"block", margin:"auto"}}/>
            <br />
        <div>
            <h1 class="ta-center fs-title mx-auto" style={{textAlign: "center"}}>Login</h1>
        </div>
        <br />
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="d-flex justify-content-start" >Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        </Form.Group>
         <br />
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="d-flex justify-content-start">Password  
          <Container className="d-flex justify-content-end"  >
          <a class="d-flex justify-content-start" href="/">Forgot Password?</a> 
              </Container>
            </Form.Label> 
          <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
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
export default Login;