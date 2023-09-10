import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
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

export default function AddNewDoctorForm() {

  const[masterPatientData, setMasterPatientData] = useState([]);

  const getMasterPatientData = async () =>{
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-patient-name`);
    setMasterPatientData(await response.json());
    // console.log(masterPatientData);
  }

  const[masterbedNumber, setBedNumber] = useState([]);
  const getBedNumberData =async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-All-bednumber`)
    setBedNumber(await response.json());
  }
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/addbedallotment`;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => {
  setOpen(false);
  };

  const initialvalue = {
    bedId: '', 
    patient: '',
    allotedTime: '',
    dischargeTime: '',
    
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { patienterr } = formErrors;
  const { bedId } = formErrors;
  const{StateErr}=formErrors;
  const {CityErr}=formErrors;
  const{BreedErr}=formErrors;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    // Axios.post(url, {
    //   bedId: formValues.bedId,
    //   patient: formValues.patient,
    //   allotedTime: formValues.allotedTime,
    //   dischargeTime: formValues.dischargeTime,            
    //   status: 0,      
    // }).then((res) => {
    //   // console.log(formValues);
    //   // alert("Record has been saved successfully");

    // });
  };
 

  
  useEffect(() => {
    getMasterPatientData();
    getBedNumberData();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
      setOpen(true);
      Axios.post(url, {
        bedId: formValues.bedId,
        patient: formValues.patient,
        allotedTime: formValues.allotedTime,
        dischargeTime: formValues.dischargeTime,            
        status: 0,      
      }).then((res) => {
        // console.log(formValues);
        // alert("Record has been saved successfully");
  
      });
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const limit=225;
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (!values.bedId) {
      errors.bedId = 'Bed Id is selected';
    }   
    if (!values.patient) {
      errors.patienterr = 'Patient name is selected';
    }else if(values.patient.slice(20, limit)){
      errors.patienterr ='Enter the minimum 20 character';
      }
    if (!values.allotedTime) {
      errors.allotedTime = 'Alloted Time  is selected';
    }
    if (!values.dischargeTime) {
      errors.dischargeTime = 'Discharge Time  is selected';
    }
    
    return errors;
  };
  return (
    <>
      <section className="screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-5">
            <div className="row">
              <div className="">
                <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                  <div className="container">
                    <div className="row">
               
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Bed ID</label>
                              <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="bedId"
                              name="bedId"
                              onChange={handleChange}
                              className={bedId ? ' showError' : ''}
                              value={formValues.bedId}
                            > 
                             <option>--select--</option>
                              {masterbedNumber.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.id}
                                </option>
                              ))}
                            </select> 
                            {bedId && <div style={{color: 'red' }}>{bedId}</div>}
                          </div>
                          </div>
                        <div className="row justify-content-center">

                        <div className="col-md-4 form-group mb-4">
                            <label>Patient Name</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="patient"
                              name="patient"
                              onChange={handleChange}
                              className={patienterr ? ' showError' : ''}
                              value={formValues.patient}
                            > 
                             <option>--select--</option>
                              {masterPatientData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.patient_name}
                                </option>
                              ))}
                            </select> 
                            {patienterr && <div style={{color: 'red' }}>{patienterr}</div>}
                          </div>
                        </div>

                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Alloted Date-Time</label>
                            
    {/* <input type="datetime-local" id="time"
      name="time"
      value={formValues.time}
      onChange={handleChange}
      /> */}
                            <input
                              type="datetime-local"
                              name="allotedTime"
                              className="form-control"
                              id="allotedTime"
                              required=""
                              value={formValues.allotedTime}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{color: 'red' }}>{formErrors.allotedTime}</p>
                          </div>
                        </div>

                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Discharge Date-Time</label>
                            <input
                              type="datetime-local"
                              name="dischargeTime"
                              className="form-control"
                              id="dischargeTime"
                              required=""
                              value={formValues.dischargeTime}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{color: 'red' }}>{formErrors.dischargeTime}</p>
                          </div>
                          </div>

                        
                       
                          <div className="text-end py-4">
                    <button type="submit" className="btn btn-primary">
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
                          onClick={() => navigate('/dashboard/BedAllotments')}
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

