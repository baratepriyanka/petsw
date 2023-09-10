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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

export default function EditIpdForm() {

  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginId = loginData.hospital_id;

  const {caseId} = useParams();
  const [patientData, setPatientData] = useState([]);
  const getPatientData = async () => {
    // console.log("hiiiii")
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-patient-name/${loginId}`);
    setPatientData(await response.json());
  //  console.log(patientData);
  };


  const [FormCkEditorValue,setFormCkEditorValue]= useState();
  const [formValues, setFormValues] = useState({
    hospital_id: `${loginId}`
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () =>{
    const errors = validate(formValues);
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

   useEffect(() => {
    async function getCaseManager() {
     try {
      const response = await axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-case/${caseId}`)
      // console.log(response.data);
      setFormValues(response.data);
     } catch (error) {
      console.log("Something is Wrong");
     }
    }
    getCaseManager();
    getPatientData();
   
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
   }, [caseId]);

   const formVAlidations = {
    title: 100,
    case: 500,
   
  };
  const formValidationName = {
    title: 'title',
    case: 'case',
   
  };
  const formValSelectName = {
    date: 'date',
    patient: 'patient',

  };
  function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length  === 0) { // check if space is at beginning
      event.preventDefault();
    }
  }
   function handleChange(e) {
    setFormValues({
     ...formValues,
     [e.target.name]: e.target.value
    })
    const value = e.target.value
    const name = e.target.name
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
   }
   const handleCkeditorState = (e, editor)=>{
    const data = editor.getData();
    setFormValues({...formValues, case: data})
    // console.log(data);
  }

   async function handleSubmit(e) {
    e.preventDefault()
    try {
      setFormErrors(validate(formValues));
      setIsSubmit(true);
     await axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/updatecase/${caseId}`, formValues)
    //  alert("Record has been saved successfully");

    } catch (error) {
     console.log("Something is Wrong");
    }
   }

   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);

   const { patientErr } = formErrors;
   const formIsValid = true;
 
   const validate = (values) => {
    const errors = {};
     const limit=225;
     if (values.patient === '' || values.patient === 'select') {
      errors.patient = 'Select patient.';
    }
    if (!values.date) {
      errors.date = 'Select date.';
    }
    if (!values.case) {
      errors.case = 'Enter the case. ';
    } else if (values.case.slice(500, limit)) {
      errors.case = 'Enter the minimum 500 character.';
    }
    if (!values.title) {
      errors.title = 'Enter the title. ';
    } else if (values.title.slice(100, limit)) {
      errors.title = 'Enter the minimum 100 character.';
    }

    return errors;
  };

  const handleCloseButton = (e) => {
    navigate('/dashboard/CaseManger');
  }

  return (
    <>
       <section className="contact-screen-one ipad-height">
              <div className="container">
                <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
                  <div className="row">
                    <div className="">
                      <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                        <div className="container">
                          <div className="row mt-3">
                            <div className="row justify-content-center">
                            <input
                              type="hidden"
                              value={formValues.hospital_id}
                            />
                              <div className="col-md-4 form-group">
                                <label>Date</label>
                                <input
                                  type="date"
                                  name="date"
                                  className="form-control"
                                  id="date"
                                  value={formValues.date}
                                  required=""
                                   onChange={(e) => handleChange(e)}
                                />
                                {/* {console.log(formValues.date.substr(0, 10))} */}
                                {/* //.substr(0, 10) {opdEdit.dateofadmission.substr(0, 10)} */}
                                 <p style={{ color: 'red' }}>{formErrors.date}</p>
                              </div>
                              <div className="col-md-4 form-group">
                                <label>Patient</label>
                                <select
                                  style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                                  required=""
                                  type="text"
                                  id="patient"
                                  name="patient"
                                   onChange={(e) => handleChange(e)}
                                  value={formValues.patient}
                                  className={patientErr ? ' showError' : ''}
                                >
                                  {/* <option>--select--</option> */}
                                  {patientData.map((curElem)=>(
                                    // <option kay={curElem.id} value={curElem.id}>{curElem.name}</option>
                                    <option key={curElem.id} value={curElem.id}>
                                    {curElem.patient_name}
                                  </option>
                                  ))}
                                </select>
                                {patientErr && (
                              <p style={{ color: 'red', paddingBottom: 10 }}>{patientErr}</p>
                            )}
                              </div>
                            </div>
                            <div className="row justify-content-center">
                              <div className="col-md-8 form-group">
                                <label>Title</label>
                                <input
                                  type="title"
                                  name="title"
                                  className="form-control"
                                  id="title"
                                  required=""
                                   onChange={(e) => handleChange(e)}
                                   onKeyDown={handleKeyDown}
                                  value={formValues.title}
                                  placeholder="Enter the Case Title."
                                />
                                 <p style={{ color: 'red' }}>{formErrors.title}</p>
                              </div>
                            </div>
                            <div className="row justify-content-center">
                             
                              <div className="col-md-8 form-group mb-4">
                           <label>Case</label>
                           <textarea
                              type="text"
                                  name="case"
                                  className="form-control"
                                  id="title"
                                  required=""
                                  value={formValues.case}
                                  onChange={(e) => handleChange(e)} 
                                  onKeyDown={handleKeyDown}
                                  placeholder="Enter the Case."
                                  />
                            <p style={{ color: 'red' }}>{formErrors.case}</p>
                           </div>
                            </div>
                            <div className="text-center py-4">
                          <button type="submit" className="btn btn-primary" onClick={handleOpen}>
                          Save
                          </button>
                          <button type="button" className="btn btn-secondary m-3" onClick={handleCloseButton}>
                        {/* onClick={handleOpen} */}
                        Cancel
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
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} className='text-center'>
                        Record has been updated successfully.
                        </Typography>
                        <div className='text-center'>
                        <Button
                          size="small"
                          type="button"
                          variant="contained"
                          // onClick={deleteOpdRow}
                          onClick={() => navigate('/dashboard/CaseManger')}
                          // value={deleteId}
                          id=""
                          className="text-center opdpatientok"
                          sx={{ mt: 2, backgroundColor: '#0d6efd' }}
                        >
                          Ok
                        </Button>
                        </div>
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
