import React, { useState, useEffect } from "react";
import AnswerCard from "./AnswerCard";
import ProfileOverview from "./ProfileOverview";
import { NavLink as Link } from 'react-router-dom';
import axios from 'axios';
import "../../App.css";
import OnlineUsers from "./OnlineUsers";
function Messages() {
  const [answers, setAnswers] = useState(null);
  const [online, setOnlineUsers] = useState(null);
  //const [tags, setTags] = useState(null);
  const [profile, setProfile] = useState(null);
  const [alenght, setAlength] = useState(null);
  let answersData='';
  let input ="";
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
			answersData =[1,2,3,4]
            setAnswers(
              <div class="row">
                {answersData.map((answer) => (
                  <div key={answer} id="answercard">
                    <AnswerCard item={answer} />
                  </div>
                ))}
              </div>
            );
			answersData =[1,2,3,4]
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
  

    console.log("answerdata")
    console.log(answersData)
    console.log("answerdata")
    setProfile(<ProfileOverview />);
 

  }, []);


  const handleChange = (e) => {
     input= e.target.value;
  }

  const handleSearch = () => {

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
	
				 setOnlineUsers(
				<div class="row">
				  {//user.data.map((online) => (
					<div key={arrayWithFilterObjects[0]} id="answercard">
					  <OnlineUsers item={arrayWithFilterObjects[0]} />
					</div>
		}
				  
				</div>
			  );
  
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
								<input type="text" class="form-control my-3" placeholder="Search..." onChange={ handleChange }></input>
								<button
								 onClick={handleSearch}
                  class="btn btn-primary m-2">
                  {" "}
                  Search{" "}
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

							<div class="chat-message-right pb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:33 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
									<div class="font-weight-bold mb-1">You</div>
									Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
								</div>
							</div>

							<div class="chat-message-left pb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:34 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
									<div class="font-weight-bold mb-1">Sharon Lessman</div>
									Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
								</div>
							</div>

							<div class="chat-message-right mb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:35 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
									<div class="font-weight-bold mb-1">You</div>
									Cum ea graeci tractatos.
								</div>
							</div>

							<div class="chat-message-left pb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:36 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
									<div class="font-weight-bold mb-1">Sharon Lessman</div>
									Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit.
									Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.
								</div>
							</div>

							<div class="chat-message-left pb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:37 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
									<div class="font-weight-bold mb-1">Sharon Lessman</div>
									Cras pulvinar, sapien id vehicula aliquet, diam velit elementum orci.
								</div>
							</div>

							<div class="chat-message-right mb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:38 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
									<div class="font-weight-bold mb-1">You</div>
									Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
								</div>
							</div>

							<div class="chat-message-left pb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:39 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
									<div class="font-weight-bold mb-1">Sharon Lessman</div>
									Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
								</div>
							</div>

							<div class="chat-message-right mb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:40 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
									<div class="font-weight-bold mb-1">You</div>
									Cum ea graeci tractatos.
								</div>
							</div>

							<div class="chat-message-right mb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:41 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
									<div class="font-weight-bold mb-1">You</div>
									Morbi finibus, lorem id placerat ullamcorper, nunc enim ultrices massa, id dignissim metus urna eget purus.
								</div>
							</div>

							<div class="chat-message-left pb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:42 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
									<div class="font-weight-bold mb-1">Sharon Lessman</div>
									Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit.
									Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.
								</div>
							</div>

							<div class="chat-message-right mb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:43 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
									<div class="font-weight-bold mb-1">You</div>
									Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
								</div>
							</div>

							<div class="chat-message-left pb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:44 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
									<div class="font-weight-bold mb-1">Sharon Lessman</div>
									Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
								</div>
							</div>

						</div>
					</div>

					<div class="flex-grow-0 py-3 px-4 border-top">
						<div class="input-group">
							<input type="text" class="form-control" placeholder="Type your message"></input>
							<button class="btn btn-primary">Send</button>
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
