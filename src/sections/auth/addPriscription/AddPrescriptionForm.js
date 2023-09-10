import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Axios from 'axios';
// @mui
import { Button, Typography, Box, Modal } from '@mui/material';

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

export default function RegisterNewPatientForm() {

  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginId = loginData.hospital_id;

  const [masterPatientData, setMasterPatientData] = useState([]);

  const getMasterPatientData = async () => {
    // console.log("formErrors");
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-patient-name/${loginId}`
    );
    setMasterPatientData(await response.json());
    // console.log(masterPatientData);
  };
  const [masterDoctorData, setMasterDoctorData] = useState([]);

  const getMasterDoctorData = async () => {
    // console.log("formErrors");
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-doctor/${loginId}`
    );
    setMasterDoctorData(await response.json());
    // console.log(masterDoctorData);
  };

  const [masterMedicineData, setMasterMedicineData] = useState([]);

  const getMasterMedicineData = async () => {
    // console.log("formErrors");
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-medicine/${loginId}`
    );
    setMasterMedicineData(await response.json());
    // console.log(masterMedicineData);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  const [inputList, setInputList] = useState([{}]);
  const handleAddClick = () => {
    setInputList([...inputList, {}]);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
 
  
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-prescription`;

  const initialvalue = {
    date: '',
    patientid: '',
    doctorid: '',
    medicineid: '',
    history: '',
    note: '',
    hospital_id:`${loginId}`
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { patientiderr } = formErrors;
  const { doctorerr } = formErrors;
  const { medicineerr } = formErrors;
  const { historyerr } = formErrors;
  const { noteerr } = formErrors;

  const formIsValid = true;

  // validation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCkeditorState = (e, editor) => {
    const data = editor.getData();
    setFormValues({ ...formValues, history: data, note: data });
    // console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    getMasterPatientData();
    getMasterDoctorData();
    getMasterMedicineData();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
      setOpen(true);
      Axios.post(url, {
        date: formValues.date,
        patientid: formValues.patientid,
        doctorid: formValues.doctorid,
        medicineid: formValues.medicineid,
        history: formValues.history,
        note: formValues.note,
        hospital_id:formValues.hospital_id
      }).then((res) => {
        console.log('formValues');
        // alert("Record has been saved successfully");
      });
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const limit = 225;

    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (!values.patientid) {
      errors.patientiderr = 'Patient name  selected';
    } else if (values.patientid.slice(20, limit)) {
      errors.patientiderr = 'Enter the minimum 20 character';
    }
    if (!values.date) {
      errors.date = 'Date is selected';
    }
    if (!values.doctorid) {
      errors.doctorerr = 'Doctor name is  selected';
    } else if (values.doctorid.slice(20, limit)) {
      errors.doctorerr = 'Enter the minimum 20 character';
    }

    if (!values.medicineid) {
      errors.medicineerr = 'Medicine name is selected';
    } else if (values.medicineid.slice(20, limit)) {
      errors.medicineerr = 'Enter the minimum 20 character';
    }
    if (!values.history) {
      errors.historyerr = 'Enter the history';
    } else if (values.history.slice(50, limit)) {
      errors.historyerr = 'Enter the minimum 50 character';
    }
    if (!values.note) {
      errors.noteerr = 'Enter the Note ';
    } else if (values.note.slice(50, limit)) {
      errors.noteerr = 'Enter the minimum 50 character';
    }

    return errors;
  };
  // let data = CKEDITOR.instances.editor1.getData();

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
                      <div className="row">
                        <div className="row justify-content-center">
                             <input
                              type="hidden"
                              value={formValues.hospital_id}/>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">Date</label>
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
                          <div className="col-md-4 form-group mb-4">
                            <label className="info_opd_bold">Patient</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="patientid"
                              name="patientid"
                              onChange={handleChange}
                              className={patientiderr ? ' showError' : ''}
                              value={formValues.patientid}
                            >
                              <option>--select--</option>
                              {masterPatientData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.patient_name}
                                </option>
                              ))}
                            </select>
                            {patientiderr && <div style={{ color: 'red' }}>{patientiderr}</div>}
                          </div>
                          <div className="col-md-4 form-group mb-4">
                            <label className="info_opd_bold">Doctor</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="doctorid"
                              name="doctorid"
                              onChange={handleChange}
                              className={doctorerr ? ' showError' : ''}
                              value={formValues.doctorid}
                            >
                              <option>--select--</option>
                              {masterDoctorData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.doctor_name}
                                </option>
                              ))}
                            </select>
                            {doctorerr && <div style={{ color: 'red' }}>{doctorerr}</div>}
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group mb-4">
                            <label className="info_opd_bold">Medicine</label>

                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="medicineid"
                              name="medicineid"
                              onChange={handleChange}
                              className={medicineerr ? ' showError' : ''}
                              value={formValues.medicineid}
                            >
                              <option>--select--</option>
                              {masterMedicineData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.medicine_name}
                                </option>
                              ))}
                            </select>
                            {medicineerr && <div style={{ color: 'red' }}>{medicineerr}</div>}
                          </div>
                          <div className="col-md-4 form-group mb-4">
                            <label className="info_opd_bold">History</label>
                            <textarea
                              className="form-control"
                              name="history"
                              rows=""
                              required=""
                              value={formValues.history}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.historyerr}</p>
                          </div>

                          <div className="col-md-4 form-group mb-4">
                            <label className="info_opd_bold">Note</label>
                            <textarea
                              className="form-control"
                              name="note"
                              rows=""
                              required=""
                              value={formValues.note}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.noteerr}</p>
                          </div>
                        </div>
                        {/* <div className="row justify-content-center">
                          <div className="App">
                            {inputList.map((x, i) => {
                              // console.log()
                              return (
                                <div className="row justify-content-center">
                                  <div className="col-md-2 form-group ">
                                    <label className="info_opd_bold">Date/Type</label>
                                    <input
                                      name="type"
                                      type="date"
                                      className="form-control"
                                      placeholder="Enter date"
                                      value={x.type}
                                      autoComplete="off"
                                      onChange={(e) => handleInputChange(e, i)}
                                    />
                                  </div>
                                  <div className="col-md-2 form-group ">
                                    <label className="info_opd_bold">Temp P/R</label>
                                    <input
                                      className="form-control"
                                      name="temp"
                                      placeholder="Enter temprature"
                                      value={x.temp}
                                      onChange={(e) => handleInputChange(e, i)}
                                    />
                                  </div>
                                  <div className="col-md-2 form-group ">
                                    <label className="info_opd_bold">Feeding</label>
                                    <input
                                      className="form-control"
                                      name="feeding"
                                      placeholder="Enter feeding"
                                      value={x.feeding}
                                      onChange={(e) => handleInputChange(e, i)}
                                    />
                                  </div>
                                  <div className="col-md-3 form-group ">
                                    <label className="info_opd_bold">Clinical Observations</label>
                                    <input
                                      className="form-control"
                                      name="clinical"
                                      placeholder="Enter Clinical Observations"
                                      value={x.clinical}
                                      onChange={(e) => handleInputChange(e, i)}
                                    />
                                  </div>
                                  <div className="col-md-3 form-group ">
                                    <label className="info_opd_bold">Treatment Medicine Provided</label>
                                    <input
                                      className="form-control"
                                      name="treatment"
                                      placeholder="Enter Treatment"
                                      value={x.treatment}
                                      onChange={(e) => handleInputChange(e, i)}
                                    />
                                  </div>

                                  <div className="btn-box">
                                    {inputList.length !== 1 && (
                                      <button
                                        className="btn btn-danger"
                                        style={{ margin: 10 }}
                                        onClick={() => handleRemoveClick(i)}
                                      >
                                        Remove
                                      </button>
                                    )}
                                    {inputList.length - 1 === i && (
                                      <button
                                        className="btn btn-primary"
                                        style={{ margin: 10 }}
                                        onClick={handleAddClick}
                                      >
                                        Add
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div> */}
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
