import React, { useState, useEffect, useRef} from 'react';
import { Link as RouterLink, useNavigate, NavLink } from 'react-router-dom';

import './style.css';
import Axios from 'axios';
// @mui
import { Button, Typography, Box, Modal } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Close';
import { array } from 'prop-types';
// ----------------------------------------------------------------------
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
  const [open, setOpen] = useState(true);
  const [errMsg, seterrMsg] = useState();
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    navigate('/');
  };
  const loginData = JSON.parse(localStorage.getItem('reset-pass-token'));
  const tokenId =loginData.id;
  const token = loginData.token;

  const initialvalue = {
    token: `${token}`,
    new_password: '',
    con_password: '',
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [formErr, setFormErr] = useState();
  const [isSubmit, setIsSubmit] = useState(false);

  const formValidationName = {
    new_password: 'new password',
    con_password: ' Confirm password'
  };
  const formValPattern = {
    new_password: 'new password',
  };
  const formValPatternConf = {
    con_password: ' Confirm password'
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value }); 

  //  const value1 = e.target.value;
  //  const uppercaseRegExp   = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  //  const namePattern = uppercaseRegExp.test(value1);
  //   if (value) {
  //     e.target.parentElement.querySelector('p').innerText = '';
  //     e.target.parentElement.querySelector('p').style.display = 'none';
  //   } else if(formValidationName[name]) {
  //     e.target.parentElement.querySelector('p').innerText = `Enter the ${formValidationName[name]}.`;
  //     e.target.parentElement.querySelector('p').style.display = 'block';
  //   }
  //   if(formValPattern[name] && namePattern === false) {
  //     e.target.parentElement.querySelector('p').innerText = `new password requires at least 8 characters,1 special character, at least 1 upper case character and at least 1 number.`;
  //     e.target.parentElement.querySelector('p').style.display = 'block';
  //   }
  //     if (formValPattern[name] !== formValPatternConf) {
  //       e.target.parentElement.querySelector('p').innerText = 'Confirm password should be same as new password.';
  //       e.target.parentElement.querySelector('p').style.display = 'block';
  //  }

  };
  const navigate = useNavigate();

  const url =`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/updatepassword/${tokenId}`
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
   
  };
  
  async function getStudent() {
    // try {
      const student = await Axios.post(
        `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/verifypassword/${tokenId}`)
        .then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error);
        })
  }
  useEffect(() => {
    getStudent();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      Axios.post(url,
        {
        password: formValues.new_password,
        })
        .then((res) => {
          // console.log(res);
          if(res){
            localStorage.removeItem('reset-pass-token');
            // console.log(localStorage.removeItem)
            // localStorage.setItem('token-info', '');
            navigate('/');
          }
          // }
        })
    }
  }, [formErrors]);
  
  
  let formIsValid = true;
  const validate = (values) => {
    const errors = {};
    const uppercaseRegExp  = /^(?=.{2,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    
    const passwordLength = values.new_password.length;
    const passwordLengthConfim  = values.con_password.length;
    const uppercasePassword = uppercaseRegExp.test(values.new_password);
   
    if (passwordLength === 0) {
      errors.new_password = 'Enter the new password.';
    } else if(!uppercasePassword ){
      errors.new_password="New password should be with one upppercase, one lowercase, one special charactor and one number.";
    }
    if (passwordLengthConfim === 0) {
      errors.con_password = 'Enter the confirm password.';
    }
    if (values.new_password !== "undefined" && values.con_password !== "undefined" ) {
      if (values.new_password !== values.con_password) {
        formIsValid = false;
        errors.con_password = "Confirm password should be same as new password.";
      }
    }
    return errors;
  };
  return (
    <>
      <section className="login-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3 mb-0">
            <div className="row">
              <div className="">
                <Modal
                  open={open}
                  // onClick={handleClose}onClick={handleOpen}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  sx={{ mb: 0}}
                >
                  <Box sx={stylePopup}>
                  <div  className="text-end">
                    <button
                      type="button"
                      id=""
                      className="updatecanclebtn"
                      onClick={handleClose}>
                      {/* <DeleteIcon  sx={{ color: '#f15151', width: '16px'}} /> */}
                      {/* <img src={deleteImg} alt="" width="15px;" /> */}
                    </button>
                    </div>
                    <Typography
                      id="modal-modal-description"
                      variant="h5"
                      component="h2"
                      className="text-center">
                      Reset Password
                    </Typography>
                    
                    {/* onSubmit={handleSubmit}  */}
                    <form action="" className="" onSubmit={handleSubmit}>
                      <div className="row justify-content-center mt-3">
                        <div className="col-md-12">
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="">
                    Password should be with one Uppercase, one lowercase, one special character and one number.
                    </Typography>
                        </div>
                        {/* <input type="hidden" className="" value={formValues.token}/> */}
                        <div className="col-md-12 form-group mt-3">
                          <label>New Password</label>
                          <input
                            type="password"
                            name="new_password"
                            className="form-control"
                            id="new_password"
                            required=""
                            maxLength={8}
                            value={formValues.new_password}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="new Password"
                          />
                          <p style={{ color: 'red' }}>{formErrors.new_password}</p>
                          <p>{formErr}</p>
                        </div>
                        <div className="col-md-12 form-group">
                          <label>Confirm Password</label>
                          <input
                            type="password"
                            name="con_password"
                            className="form-control"
                            id="con_password"
                            required=""
                            maxLength={8}
                            value={formValues.con_password}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="confirm Password"
                          />
                          <p style={{ color: 'red' }}>{formErrors.con_password}</p>
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <button type="submit" className="btn btn-primary">
                          {/* onClick={handleOpen} */}
                         Save
                        </button>
                    </div>
                    </form>
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
