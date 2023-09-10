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

export default function EditDeathReportForm() {

  const {deathReportId} = useParams();
  const [masterGenderData, setMasterGenderData] = useState([]);
  const getMasterGenderData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-gender`);
    setMasterGenderData(await response.json());
  };

  const [masterBreedData, setMasterBreedData] = useState([]);

  const getMasterBreedData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-breed`);
    setMasterBreedData(await response.json());
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    const errors = validate(deathReportEdit);
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
  const loginData = JSON.parse(localStorage.getItem('token-info')); 
    const loginId = loginData.hospital_id
  // const url = `http://localhost:8086/web/updatepatient/${deathReportId}`;
  const[deathReportEdit, setDeathReportEdit] = useState({
    ownerName: '',
    contractNo: '',
    dateOfAdmission: '',    
    address: '',
    breed:'',
    species: '',
    color: '',
    age: '',
    genderid: '',
    causeOfDeath: '',
    date: '',
    diseases: '',
    releaseTime: '',
    veterinaryDoctor: '',
    hospital_id: `${loginId}`
  });
 

  useEffect(() => {
    async function getDeathReportEdit() {
     try {
      const response = await axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-death-report/${deathReportId}`)
      // console.log(response.data);
      setDeathReportEdit(response.data);
     } catch (error) {
      console.log("Something is Wrong");
     }
    }
    getDeathReportEdit();
    getMasterGenderData();
    getMasterBreedData();
    getMasterColorData();
    getMasterStateData();
    getMasterCityData();
    getMasterSpeciesData();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(deathReportEdit);
    }
   }, [deathReportId]);
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { grnderErr } = formErrors;
  const { colourErr } = formErrors;
  const{stateErr}=formErrors;
  const {species}=formErrors;
  const{BreedErr}=formErrors;
  let formIsValid = true;

  // validation
  function handleChange(e) {
    setDeathReportEdit({
     ...deathReportEdit,
     [e.target.name]: e.target.value
    })
   }
   async function handleSubmit(e) {
    e.preventDefault()
    try {
      setFormErrors(validate(deathReportEdit));
      setIsSubmit(true);
     await axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/update-death-report/${deathReportId}`, deathReportEdit)
  
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
      errors.ownerName ='Enter the Owner name';
    }else if(values.ownerName.slice(20, limit)){
      errors.ownerName ='Enter the minimum 20 character';
      }

    if (!values.contractNo) {
      errors.contractNo = 'Enter the Contact number';
    } else if (values.contractNo.length < 10) {
      errors.contractNo = 'this is not a valid Contact number';
    }
    else if (values.contractNo.length > 10) {
      errors.contractNo = 'minimum 10 digit';
    }

    if (!values.dateOfAdmission) {
      errors.dateOfAdmission = 'Date Of Admission is selected';
    }  
    if (!values.address) {
      errors.address = 'Enter the Address';
    }else if(values.address.slice(25, limit)){
      errors.address ='Enter the minimum 25 character';
      }
    if (!values.veterinaryDoctor) {
      errors.veterinaryDoctor = 'Enter the Veterinary Doctor';
    }
    if (!values.species) {
      errors.species = 'Species is selected';
    }
    if (!values.releaseTime) {
      errors.releaseTime = 'Release Time is selected';
    }
    if (!values.age) {
      errors.age = 'Enter the Age ';
    }
    if (!values.date) {
      errors.date = 'Date is selected';
    }
    if (!values.diseases) {
      errors.diseases = 'Enter the Diseases ';
    }else if(values.diseases.slice(220, limit)){
      errors.diseases ='Enter the minimum 220 character';
      }
    if (!values.causeOfDeath) {
      errors.causeOfDeath = 'Enter the Cause Of Death';
    }else if(values.causeOfDeath.slice(220, limit)){
      errors.causeOfDeath ='Enter the minimum 220 character';
      }
    if (values.genderid === '' || values.genderid === 'select') {
      formIsValid = false;
      errors.genderid = 'Gender is selected';
    }
    if (values.color  === '' || values.color === 'select') {
      formIsValid = false;
      errors.color = 'color is selected';
    }
    if(values.breed ===''|| values.breed === 'select'){
      formIsValid = false;
      errors.breed='Breed is selected'
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
                   
                          <div className="row">
                      <div className="row mb-3">
                        <div className="row justify-content-center ">
                        <input
                          type="hidden"
                          value={deathReportEdit.hospital_id}
                        />
                          <div className="col-md-4 form-group">
                            <label>Name of dog receiver/Owner</label>
                            <input
                              type="text"
                              name="ownerName"
                              className="form-control"
                              id="ownerName"
                              required=""
                              value={deathReportEdit.ownerName}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.ownerName}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label>Contact No.</label>
                            <input
                              type="tel"
                              name="contractNo"
                              className="form-control"
                              id="contractNo"
                              required
                              value={deathReportEdit.contractNo}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.contractNo}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label>Date Of Admission</label>
                            <input
                              type="date"
                              name="dateOfAdmission"
                              className="form-control"
                              id="dateOfAdmission"
                              required=""
                              value={deathReportEdit.dateOfAdmission}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.dateOfAdmission}</p>
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
                              value={deathReportEdit.breed}
                            >
                              <option>--select--</option>
                              {masterBreedData.map((deathReportEdit) => (
                                <option key={deathReportEdit.id} value={deathReportEdit.id}>
                                  {deathReportEdit.name}
                                </option>
                              ))}
                            </select>
                            {BreedErr && <div style={{ color: 'red', paddingBottom: 10 }}>{BreedErr}</div>}
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
                              value={deathReportEdit.species}
                            >
                            <option>--select--</option>
                              {masterSpeciesData.map((deathReportEdit) => (
                                <option key={deathReportEdit.id} value={deathReportEdit.id}>
                                  {deathReportEdit.name}
                                </option>
                              ))}
                            </select>
                            {species && (
                              <div style={{ color: 'red', paddingBottom: 10 }}>{species}</div>
                            )}
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
                              value={deathReportEdit.color}
                            >
                             <option>--select--</option>
                              {masterColorData.map((deathReportEdit) => (
                                <option key={deathReportEdit.id} value={deathReportEdit.id}>
                                  {deathReportEdit.name}
                                </option>
                              ))}
                            </select>
                            {colourErr && <div style={{ color: 'red', paddingBottom: 10 }}>{colourErr}</div>}
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Age</label>
                            <input
                              type="number"
                              name="age"
                              className="form-control"
                              id="age"
                              required=""
                              value={deathReportEdit.age}
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
                              className={grnderErr ? ' showError' : ''}
                              value={deathReportEdit.genderid}
                            >
                             <option>--select--</option>
                              {masterGenderData.map((deathReportEdit) => (
                                <option key={deathReportEdit.id} value={deathReportEdit.id}>
                                  {deathReportEdit.name}
                                </option>
                              ))}
                            </select>
                            {grnderErr && <div style={{ color: 'red', paddingBottom: 10 }}>{grnderErr}</div>}
                          </div>
                          <div className="col-md-4 form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              name="address"
                              className="form-control"
                              id="address"
                              required=""
                              value={deathReportEdit.address}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.address}</p>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="row mb-3">
                          <label className="col-sm-3">H/o:-</label>
                          <div className="col-sm-9">
                            <textarea
                              className="form-control"
                              name="diseases"
                              rows=""
                              required=""
                              value={deathReportEdit.diseases}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.diseases}</p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-3">Cause of Death:-</label>
                          <div className="col-sm-9">
                            <textarea
                              className="form-control"
                              name="causeOfDeath"
                              rows=""
                              required=""
                              value={deathReportEdit.causeOfDeath}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.causeOfDeath}</p>
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
                            value={deathReportEdit.releaseTime}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          <p style={{ color: 'red' }}>{formErrors.releaseTime}</p>
                        </div>
                        <div className="col-md-3 form-group">
                          <label>Date</label>
                          <input
                            type="date"
                            name="date"
                            className="form-control"
                            id="date"
                            required=""
                            value={deathReportEdit.date}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          <p style={{ color: 'red' }}>{formErrors.date}</p>
                        </div>
                        <div className="col-md-3 form-group">
                          <label>Name Of Veterinary Doctor</label>
                          <input
                            type="text"
                            name="veterinaryDoctor"
                            className="form-control"
                            id="veterinaryDoctor"
                            required=""
                            value={deathReportEdit.veterinaryDoctor}
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
                    <button type="submit" className="btn btn-primary" 
                    onClick={handleOpen}
                    >
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
                          onClick={() => navigate('/dashboard/DeathReport')}
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
