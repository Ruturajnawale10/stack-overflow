import React, {Component} from 'react';
import {Nav,NavBarLogoImage,NavbarSearch,NavbarLink,NavMenu,NavButton,NavButtonLink,SearchInput,SearchHelp,Top,Bottom,ColumnOne,ColumnTwo} from './NavbarElements';

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {check:false}  
    }

    render(){
    return (
        <footer class="w-100 py-4 flex-shrink-0"  style={{color: "red", marginTop:"200px",zIndex:10,position:'absolute'}}>
        <div class="container py-4">
        <div class="row gy-4 gx-5">
            <div class="col-lg-4 col-md-6">
            <img src="/so.png" alt="My logo" style={{display:"block", marginLeft:"10px"}}/>
                <h5 class="h1 text-white" style={{marginTop:"20px"}}>STACK OVERFLOW</h5>
                <p class="small text-muted">CMPE 273</p>
                <p class="small text-muted mb-0">&copy; Copyrights. All rights reserved. </p>
            </div>
            <div class="col-lg-2 col-md-6">
                <h5 class="text-white mb-3"  >STACK OVERFLOW</h5>
                <ul class="list-unstyled text-muted">
                    <li><a href="#" style={{color: "gray"}}>Questions</a></li>
                    <li><a href="#" style={{color: "gray"}}>Help</a></li>
                </ul>
            </div>
            <div class="col-lg-2 col-md-6">
                <h5 class="text-white mb-3">PRODUCTS</h5>
                <ul class="list-unstyled text-muted">
                    <li><a href="#" style={{color: "gray"}}>Teams</a></li>
                    <li><a href="#" style={{color: "gray"}}>Advertising</a></li>
                    <li><a href="#" style={{color: "gray"}}>Colllectives</a></li>
                    <li><a href="#" style={{color: "gray"}}>Talent</a></li>
                </ul>
            </div>
            <div class="col-lg-2 col-md-6">
                <h5 class="text-white mb-3">COMPANY</h5>
                <ul class="list-unstyled text-muted">
                    <li><a href="#"  style={{color: "gray"}} >About</a></li>
                    <li><a href="#" style={{color: "gray"}} >Press</a></li>
                    <li><a href="#" style={{color: "gray"}}>Work Here</a></li>
                    <li><a href="#" style={{color: "gray"}}>Legal</a></li>
                    <li><a href="#" style={{color: "gray"}}>Privacy Policy</a></li>
                    <li><a href="#" style={{color: "gray"}}>Terms of Service</a></li>
                    <li><a href="#" style={{color: "gray"}}>Contact Us</a></li>
                    <li><a href="#" style={{color: "gray"}}>Cookie Settings</a></li>
                    <li><a href="#" style={{color: "gray"}}>Cookie Policy</a></li>
                </ul>
            </div>
            <div class="col-lg-2 col-md-6">
                <h5 class="text-white mb-3">STACK EXCHANGE NETWORK</h5>
                <ul class="list-unstyled text-muted">
                    <li><a href="#" style={{color: "gray"}}>Technology</a></li>
                    <li><a href="#" style={{color: "gray"}}>Culture & Recreation</a></li>
                    <li><a href="#" style={{color: "gray"}}>Lifa & Arts</a></li>
                    <li><a href="#" style={{color: "gray"}}>Science</a></li>
                    <li><a href="#" style={{color: "gray"}}>Professional</a></li>
                    <li><a href="#" style={{color: "gray"}}>Business </a></li>
                    <li><a href="#" style={{color: "gray"}}>API</a></li>
                    <li><a href="#" style={{color: "gray"}}>DATA</a></li>
               
                </ul>
            </div>
        </div>
    </div>
    </footer>
        )
    }
}

export default Footer;