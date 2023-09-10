import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, NavLink } from 'react-router-dom';
import './style.css';
import axios from 'axios';
// @mui
import { Button, Typography, Box, Modal } from '@mui/material';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import DeleteIconImg from '@mui/icons-material/Close';
// import Table from 'react-bootstrap/Table';
// // ----------------------------------------------------------------------
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
export default function EditOpdForm() {
  const { opdId } = useParams();
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
  const [imaes, setimaes] = useState([]);
  const getMultipleImages = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-multiple-images/${opdId}`
    );
    const data = await response.json();
    if (data.post.length === 0) {
      setimaes(data.post);
    } else {
      setimaes(data.post);
    }
  };
  const [masterage, setMasterAge] = useState([]);
  const getMasterAge = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-age`
    );
    setMasterAge(await response.json());
    // console.log(masterage)
  };
  // console.log(imaes)
  const [opdEditreport, setopdEditreport] = useState([]);
  const getallUploadReport = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-uploadreport-editpage/${opdId}`
    );
    const data = await response.json();
    if (data.length === 0) {
      setopdEditreport(data);
    } else {
      setopdEditreport(data);
    }
  };
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;

  const [opdEdit, setOpdEdit] = useState({
    patient_name: '',
    parent_name: '',
    age: '',
    dateofadmission: '',
    hospital_id: `${loginId}`,
  });
  const [inputList, setInputList] = useState([
    { date: '', case_history: '', treatment_medicine: '', hospital_id: `${loginId}`, patient_id: `${opdId}`, id: '' },
  ]);

  // handle input change
  const formInputChange = {
    case_history: 500,
    treatment_medicine: 500,
  };
  const formInputValiName = {
    date: 'date',
    case_history: 'case history/symptoms',
    treatment_medicine: 'treatment medicine provided',
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    const value1 = e.target.value;
    const name1 = e.target.name;

    if (value1) {
      e.target.parentElement.querySelector('p').innerText = '';
      e.target.parentElement.querySelector('p').style.display = 'none';
    } else if (formInputValiName[name1]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the ${formInputValiName[name1]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    if (formInputChange[name1] && value.length > formInputChange[name1]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formInputChange[name1]} character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
  };

  // handle click event of the Remove button
  const handleRemoveClick = (id) => {
    const Id = id;
    axios
      .post(
        `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/delete-ipdmore-patient/${Id}`
      ) // <-- remove ;
      .then((res) => {
        window.location.reload();
        // const users = res.message;
      });
  };
  const handleRemoveReportClick = (e) => {
    const id = e.target.value;
    axios
      .post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/deletepatient-report/${id}`) // <-- remove ;
      .then((res) => {
        window.location.reload();
      });
  };
  const deleteImages = (e) => {
    const id = e.target.value;
    console.log(id);
    axios
      .post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/delete-mulimg/${id}`) // <-- remove ;
      .then((res) => {
        window.location.reload();
      });
  };
  const download = (e) => {
    const data = e.target.href;
  };
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  // handle click event of the Add button

  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const monthWithOffset = dateNow.getUTCMonth() + 1;
  const month = monthWithOffset.toString().length < 2 ? `0${monthWithOffset}` : monthWithOffset;
  const date = dateNow.getUTCDate().toString().length < 2 ? `0${dateNow.getUTCDate()}` : dateNow.getUTCDate();
  const materialDateInput = `${year}-${month}-${date}`;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    const errors = validate(opdEdit);
    const errorRes = formValidation(inputList);
    // if (Object.keys(errors).length === 0) {
    //   setFormErrors(errors);
    //   setOpen(false);
    // } else if(errorRes){
    //   setOpen(false);
    //   // navigate('afterlogin');
    // }else{
      setOpen(true);
    // }
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  const [openimg, setOpenImg] = useState(false);
  const handleOpenImg = () => setOpenImg(true);
  const handleCloseImg = () => {
    const data1 = new FormData();
    data1.append('profile', profile.file);
    const urlImg = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/addOpdimg/${opdId}`;
    const response1 = axios
      .post(urlImg, data1)
      .then((res) => {
        console.log(res.data.message);
        setOpenImg(false);
        // console.log(response1)
      })
      .catch((error) => {
        setOpenImg(true);
        console.log('profile should be less then 1 Mb in size.');
      });
    // setOpenImg(false);
  };
  const handleCloseImgCanBtn = () => {
    window.location.reload();
    setOpenImg(false);
  };
  const [profile, setProfile] = useState({
    file: [],
    filepreview: null,
  });
  // console.log(profile.filepreview)
  const handleInputChangeImg = (event) => {
    setProfile({
      ...profile,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  // upload report function
  const [select, setSelect] = useState();
  const handleCapacity = (e) => {
    setSelect(e.target.value);
  };
  const [reportfile, setReportfile] = useState({
    file: [],
    filepreview: null,
  });
  const handleInputReportFile = (event) => {
    setReportfile({
      ...reportfile,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  const [caseId, setCaseId] = useState([]);
  useEffect(() => {
    async function getOpdEdit() {
      try {
        const response = await axios.get(
          `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-opd/${opdId}`
        );
        setOpdEdit(response.data);
        if (response.data.case_tables.length === 0) {
          setCaseId(response.data.case_tables[0]);
        } else {
          setCaseId(response.data.case_tables[0]);
        }
      } catch (error) {
        console.log('Something is Wrong');
      }

      try {
        const opdAddMoreData = await axios.get(
          `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-opdAddMore/${opdId}`
        );
        // console.log(opdAddMoreData.data);
        setInputList(opdAddMoreData.data);
      } catch (error) {
        console.log('Something is Wrong');
      }
    }
    getOpdEdit();
    getMultipleImages();
    getMasterUploadReport();
    getMasterGenderData();
    getMasterBreedData();
    getMasterColorData();
    getMasterStateData();
    getMasterCityData();
    getMasterSpeciesData();
    // getBedNumberData();
    getMasterAge();
    getallUploadReport();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(opdEdit);
    }
  }, [opdId]);
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
    email: 'a valid email',
    dateofadmission: 'date of admission',
    phone:'mobile no.',
    pincode:'pincode'
  };
  const formValSelectName = {
    age: 'age',
    gender: 'gender',
    species: 'species',
    breed: 'breed',
    color: 'color',
    // city: 'city',
    // state: 'state',
  };
  const formValPattern = {
    parent_name: 'name of the owner',
    patient_name: 'patient name',
  };
  const pinPattern = {
    pincode: 'pincode',
  };
  const phonePattern = {
    phone: 'phone',
  };
  const formValEmailPatt = {
    email: 'email',
  };
  function handleChange(e) {
    setOpdEdit({
      ...opdEdit,
      [e.target.name]: e.target.value,
    });
    const value = e.target.value;
    const name = e.target.name;
    const value1 = e.target.value;
    const letters = /^[a-zA-Z\s]*$/;
    const namePattern = letters.test(value1);
    const pincodePattern = /^\d{6}$/;
    const pinCodePat = pincodePattern.test(value1);
    const phonePattern1 = /^[0-9]{1,10}$/;
    const phonePat = phonePattern1.test(value1);

    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailPat = emailPattern.test(value1);
    // console.log(name)
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
    if (formValPattern[name] && namePattern === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter only character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    if (formValEmailPatt[name] && emailPat === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter the a valid email.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    if (pinPattern[name] && pinCodePat === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter the only digit.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    if (phonePattern[name] && phonePat === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter the only digit.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
  }

  function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length  === 0) { // check if space is at beginning
      event.preventDefault();
    }
  }

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const { sexErr } = formErrors;
  const { colourErr } = formErrors;
  const { StateErr } = formErrors;
  const { CityErr } = formErrors;
  const { breedErr } = formErrors;
  const { species } = formErrors;
  const { CageidErr } = formErrors;
  const { AgeErr } = formErrors;
  let formIsValid = true;
// console.log(opdEdit)
  async function handleSubmit(e) {
    e.preventDefault();
//     console.log('errors');
    const errors = validate(opdEdit);
// // console.log(errors);
//     if (Object.keys(errors).length === 0) {
//       setFormErrors(errors);
//       setOpen(false);
//     } else {
//       setOpen(true);
      try {
        setFormErrors(errors);
        setIsSubmit(true);
        await axios
          .post(
            `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/updatepatient/${opdId}`,opdEdit)
          .then((response) => {
            const data = response.data.post;
            const errorRes = formValidation(inputList);
            if (errorRes) {
              const url1 = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/opdAddMore-updatepatient/${data}`;
              const arr = inputList.map((obj) => axios.post(url1, obj));
              // console.log(arr);
              const promise = Promise.allSettled(arr).then((data) => {
                // console.log(data);
                // setOpen(true);
              });
            } else {
              // setOpen(false);
              // console.log(data);
            }
          });
      } catch (error) {
        console.log('Something is Wrong');
      }
    // }
  }
  const validate = (values) => {

    const limit = 500;
    const errors = {};
    const PHONE_PATTERN = /(^[0-9]+(\.[0-9]+)?$)/;
    const paPattern = PHONE_PATTERN.test(values.phone);
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailRegenx = regex.test(values.email);
    const pincodePattern = /^\d{6}$/;
    const picPattern = pincodePattern.test(values.pincode);
    const letters = /^[a-zA-Z\s]*$/;
    const namePatientName = letters.test(values.patient_name);
    const nameParentName = letters.test(values.parent_name);

    if (!values.patient_name) {
      errors.patient_name = 'Enter the patient name.';
    } else if (namePatientName === false) {
      errors.patient_name = 'Enter the only character.';
    } else if (values.patient_name.slice(50, limit)) {
      errors.patient_name = 'Enter the minimum 50 character.';
    }
    if (!values.parent_name) {
      errors.parent_name = 'Enter name of the owner.';
    } else if (nameParentName === false) {
      errors.parent_name = 'Enter the only character.';
    } else if (values.parent_name.slice(50, limit)) {
      errors.parent_name = 'Enter the minimum 50 character.';
    }
    if (!values.age || values.age === 'select') {
      formIsValid = false;
      errors.AgeErr = 'select age.';
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
    return errors;
  };
  const formValidation = (inputList) => {
    const data = [...inputList];

    let valid = true;
    for (let index = 0; index < data.length; index += 1) {
      // const element = data[index];
      if (data[index].date === '') {
        data[index].nameCheck = 'Enter date';
        data[index].nameLengthCheck = '';
        valid = false;
      }

      if (data[index].case_history === '') {
        data[index].emailCheck = 'Enter Case history/symptoms';
        data[index].emailFormat = '';
        valid = false;
      }

      if (data[index].treatment_medicine === '') {
        data[index].Check = 'Enter treatment medicine provided';
        data[index].emFormat = '';
        valid = false;
      }
    }
    setInputList(data);
    return valid;
  };
  const handleCloseButton = (e) => {
    navigate('/dashboard/OPD');
  };

  return (
    <>
      <section className="screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
              <div className="">
                <form
                  action=""
                  onSubmit={handleSubmit}
                  className="did-floating-label-content"
                  method="post"
                  encType="multipart/form-data"
                >
                  <div className="container">
                    <div className="row">
                      <div className="row">
                        <div className="row justify-content-between">
                          <input type="hidden" value={opdEdit.hospital_id} />
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Date of Admission<span className="man_filed">*</span>
                            </label>

                            <input
                              type="date"
                              name="dateofadmission"
                              className="form-control"
                              id="dateofadmission"
                              required=""
                              value={opdEdit.dateofadmission.substr(0, 10)}
                              onChange={(e) => handleChange(e)}
                              autoComplete="off"
                              placeholder="Enter the Date"
                            />

                            <p style={{ color: 'red' }}>{formErrors.dateofadmission}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold mt-2">Case paper No.</label>
                            <div className="case_id_color form-control">{caseId.case_id}</div>
                          </div>
                          <div className="col-md-4 text-end mt-4">
                            <button type="button" className="btn btn-primary" onClick={handleOpenImg}>
                              Edit Image
                            </button>
                            <Modal
                              open={openimg}
                              // onClick={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={styleImg}>
                                <div className="row justify-content-center">
                                  <label className="mb-3 text-center info_opd_bold">Edit Patient Profile</label>
                                  <div className="col-md-10 form-group text-center">
                                    <input
                                      type="file"
                                      className="form-control "
                                      id="profile"
                                      name="profile"
                                      onChange={handleInputChangeImg}
                                      autoComplete="off"
                                    />
                                    <small>profile should be less then 1 Mb in size.</small>
                                  </div>
                                  <div className="col-md-6 form-group m-2 text-center">
                                    {profile.filepreview !== null ? (
                                      <img className="editopdimg" src={profile.filepreview} alt="" />
                                    ) : (
                                      <img className="editopdimg" src={opdEdit.s3image} alt="" />
                                    )}
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
                                    className="editok-btn"
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
                                    className="editcancle-btn"
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
                              value={opdEdit.parent_name}
                              onChange={(e) => handleChange(e)}
                              onKeyDown={handleKeyDown}
                              autoComplete="off"
                              placeholder="Enter Name of the Owner"
                            />

                            <p style={{ color: 'red' }}>{formErrors.parent_name}</p>
                          </div>
                          <div className="col-md-8 form-group ">
                            <label className="info_opd_bold">
                              Address<span className="man_filed">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              name="address"
                              id="address"
                              required=""
                              value={opdEdit.address}
                              onChange={(e) => handleChange(e)}
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
                              className="form-control"
                              value={opdEdit.species}
                            >
                              {/* <option value=''>--select--</option> */}
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
                              required
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              id="breed"
                              name="breed"
                              onChange={(e) => handleChange(e)}
                              className="form-control"
                              value={opdEdit.breed}
                            >
                              {/* <option value=''>--select--</option> */}
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
                              required
                              id="color"
                              name="color"
                              onChange={(e) => handleChange(e)}
                              className="form-control"
                              value={opdEdit.color}
                            >
                              {/* <option value=''>--select--</option> */}
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
                              value={opdEdit.patient_name}
                              onChange={(e) => handleChange(e)}
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
                              id="selectCtrl"
                              name="age"
                              value={opdEdit.age}
                              onChange={(e) => handleChange(e)}
                              className="form-control"
                            >
                              {/* <option value=''>--select--</option> */}
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
                              required
                              id="gender"
                              name="gender"
                              onChange={(e) => handleChange(e)}
                              className="form-control"
                              value={opdEdit.gender}
                            >
                              {/* <option value=''>--select--</option> */}
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
                              type="text"
                              className="form-control"
                              name="email"
                              id="email"
                              required=""
                              value={opdEdit.email}
                              onChange={(e) => handleChange(e)}
                              // autoComplete="off"
                              placeholder="Enter the Email"
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
                              value={opdEdit.phone}
                              onChange={(e) => handleChange(e)}
                              // autoComplete="off"
                              minLength="10"
                              maxLength="10"
                              size="10"
                              placeholder="Enter the Mobile No."
                            />
                            <p style={{ color: 'red' }}>{formErrors.phone}</p>
                          </div>
                          <div className="col-md-4 form-group ">
                            <label className="info_opd_bold">Description</label>
                            <textarea
                              className="form-control"
                              name="description"
                              value={opdEdit.description}
                              onChange={(e) => handleChange(e)}
                              onKeyDown={handleKeyDown}
                              // autoComplete="off"
                              placeholder="Enter the Description"
                            />
                            <p style={{ color: 'red' }}>{formErrors.description}</p>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">State</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              id="state"
                              name="state"
                              onChange={(e) => handleChange(e)}
                              className="form-control"
                              value={opdEdit.state}
                              // placeholder="select"
                            >
                              <option value="">--select--</option> 
                              {masterStateData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {/* {StateErr && <div style={{ color: 'red' }}>{StateErr}</div>} */}
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">City</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              id="city"
                              name="city"
                              onChange={(e) => handleChange(e)}
                              className="form-control"
                              value={opdEdit.city}
                              placeholder="select"
                            >
                              <option value="">--select--</option>
                              {masterCityData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {/* {console.log(opdEdit.city==="")} */}
                            {/* {CityErr && <div style={{ color: 'red' }}>{CityErr}</div>} */}
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">Pincode</label>
                            <input
                              type="text"
                              className="form-control"
                              id="pincode"
                              name="pincode"
                              value={opdEdit.pincode}
                              onChange={(e) => handleChange(e)}
                              onKeyDown={handleKeyDown}
                              // autoComplete="off"
                              minLength="6"
                              maxLength="6"
                              size="6"
                              placeholder="Enter the Pincode"
                            />
                            <p style={{ color: 'red' }}>{formErrors.pincode}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 mb-3">
                        <h4 className="fw-bold">Treatment Prescription</h4>
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

                          {inputList.map((item, i) => (
                            // console.log(i)
                            <tbody>
                              <tr className="">
                                <td>
                                  <input type="hidden" name="patient_id" value={opdId} />
                                  <input type="hidden" name="id" value={item.id} />
                                  <input
                                    type="date"
                                    name="date"
                                    className="form-control"
                                    placeholder="Enter Date"
                                    value={item.date.substr(0, 10)}
                                    autoComplete="off"
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                    <p style={{ color: 'red' }}>
                                    {item.nameCheck} {item.nameLengthCheck}
                                  </p>
                                </td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    name="case_history"
                                    placeholder="Enter Case history/symptoms"
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
                                    placeholder="treatment Medicine Provided"
                                    value={item.treatment_medicine}
                                    onChange={(e) => handleInputChange(e, i)}
                                    onKeyDown={handleKeyDown}
                                  />
                                   <p style={{ color: 'red' }}>
                                   {item.Check} {item.emFormat}
                                  </p>
                                </td>
                                <td>
                                  {/* <DeleteIcon
                                    onClick={() => handleRemoveClick(item.id)}
                                    sx={{ color: 'red', cursor: 'pointer', mt: 2 }}
                                  /> */}
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </Table>
                      </div>
                      <div className="row mt-3">
                        <h4 className="fw-bold">Test Report</h4>
                        {opdEditreport.length === 0 ? (
                          <small>No Report Uploaded Here</small>
                        ) : (
                          <div className="row">
                            {opdEditreport.map((elm) => {
                              // console.log(elm.img_url_type);
                              return (
                                <div className="col-md-3">
                                  {elm.img_url_type === '2' ? (
                                    <div className="">
                                      <div className="text-center">
                                        <div className="mt-1">
                                          <button
                                            value={elm.id}
                                            onClick={handleRemoveReportClick}
                                            className="remove-button delete-file"
                                          >
                                            x
                                          </button>
                                          <div>
                                            <a href={elm.s3_url} target="_blank" rel="noopener noreferrer" className="">
                                              {' '}
                                              <i className="fas fa-file-pdf pdf-icon" />
                                            </a>
                                          </div>
                                          <a
                                            href={elm.s3_url}
                                            download
                                            onClick={(e) => download(e)}
                                            className="download_file"
                                          >
                                            download
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="">
                                      <div>
                                        <button
                                          value={elm.id}
                                          onClick={handleRemoveReportClick}
                                          className="remove-button delete-icon"
                                        >
                                          x
                                        </button>
                                        <div className="zoomdiv">
                                          <div className="repodrt_file zoom">
                                            <img className="zoom" src={elm.s3_url} alt="" />
                                          </div>
                                        </div>
                                        <a
                                          href={elm.s3_url}
                                          download
                                          onClick={(e) => download(e)}
                                          className="download_img"
                                        >
                                          download
                                        </a>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div className="">
                        <div className="multipeimgrow mt-3 ">
                          <h4 className="fw-bold">Images</h4>
                          {imaes.length === 0 ? (
                            <small>No Images Uploaded Here</small>
                          ) : (
                            <div className="container">
                              <div className="row">
                                {imaes.map((item) => {
                                  return (
                                    <div className="col-md-4">
                                      <button value={item.id} className="edit-delete-img-opd" onClick={deleteImages}>
                                        x
                                      </button>
                                      <div className="edit-image-opd mb-3">
                                        {' '}
                                        <img src={item.s3image} alt="" />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary m-2" onClick={handleOpen}>
                      Save
                    </button>
                    <button type="button" className="btn btn-secondary m-1" onClick={handleCloseButton}>
                      Cancel
                    </button>
                  </div>
                  <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
                          id=""
                          className="text-center opdpatientok"
                          sx={{ mt: 2, backgroundColor: '#0d6efd' }}
                          onClick={() => navigate('/dashboard/OPD')}
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
