import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import './style.css';
import Axios from 'axios';
// @mui
import { Box, Grid } from '@mui/material';
// ----------------------------------------------------------------------

export default function EditOpdForm() {

  const {opdId} = useParams();
  const[opdEdit, setOpdEdit] = useState([]);

  const getOpdEdit = async () => {   
    const response = await fetch(`http://localhost:8086/web/get-one-opd/${opdId}`);
    setOpdEdit(await response.json());
    console.log("opdEdit");
    console.log(opdEdit);
  }
  const [masterGenderData, setMasterGenderData] = useState([]);

  const getMasterGenderData = async () => {
    // console.log("formErrors");
    const response = await fetch('http://localhost:8086/web/get-master-gender');
    setMasterGenderData(await response.json());
    console.log(masterGenderData);
  };

  const [masterBreedData, setMasterBreedData] = useState([]);

  const getMasterBreedData = async () => {
    // console.log("formErrors");
    const response = await fetch('http://localhost:8086/web/get-master-breed');
    setMasterBreedData(await response.json());
    console.log(masterBreedData);
  };
  const [masterColorData, setMasterColorData] = useState([]);

  const getMasterColorData = async () => {
    // console.log("formErrors");
    const response = await fetch('http://localhost:8086/web/get-master-color');
    setMasterColorData(await response.json());
    console.log(masterColorData);
  };

  const [masterStateData, setMasterStateData] = useState([]);

  const getMasterStateData = async () => {
    // console.log("formErrors");
    const response = await fetch('http://localhost:8086/web/get-master-state');
    setMasterStateData(await response.json());
    console.log(masterStateData);
  };

  const [masterCityData, setMasterCityData] = useState([]);

  const getMasterCityData = async () => {
    // console.log("formErrors");
    const response = await fetch('http://localhost:8086/web/get-master-city');
    setMasterCityData(await response.json());
    console.log(masterCityData);
  };
  const url = `http://localhost:8086/web/updatepatient/${opdId}`;

  const initialvalue = {
    patientName: '',
    pincode: '',
    dateofAdmission: '',
    species: '',
    address: '',
    breed:'',
    description: '',
    parentName: '',
    patientAge: '',
    color: '',
    city: '',
    state: '',
    phone: '',
    email: '',
    type: '',
    history: '',
    treatment: '',
    gender: '',
    whatsapp: '',
    case: '',
  };
  const [curElem, setcurElem] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { sexErr } = formErrors;
  const { colourErr } = formErrors;
  const{stateErr}=formErrors;
  const {CityErr}=formErrors;
  const{BreedErr}=formErrors;
  let formIsValid = true;

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
    setcurElem({ ...curElem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(curElem));
    setIsSubmit(true);
    Axios.post(url, {
      patient_name: curElem.patient_name,
      parent_name: curElem.parent_name,
      patient_age: curElem.patient_age,
      Breed: curElem.Breed,
      Color: curElem.Color,
      description: curElem.description,
      city: curElem.city,
      state: curElem.state,
      phone: curElem.phone,
      mobile: curElem.mobile,
      email: curElem.email,
      whatsapp: curElem.whatsapp,
      pincode: curElem.pincode,
      case: curElem.case,
      dateofadmission: curElem.dateofadmission,
      species: curElem.species,
      address: curElem.address,
      type: curElem.type,
      History: curElem.history,
      Treatment: curElem.treatment,
      genderid: curElem.genderid,
      status: 0
    }).then((res) => {
      console.log(curElem);
    });
  };

  useEffect(() => {
    getOpdEdit();
    getMasterGenderData();
    getMasterBreedData();
    getMasterColorData();
    getMasterStateData();
    getMasterCityData();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(curElem);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (!values.patient_name) {
      errors.patient_name = 'Patient Name is required';
    }
    if (!values.parent_name) {
      errors.parent_name = 'Parent Name is required';
    }
    if (!values.patient_age) {
      errors.patient_age = 'Patient Age is required';
    }
    if (!values.dateofadmission) {
      errors.dateofadmission = 'Admission Date is required';
    }
    // if (!values.case) {
    //   errors.case = 'Case is required';
    // }
    if (!values.species) {
      errors.species = 'Species is required';
    }

    if (!values.email) {
      errors.email = 'email is required';
    } else if (!regex.test(values.email)) {
      errors.email = 'this is not a valid email';
    }

    if (!values.phone) {
      errors.phone = 'phone is required';
    } else if (values.phone < 10) {
      errors.phone = 'this is not a valid phone number';
    }

    if (!values.address) {
      errors.address = 'Address is required';
    }

    if (!values.whatsapp) {
      errors.whatsapp = 'whatsApp is required';
    }

    if (!values.pincode) {
      errors.pincode = 'Pincode is required';
    }
    if (!values.description) {
      errors.description = 'Description is required';
    }
    if (!values.Type) {
      errors.Type = 'Type is required';
    }
    if (!values.history) {
      errors.history = 'History is required';
    }
    if (!values.treatment) {
      errors.treatment = 'Treatment is required';
    }
    if (values.genderid === '' || values.genderid === 'select') {
      formIsValid = false;
      errors.sexErr = 'Select Gender.';
    }

    if (values.Color === '' || values.Color === 'select') {
      formIsValid = false;
      errors.colourErr = 'select colour';
    }
    if(values.city===''|| values.city === 'select'){
      formIsValid = false;
      errors.CityErr='select city'
    }
    if(values.state===''|| values.state === 'select'){
      formIsValid = false;
      errors.stateErr='select state'
    }
    
    if(values.state===''|| values.state === 'select'){
      formIsValid = false;
      errors.stateErr='select state'
    }
    if(values.Breed===''|| values.Breed === 'select'){
      formIsValid = false;
      errors.BreedErr='select Breed'
    }
    if (!values.mobile) {
      errors.mobile = 'mobile is required';
    } else if (values.mobile < 10) {
      errors.mobile = 'this is not a valid mobile number';
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
                    {
                      opdEdit.map((curElem)=>{
                        return(
                      <div className="row" key={curElem}>
                        <div className="row justify-content-between">
                          <div className="col-md-4 form-group">
                            <label>DateofAdmission</label>
                            <input
                              type="date"
                              name="dateofadmission"
                              className="form-control"
                              id="dateofadmission"
                              required=""
                              value={curElem.dateofadmission}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.dateofadmission}</p>
                          </div>

                          {/* <div className="col-md-4 form-group">
                            <label>Case</label>
                            <input
                              type="text"
                              name="Case"
                              className="form-control"
                              id="Case"
                              required=""
                              value={curElem.case}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.case}</p>
                          </div> */}
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>ParentName</label>
                            <input
                              type="text"
                              name="parent_name"
                              className="form-control"
                              id="parent_name"
                              required=""
                              value={curElem.parent_name}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.parent_name}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>PatientName</label>
                            <input
                              type="text"
                              name="patient_name"
                              className="form-control"
                              id="patient_name"
                              required=""
                              value={curElem.patient_name}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.patient_name}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>PatientAge</label>
                            <input
                              type="text"
                              name="patient_age"
                              className="form-control"
                              id="patient_age"
                              required=""
                              value={curElem.patient_age}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.patient_age}</p>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>species</label>
                            <input
                              type="text"
                              name="species"
                              className="form-control"
                              id="species"
                              required=""
                              value={curElem.species}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.species}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label>Breed</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="Breed"
                              name="Breed"
                              onChange={handleChange}
                              className={BreedErr ? ' showError' : ''}
                              value={curElem.Breed}
                            >
                              <option>--select--</option>
                              {masterBreedData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {BreedErr && <div style={{fontWeight: 'bold', color: 'red', paddingBottom: 10 }}>{BreedErr}</div>}
                          </div>
                          <div className="col-md-4 form-group">
                            <label>Color</label>

                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="Color"
                              name="Color"
                              onChange={handleChange}
                              className={colourErr ? ' showError' : ''}
                              value={curElem.Color}
                            >
                              <option>--select--</option>
                              {masterColorData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {colourErr && <div style={{ fontWeight: 'bold',color: 'red', paddingBottom: 10 }}>{colourErr}</div>}
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Gender</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="genderid"
                              name="genderid"
                              onChange={handleChange}
                              className={sexErr ? ' showError' : ''}
                              value={curElem.genderid}
                            >
                              <option>--select--</option>

                              {masterGenderData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {sexErr && <div style={{ fontWeight: 'bold',color: 'red', paddingBottom: 10 }}>{sexErr}</div>}
                          </div>

                          <div className="col-md-4 form-group">
                            <label>whatsApp</label>
                            <input
                              type="text"
                              className="form-control"
                              id="whatsapp"
                              name="whatsapp"
                              value={curElem.whatsapp}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.whatsapp}</p>
                          </div>

                          <div className="col-md-4 form-group mt-3 mt-md-0">
                            <label>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              id="address"
                              required=""
                              value={curElem.address}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{fontWeight: 'bold', color: 'red' }}>{formErrors.address}</p>
                          </div>
                        </div>

                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>City</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="city"
                              name="city"
                              onChange={handleChange}
                              className={CityErr ? ' showError' : ''}
                              value={curElem.city}
                            >
                              <option>--select--</option>

                              {masterCityData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {CityErr && <div style={{ fontWeight: 'bold',color: 'red', paddingBottom: 10 }}>{CityErr}</div>}
                          </div>
                          <div className="col-md-4 form-group">
                            <label>State</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="state"
                              name="state"
                              onChange={handleChange}
                              className={stateErr ? ' showError' : ''}
                              value={curElem.state}
                            >
                              {masterStateData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {stateErr && <div style={{fontWeight: 'bold', color: 'red', paddingBottom: 10 }}>{stateErr}</div>}
                          </div>

                          <div className="col-md-4 form-group mt-3 mt-md-0">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              required=""
                              value={curElem.email}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.email}</p>
                          </div>
                        </div>

                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Phone</label>
                            <input
                              type="number"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={curElem.phone}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{fontWeight: 'bold',  color: 'red' }}>{formErrors.phone}</p>
                          </div>

                         
                          <div className="col-md-4 form-group">
                            <label>Mobile</label>
                            <input
                              type="number"
                              className="form-control"
                              id="mobile"
                              name="mobile"
                              value={curElem.mobile}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{fontWeight: 'bold',  color: 'red' }}>{formErrors.mobile}</p>
                          </div>
                          
                          <div className="col-md-4 form-group">
                            <label>Pincode</label>
                            <input
                              type="number"
                              className="form-control"
                              id="pincode"
                              name="pincode"
                              value={curElem.pincode}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.pincode}</p>
                          </div>
                          <div className="col-md-4 form-group ">
                            <label>Description</label>
                            <textarea
                              className="form-control"
                              name="description"
                              rows=""
                              required=""
                              value={curElem.description}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.description}</p>
                          </div>
                        </div>

                        <div className="col-md-4 form-group mt-3">
                          <p>Date/Type</p>
                          {values1.map((jump, index) => (
                            <Box key={index}>
                              <Grid container spacing={1} alignItems="flex-start">
                                <Grid item xs={10}>
                                  <input
                                    id="text"
                                    className="form-control"
                                    type="text"
                                    name="Type"
                                    value={jump || ''}
                                    onChange={(e) => handleValueChange(index, e)}
                                    required=""
                                  />
                                  <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.type}</p>
                                </Grid>
                              </Grid>
                            </Box>
                          ))}
                        </div>

                        <div className="col-md-4 form-group mt-3">
                          <p>Case/History</p>
                          {values1.map((jump, index) => (
                            <Box key={index}>
                              <Grid container spacing={1} alignItems="flex-start">
                                <Grid item xs={10}>
                                  <input
                                    id="float"
                                    className="form-control"
                                    type="text"
                                    name="history"
                                    value={jump || ''}
                                    onChange={(e) => handleValueChange(index, e)}
                                    required=""
                                  />
                                  <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.history}</p>
                                  
                                </Grid>
                              </Grid>
                            </Box>
                          ))}
                        </div>
                        <div className="col-md-4 form-group mt-3">
                          <p>Treatment</p>
                          {values1.map((jump, index) => (
                            <Box key={index}>
                              <Grid container spacing={1} alignItems="flex-start">
                                <Grid item xs={10}>
                                  <input
                                    id="float"
                                    className="form-control"
                                    type="text"
                                    name="treatment"
                                    value={jump || ''}
                                    onChange={(e) => handleValueChange(index, e)}
                                    required=""
                                  />
                                  <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.treatment}</p>
                                  {/* <label htmlFor="float" className="did-floating-label mb-0">
                                    Case
                                  </label> */}
                                </Grid>
                              </Grid>
                            </Box>
                          ))}
                        </div>
                      </div>
                      )
                      })
                      }
           
                      <div className="center py-4">
                        <button type="submit" className="btn btn-primary" onClick={addValue}>
                          Add more
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-end py-4">
                    <button type="submit" className="btn btn-primary">
                      Sumbit
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
