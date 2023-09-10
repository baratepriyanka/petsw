import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import axios from 'axios';
// @mui
import { Box, Grid } from '@mui/material';
// ----------------------------------------------------------------------

export default function EditBedAllotmentForm() {
  const { bedAllotmentId } = useParams();
  const [bedAllotmentEdit, setBedAllotmentEdit] = useState({
    bedId: '',
    patient: '',
    allotedTime: '',
    dischargeTime: '',
  });

  const[masterPatientData, setMasterPatientData] = useState([]);

  const getMasterPatientData = async () =>{
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-patient-name`);
    setMasterPatientData(await response.json());
    // console.log(masterPatientData);
  }

  useEffect(() => {
    getMasterPatientData();
    async function getBedAllotmentEdit() {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-bed-allotment/${bedAllotmentId}`);
        // console.log(response.data);
        setBedAllotmentEdit(response.data);
      } catch (error) {
        console.log('Something is Wrong');
      }
    }
    getBedAllotmentEdit();
    // getMasterCategoryData();

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(medicineEdit);
    }
  }, [bedAllotmentId]);
  // const [bedAllotmentEdit, setbedAllotmentEdit] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { patienterr } = formErrors;
  const { colourErr } = formErrors;
  const { StateErr } = formErrors;
  const { CityErr } = formErrors;
  const { BreedErr } = formErrors;
  const formIsValid = true;

  function handleChange(e) {
    setBedAllotmentEdit({
      ...bedAllotmentEdit,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/update-All-bed-allotment/${bedAllotmentId}`,bedAllotmentEdit);
      console.log('valid');
      setFormErrors(validate(bedAllotmentEdit));
      setIsSubmit(true);
    } catch (error) {
      console.log('Something is Wrong');
    }
  }

  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (!values.bedId) {
      errors.bedId = 'Bed Id is required';
    }
    if (!values.patient) {
      errors.patient = 'Patient  is selected';
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
      <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-5">
            <div className="row">
              <div className="">
                <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                  <div className="container">
                    <div className="row">
                      {/* {
                      bedAllotmentEdit.map((bedAllotmentEdit)=>{
                        return( */}
                      <div className="row">
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Bed ID</label>
                            <input
                              type="text"
                              name="bedId"
                              className="form-control"
                              id="bedId"
                              required=""
                              value={bedAllotmentEdit.bedId}
                              onChange={(e) => handleChange(e)}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.bedId}</p>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                        <div className="col-md-4 form-group mb-4">
                            <label>Patient</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="patient"
                              name="patient"
                              onChange={handleChange}
                              className={patienterr ? ' showError' : ''}
                              value={bedAllotmentEdit.patient}
                            > 
                             <option>--select--</option>
                              {masterPatientData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.patient_name}
                                </option>
                              ))}
                            </select> 
                            {patienterr && <div style={{ fontWeight: 'bold', color: 'red' }}>{patienterr}</div>}
                          </div>
                        </div>

                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Alloted Time</label>
                            <input
                              type="allotedTime"
                              name="allotedTime"
                              className="form-control"
                              id="allotedTime"
                              required=""
                              value={bedAllotmentEdit.allotedTime}
                              onChange={(e) => handleChange(e)}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.allotedTime}</p>
                          </div>
                        </div>

                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Discharge Time</label>
                            <input
                              type="dischargeTime"
                              name="dischargeTime"
                              className="form-control"
                              id="dischargeTime"
                              required=""
                              value={bedAllotmentEdit.dischargeTime}
                              onChange={(e) => handleChange(e)}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.dischargeTime}</p>
                          </div>
                        </div>

                        <div className="text-end py-4">
                          {/* <button type="submit" className="btn btn-primary">
                            Sumbit
                          </button> */}
                        </div>
                      </div>

                      {/* )
                      })
                      } */}
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
