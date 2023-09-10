import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function AddNewClinicForm() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => {
  setOpen(false);
  };

  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-clinicmanagment`;

  const initialvalue = {
    clinic_name: '',
    address: '',
    email: '',
    phone: '',
  
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
   
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {

      setOpen(true);
      Axios.post(url, {
        clinic_name: formValues.clinic_name,
        address: formValues.address,
        phone: formValues.phone,
        email: formValues.email,
       
      }).then((res) => {
        console.log(formValues);
        // alert("Record has been saved successfully");
  
      });
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    const result = regex.test(values.email);
    const limit=225;
    if (!values.clinic_name) {
      errors.clinic_name ='Enter the Clinic Name';
    }else if(values.clinic_name.slice(20, limit)){
      errors.clinic_name ='Enter the minimum 20 character';
      }
    if (!values.address) {
      errors.address ='Enter the Address';
    }else if(values.address.slice(25, limit)){
      errors.address ='Enter the minimum 25 character';
      } 
    if (!values.phone) {
      errors.phone = 'Enter the Mobile Number';
    } else if (values.phone.length < 10) {
      errors.phone = 'this is not a valid mobile number';
    } else if (values.phone.length > 10) {
      errors.phone = 'minimum 10 digit';
    }

    if (!result) {
      errors.email ='Enter the Email ';
    } else if (result === false) {
      errors.email = 'Invalid is required';
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
                              name="clinic_name"
                              className="form-control"
                              id="clinic_name"
                              required=""
                              value={formValues.clinic_name}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.clinic_name}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>address</label>
                            <input
                              type="text"
                              name="address"
                              className="form-control"
                              id="address"
                              required=""
                              value={formValues.address}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.address}</p>
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
                              type="number"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={formValues.phone}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.phone}</p>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
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
                          onClick={() => navigate('/dashboard/clinicManagement')}
                          // value={deleteId}
                          id=""
                          sx={{ mt: 2, backgroundColor: '#710808' }}>
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
