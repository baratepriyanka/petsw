import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import emailjSs from '@emailjs/browser';


import './style.css';
import Axios from 'axios';
// @mui
import { Button, Typography, Box, Modal } from '@mui/material';
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
export default function NewUserManagementForm() {
  const [masterUserRole, setmasterUserRole] = useState([]);
  const getmasterUserRole = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/master-userrole`
    );
    setmasterUserRole(await response.json());
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // const history = useHistory();
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginId =loginData.hospital_id;
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-usermanagment`;

  const [isChecked, setIsChecked] = useState();
  const [showModal, setShowModal] = useState(false);

  const initialvalue = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    hospital_id:`${loginId}`,
    // admin: `${isChecked}` ? '0' :'1' 
   };
  // console.log(initialvalue);

  // const items = [{admin: 'is_admin',admin:'is_doctor'}];
  // console.log(items)

  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { roleErr } = formErrors;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setIsChecked(e.target.checked);
  };
  // console.log(isChecked)
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true); 
  };
  // console.log(formValues);
  // const form = useRef(formValues);
  useEffect(() => {
    getmasterUserRole();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setOpen(true);
      Axios.post(url, {
        first_name: formValues.first_name,
        last_name: formValues.last_name,
        phone: formValues.phone,
        email: formValues.email,
        hospital_id: formValues.hospital_id,
        password: formValues.password
        
      }, {headers: {"Access-Control-Allow-Origin": "*"}}).then((res) => {
        // console.log(res)
      });
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    const limit=500;
    const result = regex.test(values.email);
    if (!values.first_name) {
      errors.first_name = 'Enter the First Name';
    }else if(values.first_name.slice(50, limit)){
      errors.first_name ='Enter the minimum 50 character';
      }
    if (!values.last_name) {
      errors.last_name = 'Enter the Last Name';
    }else if(values.last_name.slice(50, limit)){
      errors.last_name ='Enter the minimum 50 character';
      }
    if (!values.password) {
      errors.password = 'Enter the password';
    }
    if (!values.phone) {
      errors.phone = 'Enter the Mobile number';
    } else if (values.phone.length < 10) {
      errors.phone = 'this is not a valid mobile number';
    } else if (values.phone.length > 10) {
      errors.phone = 'minimum 10 digit';
    }
    if (!result) {
      errors.email = 'Enter the Email';
    } else if (result === false) {
      errors.email = 'Invalid is required';
    }
   
    return errors;
  };
  return (
    <>
      <section className="screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-5">
            <div className="row mt-3">
              <div className="">
                <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                  <div className="container">
                    <div className="row">
                      <div className="row">
                        <div className="row justify-content-center">
                            <input
                              type="hidden"
                              value={formValues.hospital_id}
                            />
                          <div className="col-md-4 form-group">
                            <label>First Name</label>
                            <input
                              type="text"
                              name="first_name"
                              className="form-control"
                              id="first_name"
                              required=""
                              value={formValues.first_name}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.first_name}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>Last Name</label>
                            <input
                              type="text"
                              name="last_name"
                              className="form-control"
                              id="last_name"
                              required=""
                              value={formValues.last_name}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.last_name}</p>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group mt-3 mt-md-0">
                            <label>Email</label>
                            
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              required=""
                              value={formValues.email}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.email}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label>Mobile No.</label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={formValues.phone}
                              onChange={handleChange}
                              autoComplete="off"
                              minLength="10"
                              maxLength="10"
                              size="10"
                            />
                            <p style={{ color: 'red' }}>{formErrors.phone}</p>
                          </div>
                        </div>
                        <div className="row justify-content-between">
                        <div className="col-md-4 offset-md-2 form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            required=""
                              value={formValues.password}
                              // value={.password}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          <p style={{ color: 'red' }}>{formErrors.password}</p>
                        </div>

                          {/* <div className="col-md-8 form-group">
                          <input type="checkbox" value={isChecked}  checked={isChecked}  onClick={handleChange}/>
                          <label > Is_Admin</label>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row justify-content-end"> */}
                  <div className="text-end py-4 justify-content-center">
                    <button type="submit" className="btn btn-primary">
                      {/* onClick={handleOpen} */}
                      Submit
                    </button>
                    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                      <Box sx={style}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Record has been saved successfully
                        </Typography>
                        <Button
                          size="small"
                          type="button"
                          variant="contained"
                          // onClick={deleteOpdRow}
                          onClick={() => navigate('/dashboard/UserManagement')}
                          // value={deleteId}
                          id=""
                          sx={{ mt: 2, backgroundColor: '#710808' }}>
                          Ok
                        </Button>
                      </Box>
                    </Modal>
                    {/* </div> */}
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
