import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import bootstrap from 'bootstrap';
//import {Redirect} from 'react-router';
//import Navbar from '../LandingPage/Navbar';
//import Button from 'react-bootstrap/Button'; 


//import { useNavigation } from 'react-navigation';
//import { useNavigation } from '@react-navigation/native';
class AllQuestions extends Component {
    constructor(props){
        super(props);
        this.state = {  
            products : [],
            term: "",
            minPrice: 0.00,
            maxPrice: 0.00,
            selectedOption: "price",
            outOfStock: false,
            authFlag: true,
            shopname:""
        }
        this.termChangeHandler = this.termChangeHandler.bind(this);
      //  this.handleshopclick = this.handleshopclick.bind(this);
        this.minPriceChangeHandler = this.minPriceChangeHandler.bind(this);
        this.maxPriceChangeHandler = this.maxPriceChangeHandler.bind(this);
        this.selectedOptionChangeHandler = this.selectedOptionChangeHandler.bind(this);
        this.outOfStockOptionChangeHandler = this.outOfStockOptionChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        //this.handleClickFavorites = this.handleClickFavorites(this);

    }  


    //
    handleClickFavorites (e){
        //e.stopPropagation();
        // access to e.target here
        console.log(e.target.value);

        const data={
            username: cookie.load('cookie'),
            itemname:e.target.value
        }
        axios.post('http://localhost:3001/addfavorites',data)
                .then((response) => {


                    if(response.status === 200){
                        console.log("passed favorites")
                    } else if(response.status === 201){
                        console.log("INVALID DATA  favorites")
                    }

                //update the state with the response data
              //  this.setState({
              //      books : this.state.books.concat(response.data) 
               // });
            });


    }

    
    handleshopclick (e){
        //e.stopPropagation();
        // access to e.target here
        console.log(e.target.value);


        let d = new Date();
        d.setTime(d.getTime() + (25*60*1000));
        document.cookie = "shopname" +'='+ e.target.value +'; Path=/;';
        window.location.href='/shop'
       // cookie.set("shopname", e.target.value, {path: "/", expires: d});
    }
    handleOverviewClick (e){
        //e.stopPropagation();
        // access to e.target here
        console.log(e.target.value);

  


        let d = new Date();
        d.setTime(d.getTime() + (25*60*1000));
        document.cookie = "itemname" +'='+ e.target.value +'; Path=/;';
        window.location.href='/Overview'
       // cookie.set("shopname", e.target.value, {path: "/", expires: d});
    }
    
   //Call the Will Mount to set the auth Flag to false
   componentWillMount(){
    this.setState({
        authFlag : true,
        products: [],
    })
}
    //username change handler to update state variable with the text entered by the user
    termChangeHandler= (e) => {
        this.setState({
            term : e.target.value
        })
    }
    //username change handler to update state variable with the text entered by the user
    minPriceChangeHandler= (e) => {
        this.setState({
            minPrice : e.target.value
        })
    }
    //username change handler to update state variable with the text entered by the user
    maxPriceChangeHandler= (e) => {
        this.setState({
            maxPrice : e.target.value
        })
    }
    selectedOptionChangeHandler=(e)=>{
        this.setState({
            selectedOption:e.target.value
        })
    }
    outOfStockOptionChangeHandler=(e)=>{
        this.setState({
            outOfStock:true
        })
    }


    componentDidMount(){
        const data={
            username: cookie.load('cookie'),

        }
        axios.post('http://localhost:3001/getallshop',data)
                .then((response) => {


                    if(response.status === 200){
                        this.setState({
                            
                            products : this.state.products.concat(response.data) 
                        })
                    } else if(response.status === 201){
                        this.setState({
                            
                            products : this.state.products.concat(response.data)  
                        })
                    }

                //update the state with the response data
              //  this.setState({
              //      books : this.state.books.concat(response.data) 
               // });
            });
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
    //var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
        term : this.state.term,
        minPrice: this.state.minPrice,
        maxPrice: this.state.maxPrice,
        selectedOption: this.state.selectedOption,
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/getfiletered',data)
        .then(res => {
            if(res){
                console.log(res)
                this.setState({
                    authFlag : false,
                    products : (res.data)
                })
               
            }else{
                this.setState({
                    authFlag : true,
                    
                })
            }
        });  
}


    render(){

        return(
            <div>
              
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel"> Filter</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
  
                        <br/>
                        <p>Filter by Tag</p>
                        <div style={{width: '15%'}} class="form-group">
                                <input onChange = {this.minPriceChangeHandler} type="number" class="form-control" name="minPrice" placeholder="tag"/>
                        </div>
                        <p>Sort  By: </p>
                        <div class="form-check">
                                <label>
                                    <input type= "radio" name="sortType" value="price" checked={this.state.selectedOption ==="price"}  onChange = {this.selectedOptionChangeHandler} class="form-check-input" />
                                    Newest
                                </label> 
                        </div>
                        <div class="form-check">
                                <label>
                                    <input type= "radio" name="sortType" value="quantity" checked={this.state.selectedOption ==="quantity"}  onChange = {this.selectedOptionChangeHandler} class="form-check-input" />
                                    Recent Activity
                                </label> 
                        </div>
                        <div class="form-check">
                                <label>
                                    <input type= "radio" name="sortType" value="salesCount" checked={this.state.selectedOption ==="salesCount"}  onChange = {this.selectedOptionChangeHandler} class="form-check-input" />
                                    Highest Score
                                </label> 
                        </div>
                        <div class="form-check">
                                <label>
                                    <input type= "radio" name="sortType" value="salesCount" checked={this.state.selectedOption ==="salesCount"}  onChange = {this.selectedOptionChangeHandler} class="form-check-input" />
                                    Most Frequent
                                </label> 
                        </div>
             
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Search</button>
      </div>
    </div>
  </div>
</div>
                <div class="container">
                <h2>All Questions</h2>
                    <br/>
      <div class="row">
      <div class="col">
 
    </div>
    <div class="col">
   
    </div>
    <div class="col">
    <div class="btn-group float-end" role="group" aria-label="Basic outlined example">
                     <button type="button" class="btn btn-primary">Ask Question</button>
                     </div>
    </div>


</div>

                 
                    <div class="btn-group float-end" role="group" aria-label="Basic outlined example">
  <button type="button" class="btn btn-outline-secondary">Newest</button>
  <button type="button" class="btn btn-outline-secondary">Active</button>
  <button type="button" class="btn btn-outline-secondary">Bountied</button>
  <button type="button" class="btn btn-outline-secondary">Unanswered</button>
<button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Filter
</button>
</div>

  
            
                        
                        <br/>
                         <table class="table">
                            <thead>
                                <tr>
                                    <th>Questions</th>
                                    
    
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {/*details*/}
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default AllQuestions;
