import React, { useState, useEffect } from 'react';
// import './style.css';
import Axios from 'axios';
// @mui
import { Box, Grid ,Checkbox} from '@mui/material';
// ----------------------------------------------------------------------

export default function AddAppoinmentForm() {
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-appointment`;

  const initialvalue = {
    patient: '',
    doctor: '',
    date: '',
    available_slot: '',
    appointment_status: '',
    remarks: '',
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { doctorerr } = formErrors;
  const { patienterr } = formErrors;
  const { sloterr } = formErrors;
  const { statuserr } = formErrors;
  const { colourErr } = formErrors;
  const formIsValid = true;

  // validation

  const addValue = () => {
    setValues1([...values1, '']);
  };
  const handleValueChange = (index, e) => {
    values1[index] = e.target.value;
    console.log(values1);
    setValues1(values1);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    Axios.post(url, {
      doctor: formValues.doctor,
      patient: formValues.patient,
      date: formValues.date,
      appointment_status: formValues.appointment_status,
      available_slot: formValues.available_slot,
      remarks: formValues.remarks
    }).then((res) => {
      console.log(formValues);
      alert("Record has been saved successfully");

    });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (!values.patient) {
      errors.patienterr = 'Patient Name is selected';
    }
    if (!values.doctor) {
      errors.doctorerr = 'Doctor Name is selected';
    }
    if (!values.date) {
      errors.date = 'Admission Date is selected';
    }
    if (!values.available_slot) {
      errors.sloterr = 'Available Slots Date is selected';
    }
    if (!values.appointment_status) {
      errors.statuserr = 'Appointment Date is selected';
    }
    if (!values.remarks) {
      errors.remarks = 'Remarks Date is required';
    }

    return errors;
  };
  return (
    <>
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
                          <div className="col-md-4 form-group mb-4">
                            <label>Patient</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="selectCtrl"
                              name="patient"
                              onChange={handleChange}
                              className={patienterr ? ' showError' : ''}
                              value={formValues.patient}
                            >
                              <option>Catagory1</option>
                              <option>Catagory2</option>
                            </select>
                            {patienterr && <div style={{ fontWeight: 'bold', color: 'red' }}>{patienterr}</div>}
                          </div>
                          <div className="col-md-4 form-group mb-4">
                            <label>Doctor</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="selectCtrl"
                              name="doctor"
                              onChange={handleChange}
                              className={doctorerr ? ' showError' : ''}
                              value={formValues.doctor}
                            >
                              <option>Catagory1</option>
                              <option>Catagory2</option>
                            </select>
                            {doctorerr && <div style={{ fontWeight: 'bold', color: 'red' }}>{doctorerr}</div>}
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Admission Date</label>
                            <input
                              type="date"
                              name="date"
                              className="form-control"
                              id="date"
                              required=""
                              value={formValues.date}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.date}</p>
                          </div>
                          <div className="col-md-4 form-group mb-4">
                            <label>Available Slots</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="selectCtrl"
                              name="available_slot"
                              onChange={handleChange}
                              className={sloterr ? ' showError' : ''}
                              value={formValues.available_slot}
                            >
                              <option>Catagory1</option>
                              <option>Catagory2</option>
                            </select>
                            {sloterr && <div style={{ fontWeight: 'bold', color: 'red' }}>{sloterr}</div>}
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group mb-4">
                            <label>Appointment Status</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="selectCtrl"
                              name="appointment_status"
                              onChange={handleChange}
                              className={statuserr ? ' showError' : ''}
                              value={formValues.appointment_status}
                            >
                              <option>Catagory1</option>
                              <option>Catagory2</option>
                            </select>
                            {statuserr && (
                              <div style={{ fontWeight: 'bold', color: 'red', paddingBottom: 10 }}>{statuserr}</div>
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
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.remarks}</p>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-8 form-group did-floating-label-content">
                            <Checkbox name="remember" /> <label>Send sms</label>
                          </div>
                        </div>
                        <div className="text-end py-4">
                          <button type="submit" className="btn btn-primary">
                          Submit
                          </button>
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
