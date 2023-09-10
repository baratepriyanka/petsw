import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function IPdNewPatientForm() {
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
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-color`);
    setMasterColorData(await response.json());
  };

  const [masterSpeciesData, setmasterSpeciesData] = useState([]);
  const getMasterSpeciesData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-species`);
    setmasterSpeciesData(await response.json());
  };

  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-death-report`;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => {
  setOpen(false);
  };
  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginId = loginData.hospital_id;
  
  const initialvalue = {
    ownerName: '',
    contractNo: '',
    dateOfAdmission: '',   
    address: '',
    breed:'',
    species: '',
    color: '',
    age: '',
    genderid: '',
    diseases: '',
    causeOfDeath: '',
    date: '',
    releaseTime: '',
    veterinaryDoctor: '',  
    hospital_id:`${loginId}`
  
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { species } = formErrors;
  const { breed } = formErrors;
  const { color } = formErrors;
  const { genderid } = formErrors;
 
  let formIsValid = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    getMasterGenderData();
    getMasterBreedData();
    getMasterColorData();
    getMasterSpeciesData();

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setOpen(true);
      Axios.post(url, {
        ownerName: formValues.ownerName,
        contractNo: formValues.contractNo,
        dateOfAdmission: formValues.dateOfAdmission,
        address: formValues.address,      
        species: formValues.species,
        breed: formValues.breed,      
        color: formValues.color,
        age: formValues.age,
        genderid: formValues.genderid,
        diseases: formValues.diseases,
        causeOfDeath: formValues.causeOfDeath,
        date: formValues.date,
        releaseTime: formValues.releaseTime,
        veterinaryDoctor: formValues.veterinaryDoctor,   
        hospital_id:formValues.hospital_id    
        // status: 0,
      }).then((res) => {
        // console.log(formValues);
        // alert("Recsord has been saved successfully");
  
      });
    }
  }, [formErrors]);
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
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-5">
            <div className="row">
              <div className="">
                <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                  <div className="container">
                    <div className="row">
                      <div className="row mb-3">
                        <div className="row justify-content-center ">
                              <input
                              type="hidden"
                              value={formValues.hospital_id}/>
                          <div className="col-md-4 form-group">
                            <label>Name of dog receiver/Owner</label>
                            <input
                              type="text"
                              name="ownerName"
                              className="form-control"
                              id="ownerName"
                              required=""
                              value={formValues.ownerName}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.ownerName}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label>Contact No.</label>
                            <input
                              type="number"
                              name="contractNo"
                              className="form-control"
                              id="contractNo"
                              required=""
                              value={formValues.contractNo}
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
                              value={formValues.dateOfAdmission}
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
                              className={breed ? ' showError' : ''}
                              value={formValues.breed}
                            >
                              <option>--select--</option>
                              {masterBreedData.map((formValues) => (
                                <option key={formValues.id} value={formValues.id}>
                                  {formValues.name}
                                </option>
                              ))}
                            </select>
                            {breed && <div style={{ color: 'red', paddingBottom: 10 }}>{breed}</div>}
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
                              value={formValues.species}
                            >
                              <option>--select--</option>
                              {masterSpeciesData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
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
                              className={color ? ' showError' : ''}
                              value={formValues.color}
                            >
                             <option>--select--</option>
                              {masterColorData.map((formValues) => (
                                <option key={formValues.id} value={formValues.id}>
                                  {formValues.name}
                                </option>
                              ))}
                            </select>
                            {color && <div style={{ color: 'red', paddingBottom: 10 }}>{color}</div>}
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
                              value={formValues.age}
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
                              className={genderid ? ' showError' : ''}
                              value={formValues.genderid}
                            >
                             <option>--select--</option>
                              {masterGenderData.map((formValues) => (
                                <option key={formValues.id} value={formValues.id}>
                                  {formValues.name}
                                </option>
                              ))}
                            </select>
                            {genderid && <div style={{ color: 'red', paddingBottom: 10 }}>{genderid}</div>}
                          </div>
                          <div className="col-md-4 form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              name="address"
                              className="form-control"
                              id="address"
                              required=""
                              value={formValues.address}
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
                              value={formValues.diseases}
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
                              value={formValues.causeOfDeath}
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
                            value={formValues.releaseTime}
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
                            value={formValues.date}
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
                            value={formValues.veterinaryDoctor}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          <p style={{ color: 'red' }}>{formErrors.veterinaryDoctor}</p>
                        </div>
                        
                      </div>
                      <div className="text-end py-4">
                        <button type="submit" className="btn btn-primary" 
                        // onClick={handleOpen}
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
                        Record has been saved successfully.
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
