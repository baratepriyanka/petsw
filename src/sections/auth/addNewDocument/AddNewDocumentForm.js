import React, { useState, useEffect } from 'react';
import {useParams, useNavigate }  from 'react-router-dom';

import './style.css';
import Axios from 'axios';
import { Container, Form } from 'react-bootstrap';
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
// export default function AddBed() {

  const Document = () => {
    const loginData = JSON.parse(localStorage.getItem('token-info')); 
    const loginId = loginData.hospital_id;
    // hospital_id:`${loginId}`
    const [date, setDate] = useState('')
    const [patient, setPatient] = useState('')
    const [description, setDescription] = useState('')
    const [hospitalId, setHospitalId] = useState(loginId)
    const [image, setImage] = useState('')

    
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const navigate = useNavigate();
const handleClose = () => {
  setOpen(false);
};

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
    const addProductHandler = async (e) => {

        e.preventDefault()
        const formData = new FormData()
        formData.append('document', profile.file)
        formData.append('date', date)
        formData.append('patient', patient)
        formData.append('description', description)
        formData.append('hospital_id', hospitalId)
                                                      
        await Axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/addProduct`, formData)
        .then((res) => {
          // console.log(res)
          setOpen(true);
        })
        .catch((err) => 
        alert(err.res.data)
        );
    }
    

  const [masterPatientData, setMasterPatientData] = useState([]);

  const getMasterPatientData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-patient-name/${loginId}`);
    setMasterPatientData(await response.json());
    // console.log(masterPatientData);
  };

 
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/adddocuments`;

  const initialvalue = {
    patient: '',
    date: '',
    description: '',
    document: '',
    hospital_id:''
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { sexErr } = formErrors;
  const { colourErr } = formErrors;
  const { StateErr } = formErrors;
  const { CityErr } = formErrors;
  const { patienterr } = formErrors;
  const formIsValid = true;

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate(formValues));
  //   setIsSubmit(true);
  //   Axios.post(url, {
  //     patient: formValues.patient,
  //     date: formValues.date,
  //     description: formValues.description,
  //     document: formValues.document,
  //   }).then((res) => {
  //     console.log(formValues);
  //     alert("Record has been saved successfully");

  //   });
  // };

  useEffect(() => {
    getMasterPatientData();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const limit=225;
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (!values.patient) {
      errors.patient = 'Patient Name is required';
    }
    if (!values.date) {
      errors.date = 'date is required';
    }
    if (!values.description) {
      errors.description = 'description is required';
    }
    if (!values.document) {
      errors.document = 'document is required';
    }else if(values.document.slice(100, limit)){
      errors.document ='Enter the minimum 100 character';
      }

    return errors;
  };
  return (
    <>
      <section className="screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
              <div className="">
                {/* <form onSubmit={addProductHandler} method="POST" encType="multipart/form-data">
                  <Form.Group controlId="fileName" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control type="file" name="image" onChange={(e) => setImage(e.target.files[0])} size="lg" />
                  </Form.Group>
                

                  <Form.Group className="mb-3" controlId="title">
                    <Form.Label>date</Form.Label>
                    <Form.Control value={date} onChange={(e) => setDate(e.target.value)} type="text" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="price">
                    <Form.Label>patient</Form.Label>
                    <Form.Control value={patient} onChange={(e) => setPatient(e.target.value)} type="text" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} as="textarea" />
                  </Form.Group>                

                  <Button variant="primary" type="submit">
                    Add Document
                  </Button>
                </form> */}

                <form onSubmit={addProductHandler} method="POST" encType="multipart/form-data">
                  <div className="container">
                    <div className="row">
                      <div className="row justify-content-center">
                      
                         <input
                          type="hidden"
                          name="hospital_id"
                          value={hospitalId}
                          onChange={(e) => setHospitalId(e.target.value)}/>
                          <div className="col-md-4 form-group">
                            <label>Date</label>
                            <input
                              type="date"
                              name="date"
                              className="form-control"
                              id="date"
                              required=""
                              value={date} onChange={(e) => setDate(e.target.value)}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.date}</p>
                          </div>

                          <div className="col-md-4 form-group mb-4">
                            <label>Patient</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="Patient_id"
                              name="Patient_id"
                              value={patient} onChange={(e) => setPatient(e.target.value)}
                              className="form-control"
                            > 
                          <option>--select--</option>
                            {masterPatientData.map(curElem => (                             
                              <option key={curElem.id} value={curElem.patient_name}>
                                  {curElem.patient_name}
                              </option>
                              ))}
                            </select> 
                            {patienterr && <div style={{ fontWeight: 'bold', color: 'red' }}>{patienterr}</div>}
                          </div>
                          </div>
                        <div className="row justify-content-center">
                          
                        <div className="col-md-4 form-group">
                            <label>Description</label>
                            <input
                              type="text"
                              name="description"
                              className="form-control"
                              id="description"
                              required=""
                              value={description} onChange={(e) => setDescription(e.target.value)}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.description}</p>
                          </div>
                        

                         
                        <div className="col-md-4 form-group ">
                          <label>profile</label>
                          <input
                            type="file"
                            className="form-control "
                            id="document"
                            name="document"
                            // value={profile}
                            onChange={handleInputChange}
                            // onChange={(e) => setProfile(e.target.files[0])}
                            autoComplete="off"
                          />
                          {/* <img src={profile}/>  */}
                          {/* <p style={{ color: 'red' }}>{formErrors.profile}</p> */}
                        </div>
                        </div>
                        <div className="row justify-content-center">

                        <div className="col-md-4 form-group">
                        {profile.filepreview !== null ? (
                          <img className="previewimg" src={profile.filepreview} alt="UploadImage" />
                        ) : null}
                        </div>
               
                        </div>
                     
                       
                     
                    </div>
                  </div>
                  <div className="text-end py-4">
                    <button type="submit" className="btn btn-primary">
                    Submit
                    </button>
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
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Record has been updated successfully.
                        </Typography>
                        <Button
                          size="small"
                          type="button"
                          variant="contained"
                          // onClick={deleteOpdRow}
                          onClick={() => navigate('/dashboard/Documents')}
                          // value={deleteId}
                          id=""
                          sx={{ mt: 2, backgroundColor: '#710808' }}
                        >
                          Ok
                        </Button>
                      </Box>
                    </Modal>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
   )
  }
  
  export default Document;