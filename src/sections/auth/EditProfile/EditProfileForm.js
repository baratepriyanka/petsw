import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// ../../components/Page
import './style.css';
import Axios from 'axios';
// @mui
import { Button, Typography, Box, Modal, Card, Tooltip } from '@mui/material';
import avtar from './avatar/avatar.png';
// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};
export default function EditProfileForm() {
  // const { profileId } = useParams();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  const logoutRedirect = () => {
    navigate('/');
  };

  const [ProfileEdit, setProfileEdit] = useState([]);

  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [s3image, setS3image] = useState();
  const [hosid, setHosid] = useState();

  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const userId = loginData.id;

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem('token-info'));
    // console.log(loginData)
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

    async function getPatientEdit() {
      try {
        const response = await Axios.get(
          `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-user/${userId}`
        );
        // console.log(response.data);
        setProfileEdit(response.data);
      } catch (error) {
        console.log('Something is Wrong');
      }
    }
    getPatientEdit();
    // console.log(Object.keys(formErrors));
    
  }, [userId]);

  const [profile, setProfile] = useState({
    file: [],
    profile: null,
  });

  const handleInputChange = (event) => {
    setProfile({
      ...profile,
      file: event.target.files[0],
      profile: URL.createObjectURL(event.target.files[0]),
    });
  };
  const formVAlidations = {
    first_name: 50,
    last_name:50,
  };
  const formValidationName = {
    first_name: 'first name',
    last_name: 'last name',
    // email: 'a valid email'
  };
  const formValPattern = {
    first_name: 'first name',
    last_name: 'last name',
  };
  function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length  === 0) { // check if space is at beginning
      event.preventDefault();
    }
  }
  function handleChange(e) {
    setProfileEdit({
      ...ProfileEdit,
      [e.target.name]: e.target.value,
    });
    const value = e.target.value;
    const name=e.target.name;
    // console.log(namePattern===false)
    const namePattern = /^[a-zA-Z\s]*$/;
    const firstNamePattern = namePattern.test(value)

    if (value) {
      e.target.parentElement.querySelector('p').innerText = '';
      e.target.parentElement.querySelector('p').style.display = 'none';
    } else if (formValidationName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the ${formValidationName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    
    if (formVAlidations[name] && value.length > formVAlidations[name]) {
    e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formVAlidations[name]} character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    if (formValPattern[name] && firstNamePattern === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter the only character.`;
        e.target.parentElement.querySelector('p').style.display = 'block';
      }
  }
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

const [open, setOpen] = useState(false);
  const handleOpen = () => {
    // const errors = validate(ProfileEdit);
    // if (Object.keys(errors).length) {
    //   console.log(errors);
    //   setFormErrors(errors);
    //   setOpen(false);
    // } else {
    // }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
    // setTimeout(() => navigate('/dashboard/ProfilePage'), 2000);
    // navigate('/dashboard/IPD')
    // setTimeout(window.location.reload(), 2000);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate(ProfileEdit);
    
    if (Object.keys(errors).length) {
      // console.log(errors);
      setFormErrors(errors);
      setOpen(false);

    } else {
      // setOpen(true);
      try {
        // setFormErrors(validate(ProfileEdit));
        // setIsSubmit(true);
        await Axios.post(
          `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/update-user-profile/${userId}`,ProfileEdit
        ).then((response) => {
          const dataId = response.data.post;
          if(dataId){
            getLoginData(dataId);
          }
          //  window.location.reload();
        });
        const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-user-profile/${userId}`;
        const data = new FormData();
        data.append('profile', profile.file);
        Axios.post(url, data,{ headers: { 'Access-Control-Allow-Origin': '*' } }).then((res) => {
          // console.log(res);
          const dataId = res.data.post;
          if(dataId){
            getLoginData(dataId);
          }
          // window.location.reload();
        });
      } catch (error) {
        console.log('Something is Wrong');
      }
    }
   
  }
  const getLoginData = async (dataId) => {
    // console.log(dataId)
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/user-details/${dataId}`
    );
    const arr = await response.json();
    if (arr.hospital) {
      // console.log(arr.hospital);
      const userData = {
        id: arr.id,
        fname: arr.first_name,
        lname: arr.last_name,
        email: arr.email,
        s3image: arr.s3image,
        hospital_id: arr.hospital.id,
        hosp_id: arr.hospital.hosp_id,
      };
      // setTimeout(() => window.location.reload(), 100);
      localStorage.setItem('token-info', JSON.stringify(userData));
    } else {
      // console.log(arr);
      const userData = {
        id: arr.id,
        fname: arr.first_name,
        lname: arr.last_name,
        email: arr.email,
        s3image: arr.s3image,
        hospital_id: arr.hospital_id,
      };
      // setTimeout(() => window.location.reload(), 100);
      localStorage.setItem('token-info', JSON.stringify(userData));
    }
        // window.location.reload();
  };

  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    // const regex= /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailRegenx = regex.test(values.email)
    const namePattern = /^[a-zA-Z\s]*$/;
    const firstNamePattern = namePattern.test(values.first_name)
    const lastNamePattern = namePattern.test(values.last_name)
    const limit = 500
      if (!values.email) {
        errors.email = 'Email is required';
      }
      if (!values.first_name) {
        errors.first_name = 'Enter the first name';
      }else if (firstNamePattern === false){
        errors.first_name = 'Please enter characters only.';
      }else if (values.first_name.slice(50, limit)) {
        errors.first_name = 'Enter the minimum 50 character.';
      }

      if (!values.last_name) {
        errors.last_name = 'Enter the last name.';
      }else if (lastNamePattern === false){
        errors.last_name = 'Please enter characters only.';
      }else if (values.last_name.slice(50, limit)) {
        errors.last_name = 'Enter the minimum 50 character.';
      }
   
    return errors;
  };

  return (
    <>
      {isLoggedin ? (
        <section className="profile-screen-two">
          <div className="">
            <div className="row justify-content-center mt-4">
              <form action="" onSubmit={handleSubmit} className="" method='POST' encType = "multipart/form-data">
                <div className="row justify-content-center">
                  <div className="col-md-4 form-group align-self-center imagepor">
                    {profile.profile !== null ? (
                      <img className="profile_img" src={profile.profile} alt="" />
                    ) : (
                      <img className="profile_img" src={ProfileEdit.s3image} alt="" />
                    )}
                  </div>
                  {/* <Tooltip title="uploadimages" aria-label="patient_name">
                  <i className="fas fa-edit add_faicon" />
                                          </Tooltip> */}
                  <div className="align-self-center add_img_div">
                    <label className="add_img_but">
                      <Tooltip title="Upload Image" aria-label="" className='tool-img' componentsProps={{
                            tooltip: {
                              sx: {
                               marginTop:'-10px'
                              }
                            }
                          }}>
                        <i className="fas fa-edit add_faicon" />
                      </Tooltip>
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
                  </div>
                </div>
                {/* add_img_but */}

                <div className="row justify-content-center mt-5">
                  <div className="col-md-8 form-group align-self-center">
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      name="first_name"
                      value={ProfileEdit.first_name}
                      onKeyDown={handleKeyDown}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder='Enter the First name'
                    />
                      {/* {ProfileEdit.first_name === '' ? (<div style={{ color: 'red', paddingBottom: 10 }}>{formErrors.first_name}</div>):('')} */}
                      <p style={{ color: 'red' }}>{formErrors.first_name}</p>
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-md-8 form-group align-self-center">
                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      name="last_name"
                      value={ProfileEdit.last_name}
                      onKeyDown={handleKeyDown}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder='Enter the Last name'

                    />
                      {/* {ProfileEdit.last_name === '' ? (<div style={{ color: 'red', paddingBottom: 10 }}>{formErrors.last_name}</div>):('')} */}
                      <p style={{ color: 'red' }}>{formErrors.last_name}</p>

                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <div className="col-md-8 form-group align-self-center">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={ProfileEdit.email}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder='Enter the Email'

                    />
                      {/* {ProfileEdit.email === '' ? (<div style={{ color: 'red', paddingBottom: 10 }}>{formErrors.email}</div>):('')} */}
                      <p style={{ color: 'red' }}>{formErrors.email}</p>

                  </div>
                </div>
                <div className="row justify-content-center mt-3 mb-4">
                  <div className="col-md-2 align-self-center">
                    <button type="submit" className="btn btn-primary" onClick={handleOpen}>
                      Save
                    </button>
                  </div>
                  <Modal
                    open={open}
                    // onClick={handleClose}onClick={handleOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        {/* Text in a modal */}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}  className='text-center'>
                        Profile Updated Successfully.
                      </Typography>
                      <div className='text-center'>
                      <Button
                        size="small"
                        type="button"
                        variant="contained"
                        // onClick={deleteOpdRow}
                        onClick={ handleClose}
                        // value={deleteId}
                        id=""
                        className="text-center opdpatientok"
                        sx={{ mt: 2, backgroundColor: '#0d6efd' }}
                      >
                        Ok
                      </Button>
                  </div>

                    </Box>
                  </Modal>
                </div>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <h1>{" "}</h1>
      )}
    </>
  );
}
