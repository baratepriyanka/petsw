import React, { useState, useEffect } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
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

export default function EditHealthReportForm() {

  const {healthReportId} = useParams();
  const [masterGenderData, setMasterGenderData] = useState([]);

  const getMasterGenderData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-gender`);
    setMasterGenderData(await response.json());
    // console.log(masterGenderData);
  };

  const [masterBreedData, setMasterBreedData] = useState([]);

  const getMasterBreedData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-breed`);
    setMasterBreedData(await response.json());
    // console.log(masterBreedData);
  };
  const [masterColorData, setMasterColorData] = useState([]);

  const getMasterColorData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-color`);
    setMasterColorData(await response.json());
    // console.log(masterColorData);
  };

  const [masterStateData, setMasterStateData] = useState([]);

  const getMasterStateData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-state`);
    setMasterStateData(await response.json());
    // console.log(masterStateData);
  };

  const [masterCityData, setMasterCityData] = useState([]);

  const getMasterCityData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-city`);
    setMasterCityData(await response.json());
    // console.log(masterCityData);
  };

  const [masterSpeciesData, setmasterSpeciesData] = useState([]);
  const getMasterSpeciesData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-species`);
    setmasterSpeciesData(await response.json());
  };

  // const url = `http://localhost:8086/web/updatepatient/${healthReportId}`;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    const errors = validate(healthReportEdit);
    console.log(errors)
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

  const[healthReportEdit, setHealthReportEdit] = useState({
    ownerName: '',
    contractNo: '',
    dateOfAdmission: '',
    dateOfRelease: '',
    address: '',
    breed:'',
    species: '',
    color: '',
    age: '',
    genderid: '',
    diseases: '',
    treatment: '',
    animal: '',
    releaseTime: '',
    veterinaryDoctor: '',
  });
  

  useEffect(() => {
    async function getHealthReportEdit() {
     try {
      const response = await axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-health-report/${healthReportId}`)
      // console.log(response.data);
      setHealthReportEdit(response.data);
     } catch (error) {
      console.log("Something is Wrong");
     }
    }
    getHealthReportEdit();
    getMasterGenderData();
    getMasterBreedData();
    getMasterColorData();
    getMasterStateData();
    getMasterCityData();
    getMasterSpeciesData();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(healthReportEdit);
    }
   }, [healthReportId]);

  // const [healthReportEdit, sethealthReportEdit] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { sexErr } = formErrors;
  const { colourErr } = formErrors;
  const{stateErr}=formErrors;
  const {species}=formErrors;
  const{BreedErr}=formErrors;
  let formIsValid = true;

  // validation
 
  function handleChange(e) {
    setHealthReportEdit({
     ...healthReportEdit,
     [e.target.name]: e.target.value
    })
   }

   async function handleSubmit(e) {
    e.preventDefault()
    try {
      setFormErrors(validate(healthReportEdit));
      setIsSubmit(true);
     await axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/update-health-report/${healthReportId}`, healthReportEdit)
    
    //  alert("Record has been saved successfully");

    } catch (error) {
     console.log("Something is Wrong");
    }
   }

 
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    const limit=225;
    if (!values.ownerName) {
      errors.ownerName = 'Enter the Owner Name';
    }else if(values.ownerName.slice(20, limit)){
      errors.ownerName ='Enter the minimum 20 character';
      }
    if (!values.dateOfAdmission) {
      errors.dateOfAdmission = 'Date is selected';
    }
    if (!values.dateOfRelease) {
      errors.dateOfRelease = 'Release Date is selected';
    }
    if (!values.address) {
      errors.address = 'Enter the Address ';
    }else if(values.address.slice(25, limit)){
      errors.address ='Enter the minimum 25 character';
      }
    if (!values.contractNo) {
      errors.contractNo = 'Enter the Contact number';
    } else if (values.contractNo.length < 10) {
      errors.contractNo = 'this is not a valid mobile number';
    }
    else if (values.contractNo.length > 10) {
      errors.contractNo = 'minimum 10 digit';
    }
    if (!values.species) {
      errors.species = 'Species is selected';
    }
    if (values.breed === '' || values.breed === 'select') {
      formIsValid = false;
      errors.breed = 'Breed is selected';
    }
    if (values.color === '' || values.color === 'select') {
      formIsValid = false;
      errors.color = 'Color is selected';
    }
    if (!values.age) {
      errors.age = 'Enter the Patient Age ';
    }

    if (!values.animal) {
      errors.animal = 'Enter the Animal ';
    }else if(values.animal.slice(220, limit)){
      errors.animal ='Enter the minimum 220 character';
      }
    if (!values.treatment) {
      errors.treatment = 'Enter the Treatment Give';
    }else if(values.treatment.slice(220, limit)){
      errors.treatment ='Enter the minimum 220 character';
      }
    if (values.genderid === '' || values.genderid === 'select') {
      formIsValid = false;
      errors.genderid = ' Gender is selected';
    }
    if (!values.diseases) {
      errors.diseases = 'Enter the Dog Suffering From ';
    }else if(values.diseases.slice(220, limit)){
      errors.diseases ='Enter the minimum 220 character';
      }
  
    if (!values.releaseTime) {
      errors.releaseTime = 'Release Time is selected';
    }
    if (!values.veterinaryDoctor) {
      errors.veterinaryDoctor = 'Enter the erinary Doctor';
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
                    
                          <div className="row" key={healthReportEdit.id}>
                      <div className="row mb-3">
                        <div className="row justify-content-between mb-3">
                          <div className="col-md-7 form-group">
                            <label>Name of dog receiver/Owner</label>
                            <input
                              type="text"
                              name="ownerName"
                              className="form-control"
                              id="ownerName"
                              required=""
                              value={healthReportEdit.ownerName}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.ownerName}</p>
                          </div>
                          <div className="col-md-3 form-group">
                            <label>Contact No.</label>
                            <input
                              type="number"
                              name="contractNo"
                              className="form-control"
                              id="contractNo"
                              required=""
                              value={healthReportEdit.contractNo}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.contractNo}</p>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Date Of Admission</label>
                            <input
                              type="date"
                              name="dateOfAdmission"
                              className="form-control"
                              id="dateOfAdmission"
                              required=""
                              value={healthReportEdit.dateOfAdmission}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.dateOfAdmission}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label>Date Of Release</label>
                            <input
                              type="date"
                              name="dateOfRelease"
                              className="form-control"
                              id="dateOfRelease"
                              required=""
                              value={healthReportEdit.dateOfRelease}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.dateOfRelease}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              name="address"
                              className="form-control"
                              id="address"
                              required=""
                              value={healthReportEdit.address}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.address}</p>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                        <div className="col-md-4 form-group">
                            <label>Breed</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="breed"
                              name="breed"
                              onChange={handleChange}
                              className={BreedErr ? ' showError' : ''}
                              value={healthReportEdit.breed}
                            >
                            <option>--select--</option>
                              {masterBreedData.map((healthReportEdit) => (
                                <option key={healthReportEdit.id} value={healthReportEdit.id}>
                                  {healthReportEdit.name}
                                </option>
                              ))}
                              {/* {{ background: props.backg, ...style }} */}
                            </select>
                            {BreedErr && (
                              <div style={{ color: 'red', paddingBottom: 10 }}>{BreedErr}</div>
                            )}
                          </div>
                          <div className="col-md-4 form-group">
                            <label>Species</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="species"
                              name="species"
                              onChange={handleChange}                             
                              className={species ? ' showError' : ''}
                              value={healthReportEdit.species}
                            >
                              <option>--select--</option>
                              {masterSpeciesData.map((healthReportEdit) => (
                                <option key={healthReportEdit.id} value={healthReportEdit.id}>
                                  {healthReportEdit.name}
                                </option>
                              ))}
                            </select>
                            {species && <div style={{ color: 'red', paddingBottom: 10 }}>{species}</div>}
                          </div>
                          <div className="col-md-4 form-group">
                            <label>Color</label>

                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="color"
                              name="color"
                              onChange={handleChange}
                              className={colourErr ? ' showError' : ''}
                              value={healthReportEdit.color}
                            >
                             <option>--select--</option>
                              {masterColorData.map((healthReportEdit) => (
                                <option key={healthReportEdit.id} value={healthReportEdit.id}>
                                  {healthReportEdit.name}
                                </option>
                              ))}
                            </select>
                            {colourErr && <div style={{ colourErr: 'red', paddingBottom: 10 }}>{colourErr}</div>}
                          </div>
                        </div>
                        <div className="row justify-content-start">
                          <div className="col-md-4 form-group">
                            <label>Age</label>
                            <input
                              type="number"
                              name="age"
                              className="form-control"
                              id="age"
                              required=""
                              value={healthReportEdit.age}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.age}</p>
                          </div>
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
                              value={healthReportEdit.genderid}
                            >
                             <option>--select--</option>
                              {masterGenderData.map((healthReportEdit) => (
                                <option key={healthReportEdit.id} value={healthReportEdit.id}>
                                  {healthReportEdit.name}
                                </option>
                              ))}
                            </select>
                            {sexErr && <div style={{ color: 'red', paddingBottom: 10 }}>{sexErr}</div>}
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="row mb-3">
                          <label className="col-sm-6">H/o:This is to be certified that dog was suffering from:-</label>
                          <div className="col-sm-6">
                            <textarea
                              className="form-control"
                              name="diseases"
                              rows=""
                              required=""
                              value={healthReportEdit.diseases}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.diseases}</p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-6">Treatment Given:-</label>
                          <div className="col-sm-6">
                            <textarea
                              className="form-control"
                              name="treatment"
                              rows=""
                              required=""
                              value={healthReportEdit.treatment}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.treatment}</p>
                          </div>
                        </div>
                        <div className="row">
                          <label className="col-sm-6">Animal:-</label>
                          <div className="col-sm-6">
                            <textarea
                              className="form-control"
                              name="animal"
                              rows=""
                              required=""
                              value={healthReportEdit.animal}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.animal}</p>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-3 form-group">
                          <label>Time of Release</label>
                          <input
                            type="time"
                            name="releaseTime"
                            className="form-control"
                            id="releaseTime"
                            required=""
                            value={healthReportEdit.releaseTime}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          <p style={{ color: 'red' }}>{formErrors.releaseTime}</p>
                        </div>
                        <div className="col-md-3 form-group">
                          <label>Date</label>
                          {/* <input
                            type="date"
                            name="date"
                            className="form-control"
                            id="date"
                            required=""
                            value={healthReportEdit.date}
                            onChange={handleChange}
                            autoComplete="off"
                          /> */}
                            <input
                              type="date"
                              name="dateOfAdmission"
                              className="form-control"
                              id="dateOfAdmission"
                              required=""
                              value={healthReportEdit.dateOfAdmission}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                          <p style={{ color: 'red' }}>{formErrors.dateOfAdmission}</p>
                        </div>                        

                        <div className="col-md-3 form-group">
                          <label>Name Of Veterinary Doctor</label>
                          <input
                            type="text"
                            name="veterinaryDoctor"
                            className="form-control"
                            id="veterinaryDoctor"
                            required=""
                            value={healthReportEdit.veterinaryDoctor}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          <p style={{ color: 'red' }}>{formErrors.veterinaryDoctor}</p>
                        </div>

                      </div>
                      {/* <div className="text-end py-4">
                        <button type="submit" className="btn btn-primary">
                          Sumbit
                        </button>
                      </div> */}
                    </div>
                     
           
                    </div>
                  </div>
                  <div className="text-end py-4">
                    <button type="submit" className="btn btn-primary" onClick={handleOpen}>
                    Submit
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
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Record has been updated successfully.
                        </Typography>
                        <Button
                          size="small"
                          type="button"
                          variant="contained"
                          // onClick={deleteOpdRow}
                          onClick={() => navigate('/dashboard/Report')}
                          // value={deleteId}
                          id=""
                          sx={{ mt: 2, backgroundColor: '#710808' }}
                        >
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
