import React, { useState, useEffect, useRef} from 'react';
import { Link as RouterLink , useNavigate} from 'react-router-dom';

import './style.css';
import Axios from 'axios';
// @mui
import {
  Button,
  Typography,
  Box,
  Modal 
} from '@mui/material';
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

export default function AddBed() {

  const [errMsg, seterrMsg] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
      setOpen(false)
    // console.log(errMsg);
    // if(errMsg){
    //   const errmsgg="Email already exists!";
    //   seterrMsg(errmsgg)
    // }else{
    //   const errmsgg= "";
    //   seterrMsg(errmsgg)
    //   setOpen(true)

    // }
   };
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };	

  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/user`;

  const [isChecked, setIsChecked] = useState(false);
 
  const [firname, setFirname] = useState('');
  const [hname, setHname] = useState('');
  const [lname, setLname] = useState('');
  const fircapiletter = useRef(null);
  const hosfircapiletter = useRef(null);
  const lastfircapiletter = useRef(null);
  const initialvalue = {
    email: '',
    password: '',
    first_name:`${firname}`,
    last_name:`${lname}`,
    hname:`${hname}`,
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { hnameErr } = formErrors;
  // validation
  const formVAlidations = {
    last_name: 50,
    first_name: 50,
    hname:50,
    // password:8
  };
  const formValidationName = {
    last_name: 'last name',
    first_name: 'first name',
    hname:'hospital name',
    email:'a valid email',
    password:'password'
  };
  const formValPattern = {
    last_name: 'last name',
    first_name: 'first name',
  };
  
  const formPasspattern={
    password:'Password',
  };
  const formValEmailPatt = {
    email: 'email',
   };

   function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length  === 0) { // check if space is at beginning
      event.preventDefault();
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value });

    setIsChecked(e.target.checked);

    const value1 = e.target.value;
    const letters = /^[a-zA-Z\s]*$/;
    const namePattern = letters.test(value1);
    const passletter = /^(?=.{2,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    const PPattern = passletter.test(value1);
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailPat = emailPattern.test(value1);
    if (value) {
      e.target.parentElement.querySelector('p').innerText = '';
      e.target.parentElement.querySelector('p').style.display = 'none';
    } else if(formValidationName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the ${formValidationName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
     }
    if (formVAlidations[name] && value.length > formVAlidations[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formVAlidations[name]} character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }

    if (formValPattern[name] && namePattern === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter only character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    } else if (formPasspattern[name] && PPattern === false) {
      e.target.parentElement.querySelector('p').innerText = `Password should be with one uppercase, one lowercase, one special charactor and one number.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    if (formValEmailPatt[name] && emailPat === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter the a valid email.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }

    const firstLaterCapital=fircapiletter.current.value;
    const hosfirstcapiletter=hosfircapiletter.current.value;
    const lastfirstcapiletter=lastfircapiletter.current.value;
    const firstLater=firstLaterCapital.charAt(0).toUpperCase() + firstLaterCapital.slice(1);
    const hosfirstLater=hosfirstcapiletter.charAt(0).toUpperCase() + hosfirstcapiletter.slice(1);
    const lastfirstLater=lastfirstcapiletter.charAt(0).toUpperCase() + lastfirstcapiletter.slice(1);
    if(firstLaterCapital=== undefined){
      setFirname();
      setHname();
      setLname();
    }else{
      setFirname(firstLater);
      setHname(hosfirstLater);
      setLname(lastfirstLater);
    }
   


  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    // if (isChecked === true){
    //   console.log(isChecked)
     

    // }
   
  };
