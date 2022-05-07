import React, { Component } from "react";
import profileImage from "../../images/smiling-minato.jpg";
import axios from "axios";
import "../../App.css";

class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      searchTerm: "",
    };
    this.setSearchTerm = this.setSearchTerm.bind(this);
  }
  setSearchTerm = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };
  handleUserPage(e) {
    e.preventDefault();
    localStorage.setItem("notOwnerID", e.target.value);
    window.location.href = "/profile";
  }
  componentDidMount() {
    axios.post("/user/getProfiles").then((response) => {
      if (response) {
        console.log(response);
        this.setState({
          profiles: response.data,
        });
      } else {
        console.log("Error retrieving profiles");
      }
    });
  }
  render() {
    //one row, three columns
    return (
      <div>
        <div>
          <h2>Users</h2>
        </div>
        <div style={{ width: "20%" }} class="form-group">
          <input
            onChange={this.setSearchTerm}
            type="text"
            name="term"
            placeholder="Filter by user"
          />
        </div>
        <div class="row">
          {this.state.profiles
            .sort((a, b) => {
              return b.reputation - a.reputation;
            })
            .filter((val) => {
              if (this.state.searchTerm == "") {
                //return all profiles by default
                return val;
              } else if (
                //this.state.searchTerm.length > 0 &&
                //this.state.searchTerm.length < 3 &&
                val.displayName
                  .toLowerCase()
                  .includes(this.state.searchTerm.toLowerCase())
              ) {
                //return all profiles if searchTerm is less than 3
                return val;
              } //else if (
              //this.state.searchTerm.length > 3 &&
              //val.name
              //.toLowerCase()
              //.includes(this.state.searchTerm.toLowerCase())
              //) {
              //return all profiles if searchTerm is less than 3
              //return val;
              //}
            })

            .map((profile) => {
              return (
                <div class="row" style={{ height: "82px", width: "230px" }}>
                  <div class="col-md-3">
                    <img
                      src={profileImage}
                      style={{ height: "48px", width: "48px" }}
                    ></img>
                  </div>
                  <div
                    class="col-md-3"
                    style={{
                      height: "80px",
                      width: "120px",
                      marginLeft: "15px",
                    }}
                  >
                    <button
                      class="btn btn-link btn-sm"
                      type="button"
                      value={profile._id}
                      onClick={this.handleUserPage}
                      style={{ fontSize: "10px", padding: "0px" }}
                    >
                      {profile.displayName}
                    </button>
                    <p style={{ fontSize: "12px", margin: "0px" }}>
                      {profile.location}
                    </p>
                    <p style={{ fontSize: "10px", margin: "0px" }}>
                      {profile.reputation}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default UserSearch;
