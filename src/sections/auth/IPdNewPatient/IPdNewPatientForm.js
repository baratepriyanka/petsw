import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Axios from 'axios';
import Moment from 'moment';
// @mui
import { Button, Typography, Box, Modal } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
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
export default function IPdNewPatientForm() {
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

  const [masteripdcategory, setMasteripdcategory] = useState([]);
  const getMasteripdcategory = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/ipd-category`
    );
    setMasteripdcategory(await response.json());
  };

  const [masterSpeciesData, setmasterSpeciesData] = useState([]);
  const getMasterSpeciesData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-species`
    );
    setmasterSpeciesData(await response.json());
  };

  const [Wardnumber, setWardnumber] = useState([]);
  const getWardnumber = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-wardnumber/${loginId}`
    );
    setWardnumber(await response.json());
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
  const [select, setSelect] = useState();
  const [masterbedNumber, setBedNumber] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  // data function
  const today = new Date();
  const ghours = today.getHours();
  const gMinutes = today.getMinutes();
  const gSeconds = today.getSeconds();
  const time = `${ghours}:${gMinutes}:${gSeconds}`;

  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const monthWithOffset = dateNow.getUTCMonth() + 1;
  const month = monthWithOffset.toString().length < 2 ? `0${monthWithOffset}` : monthWithOffset;
  const date = dateNow.getUTCDate().toString().length < 2 ? `0${dateNow.getUTCDate()}` : dateNow.getUTCDate();
  const materialDateInput = `${year}-${month}-${date}`;
  const dtime = `${materialDateInput}T${time}`;

  const [date1, setDate] = useState(Moment().format('YYYY-MM-DDTHH:mm'));

  // const [date1, setDate] = useState(new Date().toISOString().substr(0, 16));
  useEffect(() => {
    setDate(Moment().format('YYYY-MM-DDTHH:mm'));
    // }, 1000);
  }, []);
  // console.log(dtime);
  // console.log(date1);
  // const handleDateTimeChange = (e) => {
  //   const date = new Date(e.target.value).toLocaleTimeString().substr(0, 16);
  //   setFormValues({ ...formValues, dateofadmission: date });
  // };
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-ipd`;

  const initialvalue = {
    category: '',
    parent_name: '',
    reg_no: '',
    dateofadmission: `${date1}`,
    address: '',
    fees: '',
    billno: '',
    ward: '',
    cage_kennel: '',
    phone: '',
    patient_name: '',
    species: '',
    breed: '',
    color: '',
    genderid: '',
    age: '',
    weight: '',
    xray: '',
    diagnosis: '',
    // cage_id:'',
    hospital_id: `${loginId}`,
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { category } = formErrors;
  const { species } = formErrors;
  const { breed } = formErrors;
  const { color } = formErrors;
  const { genderid } = formErrors;
  const { CageidErr } = formErrors;
  const { wardErr } = formErrors;
  const { AgeErr } = formErrors;
  let formIsValid = true;

  // add more value function
  const [formVal, setFormVal] = useState([
    {
      date: `${materialDateInput}`,
      temperature: '',
      feeding: '',
      treatment_medicine: '',
      clinical_observ: '',
      hospital_id: `${loginId}`,
    },
  ]);
  const addRow = () => {
    setFormVal([
      ...formVal,
      {
        date: `${materialDateInput}`,
        temperature: '',
        feeding: '',
        treatment_medicine: '',
        clinical_observ: '',
        hospital_id: `${loginId}`,
      },
    ]);
  };
  const onRemove = (i) => {
    const newForm = [...formVal];
    newForm.splice(i, 1);
    setFormVal(newForm);
  };
  const formInputChange = {
    temperature: 500,
    feeding: 500,
    treatment_medicine: 500,
    clinical_observ: 500,
  };
  const formInputValiName = {
    date: 'date',
    treatment_medicine: 'treatment medicine provided ',
    temperature: 'temperature',
    feeding: 'feeding',
    clinical_observ: 'Clinical Observations',
  };

  function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length  === 0) { // check if space is at beginning
      event.preventDefault();
    }
  }

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
  const componentRef = useRef(null);
  const formVAlidations = {
    parent_name: 50,
    address: 500,
    patient_name: 50,
    xray: 500,
    diagnosis: 500,
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
    dateofadmission: 'date of admission',
    phone: 'mobile no',
    reg_no: 'reg number',
    fees: 'fees',
    billno: 'bill number',
    xray: 'xray',
    diagnosis: 'diagnosis',
  };
  const formValSelectName = {
    category: 'category',
    genderid: 'gender',
    species: 'species',
    breed: 'breed',
    color: 'color',
    ward: 'ward',
    cage_kennel: 'cage_kennel',
    age: 'age',
  };
  const formValPattern = {
    parent_name: 'name of the owner',
    patient_name: 'Patient Name',
  };
  const phonePattern = {
    phone: 'mobile no',
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const value1 = e.target.value;
    const letters = /^[a-zA-Z\s]*$/;
    const namePattern = letters.test(value1);
    const phonePattern1 = /^\d{10}$/;
    const phonePat = phonePattern1.test(value1);

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
    if (phonePattern[name] && phonePat === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter the only 10 digit.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
  };

  const handleChandeApi = (e) => {
    const id = componentRef.current.value;
    // console.log(id)
    const response = fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-cageid/${id}`
    )
      .then((response) => response.json())
      .then((data) => setBedNumber(data))
      .catch((err) => {
        console.log(err.message);
      });
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
  const [openimg, setOpenImg] = useState(false);
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

  useEffect(() => {
    getMasterUploadReport();
    getMasterGenderData();
    getMasterBreedData();
    getMasterColorData();
    getMasteripdcategory();
    getMasterSpeciesData();
    // getBedNumberData();
    getWardnumber();
    getMasterAge();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
      // setOpen(true);
      const errorRes = formValidation(formVal);
      if (errorRes) {
        Axios.post(url, {
          category: formValues.category,
          parent_name: formValues.parent_name,
          reg_no: formValues.reg_no,
          address: formValues.address,
          fee: formValues.fees,
          bill_no: formValues.billno,
          ward_no: formValues.ward,
          phone: formValues.phone,
          patient_name: formValues.patient_name,
          species: formValues.species,
          breed: formValues.breed,
          color: formValues.color,
          gender: formValues.genderid,
          age: formValues.age,
          weight: formValues.weight,
          cage_kennel: formValues.cage_kennel,
          dateofadmission: formValues.dateofadmission,
          xray: formValues.xray,
          diagnosis: formValues.diagnosis,
          // cage_id: formValues.cage_id,
          hospital_id: formValues.hospital_id,
        }).then((res) => {
          // console.log(res);
          const data = res.data.post;
          const data1 = new FormData();
          // console.log(data1)
          data1.append('profile', profile.file);
          const urlImg = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/addIpdimg/${data}`;
          const response1 = Axios.post(urlImg, data1)
            .then((res) => {
              // console.log(res)
            })
            .catch((error) => {
              console.log('profile should be less then 1 Mb in size.');

              // alert('profile should be less then 1 Mb in size.');
            });
          setOpen(false);

          // api call
          const url1 = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-ipdAddMore-paitent/${data}`;
          const arr = formVal.map((obj) => Axios.post(url1, obj, { headers: { 'Access-Control-Allow-Origin': '*' } }));
          const promise = Promise.allSettled(arr).then((data) => {
            // console.log(data);
            setOpen(true);
          });
        });
      } else {
        setOpen(false);
        // error msg
      }
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const limit = 500;
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;

    const PHONE_PATTERN = /(^[0-9]+(\.[0-9]+)?$)/;
    const paPattern = PHONE_PATTERN.test(values.phone);
    const formPattern = /^[a-zA-Z\s]*$/;
    const namePatientName = formPattern.test(values.patient_name);
    const nameParentName = formPattern.test(values.parent_name);

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
    } else if (values.parent_name.slice(50, limit)) {
      errors.parent_name = 'Enter the minimum 50 character.';
    }
    if (!values.dateofadmission) {
      errors.dateofadmission = 'select date of admission.';
    }

    if (!values.address) {
      errors.address = 'Enter the address.';
    } else if (values.address.slice(450, limit)) {
      errors.address = 'Enter the minimum 500 character.';
    }

    if (!values.reg_no) {
      errors.reg_no = 'Enter the reg number.';
    }

    if (!values.fees) {
      errors.fees = 'Enter the fees.';
    }
    if (!values.billno) {
      errors.billno = 'Enter the bill number.';
    }

    if (!values.patient_name) {
      errors.patient_name = 'Enter the patient name.';
    } else if (namePatientName === false) {
      errors.patient_name = 'Enter the only character.';
    } else if (values.patient_name.slice(50, limit)) {
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
  const formValidation = (formVal) => {
    const data = [...formVal];
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
    setFormVal(data);
    return valid;
  };
  const handleCloseButton = (e) => {
    navigate('/dashboard/IPD');
  };
  return (
    <>
      <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-5">
            <div className="row">
              <div className="">
                <form
                  action=""
                  onSubmit={handleSubmit}
                  method="post"
                  encType="multipart/form-data"
                  className="did-floating-label-content"
                >
                  <div className="container">
                    <div className="row">
                      <div className="row mb-3">
                        <div className="row justify-content-between">
                          <input type="hidden" value={formValues.hospital_id} />
                          <div className="col-md-3 form-group">
                            <label className="info_opd_bold">
                              Category<span className="man_filed">*</span>
                            </label>

                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="category"
                              name="category"
                              onChange={handleChange}
                              className="form-control"
                              value={formValues.category}
                              placeholder="Enter The Category"
                            >
                              <option value="">--Select--</option>
                              {masteripdcategory.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>

                            {category && <p style={{ color: 'red' }}>{category}</p>}
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Date/Time Of Admission<span className="man_filed">*</span>
                            </label>
                            <input
                              type="datetime-local"
                              name="dateofadmission"
                              className="form-control"
                              id="dateofadmission"
                              required=""
                              value={formValues.dateofadmission}
                              // onChange={handleChange}
                              onChange={handleChange}
                              autoComplete="off"
                              placeholder="Enter The Date and Time"
                            />
                            <p style={{ color: 'red' }}>{formErrors.dateofadmission}</p>
                          </div>
                          <div className="col-md-3 form-group">
                            <label className="info_opd_bold mt-2">Case Paper No.</label>
                            <div className="case_id_color form-control"> Set Automatically</div>
                          </div>
                          <div className="col-md-2 text-end mt-4">
                            <div style={{ marginTop: '7px' }}>
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
                                  <div className="col-md-8 form-group text-center">
                                    <input
                                      type="file"
                                      multiple
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
                                    className="opdpatientok"
                                    sx={{ m: 2, backgroundColor: '#0d6efd' }}
                                    onClick={handleCloseImg}
                                  >
                                    Ok
                                  </Button>
                                  <Button
                                    size="small"
                                    type="button"
                                    variant="contained"
                                    id=""
                                    sx={{ backgroundColor: '#6c757d' }}
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
                              onKeyDown={handleKeyDown}
                              autoComplete="off"
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
                              value={formValues.address}
                              onChange={handleChange}
                              onKeyDown={handleKeyDown}
                              autoComplete="off"
                              placeholder="Enter the Address"
                            />
                            {/* {formValues.address === '' ? (
                              <div style={{ color: 'red', paddingBottom: 10 }}>{formErrors.address}</div>
                            ) : (
                              ''
                            )} */}
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
                              value={formValues.reg_no}
                              onChange={handleChange}
                              onKeyDown={handleKeyDown}
                              autoComplete="off"
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
                              name="fees"
                              className="form-control"
                              id="fees"
                              required=""
                              value={formValues.fees}
                              onChange={handleChange}
                              onKeyDown={handleKeyDown}
                              autoComplete="off"
                              placeholder="Enter the  Fees. Rs."
                            />
                            <p style={{ color: 'red' }}>{formErrors.fees}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Bill No.<span className="man_filed">*</span>
                            </label>
                            <input
                              type="text"
                              name="billno"
                              className="form-control"
                              id="billno"
                              required=""
                              value={formValues.billno}
                              onChange={handleChange}
                              onKeyDown={handleKeyDown}
                              autoComplete="off"
                              placeholder="Enter the Bill No."
                            />
                            <p style={{ color: 'red' }}>{formErrors.billno}</p>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Ward <span className="man_filed">*</span>
                            </label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              id=""
                              name="ward"
                              ref={componentRef}
                              className="form-control"
                              onChange={handleChange}
                              onBlurCapture={handleChandeApi}
                              value={formValues.ward}
                            >
                              <option value="">--Select--</option>
                              {Wardnumber.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.category_name}
                                </option>
                              ))}
                            </select>

                            {wardErr && <p style={{ color: 'red' }}>{wardErr}</p>}
                          </div>

                          <div className="col-md-4 form-group mt-3 mt-md-0">
                            <label className="info_opd_bold">
                              Cage/Kennel Id<span className="man_filed">*</span>
                            </label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              id="cage_kennel"
                              name="cage_kennel"
                              onChange={handleChange}
                              className="form-control"
                              value={formValues.cage_kennel}
                            >
                              <option value="">--Select--</option>
                              {masterbedNumber.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.bedid}
                                </option>
                              ))}
                            </select>

                            {CageidErr && <p style={{ color: 'red' }}>{CageidErr}</p>}
                          </div>

                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Mobile No.<span className="man_filed">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={formValues.phone}
                              onChange={handleChange}
                              autoComplete="off"
                              minLength={10}
                              size="10"
                              maxLength={10}
                              pattern='[0-9]{10}'
                              placeholder="Enter the Mobile number"
                            />
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
                              value={formValues.patient_name}
                              onChange={handleChange}
                              onKeyDown={handleKeyDown}
                              autoComplete="off"
                              placeholder="Enter the Patient Name"
                            />
                            <p style={{ color: 'red' }}>{formErrors.patient_name}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Species<span className="man_filed">*</span>
                            </label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="species"
                              name="species"
                              onChange={handleChange}
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
                            {species && <p style={{ color: 'red', paddingBottom: 10 }}>{species}</p>}
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Breed<span className="man_filed">*</span>
                            </label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
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

                            {breed && <p style={{ color: 'red', paddingBottom: 10 }}>{breed}</p>}
                          </div>
                        </div>

                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Colour<span className="man_filed">*</span>
                            </label>

                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
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

                            {color && <p style={{ color: 'red', paddingBottom: 10 }}>{color}</p>}
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
                              value={formValues.weight}
                              onChange={handleChange}
                              autoComplete="off"
                              placeholder="Enter the Weight"
                            />

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

                            {AgeErr && <p style={{ color: 'red', paddingBottom: 10 }}>{AgeErr}</p>}
                          </div>
                        </div>
                        <div className="row justify-content-start">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">
                              Gender<span className="man_filed">*</span>
                            </label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="selectCtrl"
                              name="genderid"
                              onChange={handleChange}
                              className="form-control"
                              value={formValues.genderid}
                            >
                              <option value="">--Select--</option>
                              {masterGenderData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                            </select>

                            {genderid && <p style={{ color: 'red'}}>{genderid}</p>}
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row mt-3">
                        <div className="row mb-3">
                          <label className="col-sm-5">
                            Special Investigation if any(X-ray.USG) <span className="man_filed">*</span>:-
                          </label>
                          <div className="col-sm-7">
                            <textarea
                              className="form-control"
                              name="xray"
                              id="xray"
                              value={formValues.xray}
                              onChange={handleChange}
                              onKeyDown={handleKeyDown}
                              autoComplete="off"
                              placeholder="Enter the X-ray"
                            />
                            <p style={{ color: 'red' }}>{formErrors.xray}</p>
                          </div>
                        </div>
                        <div className="row">
                          <label className="col-sm-5">
                            DISEASE/PROVISINAL DIAGNOSIS<span className="man_filed">*</span>:-
                          </label>
                          <div className="col-sm-7">
                            <textarea
                              className="form-control"
                              id="diagnosis"
                              name="diagnosis"
                              value={formValues.diagnosis}
                              onChange={handleChange}
                              onKeyDown={handleKeyDown}
                              autoComplete="off"
                              placeholder="Enter the Diagnosis"
                            />
                            <p style={{ color: 'red' }}>{formErrors.diagnosis}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 mb-2">
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
                          {formVal.map((item, i) => (
                            <tbody>
                              <tr className="">
                                <td>
                                  <input
                                    type="date"
                                    name="date"
                                    id="dateipd"
                                    className="form-control"
                                    placeholder="Enter Date"
                                    value={item.date}
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
                                    name="temperature"
                                    placeholder="Enter temperature"
                                    value={item.temperature}
                                     onKeyDown={handleKeyDown}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />

                                  <p style={{ color: 'red' }}>
                                    {item.tempCheck} {item.tempFormat}
                                  </p>
                                </td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    name="feeding"
                                    placeholder="Enter Feeding"
                                    value={item.feeding}
                                    onChange={(e) => handleInputChange(e, i)}
                                    onKeyDown={handleKeyDown}

                                  />
                                  <p style={{ color: 'red' }}>
                                    {item.feedingCheck} {item.feedingLengthCheck}
                                  </p>
                                </td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    name="clinical_observ"
                                    placeholder="Enter Clinical Observations"
                                    value={item.clinical_observ}
                                    onChange={(e) => handleInputChange(e, i)}
                                    onKeyDown={handleKeyDown}

                                  />
                                  <p style={{ color: 'red' }}>
                                    {item.clinical_observCheck} {item.clinical_observemFormat}
                                  </p>
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

                                  <p style={{ color: 'red' }}>
                                    {item.Check} {item.emFormat}
                                  </p>
                                </td>
                                <td>
                                  {/* {i === 0 ? ('') : (<button type="button"className="btn btn-danger" onClick={() => onRemove(i)}>X</button> )} */}

                                  {/* {i === 0 ? (
                                    ''
                                  ) : (
                                    // <DeleteIcon
                                    //   onClick={() => onRemove(i)}
                                    //   sx={{ color: 'red', cursor: 'pointer', mt: 2 }}
                                    // />
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
                        Record has been saved Successfully.
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
