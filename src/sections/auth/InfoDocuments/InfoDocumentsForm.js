import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import './style.css';
import Axios from 'axios';
// @mui
import { Box, Grid } from '@mui/material';
// ----------------------------------------------------------------------

export default function InfoDocumentsForm() {

  const {documentId} = useParams();
  const[masterPatientData, setMasterPatientData] = useState([]);

  const getMasterPatientData = async () =>{
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-patient-name`);
    setMasterPatientData(await response.json());
    // console.log(masterPatientData);
  }
  
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/adddocuments`;

  const initialvalue = {
    patient: '',
    date: '',
    description: '',  
    document: '',  
    
   
  };
  // const [FormValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { sexErr } = formErrors;
  const { colourErr } = formErrors;
  const{StateErr}=formErrors;
  const {CityErr}=formErrors;
  const{patienterr}=formErrors;
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
 


  const[documentsEdit, setDocumentsEdit] = useState({
    patient: '',
    date: '',
    description: '',  
    document: '',  
    
  });

  useEffect(() => {
    async function getDocumentsEdit() {
      try {
       const response = await Axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-document/${documentId}`)
      //  console.log(response.data);
       setDocumentsEdit(response.data);
      } catch (error) {
       console.log("Something is Wrong");
      }
     }
     getDocumentsEdit();
     getMasterPatientData();
    
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(documentsEdit);
    }
  }, [documentId]);

  function handleChange(e) {
    setDocumentsEdit({
     ...documentId,
     [e.target.name]: e.target.value
    })
   }

   async function handleSubmit(e) {
    e.preventDefault()  
    try {
     await Axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/updatedocuments/${documentId}`, documentsEdit)
     console.log("valid");
     setFormErrors(validate(documentsEdit));
     setIsSubmit(true);
    } catch (error) {
     console.log("Something is Wrong");
    }
  };
  

  const validate = (values) => {
    const errors = {};
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
                        
                          <div className=" form-group">
                            <label>Date</label>
                            <input
                              type="date"
                              name="date"
                              className="form-control"
                              id="date"
                              required=""
                              value={documentsEdit.date}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.date}</p>
                          </div>

                          <div className="form-group mb-4">
                            <label>Patient</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="patient"
                              name="patient"
                              onChange={handleChange}
                              className={patienterr ? ' showError' : ''}
                              value={documentsEdit.patient}
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
                    
                        
                          <div className=" form-group">
                            <label>Description</label>
                            <input
                              type="text"
                              name="description"
                              className="form-control"
                              id="description"
                              required=""
                              value={documentsEdit.description}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.description}</p>
                          </div>
                     
                       
                      </div>
                    </div>
                  </div>
                  <div className="text-end py-4">
                    <button type="submit" className="btn btn-primary">
                      Sumbit
                    </button>
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
