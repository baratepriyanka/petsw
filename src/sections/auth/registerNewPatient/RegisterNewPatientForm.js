import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './style.css';
import Axios from 'axios';
// @mui
import { Button, Typography, Box, Modal } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import Table from 'react-bootstrap/Table';

import { object } from 'prop-types';

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
const styleImg = {
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
export default function RegisterNewPatientForm() {
  const [masterGenderData, setMasterGenderData] = useState([]);
  const getMasterGenderData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-gender`
    );
    setMasterGenderData(await response.json());
  };

  const [masterBreedData, setMasterBreedData] = useState([]);
  const getMasterBreedData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-breed`
    );
    setMasterBreedData(await response.json());
  };

  const [masterColorData, setMasterColorData] = useState([]);
  const getMasterColorData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-color`
    );
    setMasterColorData(await response.json());
  };

  const [masterStateData, setMasterStateData] = useState([]);
  const getMasterStateData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-state`
    );
    setMasterStateData(await response.json());
  };

  const [masterCityData, setMasterCityData] = useState([]);
  const getMasterCityData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-city`
    );
    setMasterCityData(await response.json());
  };

  const [masterSpeciesData, setmasterSpeciesData] = useState([]);
  const getMasterSpeciesData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-species`
    );
    setmasterSpeciesData(await response.json());
  };
  const [masteruploadreport, setmasterUploadReport] = useState([]);
  const getMasterUploadReport = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-upload-report`
    );
    setmasterUploadReport(await response.json());
  };
  const [masterage, setMasterAge] = useState([]);
  const getMasterAge = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-age`
    );
    setMasterAge(await response.json());
    // console.log(masterage)
  };
  // data function
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const monthWithOffset = dateNow.getUTCMonth() + 1;
  const month = monthWithOffset.toString().length < 2 ? `0${monthWithOffset}` : monthWithOffset;
  const date = dateNow.getUTCDate().toString().length < 2 ? `0${dateNow.getUTCDate()}` : dateNow.getUTCDate();
  const materialDateInput = `${year}-${month}-${date}`;
  const hours = dateNow.getHours();
  const minutes = dateNow.getMinutes();
  const seconds = dateNow.getSeconds();
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [openimg, setOpenImg] = useState(false);
  const [responsId, setResponseId] = useState();
  const handleOpenImg = () => setOpenImg(true);
  const handleCloseImg = () => {
    if (profile.filepreview === null) {
      setOpenImg(true);
    } else {
      setOpenImg(false);
    }
  };
  const handleCloseImgCanBtn = () => {
    setOpenImg(false);
    window.location.reload();
  };
  const [profile, setProfile] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChangeImg = (event) => {
    setProfile({
      ...profile,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  // console.log(profile)

  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/todo/todos`;
  const initialvalue = {
    patient_name: '',
    pincode: '',
    dateofadmission: `${materialDateInput}`,
    species: '',
    address: '',
    breed: '',
    description: '',
    parent_name: '',
    age: '',
    color: '',
    city: '',
    state: '',
    phone: '',
    email: '',
    gender: '',
    hospital_id: `${loginId}`,
  };
  // console.log(initialvalue);
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formErr, setFormErr] = useState({});
  const { sexErr } = formErrors;
  const { colourErr } = formErrors;
  const { StateErr } = formErrors;
  const { CityErr } = formErrors;
  const { breedErr } = formErrors;
  const { species } = formErrors;
  const { CageidErr } = formErrors;
  const { AgeErr } = formErrors;
  let formIsValid = true;

  const formVAlidations = {
    parent_name: 50,
    address: 500,
    patient_name: 50,
    description: 500,
  };
  const formValName = {
    phone: 10,
    pincode: 6,
  };
  const formValidationName = {
    parent_name: 'name of the owner',
    address: 'address',
    patient_name: 'patient name',
    description: 'description',
    email: 'a valid email',
    dateofadmission: 'date of admission',
    phone: 'mobile no',
    pincode: 'pincode',
  };

  const formValSelectName = {
    age: 'age',
    gender: 'gender',
    species: 'species',
    breed: 'breed',
    color: 'color',
    city: 'city',
    state: 'state',
  };
  const formValPattern = {
    parent_name: 'name of the owner',
    patient_name: 'patient name',
  };
  const pinPattern = {
    pincode: 'pincode',
  };
  const phonePattern = {
    phone: 'mobile no',
  };
  const formValEmailPatt = {
    email: 'email',
  };
  function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length  === 0) { // check if space is at beginning
      event.preventDefault();
    }
  }

  const handleChange = function (e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // /^[a-zA-Z]+[a-zA-Z\s]*?[^0-9]$/
    const value1 = e.target.value;
    const namePattern = /^[a-zA-Z\s]*$/;
    const firstNamePattern = namePattern.test(value1);
    const pincodePattern = /^\d{6}$/;
    const pinCodePat = pincodePattern.test(value1);
    const phonePattern1 = /^\d{10}$/;
    const phonePat = phonePattern1.test(value1);
    // const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    // const emailPat = emailPattern.test(value1);

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

    if (formVAlidations[name] && value.length > formVAlidations[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formVAlidations[name]} character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }

    if (formValName[name] && value.length > formValName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formValName[name]} digit.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }

    if (formValPattern[name] && firstNamePattern === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter the only character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    
    if (phonePattern[name] && phonePat === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter the only 10 digit.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  // add more value function
  const [formVal, setFormVal] = useState([
    { date: `${materialDateInput}`, case_history: '', treatment_medicine: '', hospital_id: `${loginId}` },
  ]);

  const addRow = (e, index) => {
    setFormVal([
      ...formVal,
      { date: `${materialDateInput}`, case_history: '', treatment_medicine: '', hospital_id: `${loginId}` },
    ]);
  };
  const onRemove = (i) => {
    const newForm = [...formVal];
    newForm.splice(i, 1);
    setFormVal(newForm);
  };
  const formInputChange = {
    case_history: 500,
    treatment_medicine: 500,
  };
  const formInputValiName = {
    date: 'date',
    case_history: 'case history/symptoms',
    treatment_medicine: 'treatment_medicine',
  };
  const handleInputChange = (e, i) => {
    const newForm = [...formVal];
    newForm[i][e.target.name] = e.target.value;
    setFormVal(newForm);
    const value = e.target.value;
    const name = e.target.name;

    if (value) {
      e.target.parentElement.querySelector('p').innerText = '';
      e.target.parentElement.querySelector('p').style.display = 'none';
    } else if (formInputValiName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the ${formInputValiName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    if (formInputChange[name] && value.length > formInputChange[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formInputChange[name]} character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const errorRes = formValidation(formVal);
    if (errorRes) {
      // api call
    } else {
      // error msg
    }
   
  };

  useEffect(() => {
    getMasterUploadReport();
    getMasterGenderData();
    getMasterBreedData();
    getMasterColorData();
    getMasterStateData();
    getMasterCityData();
    getMasterSpeciesData();
    getMasterAge();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
     const errorRes = formValidation(formVal);
      if (errorRes) {
        // setTimeout(() =>setOpen(true), 10)
        Axios.post(
          url,
          {
            patient_name: formValues.patient_name,
            parent_name: formValues.parent_name,
            age: formValues.age,
            breed: formValues.breed,
            color: formValues.color,
            description: formValues.description,
            city: formValues.city,
            state: formValues.state,
            phone: formValues.phone,
            email: formValues.email,
            pincode: formValues.pincode,
            dateofadmission: formValues.dateofadmission,
            species: formValues.species,
            address: formValues.address,
            gender: formValues.gender,
            hospital_id: formValues.hospital_id,
          },
          { headers: { 'Access-Control-Allow-Origin': '*' } }
        ).then((res) => {
          // console.log(res);
          const data = res.data.post;
          // setResponseId(data)
          const data1 = new FormData();
          data1.append('profile', profile.file);
          const urlImg = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/addOpdimg/${data}`;
          const response1 = Axios.post(urlImg, data1, { headers: { 'Access-Control-Allow-Origin': '*' } })
            .then((res) => {
              // console.log(res);
            })
            .catch((error) => {
              console.log(error.response.data);
              // alert('profile should be less then 1 Mb in size.');
              setOpen(false);
            });
          const url1 = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-opdAddMore-paitent/${data}`;
          const arr = formVal.map((obj) => Axios.post(url1, obj, { headers: { 'Access-Control-Allow-Origin': '*' } }));
          const promise = Promise.allSettled(arr).then((data) => {
            // console.log(data);

          });
          setOpen(true);
          // setTimeout(() =>setOpen(true), 10)
        });
      } else {
        setOpen(false);
        // error msg
      }
      //  .catch((error) => {
      //     // alert(error.response.data);
      //   }) ;
    }
   
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const limit = 500;
    const pincodePattern = /^\d{6}$/;
    const picPattern = pincodePattern.test(values.pincode);
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailRegenx = regex.test(values.email);
    const phonePattern1 = /^\d{10}$/;
    const paPattern = phonePattern1.test(values.phone);
    const formPattern = /^[a-zA-Z\s]*$/;
    const namepatientname = formPattern.test(values.patient_name);
    const nameParentName = formPattern.test(values.parent_name);
    if (!values.patient_name) {
      errors.patient_name = 'Enter the patient name.';
    } else if (namepatientname === false) {
      errors.patient_name = 'Please enter characters only.';
    } else if (values.patient_name.slice(50, limit)) {
      errors.patient_name = 'Enter the minimum 50 character.';
    }
    if (!values.parent_name) {
      errors.parent_name = 'Enter name of the owner.';
    } else if (nameParentName === false) {
      errors.parent_name = 'Please enter characters only.';
    } else if (values.parent_name.slice(50, limit)) {
      errors.parent_name = 'Enter the minimum 50 character.';
    }

    if (!values.age || values.age === 'select') {
      formIsValid = false;
      errors.AgeErr = 'Select age.';
    }

    if (!values.address) {
      errors.address = 'Enter the address.';
    } else if (values.address.slice(450, limit)) {
      errors.address = 'Enter the minimum 500 character.';
    }

    if (values.gender === '' || values.gender === 'select') {
      formIsValid = false;
      errors.sexErr = 'Select gender.';
    }

    if (values.color === '' || values.color === 'select') {
      formIsValid = false;
      errors.colourErr = 'Select colour.';
    }
    if (values.species === '' || values.species === 'select') {
      formIsValid = false;
      errors.species = 'Select species.';
    }

    if (values.breed === '' || values.breed === 'select') {
      formIsValid = false;
      errors.breedErr = 'Select breed.';
    }

  //  if (paPattern === false) {
  //     errors.phone = 'Please enter a valid 10 digit number.';
  //   }

    // setFormErrors({ ...errors });

    return errors;
  };
  const formValidation = (formVal) => {
    const data = [...formVal];
    const limit = 500;
    let valid = true;
    for (let index = 0; index < data.length; index += 1) {
      // const element = data[index];
      if (data[index].date === '') {
        data[index].nameCheck = 'Enter date';
        data[index].nameLengthCheck = '';
        valid = false;
      }

      if (data[index].case_history === '') {
        data[index].emailCheck = 'Enter case history/symptoms';
        data[index].emailFormat = '';
        valid = false;
      } else if (data[index].case_history.slice(500, limit)) {
        data[index].emailCheck = 'Enter the minimum 500 character.';
        data[index].emailFormat = '';
      }

      if (data[index].treatment_medicine === '') {
        data[index].Check = 'Enter treatment medicine provided';
        data[index].emFormat = '';
        valid = false;
      } else if (data[index].treatment_medicine.slice(500, limit)) {
        data[index].Check = 'Enter the minimum 500 character.';
        data[index].emFormat = '';
      }
    }
    setFormVal(data);
    return valid;
  };
  const handleCloseButton = (e) => {
    navigate('/dashboard/OPD');
  };
  return (
    <>
      <section className="screen-one">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
              <div className="">
                <form
                  action=""
                  onSubmit={handleSubmit}
                  method=""
                  encType="multipart/form-data"
                  className="did-floating-label-content"
                >
                  <div className="container">
                    <div className="row">
                      <div className="row">
                        <div className="row justify-content-between">
                          <input type="hidden" value={formValues.hospital_id} />
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Date of Admission<span className="man_filed">*</span>
                            </label>
                            <input
                              type="date"
                              name="dateofadmission"
                              className="form-control"
                              id="dateof_admission"
                              required=""
                              value={formValues.dateofadmission}
                              onChange={handleChange}
                              autoComplete="off"
                              placeholder="Enter Date"
                            />
                            <p style={{ color: 'red' }}>{formErrors.dateofadmission}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold mt-2">Case paper No.</label>
                            <div className="case_id_color form-control"> Set Automatically</div>
                          </div>
                          <div className="col-md-4 text-end mt-4">
                          <div style={{marginTop: '11px'}}>
                          <button type="button" className="btn btn-primary" onClick={handleOpenImg}>
                              Add Image
                            </button>
                          </div>
                            <Modal
                              open={openimg}
                              // onClick={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={styleImg}>
                                <div className="row justify-content-center">
                                  <label className="mb-3 text-center info_opd_bold">Add Patient Profile</label>
                                  <div className="col-md-8 form-group">
                                    <input
                                      type="file"
                                      className="form-control "
                                      id="profile"
                                      name="profile"
                                      autoComplete="off"
                                      onChange={handleInputChangeImg}
                                    />
                                  </div>
                                  <small className="text-center">profile should be less then 1 mb in size.</small>
                                  <div className="col-md-6 form-group mt-2 text-center">
                                    {profile.filepreview !== null ? (
                                      <img className="opdimg" src={profile.filepreview} alt="UploadImage" />
                                    ) : null}
                                  </div>
                                </div>
                                <div className="text-center">
                                  <Button
                                    size="small"
                                    type="button"
                                    variant="contained"
                                    id=""
                                    sx={{ mt: 2, backgroundColor: '#0d6efd' }}
                                    onClick={handleCloseImg}
                                    className="opdpatientok "
                                  >
                                    Ok
                                  </Button>
                                  <Button
                                    size="small"
                                    type="button"
                                    variant="contained"
                                    id=""
                                    sx={{ mt: 2, ml: 1, backgroundColor: '#6c757d' }}
                                    onClick={handleCloseImgCanBtn}
                                    className="imgpopmsgcancle"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </Box>
                            </Modal>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Name of the Owner<span className="man_filed">*</span>
                            </label>
                            <input
                              type="text"
                              name="parent_name"
                              className="form-control"
                              id="parent_name"
                              required=""
                              value={formValues.parent_name}
                              onChange={handleChange}
                              autoComplete="off"
                              onKeyDown={handleKeyDown}
                              placeholder="Enter Name of the Owner"
                            />
                            <p style={{ color: 'red' }}>{formErrors.parent_name}</p>
                            {/* <p style={{ color: 'red' }}>{formErrPatn}</p> */}
                          </div>
                          <div className="col-md-8 form-group">
                            <label className="info_opd_bold">
                              Address<span className="man_filed">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              name="address"
                              id="address"
                              required=""
                              value={formValues.address}
                              onChange={handleChange}
                              onKeyDown={handleKeyDown}
                              autoComplete="off"
                              placeholder="Enter Address"
                            />
                            <p style={{ color: 'red' }}>{formErrors.address}</p>
                          </div>
                        </div>
                        <div className="row justify-content-center mb-3">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Species<span className="man_filed">*</span>
                            </label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              id="species"
                              name="species"
                              onChange={handleChange}
                              // className={`species ? ' showError' : ''`}
                              className="form-control"
                              value={formValues.species}
                            >
                              <option value="">--Select--</option>
                              {masterSpeciesData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>

                            {species && <p style={{ color: 'red' }}>{species}</p>}
                          </div>

                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Breed<span className="man_filed">*</span>
                            </label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              id="breed"
                              name="breed"
                              onChange={handleChange}
                              className="form-control"
                              value={formValues.breed}
                            >
                              <option value="">--Select--</option>
                              {masterBreedData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {breedErr && <p style={{ color: 'red' }}>{breedErr}</p>}
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Colour<span className="man_filed">*</span>
                            </label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              id="color"
                              name="color"
                              onChange={handleChange}
                              className="form-control"
                              value={formValues.color}
                            >
                              <option value="">--Select--</option>
                              {masterColorData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>

                            {colourErr && <p style={{ color: 'red' }}>{colourErr}</p>}
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Patient Name<span className="man_filed">*</span>
                            </label>
                            <input
                              type="text"
                              name="patient_name"
                              className="form-control"
                              id="patient_name"
                              required=""
                              value={formValues.patient_name}
                              onChange={handleChange}
                              onKeyDown={handleKeyDown}
                              autoComplete="off"
                              placeholder="Enter Patient Name"
                            />
                            <p style={{ color: 'red' }}>{formErrors.patient_name}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              {' '}
                              Age<span className="man_filed">*</span>
                            </label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="selectCtrl"
                              name="age"
                              onChange={handleChange}
                              className="form-control"
                              value={formValues.age}
                            >
                              <option value="">--Select--</option>
                              {masterage.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.age}
                                </option>
                              ))}
                            </select>

                            {AgeErr && <p style={{ color: 'red' }}>{AgeErr}</p>}
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Gender<span className="man_filed">*</span>
                            </label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              id="selectCtrl"
                              name="gender"
                              onChange={handleChange}
                              className="form-control"
                              value={formValues.gender}
                            >
                              <option value="">--Select--</option>

                              {masterGenderData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>

                            {sexErr && <p style={{ color: 'red' }}>{sexErr}</p>}
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group mt-3 mt-md-0">
                            <label className="info_opd_bold">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              required=""
                              value={formValues.email}
                              onChange={handleChange}
                           
                              autoComplete="off"
                              placeholder="Enter Email"
                            />
                            <p style={{ color: 'red' }}>{formErrors.email}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">Mobile No.</label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              name="phone"
                              required=""
                              value={formValues.phone}
                              onChange={handleChange}
                              autoComplete="off"
                              minLength={10}
                              size="10"
                              maxLength={10}
                              pattern='[0-9]{10}'
                              placeholder="Enter Mobile.No"
                            />
                            <p style={{ color: 'red' }}>{formErrors.phone}</p>
                          </div>
                          <div className="col-md-4 form-group ">
                            <label className="info_opd_bold">Description</label>
                            <textarea
                              className="form-control"
                              name="description"
                              rows=""
                              required=""
                              value={formValues.description}
                              onChange={handleChange}
                              onKeyDown={handleKeyDown}
                              autoComplete="off"
                              placeholder="Enter Description"
                            />
                            <p style={{ color: 'red' }}>{formErrors.description}</p>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">State</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              id="selectCtrl"
                              name="state"
                              onChange={handleChange}
                              className="form-control"
                              value={formValues.state}
                            >
                              <option value="">--Select--</option>
                              {masterStateData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {StateErr && <p style={{ color: 'red' }}>{StateErr}</p>}
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">City</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              id="city"
                              name="city"
                              onChange={handleChange}
                              className="form-control"
                              value={formValues.city}
                            >
                              <option value="">--Select--</option>

                              {masterCityData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {CityErr && <p style={{ color: 'red' }}>{CityErr}</p>}
                          </div>

                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">Pincode</label>
                            <input
                              type="number"
                              className="form-control"
                              id="pincode"
                              name="pincode"
                              required=""
                              value={formValues.pincode}
                              onChange={handleChange}
                              onKeyDown={handleKeyDown}
                              autoComplete="off"
                              minLength="6"
                              maxLength="6"
                              size="6"
                              placeholder="Enter Pincode"
                            />
                            <p style={{ color: 'red' }}>{formErrors.pincode}</p>
                          </div>
                        </div>
                        <div className="mt-5 mb-3">
                          <h4>Treatment Prescription</h4>
                        </div>

                        <div className="App">
                          <Table responsive="md" className="table table-class">
                            <thead>
                              <tr>
                                <th className="">
                                  Date / Type<span className="man_filed">*</span>
                                </th>
                                <th>
                                  Case History/Symptoms<span className="man_filed">*</span>
                                </th>
                                <th>
                                  Treatment Medicine Provided<span className="man_filed">*</span>
                                </th>
                              </tr>
                            </thead>
                            {formVal.map((item, i) => (
                              <tbody>
                                <tr className="">
                                  <td>
                                    <input
                                      type="date"
                                      name="date"
                                      id="addmoredate"
                                      className="form-control"
                                      placeholder="Enter Date"
                                      value={item.date}
                                      autoComplete="off"
                                      onChange={(e) => handleInputChange(e, i)}
                                    />
                                    {item.date === '' ? (
                                      <p style={{ color: 'red' }}>
                                        {item.nameCheck} {item.nameLengthCheck}
                                      </p>
                                    ) : (
                                      ''
                                    )}
                                  </td>
                                  <td>
                                    <textarea
                                      className="form-control"
                                      name="case_history"
                                      placeholder="Enter Case history/Symptoms"
                                      value={item.case_history}
                                      onChange={(e) => handleInputChange(e, i)}
                                      onKeyDown={handleKeyDown}
                                    />
                                    <p style={{ color: 'red' }}>
                                      {item.emailCheck} {item.emailFormat}
                                    </p>
                                  </td>
                                  <td>
                                    <textarea
                                      className="form-control"
                                      name="treatment_medicine"
                                      placeholder="Enter Treatment Medicine Provided"
                                      value={item.treatment_medicine}
                                      onChange={(e) => handleInputChange(e, i)}
                                      onKeyDown={handleKeyDown}
                                    />
                                    <p style={{ color: 'red' }}>
                                      {item.Check} {item.emFormat}
                                    </p>
                                    
                                  </td>
                                  <td>
                                    {/* {i === 0 ? (
                                      ''
                                    ) : (
                                      <DeleteIcon
                                        onClick={() => onRemove(i)}
                                        sx={{ color: 'red', cursor: 'pointer', mt: 2 }}
                                      />
                                    )} */}
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                          </Table>
                          <div>
                            <button type="button" className="btn btn-primary" style={{ margin: 10 }} onClick={addRow}>
                              Add More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">
                        {/* onClick={handleOpen} */}
                        Save
                      </button>
                      <button type="button" className="btn btn-secondary m-2" onClick={handleCloseButton}>
                        {/* onClick={handleOpen} */}
                        Cancel
                      </button>
                    </div>
                  </div>
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
                        Record has been Saved Successfully
                      </Typography>
                      <div className="text-center">
                        <Button
                          size="small"
                          type="button"
                          variant="contained"
                          onClick={() => navigate('/dashboard/OPD')}
                          id=""
                          className="text-center opdpatientok"
                          sx={{ mt: 2, backgroundColor: '#0d6efd' }}
                        >
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
