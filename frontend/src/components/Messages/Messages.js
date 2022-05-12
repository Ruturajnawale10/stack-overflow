import React, { useState, useEffect } from "react";
import MyMessage from "./ResponseCard";
import AnswerCard from "./AnswerCard";
import ProfileOverview from "./ProfileOverview";
import { NavLink as Link } from 'react-router-dom';
import axios from 'axios';
import "../../App.css";
import OnlineUsers from "./OnlineUsers";
import moment from 'moment';
function Messages() {
  const [answers, setAnswers] = useState(null);
  const [mymessage, setMyMessage] = useState(null);
  const [online, setOnlineUsers] = useState(null);
  //const [tags, setTags] = useState(null);
  const [profile, setProfile] = useState(null);
  const [alenght, setAlength] = useState(null);
  const [input, setSearchValue] = useState('');
  const [sendvalue, setSendValue] = useState('');
  let answersData='';
  //var input ="";
  //var sendvalue ="";
 //var alenght=0;
  useEffect(() => {

  //  axios.get('/question/',{data:"hi"})
 //   .then(res => {
		var res = 1;
        console.log(res)
        if(res){
           // console.log(res.data)
            // answersData = res.data;
            //setAlength(res.data.length) 

        /*    setOnlineUsers(
              <div class="row">
                {answersData.map((a) => (
                  <div key={a} id="answercard">
                    <OnlineUsers item={a} />
                  </div>
                ))}
              </div>
            );*/
           
        }else{

        }
  //  });  

    axios.get("/user/profile/all").then((response) => {
      if (response) {
        console.log(response);


		       setOnlineUsers(
              <div class="row">
                {response.data.map((online) => (
                  <div key={online} id="answercard">
                    <OnlineUsers item={online} />
                  </div>
                ))}
              </div>
            );

      } else {
        console.log("Error retrieving profiles");
      }
    });

    setProfile(<ProfileOverview />);
 

  }, []);


  const handleChange = (e) => {
    //this.input.setSt= e.target.value;
	setSearchValue(e.target.value);
  }
 

  const handleChangemessage = (e) => {
	setSendValue(e.target.value);
	
 }
  const handleSearch = () => {
	if(input.length >0){   
    axios.get("/user/profile/all").then((response) => {
		if (response) {
		  console.log("inside handle")
		  console.log(response);
		  console.log(input)
		  console.log("inside handle")
			var user ={}
			 //user['data']['items'] = response.data.items[input];

			 const arrayWithFilterObjects= response.data.filter((o) => o.displayName === input);
			 user['data'] = {'item': arrayWithFilterObjects}
			 //user['data']['item'] = arrayWithFilterObjects;
			 console.log("find")
			 console.log(arrayWithFilterObjects)
			 console.log("find")
	if(arrayWithFilterObjects.length>0){
				 setOnlineUsers(
				<div class="row">
				  {//user.data.map((online) => (
					<div key={arrayWithFilterObjects[0]} id="answercard">
					  <OnlineUsers item={arrayWithFilterObjects[0]} />
					</div>
		}
				  
				</div>
			  );
	}
  
		} else {
		  console.log("Error retrieving profiles");
		}
	  });


	  //get messages between two users
	  var data ={'from':localStorage.getItem('userName'),'to':input}
	  axios.post("/messages/getMessage",data).then((response) => {
		console.log("inside messages")
		console.log(data)
		console.log("inside messages")
		if (response) {
			console.log("inside messages response")
		  console.log(response);
		  console.log("inside messages response")

		   //var allresponses = response.data[0]
		   var allr = [...new Set([...response.data[0] ,...response.data[1]])];
		   
		   console.log("Before")
		   console.log(allr)
		   console.log("Before")
		   allr.sort((a,b) => Date.parse(moment(b.createdAt).format()) - Date.parse(moment(a.createdAt).format()))
		   allr.reverse();
		   console.log("After")
		   console.log(allr)
		   console.log("After")
		   
		   //var sortedArray = allr.sort((a,b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
		  setAnswers(
			<div class="row">
			  {allr.map((answer) => (
				<div key={answer} id="answercard">
				  <AnswerCard item={answer} />
				</div>
			  ))}
			</div>
			
		  );
		  /*
		  setMyMessage(
			<div class="row">
			  {response.data[1].map((message) => (
				<div key={message} id="answercard">
				  <MyMessage item={message} />
				</div>
			  ))}
			</div>
			
		  );*/





		} else {
		  console.log("Error retrieving profiles");
		}
	  });


	}else{


		axios.get("/user/profile/all").then((response) => {
			if (response) {
			  console.log(response);
	  
	  
					 setOnlineUsers(
					<div class="row">
					  {response.data.map((online) => (
						<div key={online} id="answercard">
						  <OnlineUsers item={online} />
						</div>
					  ))}
					</div>
				  );
	  
			} else {
			  console.log("Error retrieving profiles");
			}
		  });



	}
  };

  const HandleSend = () => {
	var data ={'from':localStorage.getItem('userName'),'to':input,'content':sendvalue}
	console.log("send data")
	console.log(data)
	console.log("send data")
    axios.post("/messages/addMessage",data).then((response) => {
		if (response) {
		  console.log("inside send handle")
		  console.log(response);
		  console.log("inside send handle")

   	  //get messages between two users
		 var data ={'from':localStorage.getItem('userName'),'to':input}
		 axios.post("/messages/getMessage",data).then((response) => {
		   console.log("inside messages")
		   console.log(data)
		   console.log("inside messages")
		   if (response) {
			   console.log("inside messages response")
			 console.log(response);
			 console.log("inside messages response")
			//var allr = []
			//allr.concat(response.data[0],response.data[1])
		  //var allresponses = response.data[0]
		  var allr = [...new Set([...response.data[0] ,...response.data[1]])];
		   
		  console.log("Before")
		  console.log(allr)
		  console.log("Before")
		  allr.sort((a,b) => Date.parse(moment(b.createdAt).format()) - Date.parse(moment(a.createdAt).format()))
		  allr.reverse();
		  console.log("After")
		  console.log(allr)
		  console.log("After")
		  
			 setAnswers(
				<div class="row">
				  {allr.map((answer) => (
					<div key={answer} id="answercard">
					  <AnswerCard item={answer} />
					</div>
				  ))}
				</div>
				
			  );

			  /*
			  setMyMessage(
				<div class="row">
				  {response.data[1].map((message) => (
					<div key={message} id="answercard">
					  <MyMessage item={message} />
					</div>
				  ))}
				</div>
				
			  );*/
   
   
   
		   } else {
			 console.log("Error retrieving profiles");
		   }
		 });
		} else {
		  console.log("Error retrieving profiles");
		}
	  });


	 
  };

  return (
    
    <div>
      <main class="content">
    <div class="container p-0">

		<h1 class="h3 mb-3">Messages</h1>

		<div class="card">
			<div class="row g-0">
				<div class="col-12 col-lg-5 col-xl-3 border-right">

					<div class="px-4 d-none d-md-block">
						<div class="d-flex align-items-center">
							<div class="flex-grow-1">
								<input type="text" class="form-control my-3" placeholder="Search..." onChange={ handleChange } ></input>
								<button
								 onClick={handleSearch}
                  class="btn btn-primary m-2">
    Search
                </button>
							</div>
						</div>
					</div>
					{online}
		
					<hr class="d-block d-lg-none mt-1 mb-0"></hr>
				</div>
				<div class="col-12 col-lg-7 col-xl-9">
	

					<div class="position-relative">
						<div class="chat-messages p-4">
						{answers}
						{mymessage}
						</div>
					</div>

					<div class="flex-grow-0 py-3 px-4 border-top">
						<div class="input-group">
							<input type="text" class="form-control" placeholder="Type your message" onChange={ handleChangemessage }></input>
							
							<button
								 onClick={HandleSend}
                  class="btn btn-primary">
                  Send
                </button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</main>
     
    </div>
  );
}

export default Messages;