// console.log(formValues)
  useEffect(() => {
    // console.log(formErrors)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // setOpen(true);
      Axios.post(url, {
        email: formValues.email,
        password: formValues.password,  
        first_name:formValues.first_name,
        last_name:formValues.last_name,
        hname:formValues.hname,
      },{headers: {"Access-Control-Allow-Origin": "*"}}).then((res) => {
        if(res.status === 200) {
          // console.log(res);
          const errmsgg= "Email already exists! ";
          seterrMsg(errmsgg)
          const msg ='';
          setTimeout(() =>  seterrMsg(msg), 1000)
          setOpen(false);
        }else{
          setOpen(true);
          const errmsgg="";
          // console.log(errmsgg);
          seterrMsg(errmsgg)
        }
      }).catch((error) => {
        console.log(error);

        // console.log(formValues);   
       alert("you have entered incorrect value");
      })
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex= /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailRegenx = regex.test(values.email)
    const namePattern = /^[a-zA-Z\s]*$/;
    const firstNamePattern = namePattern.test(values.first_name)
    const lastNamePattern = namePattern.test(values.last_name)
    const limit = 500

    const uppercaseRegExp   = /^(?=.{2,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    const lowercaseRegExp   = /(?=.*?[a-z])/;
    const digitsRegExp      = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp   = /.{8,}/;
    const passwordLength = values.password.length;
    const uppercasePassword =   uppercaseRegExp.test(values.password);
    const lowercasePassword =   lowercaseRegExp.test(values.password);
    const digitsPassword =      digitsRegExp.test(values.password);
    const specialCharPassword = specialCharRegExp.test(values.password);
    const minLengthPassword =   minLengthRegExp.test(values.password);

    // console.log(passwordLength > 8)
      if (passwordLength === 0) {
      errors.password = 'Enter the password.';
    } else if (!uppercasePassword) {
      errors.password = 'Password should be with one uppercase, one lowercase, one special charactor and one number.';
    }
      // else if(!lowercasePassword){
      //       errors.password="At least one Lowercase.";
      // }else if(!digitsPassword){
      //       errors.password="At least one Digit.";
      // }else if(!specialCharPassword){
      //       errors.password="At least one Special Characters.";
      // }else if(!minLengthPassword){
      //       errors.password="At least minumum 8 Characters.";
      // }

      if(!values.email) {
        errors.email = 'Enter the email.';
      }else if (emailRegenx === false ) {
        errors.email = 'Please enter a valid email address ex. aa@gmail.com.';
      }

      if (!values.first_name) {
        errors.first_name = 'Enter the first name.';
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

      if (!values.hname ) {
        errors.hname = 'Enter the hospital name.';
      }else if (values.hname.slice(50, limit)) {
        errors.hname = 'Enter the minimum 50 character.';
      }
     
    return errors;
  };

  // Password with include One Upppercase, lowercase, , One special charactor and one number.                                
                                                                                                                                                                                    

  return (
    <>
      <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
              <div className="">
                <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                  <div className="container">
                    <div className="row">
                     <div className="row justify-content-center">
                        <div className="col-md-12 form-group">
                         <label>Hospital Name<span className="man_filed">*</span></label>
                         <input
                            type="text"
                            name="hname"
                            className="form-control"
                            id="hname"
                            required=""
                            ref={hosfircapiletter}
                            value={hname}
                           onKeyDown={handleKeyDown}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder='Enter the Hospital Name'
                          />
                            
                          <p style={{ color: 'red' }}>{formErrors.hname}</p>
                            
                        </div>
                      </div>
                    <div className="row justify-content-center">
                      <div className="col-md-12 form-group">
                          <label>First Name<span className="man_filed">*</span></label>
                          <input
                            type="text"
                            name="first_name"
                            className="form-control"
                            id="first_name"
                            required=""
                            ref={fircapiletter}
                            value={firname}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            autoComplete="off"
                            placeholder='Enter First Name'
                          />
                           
                          <p style={{ color: 'red' }}>{formErrors.first_name}</p>
                        </div>
                      </div>
                    <div className="row justify-content-center">
                      <div className="col-md-12 form-group">
                          <label>Last Name<span className="man_filed">*</span></label>
                          <input
                            type="text"
                            name="last_name"
                            className="form-control"
                            id="last_name"
                            required=""
                            ref={lastfircapiletter}
                            value={lname}
                            onKeyDown={handleKeyDown}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder='Enter Last Name'
                          />

                          <p style={{ color: 'red' }}>{formErrors.last_name}</p>
                        </div>
                        </div>
                        
                      <div className="row justify-content-center">
                      <div className="col-md-12 form-group">
                          <label>Email<span className="man_filed">*</span></label>
                          <input
                            type="text"
                            name="email"
                            className="form-control"
                            id="email"
                            required=""
                            value={formValues.email}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder='Enter Email'
                          />
                          
                          <p style={{ color: 'red' }}>{formErrors.email}</p>
                          <p style={{ color: 'red' }}>{errMsg}</p>
                          
                        </div>
                        </div>
                      <div className="row justify-content-center">

                        <div className="col-md-12 form-group">
                          <label>Password<span className="man_filed">*</span></label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            required=""
                            value={formValues.password}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder='Enter Password'
                            // minLength="8"
                            // maxLength={8}
                            // size="8"
                          />
                          <p style={{ color: 'red' }}>{formErrors.password}</p>
                        </div>
                        
                      </div>
                      <div className="row mt-2">
                     
                        <div className="topping">
                        <input
                        className="m-1"
                          type="checkbox"
                          id="myCheckbox"
                          checked={isChecked}
                          onChange={handleChange}
                          name=""
                        />
                          <label>   {" "}  {" "}
                            {" "}I agree to the {" "}  {" "} {" "}
                             <a target="_blank" href="https://pounceapp.in/application/index/privacy" className="cust_privacy_policy" rel="noreferrer">Privacy Policy</a>
                             {" "}  {" "} {" "}
                          and the
                          {" "}  {" "} {" "}
                           <a target="_blank" href="https://pounceapp.in/application/index/terms" className="cust_privacy_policy" rel="noreferrer">Terms of Use.</a></label>
                        </div>
                        <p style={{ color: 'red' }}>{formErrors.privacy_terms}</p>
                      </div>
                    </div>
                    {/* <div className="text-center py-4">
                      <button type="submit" className="btn btn-primary signup-btn">
                     
                      Sign Up
                      </button>
                      </div> */}
                    {/* {console.log(isChecked)} */}
                    {isChecked === true ? ( <div className="text-center py-4">
                      <button type="submit" className="btn btn-primary signup-btn">
                    Sign Up
                      </button>
                      </div>) : ( <div className="text-center py-4"  style={{cursor: "none"}}>
                      <button type="submit" className="btn btn-primary signup-btn"  style={{cursor: "none",pointerEvents: 'none'}}>
                  Sign Up
                      </button>
                      </div>)}
                   
                      <Modal
                      open={open}
                      // onClick={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                     {/* <h1>hi</h1> */}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2}} className='text-center'>
                        User Created Successfully.
                        </Typography>
                        <div className='text-center'>
                        <Button
                          size="small"
                          type="button"
                          variant="contained"
                          onClick={() => navigate('/')}
                          className="sinupok text-center"
                          sx={{ mt: 2,}}
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
          </div>
        </div>
      </section>
    </>
  );
}
