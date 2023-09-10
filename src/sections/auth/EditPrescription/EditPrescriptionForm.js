import React, { useState, useEffect } from 'react';
import {useParams ,useNavigate } from 'react-router-dom';
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

export default function EditPrescriptionForm() {
  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginId = loginData.hospital_id;

  const {prescriptionId} = useParams();
  
  const[masterPatientData, setMasterPatientData] = useState([]);
  const getMasterPatientData = async () =>{
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-patient-name/${loginId}`);
    setMasterPatientData(await response.json());
  }

  const[masterDoctorData, setMasterDoctorData] = useState([]);
  const getMasterDoctorData = async () =>{
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-doctor/${loginId}`);
    setMasterDoctorData(await response.json());
  }

  const[masterMedicineData, setMasterMedicineData] = useState([]);
  const getMasterMedicineData = async () =>{
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-medicine/${loginId}`);
    setMasterMedicineData(await response.json());
  }

  
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    const errors = validate(prescriptionEdit);
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

  const[prescriptionEdit, setPrescriptionEdit] = useState({
    date: '',
    patientid: '',
    doctorid: '',
    medicineid: '',
    history: '',
    note: '',
    hospital_id: `${loginId}`
  });

  useEffect(() => {
    async function getPrescriptionEdit() {
        try {
         const response = await axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-prescription/${prescriptionId}`)
         setPrescriptionEdit(response.data);
        //  console.log(response.data);
        } catch (error) {
         console.log("Something is Wrong");
        }
       }
       getPrescriptionEdit();
       getMasterPatientData();
       getMasterDoctorData();
       getMasterMedicineData();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(prescriptionEdit);
    }
  }, [prescriptionId]);


  function handleChange(e) {
    setPrescriptionEdit({
     ...prescriptionEdit,
     [e.target.name]: e.target.value
    })
   }


   const handleCkeditorState = (e, editor)=>{
    const data = editor.getData();
    setPrescriptionEdit({prescriptionEdit, history: data,
    note: data})
    // console.log(data);
  }
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const { patienterr } = formErrors;
  const { doctorerr } = formErrors;
  const { medicineerr } = formErrors;
  
  const formIsValid = true;

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setFormErrors(validate(prescriptionEdit));
      setIsSubmit(true);
     await axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/update-prescription/${prescriptionId}`, prescriptionEdit)
    } catch (error) {
     console.log("Something is Wrong");
    }
   }

 
  const validate = (values) => {
    const errors = {};
    const limit=225;
    if (!values.patientid) {
      errors.patienterr = 'Patient name is selected';
    }else if(values.patientid.slice(20, limit)){
      errors.patientiderr ='Enter the minimum 20 character';
    }
    if (!values.date) {
      errors.date = 'Date is selected';
    }
    if (!values.doctorid) {
      errors.doctorerr = 'Doctor name is selected';
    }else if(values.doctorid.slice(20, limit)){
      errors.doctorerr ='Enter the minimum 20 character';
    }
    if (!values.medicineid) {
      errors.medicineerr = 'Medicine name is selected';
    }else if(values.medicineid.slice(20, limit)){
      errors.medicineerr ='Enter the minimum 20 character';
    }
    if (!values.history) {
      errors.history = 'Enter the History ';
    }else if(values.history.slice(50, limit)){
      errors.history ='Enter the minimum 50 character';
    }
    if (!values.note) {
      errors.note = 'Enter the Note ';
    }else if(values.note.slice(50, limit)){
      errors.note ='Enter the minimum 50 character';
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
                 
                      <div className="row">
                        <div className="row justify-content-center">
                        <input
                            type="hidden"
                            value={prescriptionEdit.hospital_id}
                          />
                          <div className="col-md-4 form-group">
                            <label>Date</label>
                            <input
                              type="date"
                              name="date"
                              className="form-control"
                              id="date"
                              value={prescriptionEdit.date}
                              required=""
                              onChange={e => handleChange(e)}
                              autoComplete="off"
                            />
                            <p style={{color: 'red' }}>{formErrors.date}</p>
                          </div>
                          <div className="col-md-4 form-group mb-4">
                            <label>Patient</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="patientid"
                              name="patientid"
                              value={prescriptionEdit.patientid}
                               onChange={e => handleChange(e)}
                              className={patienterr ? ' showError' : ''}
                            > 
                          <option>--select--</option>
                            {masterPatientData.map(curElem => (                             
                              <option key={curElem.id} value={curElem.id}>
                                  {curElem.patient_name}
                              </option>
                              ))}
                            </select> 
                            {patienterr && <div style={{ fontWeight: 'bold', color: 'red' }}>{patienterr}</div>}
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group mb-4">
                            <label>Doctor</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="doctorid"
                              name="doctorid"
                              onChange={e => handleChange(e)}
                              className={doctorerr ? ' showError' : ''}
                              value={prescriptionEdit.doctorid}
                            > 
                          <option>--select--</option>
                            {masterDoctorData.map(curElem => (                             
                              <option key={curElem.id} value={curElem.id}>
                                  {curElem.doctor_name}
                              </option>
                              ))}
                            </select> 
                            {doctorerr && <div style={{ fontWeight: 'bold', color: 'red' }}>{doctorerr}</div>}
                          </div>
                          <div className="col-md-4 form-group mb-4">
                            <label>Medicine</label>
                            
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="medicineid"
                              name="medicineid"
                              onChange={e => handleChange(e)}
                              className={medicineerr ? ' showError' : ''}
                              value={prescriptionEdit.medicineid}
                            > 
                            <option>--select--</option>
                            {masterMedicineData.map(curElem => (                             
                              <option key={curElem.id} value={curElem.id}>
                                  {curElem.medicine_name}
                              </option>
                              ))}
                            </select> 
                            {medicineerr && <div style={{ fontWeight: 'bold', color: 'red' }}>{medicineerr}</div>}
                          </div>
                        </div>
                        <div className="row justify-content-center">
                        {/* <div className="col-md-4 form-group mb-4">
                        <label>History</label>
                           <CKEditor
                           editor={ClassicEditor}
                           name="history"
                           data={prescriptionEdit.history}
                          // sy={{ maxWidth: 500 }} ml={5}
                          sx={{ maxWidth: '500px', maxHeight: '500px' }}
                          mb={5}
                          maxWidth="sm"
                          onChange={handleCkeditorState}
                          />
                           </div> */}

                          <div className="col-sm-8">
                           <label>History</label>
                            <textarea
                              className="form-control"
                              name="history"
                              rows=""
                              required=""
                              value={prescriptionEdit.history}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.history}</p>
                          </div>

                          <div className="col-sm-8">
                           <label>Note</label>
                            <textarea
                              className="form-control"
                              name="note"
                              rows=""
                              required=""
                              value={prescriptionEdit.note}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.note}</p>
                          </div>

                           {/* <div className="col-md-4 form-group mb-4">
                           <label>Note</label>
                           <CKEditor
                           editor={ClassicEditor}
                           data={prescriptionEdit.note}
                          // data="<p>Hello from CKEditor 5!</p>"
                          // sy={{ maxWidth: 500 }} ml={5}
                          sx={{ maxWidth: '500px', maxHeight: '500px' }}
                          mb={5}
                          maxWidth="sm"
                          onChange={handleCkeditorState}
                          />
                           </div> */}
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
                          onClick={() => navigate('/dashboard/Prescription')}
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
