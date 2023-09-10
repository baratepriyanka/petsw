import React, { useState, useEffect } from 'react';
import {useParams, useNavigate }  from 'react-router-dom';
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

export default function EditClinicForm() {

  const {clinicId} = useParams();
const [open, setOpen] = useState(false);
const handleOpen = () => {
  const errors = validate(clinicManEdit);
  // console.log(errors)
  if (Object.keys(errors).length) {
    setFormErrors(errors);
  } else {
    setOpen(true);
    // navigate('afterlogin');
  }
};
const navigate = useNavigate();
const handleClose = () => {
  window.location.reload();
  // setOpen(false);
};

  const[clinicManEdit, setclinicManEdit] = useState([]);
  const[clinicid, setclinicid] = useState([]);
  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginhId = loginData.hospital_id
  const loginuId = loginData.id

  useEffect(() => {
    async function getclinicManEdit() {
      const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/clinic-hospital-usermanagment/${loginuId}`)
     const data=await response.json()
     
      .then((res) => {
        setclinicManEdit(res.post1)
      })
    }
    getclinicManEdit();
   
    if (Object.keys(formErrors).length === 0 && isSubmit) {
  // console.log(loginData);

    }
   }, [loginhId]);
   const formVAlidations = {
    hname: 50,
    address: 500,
  };
  const formValName = {
    phone: 10,
  };
  const formValidationName = {
    hname: 'clinic name',
    address: 'address',
    email: 'a valid email',
    phone:'mobile no',

  };
  const formValEmailPatt = {
    email: 'email',
   };

   function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length  === 0) { // check if space is at beginning
      event.preventDefault();
    }
  }
   function handleChange(e) {
    setclinicManEdit({
     ...clinicManEdit,
     [e.target.name]: e.target.value
    })
    const value=e.target.value;
    const name=e.target.name;
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailPat = emailPattern.test(value);
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

    if (formValName[name] && value.length > formValName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formValName[name]} digit.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    if (formValEmailPatt[name] && emailPat === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter the a valid email.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
   }
   
   async function handleSubmit(e) {
    e.preventDefault()
    try {
      setFormErrors(validate(clinicManEdit));
      setIsSubmit(true);
      console.log(formErrors)
     await Axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/update-clinichos-usermanagment/${loginhId}`, clinicManEdit)
     .then((response) =>{
    //  console.log(response);
    })
    } catch (error) {
     alert("Something is Wrong");
    }
   }

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (values) => {
    const errors = {};
    const regex= /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailRegenx = regex.test(values.email);
    const limit=500;
    if (!values.hname) {
      errors.hname ='Enter the clinic name.';
    }else if(values.hname.slice(50, limit)){
      errors.hname ='Enter the minimum 50 character.';
      }
    if (!values.address) {
      errors.address ='Enter the address.';
    }else if(values.address.slice(500, limit)){
      errors.address ='Enter the minimum 500 character.';
      }  
    if (!values.phone) {
      errors.phone = 'Enter the mobile no.';
    } else if (values.phone.length < 10) {
      errors.phone = 'This is not a valid mobile number.';
    } else if (values.phone.length > 10) {
      errors.phone = 'Minimum 10 digit.';
    }

    if (!values.email) {
      errors.email ='Enter the email. ';
    } else if (emailRegenx === false) {
      errors.email = 'Enter a valid email address.';
    }
    return errors;
  };
  return (
    <>
       <section className="screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
              <div className="">
                <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                  <div className="container">
                    <div className="row">
                      <div className="row">
                        <div className="row justify-content-center mt-5">
                          <div className="col-md-4 form-group">
                            <label>Clinic Name</label>
                            <input
                              type="text"
                              name="hname"
                              className="form-control"
                              id="hname"
                              required=""
                              value={clinicManEdit.hname}
                              onChange={handleChange}
                              autoComplete="off"
                              placeholder='Enter Clinic Name'
                            />
                   
                            <p style={{ color: 'red' }}>{formErrors.hname}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label>address</label>
                            <textarea
                              type="text"
                              name="address"
                              className="form-control"
                              id="address"
                              required=""
                              value={clinicManEdit.address}
                              onKeyDown={handleKeyDown}
                              onChange={handleChange}
                              autoComplete="off"
                              placeholder='Enter Address'
                            />
                            <p style={{ color: 'red' }}>{formErrors.address}</p>
                          </div>
                        </div>
                      
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group ">
                            <label>Email</label>
                            <input
                              type="text"
                              className="form-control"
                              name="email"
                              id="email"
                              required=""
                              value={clinicManEdit.email}
                              onChange={handleChange}
                              autoComplete="off"
                              placeholder='Enter Email'

                            />
                            <p style={{ color: 'red' }}>{formErrors.email}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label>Mobile No.</label>
                            <input
                              type="number"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={clinicManEdit.phone}
                              onChange={handleChange}
                              autoComplete="off"
                              minLength="10"
                              maxLength={10}
                              size="10"
                              placeholder='Enter Mobile No'

                            />
                            <p style={{ color: 'red' }}>{formErrors.phone}</p>
                          </div>
                        </div>
                       
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary" style={{marginLeft: '-3em',marginTop: '20px'}} onClick={handleOpen} >
                           Save
                        </button>
                      </div>
                    </div>
                  </div>
                  
                    <Modal open={open} aria-labelledby="modal-modal-title"    aria-describedby="modal-modal-description">
                      <Box sx={style}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-center">
                          Record has been updated Successfully
                        </Typography>
                       <div className="text-center">
                       <Button
                          size="small"
                          type="button"
                          variant="contained"
                          onClick={handleClose}
                          id=""
                          className='ipdpatientok'
                          sx={{ mt: 2, backgroundColor: '#0d6efd' }}>
                          Ok
                        </Button>
                       </div>
                      </Box>
                    </Modal>
                </form>
              </div>
            </div>
          </div>
        </div>
       </section>
    </>
  );
}

