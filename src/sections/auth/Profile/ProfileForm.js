import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ../../components/Page
import './style.css';
import Axios from 'axios';
// @mui
import { Button, Typography, Box, Modal, Card } from '@mui/material';
import avtar from './avatar/avatar.png';
// ----------------------------------------------------------------------

export default function ProfileForm() {
  // const {userId} = useParams();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();
 

  const logoutRedirect = () => {
    // console.log('hii');
    navigate('/');
  };

  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [s3image, setS3image] = useState();
  const [hosid, setHosid] = useState();

  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const userId = loginData.id;
  // console.log(loginData.hosid);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem('token-info'));
    if (loginData) {
      setFname(loginData.fname);
      setLname(loginData.lname);
      setEmail(loginData.email);
      setS3image(loginData.s3image);
      setHosid(loginData.hosid);
      setIsLoggedin(true);
    } else {
      setFname('');
      setLname('');
      setEmail('');
      setS3image('');
      setHosid('');
      logoutRedirect();
    }

    // getLoginData(dataId)
  }, []);

  const [profile, setProfile] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (event) => {
    setProfile({
      ...profile,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-user-profile/${userId}`;

  const getLoginData = async (dataId) => {

   if(dataId === userId){
    // alert("Please");
    console.log(dataId);
    // console.log("dataId");
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/user-details/${dataId}`
    );
    const arr = await response.json();

    const userData = {
      id: arr.id,
      fname: arr.first_name,
      lname: arr.last_name,
      email: arr.email,
      s3image: arr.s3image,
      hos_id: arr.hos_id,
    };
    // console.log(userData);
    localStorage.setItem('token-info', JSON.stringify(userData));
    // alert("save image")
    window.location.reload();
   }else{
    alert("Please");
    // console.log(dataId);
   
  };
}
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('profile', profile.file);
    // console.log(data);
    Axios.post(url, data)
      .then((res) => {
        alert(res.data.message);
        const dataId = res.data.post;
        // console.log(dataId);
        // console.log(res);
        getLoginData(dataId)
      })

      .catch((err) => console.log(err));
  };

 
  // , {
  //   headers: { 'Access-Control-Allow-Origin': '*' },
  // }

  return (
    <>
      {isLoggedin ? (
      
          <section className="profile-screen-one">
            <div className="">
              <div className="row justify-content-center">
              {/* isEditing ? "Editing Row Item" : " Add Table Item" */}
                <form action=""  className="">
                  <div className="row justify-content-center">
                  
                    <div className="imagepor col-md-5 form-group align-self-center">
                 
                      {profile.filepreview !== null ? (
                        <img className="profile_profile_img" src={profile.filepreview} alt="" />
                      ) : (
                        <img className="profile_profile_img" src={s3image} alt="" />
                      )} 
                     
                      
                     
                    </div>
                    <div className=" add_img_div">
                      <label className="add_img_but">
                      {/* <i className="fas fa-edit add_faicon" />
                        <input
                          type="file"
                          className="form-control"
                          id="profile"
                          name="profile"
                          onChange={handleInputChange}
                          autoComplete="off"
                          style={{ display: 'none' }}
                        /> */}
                      </label>
                    </div>
                  </div>
                  </form>
                  {/* add_img_but */}
                  <div className="row justify-content-center mt-3">
                    {/* <div className="col-md-2 ">
                      <label className="add_img_but">
                        Add
                        <input
                          type="file"
                          className="form-control"
                          id="profile"
                          name="profile"
                          onChange={handleInputChange}
                          autoComplete="off"
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div> */}
                    {/* <div className="col-md-2 ">
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div> */}
                  </div>
                
                <div className="row justify-content-center mt-3 ml-5">
                  <div className="col-md-8  offset-md-3 align-self-center ">
                      Name {''}: <span>{fname} {lname}</span>
                  </div>
                </div>
                <div className="row justify-content-center ml-5">
                  <div className="col-md-8  offset-md-3 align-self-center ">
                    <p>
                      Email <span style={{marginLeft:'2px'}}>{''}:</span> <span>{email}</span>
                    </p>
                  </div>
                </div>
               
              </div>
            </div>
          </section>
       
      ) : (
        <h1>{" "}</h1>
      )}
    </>
  );
}
