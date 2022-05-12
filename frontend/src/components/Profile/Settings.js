//This tab handles editing the user's profile information
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage_bucket } from "../../firebase/firebaseConfig";

function SettingsTab(props) {
  const [user, setUser] = useState();
  const [displayName, setDispalyName] = useState();
  const [location, setLocation] = useState();
  const [title, setTitle] = useState();
  const [aboutMe, setAboutMe] = useState();
  const [fullName, setFullName] = useState();
  const [image, setImage] = useState(
    "https://bootdey.com/img/Content/avatar/avatar7.png"
  );

  useEffect(() => {
    
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get("/user/profile", { params: {userID: localStorage.getItem("userID") } })
      .then((response) => {
        let userDetails = response.data;
        console.log("userDetails are : " + JSON.stringify(userDetails));
        setUser(userDetails);
        setDispalyName(userDetails.displayName);
        setLocation(userDetails.location);
        setTitle(userDetails.title);
        setAboutMe(userDetails.aboutMe);
        setFullName(userDetails.fullName);
        if (userDetails.profileImageName != null) setImage(userDetails.profileImageName);
        console.log("iiiiiiiiiiii " + image)
      });
  }, []);
  

  const handleDisplayNameChange = (e) => {
    setDispalyName(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleAboutMeChange = (e) => {
    setAboutMe(e.target.value);
  };
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0] != null) {
        console.log(e.target.files[0]);
        const storageRef = ref(storage_bucket, e.target.files[0].name);
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, e.target.files[0])
          .then((snapshot) => {
            return getDownloadURL(snapshot.ref);
          })
          .then((downloadURL) => {
            console.log("Download URL", downloadURL);
            setImage(downloadURL);
          });
      }
    }
  };
  const handleSaveChanges = (e) => {
    const userInfo = {
      id: localStorage.getItem("userID"),
      displayName: displayName,
      location: location,
      title: title,
      profileImageName: image,
      aboutMe: aboutMe,
      fullName: fullName,
    };
    console.log(" user info is : " + JSON.stringify(userInfo));
    // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .post("/user/profile/updateUser", userInfo)
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("updated user is : ", response.data);
        alert("User information updated successfully");
      });
  }

  return (
      <Container>
      <div className="container bootstrap snippets bootdey">
        <h2>Edit Profile</h2>
        <hr />
        <div className="row">
          <div className="col-md-3">
            <div className="text-center">
              <img
                src={image}
                className="avatar img-circle img-thumbnail"
                alt="avatar"
              />
              <h6>Upload a different photo...</h6>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="col-md-9 personal-info">
            <h3>Personal info</h3>

            <form className="form-horizontal" role="form">
              <div className="form-group">
                <label className="col-lg-3 control-label">Display Name:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    value={displayName}
                    onChange={handleDisplayNameChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Location:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    value={location}
                    onChange={handleLocationChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">title:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    readonly
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-3 control-label">aboutMe:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    value={aboutMe}
                    onChange={handleAboutMeChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Full Name:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    value={fullName}
                    onChange={handleFullNameChange}
                  />
                </div>
              </div>
            

              <br />
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSaveChanges}
              >
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr />
    </Container>
  );
}


export default SettingsTab;
