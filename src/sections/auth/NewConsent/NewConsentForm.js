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

export default function NewConsentForm() {
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
  const [masterSpeciesData, setmasterSpeciesData] = useState([]);
  const getMasterSpeciesData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-species`);
    setmasterSpeciesData(await response.json());
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => {
  setOpen(false);
  };
  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginId = loginData.hospital_id;

  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-consent`;

  const initialvalue = {
    ownerName: '',
    contractNo: '',
    address: '',
    species: '',
    breed: '',
    color: '',
    age: '',
    genderid: '',
    undersigned: '',
    time: '',
    vehicleNo: '',
    idNo:'',
    dateOfAdmission: '',
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
   
  };

  useEffect(() => {
    getMasterGenderData();
    getMasterBreedData();
    getMasterColorData();
    getMasterSpeciesData();

    // getMasterStateData();
    // getMasterCityData();
    if (Object.keys(formErrors).length === 0 && isSubmit) {

      setOpen(true);
      Axios.post(url, {
        ownerName: formValues.ownerName,
        dateOfAdmission: formValues.dateOfAdmission,
        undersigned: formValues.undersigned,
        address: formValues.address,
        contractNo: formValues.contractNo,
        species: formValues.species,
        breed: formValues.breed,
        color: formValues.color,
        age: formValues.age,
        genderid: formValues.genderid,
        idNo: formValues.idNo,
        vehicleNo: formValues.vehicleNo,
        time: formValues.time,
        hospital_id:formValues.hospital_id 
      }).then((res) => {
        // console.log(formValues);
        // alert("Record has been saved successfully");
  
      });
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    const limit=225;
    if (!values.ownerName) {
      errors.ownerName ='Enter the Owner Name';
    }else if(values.ownerName.slice(20, limit)){
      errors.ownerName ='Enter the minimum 20 character';
      }
    if (!values.undersigned) {
      errors.undersigned ='Enter the undersigned';
    }
    if (!values.dateOfAdmission) {
      errors.dateOfAdmission ='Date Of Admission is selected';
    }
  
    if (!values.address) {
      errors.address ='Enter the Address';
    }else if(values.address.slice(25, limit)){
      errors.address ='Enter the minimum 25 character';
      }
    // if (!values.contractNo) {
    //   errors.contractNo = 'Contact No is required';
    // }
    
    if (!values.contractNo) {
      errors.contractNo = 'Enter the Contact number';
    } else if (values.contractNo.length < 10) {
      errors.contractNo = 'this is not a valid Contact number';
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
    if (values.genderid === '' || values.genderid === 'select') {
      formIsValid = false;
      errors.genderid = ' Gender is selected';
    }
    if (!values.idNo) {
      errors.idNo = 'Enter the Id number';
    }
    if (!values.time) {
      errors.time = 'Time is selected';
    }
    if (!values.vehicleNo) {
      errors.vehicleNo ='Enter the Vehicle number';
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
                        <div className="row justify-content-center">
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
                              pattern="[\d/]"
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
                            <option>--Select--</option>
                              {masterBreedData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
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
                            <option>--Select--</option>
                              {masterColorData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
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
                            <option>--Select--</option>
                              {masterGenderData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
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
                     <div className="row">
                      <p>
                        I undersigned  <input type="text" onChange={handleChange} name='undersigned' id='undersigned'  value={formValues.undersigned} autoComplete="off" className=" consentform"/>   taking dog as describe above with my own responsibility after indentification from dog pound with permission from veterinary department.
                      </p>
                     </div>
                      <div className="row mt-3">
                        <div className="col-md-3 form-group">
                          <label>Time</label>
                          <input
                            type="time"
                            name="time"
                            className="form-control"
                            id="time"
                            required=""
                            value={formValues.time}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          <p style={{ color: 'red' }}>{formErrors.time}</p>
                        </div>
                        <div className="col-md-3 form-group">
                          <label>Id No.</label>
                          <input
                            type="number"
                            name="idNo"
                            className="form-control"
                            id="idNo"
                            required=""
                            value={formValues.idNo}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          <p style={{ color: 'red' }}>{formErrors.idNo}</p>
                        </div>
                        <div className="col-md-4 form-group">
                          <label>Vehicle No.</label>
                          <input
                            type="number"
                            name="vehicleNo"
                            className="form-control"
                            id="vehicleNo"
                            required=""
                            onChange={handleChange}
                            value={formValues.vehicleNo}
                            autoComplete="off"
                          />
                           <p style={{ color: 'red' }}>{formErrors.vehicleNo}</p>
                        </div>
                      </div>
                      <div className="text-end py-4">
                        <button type="submit" className="btn btn-primary" >
                        {/* onClick={handleOpen} */}
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
                          onClick={() => navigate('/dashboard/Consent')}
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
