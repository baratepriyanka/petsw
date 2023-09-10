import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';

import axios from 'axios';
import Moment from 'moment';
// @mui
import { Button, Typography, Box, Modal } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import Table from 'react-bootstrap/Table';
// // import deleteimg from './images/delete.png';
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
export default function EditIpdForm() {
  const { ipdId } = useParams();

  const [masterGenderData, setMasterGenderData] = useState([]);
  const getMasterGenderData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-gender`
    );
    setMasterGenderData(await response.json());
  };
  const [masterbedNumber, setBedNumber] = useState([]);
  const [Wardnumber, setWardnumber] = useState([]);
  const getWardnumber = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-wardnumber/${loginId}`
    );
    setWardnumber(await response.json());
  };
  const [masterBreedData, setMasterBreedData] = useState([]);
  const getMasterBreedData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-breed`
    );
    setMasterBreedData(await response.json());
  };
  const [masterSpeciesData, setmasterSpeciesData] = useState([]);
  const getMasterSpeciesData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-species`
    );
    setmasterSpeciesData(await response.json());
  };
  const [masterColorData, setMasterColorData] = useState([]);
  const getMasterColorData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-color`
    );
    setMasterColorData(await response.json());
  };

  const [masteripdcategory, setMasteripdcategory] = useState([]);
  const getMasteripdcategory = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/ipd-category`
    );
    setMasteripdcategory(await response.json());
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
  const [images, setimages] = useState([]);
  const getMultipleImages = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-multiple-images/${ipdId}`
    );
    const data = await response.json();
    if (data.length === 0) {
      setimages(data.post);
      // console.log(imaes)
    } else {
      setimages(data.post);
    }
  };

  const [opdEditreport, setopdEditreport] = useState([]);
  const getReportData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-uploadreport-editpage/${ipdId}`
    );
    const data = await response.json();
    if (data.length === 0) {
      setopdEditreport(data);
    } else {
      setopdEditreport(data);
    }
    // console.log(response.data);
  };

  const [date1, setDate] = useState(new Date().toISOString().substr(0, 16));
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date().toISOString().substr(0, 16));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const today = new Date();
  const ghours = today.getHours();
  const gMinutes = today.getMinutes();
  const gSeconds = today.getSeconds();
  const time = `${ghours}:${gMinutes}`;

  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const monthWithOffset = dateNow.getUTCMonth() + 1;
  const month = monthWithOffset.toString().length < 2 ? `0${monthWithOffset}` : monthWithOffset;
  const date = dateNow.getUTCDate().toString().length < 2 ? `0${dateNow.getUTCDate()}` : dateNow.getUTCDate();
  const materialDateInput = `${year}-${month}-${date}`;
  const dtime = `${materialDateInput}T${time}`;
  // console.log(dtime);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    // const errors = validate(student);
    // // console.log(errors)
    // if (Object.keys(errors).length) {
    //   setFormErrors(errors);
    //   setOpen(false);
    // } else {
      setOpen(true);
      // navigate('afterlogin');
    // }
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;
  const [inputList, setInputList] = useState([
    { date: '', case_history: '', treatment_medicine: '', hospital_id: `${loginId}`, id: '' },
  ]);

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { date: `${materialDateInput}`, case_history: '', treatment_medicine: '', hospital_id: `${loginId}`, id: '' },
    ]);
  };

  const handleRemoveClick = (id) => {
    const Id = id;
    // console.log(id)
    axios
      .post(
        `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/delete-ipdmore-patient/${Id}`
      ) // <-- remove ;
      .then((res) => {
        window.location.reload();
        // console.log(id)
      });
  };

  const handleRemoveReportClick = (e) => {
    const id = e.target.value;
    // console.log(id)
    axios
      .post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/deletepatient-report/${id}`) // <-- remove ;
      .then((res) => {
        window.location.reload();
        // console.log(res);
        // console.log(id)
      });
  };
  const deleteImages = (e) => {
    const id = e.target.value;
    // console.log(id);
    axios
      .post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/delete-mulimg/${id}`) // <-- remove ;
      .then((res) => {
        window.location.reload();
      });
  };
  const download = (e) => {
    const data = e.target.href;
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const [openimg, setOpenImg] = useState(false);
  const handleOpenImg = () => setOpenImg(true);
  const handleCloseImg = () => {
    const data1 = new FormData();
    data1.append('profile', profile.file);
    const urlImg = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/addIpdimg/${ipdId}`;
    const response1 = axios
      .post(urlImg, data1)
      .then((res) => {
        console.log(res.data.message);
        setOpenImg(false);
      })
      .catch((error) => {
        setOpenImg(true);
        console.log('profile should be less then 1 Mb in size.');
      });
    // setOpenImg(false);
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
  const initial ={
    category: '',
    parent_name: '',
    reg_no: '',
    address: '',
    fee: '',
    dateofadmission: '',
    hospital_id: `${loginId}`,
  }
  const [student, setStudent] = useState(initial);
  // console.log(student.dateofadmission)
  const dateAddmi=student.dateofadmission
  const dateAdd=Moment(dateAddmi).format('YYYY-MM-DD')
  const dateTime=Moment(dateAddmi).format('HH:mm:SS')
  const dateOfAdm =`${dateAdd}T${dateTime}`;

  // console.log(dateOfAdm)
  // console.log(dateTime)

  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(
          `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-ipd/${ipdId}`
        );
        setStudent(student.data);
        // console.log(student.data);
        if (student.data.case_tables.length === 0) {
          setCaseId(student.data.case_tables[0]);
        } else {
          setCaseId(student.data.case_tables[0]);
        }
      } catch (error) {
        console.log('Something is Wrong');
      }

      try {
        const student1 = await axios.get(
          `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-opdAddMore/${ipdId}`
        );
        // console.log(student1.data);
        setInputList(student1.data);
      } catch (error) {
        console.log('Something is Wrong');
      }
    }
    getStudent();
    getMasterUploadReport();
    getMasterGenderData();
    getMasterBreedData();
    getMasterColorData();
    getMasteripdcategory();
    getMultipleImages();
    getWardnumber();
    getMasterSpeciesData();
    getMasterAge();
    getReportData();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(student);
    }
  }, [ipdId]);

  // console.log(changedate);
  const componentRef = useRef(null);
  const formVAlidations = {
    parent_name: 50,
    address: 500,
    patient_name: 50,
    xray: 500,
    diagnosis:500,
  };
  const formValName = {
    phone: 10,
    weight: 2,
  };
  const formValidationName = {
    parent_name: 'name of the owner',
    address: 'address',
    patient_name: 'patient name',
    weight: 'weight',
    dateofadmission:'date of admission',
    phone:'mobile no',
    reg_no:'reg number',
    fee:'fees',
    bill_no:'bill number',
    xray:'xray',
    diagnosis:'diagnosis',
  };
  const formValSelectName = {
    category: 'category',
    genderid: 'gender',
    species: 'species',
    breed: 'breed',
    color: 'color',
    ward:'ward',
    cage_kennel:'cage_kennel',
    age: 'age',
  };
  const formValPattern = {
    parent_name: 'name of the owner',
    patient_name: 'patient Name',
  };

  function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length  === 0) { // check if space is at beginning
      event.preventDefault();
    }
  }
  function handleChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });

    const value=e.target.value;
    const name=e.target.name;
    const value1 = e.target.value;
    const letters = /^[a-zA-Z\s]*$/;
    const namePattern = letters.test(value1)
    if (value) {
      e.target.parentElement.querySelector('p').innerText = '';
      e.target.parentElement.querySelector('p').style.display = 'none';
    }else if (formValidationName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the ${formValidationName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    } else{
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
    // console.log(student)
    // const id = componentRef.current.value;
    // const response = fetch(
    //   `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-cageid/${id}`
    // )
    //   .then((response) => response.json())

    //   .then((data) => {
    //     if (data.length === 0) {
    //       setBedNumber(data);
    //     } else {
    //       setBedNumber(data);
    //     }
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
  }

  const handleChandeApi = (e) => {
    const id = componentRef.current.value;
    const response = fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-cageid/${id}`
    )
      .then((response) => response.json())

      .then((data) => {
        if (data.length === 0) {
          setBedNumber(data);
        } else {
          setBedNumber(data);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    console.log("errors")
     const errors = validate(student);
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      setOpen(false);
    } else {
      try {
        // console.log(formErrors)
        setFormErrors(validate(student));
        setIsSubmit(true);
        // const errors = validate(student);
  
        await axios
          .post(
            `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/update-ipd/${ipdId}`,
            student
          )
          .then((response) => {
            //  setOpen(false);
            const data = response.data.post;
            const errorRes = formValidation(inputList);
            if (errorRes) {
              const url1 = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-ipdAddMore-updatepaitent/${data}`;
              const arr = inputList.map((obj) =>
                axios.post(url1, obj, { headers: { 'Access-Control-Allow-Origin': '*' } })
              );
              const promise = Promise.allSettled(arr).then((data) => {
                // setOpen(true);
                // console.log(data);
              });
            } else {
              // console.log(data)
              // setOpen(false);
            }
          });
      } catch (error) {
        console.log('Something is Wrong');
        // setOpen(false);
      }
    }

    
  }

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { category } = formErrors;
  const { breed } = formErrors;
  const { color } = formErrors;
  const { gender } = formErrors;
  const { CageidErr } = formErrors;
  const { wardErr } = formErrors;
  const { AgeErr } = formErrors;
  const { SpeciesErr } = formErrors;
  let formIsValid = true;

  const validate = (values) => {
    const limit = 500;
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;

    const PHONE_PATTERN = /(^[0-9]+(\.[0-9]+)?$)/;
    const paPattern=PHONE_PATTERN.test(values.phone);
    const formPattern =  /^[a-zA-Z\s]*$/
    const namePatientName= formPattern.test(values.patient_name);
    const nameParentName= formPattern.test(values.parent_name);

    if (!values.phone) {
      errors.phone = 'Enter the mobile no.';
    } else if (paPattern === false) {
      errors.phone = 'Please enter numbers only.';
    } else if (values.phone.length > 10) {
      errors.phone = 'Please enter a valid 10 digit number.';
    }

    if (!values.category) {
      errors.category = 'Select category .';
    }
    if (!values.parent_name) {
      errors.parent_name = 'Enter name of the owner.';
    } else if (nameParentName === false) {
      errors.parent_name = 'Enter the only character.';
    }else if (values.parent_name.slice(50, limit)) {
      errors.parent_name = 'Enter the minimum 50 character.';
    }
    if (!values.dateofadmission) {
      errors.dateofadmission = 'Select date of admission.';
    }

    if (!values.address) {
      errors.address = 'Enter the address.';
    } else if (values.address.slice(450, limit)) {
      errors.address = 'Enter the minimum 500 character.';
    }

    if (!values.reg_no) {
      errors.reg_no = 'Enter the reg number.';
    }

    if (!values.fee) {
      errors.fee = 'Enter the fees.';
    }
    if (!values.bill_no) {
      errors.bill_no = 'Enter the bill number.';
    }

    if (!values.patient_name) {
      errors.patient_name = 'Enter the patient name.';
    } else if (namePatientName === false) {
      errors.patient_name = 'Enter the only character.';
    }else if (values.patient_name.slice(50, limit)) {
      errors.patient_name = 'Enter the minimum 50 character.';
    }

    if (!values.weight) {
      errors.weight = 'Enter the weight.';
    }
    if (!values.xray) {
      errors.xray = 'Enter the x-ray.';
    } else if (values.xray.slice(450, limit)) {
      errors.xray = 'Enter the minimum 500 character.';
    }

    if (!values.diagnosis) {
      errors.diagnosis = 'Enter the diagnosis. ';
    } else if (values.diagnosis.slice(450, limit)) {
      errors.diagnosis = 'Enter the minimum 500 character.';
    }

    if (values.genderid === '' || values.genderid === 'select') {
      formIsValid = false;
      errors.genderid = 'Select gender.';
    }

    if (values.color === '' || values.color === 'select') {
      formIsValid = false;
      errors.color = 'Select colour.';
    }
    if (values.ward === '' || values.ward === 'select') {
      formIsValid = false;
      errors.wardErr = 'Select ward .';
    }

    if (values.breed === '' || values.breed === 'select') {
      formIsValid = false;
      errors.breed = ' Select breed.';
    }
    if (values.species === '' || values.species === 'select') {
      formIsValid = false;
      errors.species = 'Select species.';
    }
    if (values.cage_kennel === '' || values.cage_kennel === 'select') {
      formIsValid = false;
      errors.CageidErr = 'Select cage/kennel.';
    }
    if (values.age === '' || values.age === 'select') {
      formIsValid = false;
      errors.AgeErr = ' Select age.';
    }
    return errors;
  };
  const handleCloseButton = (e) => {
    navigate('/dashboard/IPD');
  };

  // console.log(student);
  const formValidation = (inputList) => {
    const data = [...inputList];
    let valid = true;
    for (let index = 0; index < data.length; index += 1) {
      // const element = data[index];
      if (data[index].date === '') {
        data[index].dateCheck = 'Enter date.';
        data[index].dateLengthCheck = '';
        valid = false;
      }

      if (data[index].temperature === '') {
        data[index].tempCheck = 'Enter temperature.';
        data[index].tempFormat = '';
        valid = false;
      }

      if (data[index].feeding === '') {
        data[index].feedingCheck = 'Enter feeding.';
        data[index].feedingLengthCheck = '';
        valid = false;
      }
      if (data[index].treatment_medicine === '') {
        data[index].Check = 'Enter treatment medicine provided.';
        data[index].emFormat = '';
        valid = false;
      }
      if (data[index].clinical_observ === '') {
        data[index].clinical_observCheck = 'Enter clinical observations.';
        data[index].clinical_observemFormat = '';
        valid = false;
      }
    }
    setInputList(data);
    return valid;
  };
  return (
    <>
      <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-5">
            <div className="row">
              <div className="">
                <form action="" method='post' encType = "multipart/form-data" onSubmit={handleSubmit} className="did-floating-label-content">
                  <div className="container">
                    <div className="row">
                      {/* {
                      ipdEdit.map((curElem)=>{ onSubmit={handleSubmit}
                          return(   */} 
                      <div className="row">
                        <div className="row justify-content-between">
                          <input type="hidden" value={student.hospital_id} />
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Category<span className="man_filed">*</span>
                            </label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="category"
                              name="category"
                              // onChange={handleChange}
                              onChange={(e) => handleChange(e)}
                              className="form-control"
                              value={student.category}
                            >
                              {/* <option>--select--</option> */}
                              {masteripdcategory.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {/* {student.category === '' ? <div style={{ color: 'red' }}>{category}</div> : ''} */}
                            {category && <p style={{ color: 'red'}}>{category}</p>}
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Date & Time Of Admission<span className="man_filed">*</span>
                            </label>
                            {dateOfAdm ? (<input
                              type="datetime-local"
                              name="dateofadmission"
                              className="form-control"
                              id="dateofadmission"
                              required=""
                              // defaultValue={student.dateofadmission}
                              value={dateOfAdm}
                              autoComplete="off"
                              placeholder="Enter the Date"
                              />) : (<input
                              type="datetime-local"
                              name="dateofadmission"
                              className="form-control"
                              id="dateofadmission"
                              required=""
                              // defaultValue={student.dateofadmission}
                              value={student.dateofadmission}
                              onChange={handleChange}
                              autoComplete="off"
                              placeholder="Enter the Date"
                              />)
                            }
                             <p style={{ color: 'red' }}>{formErrors.dateofadmission}</p>
                            
                          </div>
                          <div className="col-md-2 form-group">
                            <label className="info_opd_bold mt-2">Case paper No.</label>
                            <div className="case_id_color form-control">{caseId.case_id}</div>
                          </div>
                          <div className="col-md-2 text-end mt-4">
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
                              <div className='row justify-content-center'>
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
                                    <small className='text-center'>profile should be less then 1 mb in size.</small>
                                </div>
                                <div className="col-md-6 form-group m-2 text-center">
                                  {profile.filepreview !== null ? (
                                    <img className="opdimg" src={profile.filepreview} alt="" />
                                  ) : (
                                    <img className="opdimg" src={student.s3image} alt="" />
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
                              value={student.parent_name}
                              onKeyDown={handleKeyDown}
                              onChange={(e) => handleChange(e)}
                              
                              placeholder="Enter Name of the Owner"
                            />
                            
                            <p style={{ color: 'red' }}>{formErrors.parent_name}</p>
                          </div>

                          <div className="col-md-8 form-group">
                            <label className="info_opd_bold">
                              Address<span className="man_filed">*</span>
                            </label>
                            <textarea
                              name="address"
                              className="form-control"
                              id="address"
                              required=""
                              value={student.address}
                              onKeyDown={handleKeyDown}
                              onChange={(e) => handleChange(e)}
                              placeholder="Enter the address"
                            />
                           
                            <p style={{ color: 'red' }}>{formErrors.address}</p>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Reg. No.<span className="man_filed">*</span>
                            </label>
                            <input
                              type="text"
                              name="reg_no"
                              className="form-control"
                              id="reg_no"
                              required=""
                              value={student.reg_no}
                              onKeyDown={handleKeyDown}
                              onChange={(e) => handleChange(e)}
                              placeholder="Enter the Reg. No."
                            />

                            <p style={{ color: 'red' }}>{formErrors.reg_no}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Fees. Rs.<span className="man_filed">*</span>
                            </label>
                            <input
                              type="text"
                              name="fee"
                              className="form-control"
                              id="fee"
                              required=""
                              value={student.fee}
                              onKeyDown={handleKeyDown}
                              onChange={(e) => handleChange(e)}
                              placeholder="Enter the Fees. Rs."
                            />
                            {/* {student.fee === '' ? <div style={{ color: 'red' }}>{formErrors.fee}</div> : ''} */}
                            <p style={{ color: 'red' }}>{formErrors.fee}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Bill No.<span className="man_filed">*</span>
                            </label>
                            <input
                              type="text"
                              name="bill_no"
                              className="form-control"
                              id="bill_no"
                              required=""
                              value={student.bill_no}
                              onKeyDown={handleKeyDown}
                              onChange={(e) => handleChange(e)}
                              placeholder="Enter the Bill No."
                            />
                            {/* {student.bill_no === '' ? <div style={{ color: 'red' }}>{formErrors.bill_no}</div> : ''} */}

                            <p style={{ color: 'red' }}>{formErrors.bill_no}</p>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Ward No.<span className="man_filed">*</span>
                            </label>

                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              id="ward_no"
                              ref={componentRef}
                              name="ward_no"
                              className="form-control"
                              onChange={handleChange}
                              onBlurCapture={handleChandeApi} 
                              value={student.ward_no}
                            >
                              {/* <option>---Select ---</option> */}
                              {Wardnumber.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.category_name}
                                </option>
                              ))}
                            </select>
                            {/* {student.ward_no === '' ? <div style={{ color: 'red' }}>{wardErr}</div> : ''} */}

                            {wardErr && <p style={{ color: 'red' }}>{wardErr}</p>}
                          </div>

                          <div className="col-md-4 form-group mt-3 mt-md-0">
                            <label className="info_opd_bold">
                              Cage/Kennel<span className="man_filed">*</span>
                            </label>

                            {masterbedNumber.length === 0 ? (
                              <select
                                style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                                required
                                type="text"
                                id="cage_kennel"
                                name="cage_kennel"
                                defaultValue={student.cage_kennel}
                                // onChange={handleChange}
                                value={student.cage_kennel}
                                className="form-control"
                              >
                                <option value={student.cage_kennel}>{student.cage_kennel}</option>
                              </select>
                            ) : (
                              <select
                                style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                                required
                                type="text"
                                id="cage_kennel"
                                name="cage_kennel"
                                defaultValue={student.cage_kennel}
                                // onChange={handleChange}
                                value={student.cage_kennel}
                                className="form-control"
                                onChange={(e) => handleChange(e)}
                              >
                                <option>---Select ---</option>
                                {masterbedNumber.map((curElem) => (
                                  <option key={curElem.id} value={curElem.id}>
                                    {curElem.bedid}
                                  </option>
                                ))}
                              </select>
                            )}
                            {/* {student.cage_kennel === '' ? <p style={{ color: 'red' }}>{CageidErr}</p> : ''} */}

                            {CageidErr && <p style={{ color: 'red', paddingBottom: 10 }}>{CageidErr}</p>}
                          </div>

                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Mobile No.<span className="man_filed">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={student.phone}
                              // onChange={handleChange}
                              onChange={(e) => handleChange(e)}
                              minLength="10"
                              maxLength="10"
                              size="10"
                              placeholder="Enter the Mobile No."
                            />
                            {/* {student.phone === '' ? <p style={{ color: 'red' }}>{formErrors.phone}</p> : ''} */}
                            <p style={{ color: 'red' }}>{formErrors.phone}</p>
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
                              value={student.patient_name}
                              onKeyDown={handleKeyDown}
                              onChange={(e) => handleChange(e)}
                              placeholder="Enter the Patient Name"
                            />
                            {/* {student.patient_name === '' ? (
                              <p style={{ color: 'red' }}>{formErrors.patient_name}</p>
                            ) : (
                              ''
                            )} */}

                            <p style={{ color: 'red' }}>{formErrors.patient_name}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Breed<span className="man_filed">*</span>
                            </label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required
                              type="text"
                              id="breed"
                              name="breed"
                              // onChange={handleChange}
                              onChange={(e) => handleChange(e)}
                              className="form-control"
                              value={student.breed}
                            >
                              {/* <option>--select--</option> */}
                              {masterBreedData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {/* {student.breed === '' ? <p style={{ color: 'red' }}>{breed}</p> : ''} */}

                            {breed && <p style={{ color: 'red'}}>{breed}</p>}
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Species<span className="man_filed">*</span>
                            </label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              id="species"
                              name="species"
                              value={student.species}
                              className="form-control"
                              onChange={(e) => handleChange(e)}
                            >
                              {masterSpeciesData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {/* {student.species === '' ? <p style={{ color: 'red' }}>{SpeciesErr}</p> : ''} */}

                            {SpeciesErr && <p style={{color: 'red'}}>{SpeciesErr}</p>}
                          </div>
                        </div>

                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Colour<span className="man_filed">*</span>
                            </label>

                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required
                              type="text"
                              id="color"
                              name="color"
                              // onChange={handleChange}
                              onChange={(e) => handleChange(e)}
                              className="form-control"
                              value={student.color}
                              placeholder="--select--"
                            >
                              {/* <option>--select--</option> */}

                              {masterColorData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {/* {student.color === '' ? <p style={{ color: 'red' }}>{color}</p> : ''} */}
                            {color && <p style={{ color: 'red' }}>{color}</p>}
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Weight<span className="man_filed">*</span>
                            </label>

                            <input
                              type="text"
                              name="weight"
                              className="form-control"
                              id="weight"
                              required=""
                              value={student.weight}
                              // onChange={handleChange}
                              onChange={(e) => handleChange(e)}
                              placeholder="Enter the Weight"
                            />
                            {/* {student.weight === '' ? <p style={{ color: 'red' }}>{formErrors.weight}</p> : ''} */}
                            <p style={{ color: 'red' }}>{formErrors.weight}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Age<span className="man_filed">*</span>
                            </label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="selectCtrl"
                              name="age"
                              onChange={(e) => handleChange(e)}
                              className="form-control"
                              value={student.age}
                            >
                              {masterage.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.age}
                                </option>
                              ))}
                            </select>
                            {/* {student.age === '' ? <div style={{ color: 'red', paddingBottom: 10 }}>{AgeErr}</div> : ''} */}
                            {AgeErr && <p style={{ color: 'red'}}>{AgeErr}</p>}
                          </div>
                        </div>
                        <div className="row justify-content-start">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Gender<span className="man_filed">*</span>
                            </label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required
                              type="text"
                              id="gender"
                              name="gender"
                              // onChange={handleChange}
                              onChange={(e) => handleChange(e)}
                              className="form-control"
                              value={student.gender}
                            >
                              {masterGenderData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>
                            {/* {student.gender === '' ? (
                              <div style={{ color: 'red', paddingBottom: 10 }}>{gender}</div>
                            ) : (
                              ''
                            )} */}
                            {gender && <p style={{ color: 'red'}}>{gender}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="row mb-3">
                          <label className="col-sm-5">
                            Special Investigation if any(X-ray.USG) <span className="man_filed">*</span>:-
                          </label>
                          <div className="col-sm-7">
                            <textarea
                              className="form-control"
                              name="xray"
                              value={student.xray}
                              id="xray"
                              onKeyDown={handleKeyDown}
                              onChange={(e) => handleChange(e)}
                              placeholder="Enter the Special Investigation if any(X-ray.USG)"
                            />
                            {/* {student.xray === '' ? <p style={{ color: 'red' }}>{formErrors.xray}</p> : ''} */}
                            <p style={{ color: 'red' }}>{formErrors.xray}</p>
                          </div>
                        </div>
                        <div className="row">
                          <label className="col-sm-5">
                            DISEASE/PROVISINAL DIAGNOSIS <span className="man_filed">*</span>:-
                          </label>
                          <div className="col-sm-7">
                            <textarea
                              className="form-control"
                              id="diagnosis"
                              name="diagnosis"
                              value={student.diagnosis}
                              onKeyDown={handleKeyDown}
                              onChange={(e) => handleChange(e)}
                              placeholder="Enter the  DISEASE/PROVISINAL DIAGNOSIS"
                            />
                            {/* {student.diagnosis === '' ? <p style={{ color: 'red' }}>{formErrors.diagnosis}</p> : ''} */}
                            <p style={{ color: 'red' }}>{formErrors.diagnosis}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 mb-2">
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
                                {' '}
                                Temprature<span className="man_filed">*</span>
                              </th>
                              <th>
                                Feeding<span className="man_filed">*</span>
                              </th>
                              <th>
                                Clinical Observations<span className="man_filed">*</span>
                              </th>
                              <th>
                                Treatment Medicine Provided <span className="man_filed">*</span>
                              </th>
                            </tr>
                          </thead>
                          {inputList.map((item, i) => (
                            <tbody>
                              <tr className="">
                                <td>
                                  <input type="hidden" name="id" value={item.id} />
                                  <input type="hidden" name="patient_id" value={ipdId} />
                                  <input
                                    type="date"
                                    name="date"
                                    id='dateipd'
                                    className="form-control"
                                    placeholder="Enter Date"
                                    value={`${item.date.substr(0, 10)}`}
                                    autoComplete="off"
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                  {/* {item.date === '' ? (
                                    <div style={{ color: 'red' }}>
                                      {item.nameCheck} {item.nameLengthCheck}
                                    </div>
                                  ) : (
                                    ''
                                  )} */}
                                  <div style={{ color: 'red' }}>
                                    {item.nameCheck} {item.nameLengthCheck}
                                  </div>
                                </td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    name="temperature"
                                    placeholder="Enter temprature"
                                    value={item.temperature}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                  
                                   <div style={{ color: 'red' }}>
                                     {item.tempCheck} {item.tempFormat} 
                                  </div> 
                                </td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    name="feeding"
                                    placeholder="Enter Feeding"
                                    value={item.feeding}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                  
                                  <div style={{ color: 'red' }}>
                                    {item.feedingCheck} {item.feedingLengthCheck}
                                  </div>
                                </td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    name="clinical_observ"
                                    placeholder="Enter Clinical Observations"
                                    value={item.clinical_observ}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                  
                                  <div style={{ color: 'red' }}>
                                    {item.Check} {item.emFormat}
                                  </div>
                                </td>{' '}
                                <td>
                                  <textarea
                                    className="form-control"
                                    name="treatment_medicine"
                                    placeholder="Enter Treatment Medicine"
                                    value={item.treatment_medicine}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                  
                                  <div style={{ color: 'red' }}>
                                    {item.Check} {item.emFormat}
                                  </div>
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
                        {/* {images} */}
                        <div className="multipeimgrow mt-3">
                          <h4 className="fw-bold">Images</h4>
                          
                          {images.length === 0 ? (
                            <small>No Images Uploaded Here</small>
                          ) : (
                            <div className="container">
                              <div className="row">
                                {images.map((item) => {
                                  return (
                                    <div className="col-md-4">
                                      <button value={item.id} className="delete-img-opd" onClick={deleteImages}>
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
                  <Modal
                    open={open}
                    // onClick={handleClose}onClick={handleOpen}
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
                          // onClick={deleteOpdRow}
                          onClick={() => navigate('/dashboard/IPD')}
                          // value={deleteId}
                          id=""
                          className="text-center ipdpatientok"
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
