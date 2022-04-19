import React, {useState, useEffect} from "react";
import upArrow from "../../images/upArrow.png";
import downArrow from "../../images/downArrow.png";
import bookmark from "../../images/bookmark-regular.svg";
import activity from "../../images/clock-rotate-left-solid.svg";
import AnswerCard from "./AnswerCard";

function QuestionsOverview() {
    const [answers, setAnswers] = useState(null);

    useEffect(() => {
          let answersData = [1,2,3,4];
          setAnswers(
              <div class="row">
                {answersData.map((answer) => (
                  <div key={answer} id="answercard" className="col-xs-4">
                    <AnswerCard item={answer} />
                  </div>
                ))}
              </div>
          );
      }, []);

    return (
        <div>
            <div class="container">

                <div class="row">
                    <h2> Sort array of objects by string property value</h2>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        Asked 12 years, 9 months ago
                    </div>
                    <div class="col-md-2">
                        Modified  8 days ago
                    </div>
                    <div class="col-md-2">
                        Viewed   2.4m times
                    </div>
                </div>

                
                <div class="row" style={{marginTop:"10px"}}>
                    <div class="col-md-1" style={{marginTop:"10px"}}>

                        <div class="row">
                        <img src={upArrow} style={{width:"63px", height:"40px"}}></img>
                        </div>
                        
                        <div class="row">
                            <p style={{fontSize:"30px",marginLeft:"8px", marginTop:"3px"}}>0</p>
                        </div>

                        <div class="row">
                        <img src={downArrow} style={{width:"63px", height:"40px"}}></img>
                        </div>

                        <div class="row">
                        <img src={bookmark} style={{width:"60px", height:"50px", marginTop:"20px"}}></img>
                        </div>

                        <div class="row">
                        <img src={activity} style={{width:"60px", height:"50px", marginTop:"20px"}}></img>
                        </div>
                
                    </div>
                    <div class="col-md-10" style={{marginTop:"10px", marginLeft:"20px"}}>
                    <p>
                    I have an array of JavaScript objects:

                    var objs = [ 
                        &#123; first_nom: 'Lazslo', last_nom: 'Jamf'     &#125;,
                        &#123; first_nom: 'Pig',    last_nom: 'Bodine'   &#125;,
                        &#123; first_nom: 'Pirate', last_nom: 'Prentice' &#125;
                    ];

                    </p>

                    <div class="row" style={{marginTop:"10px", marginLeft:"20px"}}>
                    TAGS row
                    </div>

                    <div class="row" style={{marginTop:"10px", marginLeft:"20px"}}>
                    User profile row
                    </div>

                    <div class="row" style={{marginTop:"10px", marginLeft:"20px"}}>
                    <button type="button" class="btn btn-link">Add comment</button>
                    </div>

                </div>
                </div>   
                
                <hr class="solid"/>

                <div class="row" style={{marginTop:"10px"}}>
                    <h4>4 answers</h4>
                    {answers}
                </div>
            </div>
        </div>
    );
}

export default QuestionsOverview;