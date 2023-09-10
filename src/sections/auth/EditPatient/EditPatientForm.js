import React, { useState, useEffect } from 'react';
import {useParams, useNavigate }  from 'react-router-dom';
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

export default function EditPatientForm() {

  const {patientId} = useParams();

  const[masterGenderData, setMasterGenderData] = useState([]);

  const getMasterGenderData = async () =>{
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-gender`);
    setMasterGenderData(await response.json());
}
const[masterDoctorData, setMasterDoctorData] = useState([]);

const getMasterDoctorData = async () =>{
  const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-doctor`);
  setMasterDoctorData(await response.json());
}
const[masterbloodgroup, setMasterbloodgroup] = useState([]);

const getMasterbloodgroup = async () =>{
  // console.log("formErrors"); 
   const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-bloodgroup`);
  setMasterbloodgroup(await response.json());
 
}

const [open, setOpen] = useState(false);
const handleOpen = () => {
  const errors = validate(patientEdit);
  // console.log(errors)
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

  const[patientEdit, setPatientEdit] = useState({
    patient_name: '',
    email: '',
    phone: '',
    password: '',
    address:'',
  });

  const [profile, setProfile] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (event) => {
    setProfile({
      ...profile,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

 
  useEffect(() => {
    async function getPatientEdit() {
     try {
      const response = await axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-patient/${patientId}`)
      // console.log(response.data);
      setPatientEdit(response.data);
     } catch (error) {
      console.log("Something is Wrong");
     }
    }
    getPatientEdit();
    getMasterGenderData();
    getMasterDoctorData();
    getMasterbloodgroup();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(patientEdit);
    }
   }, [patientId]);

   function handleChange(e) {
    setPatientEdit({
     ...patientEdit,
     [e.target.name]: e.target.value
    })
   }
   
   async function handleSubmit(e) {
    e.preventDefault()
    try {
     await axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/update-patient/${patientId}`, patientEdit)
     .then((response) =>{
    //  console.log(curElem)
     console.log(response.data.post)
     const data = response.data.post
     const data1 = new FormData();
     data1.append('profile', profile.file);
     const url1 = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/update-patient-demo/${data}`;
     const response1 = axios.post(url1, data1)
     .then((res) =>{
       console.log("res")
       console.log(response1)
     }).catch((error)=>{
       alert(error.response.data);
     })
    })
    } catch (error) {
     console.log("Something is Wrong");
    }
   }

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { gendererr } = formErrors;
  const { doctorerr } = formErrors;
  const { bloodgroup } = formErrors;
  const{StateErr}=formErrors;
  const {CityErr}=formErrors;
  const{BreedErr}=formErrors;
  const formIsValid = true;

  const validate = (values) => {
    const errors = {};
    const limit =225;
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (!values.patient_name) {
      errors.patient_name = 'Enter Patient name';
    }else if(values.patient_name.slice(20, limit)){
      errors.patient_name ='Enter the minimum 20 character';
      } 
    if (!values.doctor_id) {
      errors.doctorerr = 'Doctor name is selected';
    }else if(values.doctor_id.slice(20, limit)){
      errors.doctorerr ='Enter the minimum 20 character';
    }
    
    if (!values.password) {
      errors.password = 'Enter the password';
    }
    if (!values.birthday) {
      errors.birthday = 'Birthday Date is selected';
    }
    if (!values.gender === '' || values.gender === 'select') {
      errors.gendererr = 'Gender is selected';
    }
    if (!values.bloodgroup === '' || values.bloodgroup === 'select') {
      errors.bloodgroup = 'Blood Broup is selected';
    }
    if (!values.email) {
      errors.email = 'Enter the Email ';
    } else if (!regex.test(values.email)) {
      errors.email = 'this is not a valid email';
    }
    if (!values.phone) {
      errors.phone = 'Enter the Phone number';
    } else if (values.phone.length < 10) {
      errors.phone = 'this is not a valid Phone number';
    }else if (values.phone.length > 10) {
      errors.phone = 'minimum 10 digit';
    } 
    if (!values.address) {
      errors.address = 'Enter the Address';
    }else if(values.address.slice(25, limit)){
      errors.address ='Enter the minimum 25 character';
    }
    if (!values.profile) {
      errors.profile = 'Enter the whatsApp number';
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
                              name="patient_name"
                              className="form-control"
                              id="patient_name"
                              required=""
                              value={patientEdit.patient_name}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.patient_name}</p>
                          </div>

                          <div className="col-md-4 form-group mt-3 mt-md-0">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              required=""
                              value={patientEdit.email}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.email}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>password</label>
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              id="password"
                              required=""
                              value={patientEdit.password}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.password}</p>
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
                              value={patientEdit.address}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.address}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>Phone</label>
                            <input
                              type="number"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={patientEdit.phone}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.phone}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>Gender</label>                        
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="gender"
                              name="gender"
                              onChange={handleChange}
                              className={gendererr ? ' showError' : ''}
                              value={patientEdit.gender}
                            >
                            <option>--select--</option>
                            {masterGenderData.map(curElem => (
                              <option key={curElem.id} value={curElem.name}>
                                  {curElem.name}
                              </option>
                              ))}
                            </select>
                            {gendererr && <div style={{color: 'red', paddingBottom: 10 }}>{gendererr}</div>}
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
                              value={patientEdit.birthday}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.birthday}</p>
                          </div>

                          <div className="col-md-4 form-group mb-4">
                            <label>Doctor</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="address"
                              name="doctor_id"
                              onChange={handleChange}
                              className={doctorerr ? ' showError' : ''}
                              value={patientEdit.doctor_id}
                            > 
                          <option>--select--</option>
                            {masterDoctorData.map(curElem => (                             
                              <option key={curElem.id} value={curElem.id}>
                                  {curElem.doctor_name}
                              </option>
                              ))}
                            </select> 
                            {doctorerr && <div style={{ color: 'red' }}>{doctorerr}</div>}
                          </div>

                          <div className="col-md-4 form-group mb-4">
                            <label>Blood Group</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="bloodgroup"
                              name="bloodgroup"
                              onChange={handleChange}
                              className={bloodgroup ? ' showError' : ''}
                              value={patientEdit.bloodgroup}
                            > 
                          <option>--select--</option>
                          {masterbloodgroup.map(curElem => (                             
                              <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                              </option>
                              ))}
                            </select> 
                          
                            {bloodgroup && <div style={{ color: 'red' }}>{bloodgroup}</div>}
                          </div>
                          </div>
                        <div className="row">

                           <div className="row">
                              <div className="col-md-4 form-group ">
                                <label>profile</label>
                                <input
                                  type="file"
                                  className="form-control "
                                  id="profile"
                                  name="profile"
                                  // value={profile}
                                  onChange={handleInputChange}
                                  // onChange={(e) => setProfile(e.target.files[0])}
                                  autoComplete="off"
                                />
                                {/* <img src={profile}/>  */}
                                {/* <p style={{ color: 'red' }}>{formErrors.profile}</p> */}
                              </div>
                              {/* <img src={profile}  className="images_pro" alt='' /> */}
                              <div className="col-md-4 form-group">
                              {profile.filepreview !== null ? (
                                <img className="previewimg" src={profile.filepreview} alt="UploadImage" />
                              ) : <img className="previewimg" src={patientEdit.s3image} alt="UploadImage" />}
                              </div>
                            </div>
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
                          onClick={() => navigate('/dashboard/PatientList')}
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

