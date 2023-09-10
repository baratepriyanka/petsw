import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, NavLink } from 'react-router-dom';

import './style.css';
import Axios from 'axios';
// @mui
import { Button, Typography, Box, Modal } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Close';

import { array } from 'prop-types';
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
const styleForPassword = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // boxShadow: 24,
  p: 2,
};
const stylePopup = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // boxShadow: 24,
  p: 2,
};

export default function LoginForm() {
  const [open, setOpen] = useState(false);
  const [errMsg, seterrMsg] = useState();
  const [emailerrMsg, setEmailerrMsg] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [loading, setLoading] = useState(false);
  const [openHomePage, setOpenHomePage] = useState(false);
  const navigate = useNavigate();
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/login`;
  const initialvalue = {
    email: '',
    password: '',
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // validation
  const formValidationName = {
    email: 'a valid email',
    password: ' correct password',
    };
    const formValName = {
     password: '',
    };
    const formValEmailPatt = {
      email: 'email',
     };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const value1 = e.target.value;

    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailPat = emailPattern.test(value1);
 if (value) {
      e.target.parentElement.querySelector('p').innerText = '';
      e.target.parentElement.querySelector('p').style.display = 'none';
    } else if (formValidationName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the ${formValidationName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    } 

    if (formValName[name] && value.length > formValName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the valid ${formValName[name]} password.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    if (formValEmailPatt[name] && emailPat === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter the a valid email.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  const [items, setItems] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const getLoginData = async (id) => {
    // console.log(id);
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/user-details/${id}`
    );
    const arr = await response.json();
    // console.log(arr);
    // setFname(arr.first_name);
    // setLname(arr.last_name);
    // setEmail(arr.email);
    if (arr.hospital) {
      // console.log(arr);

      const userData = {
        id: arr.id,
        fname: arr.first_name,
        lname: arr.last_name,
        email: arr.email,
        s3image: arr.s3image,
        hospital_id: arr.hospital.id,
        hosp_id: arr.hospital.hosp_id,
        // hos_id:arr.masteruserrole.type,
        // hos_id:arr.hos_id,
      };
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
        // hosp_id:arr.hospital.hosp_id
        // hos_id:arr.masteruserrole.type,
        // hos_id:arr.hos_id,
      };
      localStorage.setItem('token-info', JSON.stringify(userData));
    }
    navigate('/dashboard/app');
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues.password)
      Axios.post(
        url,
        {
          email: formValues.email,
          password: formValues.password,
        },
        { header: { 'Access-Control-Allow-Origin': '*' } }
      )
        .then((res) => {
          // console.log(res);
          const id = res.data.id;
          console.group(id);
          if (res) {
            getLoginData(id);
          }
        })
        .catch((error) => {
          setOpen(true);
          seterrMsg(error.response.data.message);
          // console.log(error);
          //  alert();
        });
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailRegenx = regex.test(values.email);
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    const passwordLength = values.password.length;
    const uppercasePassword = uppercaseRegExp.test(values.password);
    const lowercasePassword = lowercaseRegExp.test(values.password);
    const digitsPassword = digitsRegExp.test(values.password);
    const specialCharPassword = specialCharRegExp.test(values.password);
    const minLengthPassword = minLengthRegExp.test(values.password);

    if (emailRegenx === false) {
      errors.email = 'Enter the email which you used to sign-up.';
    } else if (!values.email) {
      errors.email = 'Email is required';
    }
    if (passwordLength === 0) {
      errors.password = 'Password is missing.';
    }
    // else if(!uppercasePassword){
    //       errors.password="At least one Uppercase";
    // }else if(!lowercasePassword){
    //       errors.password="At least one Lowercase";
    // }else if(!digitsPassword){
    //       errors.password="At least one Digit";
    // }else if(!specialCharPassword){
    //       errors.password="At least one Special Characters";
    // }else if(!minLengthPassword){
    //  errors.password="At least minumum 8 Characters";
    // }

    return errors;
  };
  const [openforpassword, setOpenForPassword] = useState(false);
  const handleOpenForPassword = () => {
    setOpenForPassword(true);
  };
  const handleCloseForPassword = () => {
    window.location.reload();
    setOpenForPassword(false);
  };
 
 
  const EmailUrl = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/sendpasswordlink`;
  const inivalEmail = {
    email: '',
  };
  const [formValEmail, setFormValEmail] = useState(inivalEmail);
  const [forErrEmail, setForErrEmail] = useState({});
  const [isSubmitEmail, setIsSubmitEmail] = useState(false);
  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setFormValEmail({ ...formValEmail, [name]: value });
  };
  const handleSubEmail = (e) => {
    e.preventDefault();
    setForErrEmail(validateEmail(formValEmail));
    // console.log(validateEmail())
    setIsSubmitEmail(true);
  };
  // console.log(EmailUrl)
  useEffect(() => {
    if (Object.keys(forErrEmail).length === 0 && isSubmitEmail) {
      // console.log(formValEmail)
      setLoading(true);
      Axios.post(EmailUrl, { email: formValEmail.email }, { headers: { 'Access-Control-Allow-Origin': '*' } }).then(
        (res) => {
          // setLoading(true);
          // console.log(res)
          // setEmailerrMsg(response.data.message)
       
          const resetPassToken = res.data;
          localStorage.setItem('reset-pass-token', JSON.stringify(resetPassToken));
          setOpenHomePage(true)
          // setLoading(false);
          setOpenForPassword(false);
          navigate('/ForgotPassword');
        }
      ).catch((error) => {
        alert(error.response.data.message);
        setLoading(false);

        // console.log(error);
        // console.log(error.response.data.message);
        // console.log(formValues);   
      })
    }
  }, [forErrEmail]);

  const validateEmail = (values) => {
    const errors = {};
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailRegenx = regex.test(values.email);
    if (emailRegenx === false) {
      errors.email = 'Enter the email which you used to sign-up.';
    } else if (!values.email) {
      errors.email = 'Email is required';
    }
    return errors;
  };

  // const handleCloseRep = () => {
  //   setopenRep(false);
  // };
  return (
    <>
      <section className="login-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
              <div className="">
                <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                  <div className="container">
                    <div className="row">
                      <div className="row justify-content-center">
                        <div className="col-md-12 form-group">
                          <label>Email</label>
                          <input
                            type="text"
                            name="email"
                            className="form-control"
                            id="email"
                            required=""
                            value={formValues.email}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="Enter the Email"
                          />
                          <p style={{ color: 'red' }}>{formErrors.email}</p>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-12 form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            required=""
                            value={formValues.password}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="Enter the Password"
                          />
                          <p style={{ color: 'red' }}>{formErrors.password}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="text-end form-group">
                        <NavLink to="" onClick={handleOpenForPassword} style={{ textAlign: 'center',display: 'block',padding: '10px' }}>
                          {' '}
                          Forgot Password?
                        </NavLink>
                      </div>
                    </div>

                    <div className="text-center py-4">
                      <button type="submit" className="btn btn-primary login-btn" style={{marginTop:'-40px'}}>
                        {/* onClick={handleOpen} */}
                        Login
                      </button>
                    </div>
                    <Modal
                      open={open}
                      // onClick={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          {/* Text in a modal */}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-center">
                          <div style={{ color: 'red' }}>{errMsg}</div>
                        </Typography>
                        <div className="text-center">
                          <Button
                            size="small"
                            type="button"
                            variant="contained"
                            onClick={handleClose}
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
                <Modal
                  open={openforpassword}
                  // onClick={handleClose}onClick={handleOpen}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={styleForPassword}>
                  <div className="text-end">
                  <button
                    type="button"
                    id=""
                    className="btn repcancelbtn"
                    onClick={handleCloseForPassword}
                  >
                      {/* <DeleteIcon  sx={{ color: '#f15151' ,fontSize:'20px'}} /> */}
                    {/* <img src={deleteImg} alt="" width="15px;" /> */}
                  </button>
                  </div>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
                      Forgot Your Password?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-center">
                      No worries! Enter the email address you use to login to your account, and we will send you a link
                      to reset your password.
                    </Typography>
                    <div className="">
                      <form action="" onSubmit={handleSubEmail}>
                        <div className="container">
                          <div className="row">
                            <div className="row justify-content-center mt-4">
                              <div className="col-md-12 form-group">
                                <label>Email</label>
                                <input
                                  type="email"
                                  name="email"
                                  className="form-control"
                                  id="email"
                                  required=""
                                  value={formValEmail.email}
                                  onChange={handleChangeEmail}
                                  autoComplete="off"
                                  placeholder="Enter the Email"
                                />
                                <p style={{ color: 'red' }}>{forErrEmail.email}</p>
                                <p style={{ color: 'red' }}>{emailerrMsg}</p>
                              </div>
                            </div>
                            <div className="text-center mt-4">
                              <button type="submit" className="btn btn-primary">
                                {/* onClick={handleOpen} */}
                                Send
                              </button>
                              {loading ? (
                                <>
                                  <div className="loading-overlay">
                                    <span className="fas fa-spinner fa-3x fa-spin">{''}</span>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Box>
                </Modal>
                <Modal
                  open={openHomePage}
                  // onClick={handleClose}onClick={handleOpen}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={stylePopup}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
                      Forgot Your Password?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-center">
                      No worries! Enter the email address you use to login to your account, and we will send you a link
                      to reset your password.
                    </Typography>
                    {/* <div className=" ">"ghjdgjdfgjdfgjfd"</div> */}
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
