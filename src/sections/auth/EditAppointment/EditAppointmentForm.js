import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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

export default function EditAppointmentForm() {

  const {appointmentId} = useParams();
  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginId = loginData.hospital_id;

  const [masterAppointmentData, setMasterAppointmentData] = useState([]);
  const getMasterAppointmentData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-appointment-status`);
    setMasterAppointmentData(await response.json());
  };

  const [masterAppointmentSlotData, setMasterAppointmentSlotData] = useState([]);
  const getMasterAppointmentSlotData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/appointment-date-slot`);

    setMasterAppointmentSlotData(await response.json());
    // console.log(await response.json());
  };
  const [masterPatientData, setMasterPatientData] = useState([]);
  const getMasterPatientData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-patient-name/${loginId}`);
    setMasterPatientData(await response.json());
  };

  const [masterDoctorData, setMasterDoctorData] = useState([]);
  const getMasterDoctorData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-doctor-user/${loginId}`);
    setMasterDoctorData(await response.json());
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    const errors = validate(appointmentInfo);
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
    setOpen(false);
  };
 
  const[appointmentInfo, setAppointmentInfo] = useState({
    patient:"",
    user_id:"",
    date:"",
    available_slot:"",
    appointment_status:"",
    remarks:"",
    hospital_id: `${loginId}`
  });
  useEffect(() => {
    async function getAppointmentInfo() {
        try {
         const response = await axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-appointment/${appointmentId}`)
        setAppointmentInfo(response.data);
        // console.log(response.data);

        } catch (error) {
        //  console.log("Something is Wrong");
        }
       }

    getAppointmentInfo();
    getMasterAppointmentData();
    getMasterAppointmentSlotData();
    getMasterPatientData();
    getMasterDoctorData();

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(appointmentInfo);
    }
  }, [appointmentId]);
  const formValidationName = {
    remarks:'remarks',
    patient: 'patient',
    user_id: 'doctor',
    date: 'date',
    available_slot: 'available slot',
    appointment_status: 'appointment status',
  };
  const formValSelectName = {
    patient: 'patient',
    user_id: 'doctor',
    date: 'date',
    available_slot: 'available slot',
    appointment_status: 'appointment status',
   
  };
  function handleChange(e) {
    setAppointmentInfo({
     ...appointmentInfo,
     [e.target.name]: e.target.value
    })
    const value=e.target.value;
    const name=e.target.name;
    if (value) {
      e.target.parentElement.querySelector('p').innerText = '';
      e.target.parentElement.querySelector('p').style.display = 'none';
    } else if (formValidationName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the ${formValidationName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    } else {
      e.target.parentElement.querySelector('p').innerText = `Select ${formValSelectName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
  
   }
  

   
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { doctorerr } = formErrors;
  const { patient } = formErrors;
  const { sloterr } = formErrors;
  const { statuserr } = formErrors;
  let formIsValid = true;

 async function handleSubmit(e) {
    e.preventDefault()
    console.log(appointmentInfo)
    try {
      setFormErrors(validate(appointmentInfo));
      setIsSubmit(true);
     await axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/update-appointment/${appointmentId}`, appointmentInfo)
     .then((response) =>{
      // console.log(response)
        // console.log("valid");
     })
    
    //  alert("Record has been saved successfully");

    } catch (error) {
     console.log("Something is Wrong");
    }
   }

  const validate = (values) => {
    const errors = {};
  const limit =225;
  if (!values.patient || values.patient === 'select') {
    formIsValid = false;
    errors.patienterr = 'Select patient .';
  }
  if (!values.user_id || values.user_id === 'select') {
    formIsValid = false;
    errors.doctorerr = 'Select doctor.';
  }
  if (!values.date) {
    errors.date = 'Select date.';
  }
  if (!values.available_slot) {
    errors.sloterr = 'Select available slots.';
  }
  if (!values.appointment_status) {
    errors.statuserr = 'Select appointment status.';
  }
  if (!values.remarks) {
    errors.remarks = 'Enter the remarks.';
  }
    return errors;
  };

  const handleCloseButton = (e) => {
    navigate('/dashboard/AllAppointment');
  }

  return (
    <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-5">
            <div className="row">
              <div className="">
                <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                  <div className="container">
                    <div className="row">
                      <div className="row">
                        <div className="row justify-content-center">
                        <input
                            type="hidden"
                            value={appointmentInfo.hospital_id}
                          />
                          <div className="col-md-4 form-group mb-4">
                            <label>Patient</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="patient"
                              name="patient"
                            onChange={e => handleChange(e)}
                            className="form-control"
                              value={appointmentInfo.patient}
                            >
                              {/* <option value=''>--select--</option> */}
                              {masterPatientData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.patient_name}
                                </option>
                              ))}
                            </select>
                            {patient && <p style={{ color: 'red' }}>{patient}</p>}
                          </div>
                          <div className="col-md-4 form-group mb-4">
                            <label>Doctor</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="user_id"
                              name="user_id"
                            onChange={e => handleChange(e)}
                            className="form-control"
                              value={appointmentInfo.user_id}>
                              {/* <option value=''>--select--</option> */}
                              {masterDoctorData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                   {curElem.first_name} {curElem.last_name}
                                </option>
                              ))}
                            </select>
                            {doctorerr && <p style={{ color: 'red' }}>{doctorerr}</p>}
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Date</label>
                            <input
                              type="date"
                              name="date"
                              className="form-control"
                              id="dateapp"
                              required=""
                              value={appointmentInfo.date}
                              onChange={e => handleChange(e)}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.date}</p>
                          </div>
                          <div className="col-md-4 form-group mb-4">
                            <label>Available Slots</label>

                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="available_slot"
                              name="available_slot"
                            onChange={e => handleChange(e)}
                            className="form-control"
                              value={appointmentInfo.available_slot}
                            >
                              {/* <option value=''>--select--</option> */}
                              {masterAppointmentSlotData.map((curElem) => (
                                <option key={curElem.id} value={curElem.avaliable_slotid}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>

                            {sloterr && <p style={{ color: 'red' }}>{sloterr}</p>}
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group mb-4">
                            <label>Appointment Status</label>

                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              // type="text"
                              id="appointment_status"
                              name="appointment_status"
                            onChange={e => handleChange(e)}
                            className="form-control"
                              value={appointmentInfo.appointment_status}
                            >
                              {/* <option value=''>--select--</option> */}
                              {masterAppointmentData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>

                            {statuserr && (
                              <p style={{ color: 'red' }}>{statuserr}</p>
                            )}
                          </div>
                          <div className="col-md-4 form-group mb-4">
                            <label>Remarks</label>
                            <input
                              type="text"
                              name="remarks"
                              className="form-control"
                              id="remarks"
                              required=""
                              value={appointmentInfo.remarks}
                            onChange={e => handleChange(e)}
                              autoComplete="off"
                              placeholder='Enter remark'
                            />
                            <p style={{ color: 'red' }}>{formErrors.remarks}</p>
                          </div>
                        </div>
                        {/* <div className="row justify-content-center">
                          <div className="col-md-8 form-group did-floating-label-content">
                            <Checkbox name="remember" /> <label>Send sms</label>
                          </div>
                        </div> */}
                        <div className="text-center mt-4">
                          <button type="submit" className="btn btn-primary" onClick={handleOpen}>
                          Save
                          </button>
                          <button type="button" className="btn btn-secondary m-3" onClick={handleCloseButton}>
                          Cancel
                        </button>
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
                        Record has been Updated Successfully.
                        </Typography>
                       <div className="text-center"> 
                       <Button
                          size="small"
                          type="button"
                          variant="contained"
                          className="appoipateditok"
                          // onClick={deleteOpdRow}
                          onClick={() => navigate('/dashboard/AllAppointment')}
                          // value={deleteId}
                          id=""
                          sx={{ mt: 2, backgroundColor: '#0d6efd' }}
                        >
                          Ok
                        </Button>
                       </div>
                      </Box>
                    </Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
