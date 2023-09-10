import React, { useState, useEffect } from 'react';
import {useParams, useNavigate }  from 'react-router-dom';
import './style.css';
import axios from 'axios';
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

export default function EditUserForm() {

  const {userManId} = useParams();

  const [masterUserRole, setmasterUserRole] = useState([]);
  const getmasterUserRole = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/master-userrole`
    );
    setmasterUserRole(await response.json());
  };
  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginId =loginData.id;

const [open, setOpen] = useState(false);
const handleOpen = () => {
  const errors = validate(UserManEdit);
  console.log(errors)
  if (Object.keys(errors).length) {
    setFormErrors(errors);
  } else {
    setOpen(true);
    // navigate('afterlogin');
  }
};
const navigate = useNavigate();
const handleClose = () => {
  setOpen(false);
};

  const[UserManEdit, setUserManEdit] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    // role: '',
    hospital_id:`${loginId}`,
  });
 
  useEffect(() => {
    async function getUserManEdit() {
     try {
      const response = await axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/getone-usermanagment/${userManId}`)
      // console.log(response.data);
      setUserManEdit(response.data);
     } catch (error) {
      console.log("Something is Wrong");
     }
    }
    getUserManEdit();
    getmasterUserRole();
   
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(patientEdit);
    }
   }, [userManId]);

   function handleChange(e) {
    setUserManEdit({
     ...UserManEdit,
     [e.target.name]: e.target.value
    })
   }
   
   async function handleSubmit(e) {
    e.preventDefault()
    try {
      setFormErrors(validate(UserManEdit));
      setIsSubmit(true);
     await axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/update-usermanagment/${userManId}`, UserManEdit)
     .then((response) =>{
    //  console.log(response);
    })
    } catch (error) {
     console.log("Something is Wrong");
    }
   }

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { roleErr } = formErrors;
  let formIsValid = true;

  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    const result = regex.test(values.email);
    const limit=225;
    if (!values.first_name) {
      errors.first_name = 'Enter the First Name';
    }else if(values.first_name.slice(20, limit)){
      errors.first_name ='Enter the minimum 20 character';
      }
    if (!values.last_name) {
      errors.last_name = 'Enter the Last Name';
    }else if(values.last_name.slice(20, limit)){
      errors.last_name ='Enter the minimum 20 character';
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

    if (values.role === '' || values.role === 'select') {
      formIsValid = false;
      errors.roleErr = 'Role is selected';
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
                            <input
                              type="hidden"
                              value={UserManEdit.hospital_id}
                            />
                          <div className="col-md-4 form-group">
                            <label>First Name</label>
                            <input
                              type="text"
                              name="first_name"
                              className="form-control"
                              id="first_name"
                              required=""
                              value={UserManEdit.first_name}
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
                              value={UserManEdit.last_name}
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
                              value={UserManEdit.email}
                              onChange={handleChange}
                              autoComplete="off"
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
                              value={UserManEdit.phone}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.phone}</p>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          {/* <div className="col-md-4 form-group">
                          <label>Role</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="role"
                              name="role"
                              onChange={handleChange}
                              className={roleErr ? ' showError' : ''}
                              value={UserManEdit.role}>
                              <option>--select--</option>
                              {masterUserRole.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.type}
                                </option>
                              ))}
                            </select>
                          </div> */}
                          <div className="col-md-4 form-group">
                            <label>Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              name="password"
                              value={UserManEdit.password}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                              <p style={{ color: 'red' }}>{formErrors.password}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-end py-4">
                    <button type="submit" className="btn btn-primary" onClick={handleOpen}>
                    Submit
                    </button>
                    <Modal
                      open={open}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">
                      <Box sx={style}>
                       
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Record has been updated successfully
                        </Typography>
                        <Button
                          size="small"
                          type="button"
                          variant="contained"
                          // onClick={deleteOpdRow}
                          onClick={() => navigate('/dashboard/UserManagement')}
                          // value={deleteId}
                          id=""
                          sx={{ mt: 2, backgroundColor: '#710808' }}
                        >
                          Ok
                        </Button>
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

