import React, { useState, useEffect } from 'react';
import './style.css';
import Axios from 'axios';
// @mui
import { Box, Grid } from '@mui/material';
// ----------------------------------------------------------------------

export default function RegisterNewPatientForm() {

  const[masterGenderData, setMasterGenderData] = useState([]);

  const getMasterGenderData = async () =>{
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-gender`);
    setMasterGenderData(await response.json());
    console.log(masterGenderData);
}
  
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-patient`;

  const initialvalue = {
    patientName: '',
    patientId: '',
    doctor_id:'',
    email: '',
    phone: '',
    password: '',
    address:'',
    birthday: '',
    gender: '',
    bloodGroup: '',
    doctorId: '',
    profile: '',
   
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { sexErr } = formErrors;
  const { colourErr } = formErrors;
  const{StateErr}=formErrors;
  const {CityErr}=formErrors;
  const{BreedErr}=formErrors;
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
      patient_name: formValues.patientName,
      doctor_id: formValues.doctor_id,
      email: formValues.email,
      phone: formValues.phone,
      password: formValues.password,
      address: formValues.address,
      birthday: formValues.birthday,
      gender: formValues.gender,
      bloodgroup: formValues.bloodGroup,
      profile: formValues.profile,      
    }).then((res) => {
      console.log(formValues);
      alert("Record has been saved successfully");

    });
  };

  useEffect(() => {
    getMasterGenderData();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (!values.patientName) {
      errors.patientName = 'Patient Name is required';
    }
    if (!values.patientId) {
      errors.patientId = 'Parent Name is required';
    }
    if (!values.doctor_id) {
      errors.doctor_id = 'Parent Name is required';
    }
    
    if (!values.password) {
      errors.password = 'Patient Age is required';
    }
    if (!values.birthday) {
      errors.birthday = 'Admission Date is required';
    }
    if (!values.gender) {
      errors.gender = 'Case is required';
    }
    if (!values.bloodGroup) {
      errors.bloodGroup = 'Species is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!regex.test(values.Email)) {
      errors.email = 'this is not a valid email';
    }
    if (!values.phone) {
      errors.phone = 'Phone is required';
    } else if (values.phone < 10) {
      errors.phone = 'this is not a valid phonenumber';
    }
    if (!values.address) {
      errors.address = 'Address is required';
    }
    if (!values.profile) {
      errors.profile = 'whatsApp is required';
    }    

    return errors;
  };
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
                          <div className="col-md-4 form-group">
                            <label>Patient Name</label>
                            <input
                              type="text"
                              name="patientName"
                              className="form-control"
                              id="patientName"
                              required=""
                              value={formValues.patientName}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.patientName}</p>
                          </div>

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
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.email}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>password</label>
                            <input
                              type="text"
                              name="password"
                              className="form-control"
                              id="password"
                              required=""
                              value={formValues.password}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.password}</p>
                          </div>
                          </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group mt-3 mt-md-0">
                            <label>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              id="address"
                              required=""
                              value={formValues.address}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{fontWeight: 'bold', color: 'red' }}>{formErrors.address}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>Phone</label>
                            <input
                              type="number"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={formValues.phone}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{fontWeight: 'bold',  color: 'red' }}>{formErrors.phone}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>Gender</label>                        
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="selectCtrl"
                              name="genderid"
                              onChange={handleValueChange}
                              className={sexErr ? ' showError' : ''}
                              value={formValues.genderid}
                            >
                            {masterGenderData.map(curElem => (
                              <option key={curElem.id} value={curElem.name}>
                                  {curElem.name}
                              </option>
                              ))}
                            </select>
                            {sexErr && <div style={{ fontWeight: 'bold',color: 'red', paddingBottom: 10 }}>{sexErr}</div>}
                          </div>
                          </div>
                        <div className="row justify-content-center">

                          <div className="col-md-4 form-group">
                            <label>Birth Date</label>
                            <input
                              type="date"
                              name="birthday"
                              className="form-control"
                              id="birthday"
                              required=""
                              value={formValues.birthday}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.birthday}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>Doctor</label>
                            <input
                              type="text"
                              name="doctor_id"
                              className="form-control"
                              id="doctor_id"
                              required=""
                              value={formValues.doctor_id}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.doctor_id}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>Blood Group</label>
                            <input
                              type="text"
                              name="bloodgroup"
                              className="form-control"
                              id="bloodgroup"
                              required=""
                              value={formValues.bloodgroup}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.bloodgroup}</p>
                          </div>
                          </div>
                        <div className="row">

                          <div className="col-md-4 form-group">
                            <label>Profile</label>
                            <input
                              type="text"
                              className="form-control"
                              id="profile"
                              name="profile"
                              value={formValues.profile}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.profile}</p>
                          </div>
                      </div>
                    
                    </div>
                  </div>
                  <div className="text-end py-4">
                    <button type="submit" className="btn btn-primary">
                    Submit
                    </button>
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
