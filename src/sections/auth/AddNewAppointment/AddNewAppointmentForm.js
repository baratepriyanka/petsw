import React, { useState, useEffect, useRef} from 'react';
import { useNavigate} from 'react-router-dom';
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
export default function AddNewAppoinmentForm() {

  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginId = loginData.hospital_id;

  const [masterAppointmentData, setMasterAppointmentData] = useState([]);
  const getMasterAppointmentData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-appointment-status`);
    setMasterAppointmentData(await response.json());
  };

  const [select, setSelect] = useState();
  const [masterAppointmentSlotData, setMasterAppointmentSlotData] = useState([]);
  const getAppointmentSlotData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-appointment-slots`);
    setMasterAppointmentSlotData(await response.json());
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
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const monthWithOffset = dateNow.getUTCMonth() + 1;
  const month = monthWithOffset.toString().length < 2 ? `0${monthWithOffset}` : monthWithOffset;
  const date = dateNow.getUTCDate().toString().length < 2 ? `0${dateNow.getUTCDate()}` : dateNow.getUTCDate();
  const materialDateInput = `${year}-${month}-${date}`;
 
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-appointment`;

  const initialvalue = {
    patient: '',
    user_id: '',
    date: '',
    available_slot: '',
    appointment_status: '',
    remarks: '',
    hospital_id:`${loginId}`
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const { doctorerr } = formErrors;
  const { patienterr } = formErrors;
  const { sloterr } = formErrors;
  const { statuserr } = formErrors;
  const { colourErr } = formErrors;
 let formIsValid = true;

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

  const componentRef = useRef(null);
  const url2=`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-appointment-slots`;

  function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length  === 0) { // check if space is at beginning
      event.preventDefault();
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
  };

  const handleChangeDate =(e) =>{
    const id= componentRef.current.value
    console.log(id)
    setSelect(id)
    console.log(componentRef.current.value)
    Axios.post(url2, {
      date: select,
    }).then((res) => {
      console.log(res)
      setMasterAppointmentSlotData(res.data)
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    getMasterAppointmentData();
    getAppointmentSlotData();
    getMasterPatientData();
    getMasterDoctorData();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
      setOpen(true);
      Axios.post(url, {
        user_id: formValues.user_id,
        patient: formValues.patient,
        date: formValues.date,
        appointment_status: formValues.appointment_status,
        available_slot: formValues.available_slot,
        remarks: formValues.remarks,
        hospital_id:formValues.hospital_id
      }).then((res) => {
        // console.log(res);
        // alert("Record has been saved successfully");
  
      });
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
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
    <>
      <section className="screen-one ipad-height">
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
                              value={formValues.hospital_id}/>
                          <div className="col-md-4 form-group mb-4">
                            <label>Patient</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="patient"
                              name="patient"
                              onChange={handleChange}
                              className="form-control"
                              value={formValues.patient}
                            >
                              <option value=''>--select--</option>
                              {masterPatientData.map((curElem) =>
                               (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.patient_name}
                                </option>
                              )
                              )}
                            </select>
                            {patienterr && <p style={{color: 'red' }}>{patienterr}</p>}
                            
                              {/* {formValues.patient === '' ? (<div style={{ color: 'red'}}>{patienterr}</div>):('')} */}
                          </div>
                          <div className="col-md-4 form-group mb-4">
                            <label>Doctor</label>

                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="doctor"
                              name="user_id"
                              onChange={handleChange}
                              className="form-control"
                              value={formValues.user_id}
                            >
                              <option value=''>--select--</option>
                              {masterDoctorData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.first_name} {curElem.last_name}
                                </option>
                              ))}
                            </select>
                            {doctorerr && <p style={{color: 'red' }}>{doctorerr}</p>}
                            {/* {formValues.doctor === '' ? (<div style={{ color: 'red'}}>{doctorerr}</div>):('')} */}
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
                              // ref={componentRef}
                              value={formValues.date}
                              // onBlurCapture={handleChangeDate}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{color: 'red' }}>{formErrors.date}</p>
                            {/* {formValues.date === '' ? (<div style={{ color: 'red'}}>{formErrors.date}</div>):('')} */}
                          </div>
                          <div className="col-md-4 form-group mb-4">
                            <label>Available Slots</label>

                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="available_slot"
                              name="available_slot"
                              onChange={handleChange}
                              className="form-control"
                              value={formValues.available_slot}
                            >
                              <option value=''>--select--</option>
                              {masterAppointmentSlotData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {/* {formValues.available_slot === '' ? (<div style={{ color: 'red'}}>{sloterr}</div>):('')} */}
                            {sloterr && <p style={{color: 'red' }}>{sloterr}</p>}
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group mb-4">
                            <label>Appointment Status</label>

                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="appointment_status"
                              name="appointment_status"
                              onChange={handleChange}
                              className="form-control"
                              value={formValues.appointment_status}
                            >
                              <option value=''>--select--</option>
                              {masterAppointmentData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {/* {formValues.appointment_status === '' ? (<div style={{ color: 'red'}}>{statuserr}</div>):('')} */}
                            {statuserr && (
                              <p style={{color: 'red', paddingBottom: 10 }}>{statuserr}</p>
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
                              value={formValues.remarks}
                              onChange={handleChange}
                              onKeyDown={handleKeyDown}
                              autoComplete="off"
                              placeholder='Enter the Remarks'
                            />
                             {/* {formValues.remarks === '' ? (<div style={{ color: 'red'}}>{formErrors.remarks}</div>):('')} */}
                            <p style={{color: 'red' }}>{formErrors.remarks}</p>
                          </div>
                        </div>
                       
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary m-1">
                          Save
                          </button>
                          <button type="button" className="btn btn-secondary m-4" onClick={handleCloseButton}>
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
                        Record has been Saved Successfully.
                        </Typography>
                      <div className="text-center"> 
                      <Button
                          size="small"
                          type="button"
                          variant="contained"
                          className="text-center appoipatientok"
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
    </>
  );
}
