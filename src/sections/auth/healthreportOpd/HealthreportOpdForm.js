import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Moment from 'moment';
// @mui
import { Box, Grid, Modal, Button, Typography } from '@mui/material';
// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 1700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};
const butStyle={
  bgcolor: '#710808' ,
  justifyContent: 'flex-end' ,
  display: 'flex',
  float: 'right'
}
export default function HealthInfoOpdForm() {
  const { opdId } = useParams();
  const [masterGenderData, setMasterGenderData] = useState([]);
  const getMasterGenderData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-gender`
    );
    setMasterGenderData(await response.json());
  };

  const [masterBreedData, setMasterBreedData] = useState([]);
  const getMasterBreedData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-breed`
    );
    setMasterBreedData(await response.json());
  };

  const [masterColorData, setMasterColorData] = useState([]);
  const getMasterColorData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-color`
    );
    setMasterColorData(await response.json());
  };

  const [masterStateData, setMasterStateData] = useState([]);
  const getMasterStateData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-state`
    );
    setMasterStateData(await response.json());
  };

  const [masterCityData, setMasterCityData] = useState([]);
  const getMasterCityData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-city`
    );
    setMasterCityData(await response.json());
  };

  const [masterSpeciesData, setmasterSpeciesData] = useState([]);
  const getMasterSpeciesData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-species`
    );
    setmasterSpeciesData(await response.json());
  };
  const[masterbedNumber, setBedNumber] = useState([]);
  const getBedNumberData =async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-All-bednumber`)
    setBedNumber(await response.json());
  }

  const [opdEdit, setOpdEdit] = useState([]);

  const [AddinputList, setAddinputList] = useState([{ date_type: '', case_history: '', trea_medicine_adv: '' }]);
  const [inputList, setinputList] = useState([{ date_type: '', case_history: '', trea_medicine_adv: '' }]);

  // handle click event of the Add button

  const getOpdEdit = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-getOneOpdDemo/${opdId}`
    );
    setOpdEdit(await response.json());
    // console.log(response)
  };
  const getOpdAddMore = async () => {
    // const response = await fetch(
    //   `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-opdAddMore/${opdId}`
    // );
    // setAddinputList(await response.json());
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-ipdAddMore/${opdId}`
    );
    setAddinputList(await response.json());
    // console.log(response.data);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setinputList([...inputList, { date_type: '', case_history: '', trea_medicine_adv: '' }]);
  };

  // validation
  const [formErrors, setFormErrors] = useState([{ date_type: '', case_history: '', trea_medicine_adv: '' }]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  // const history = useHistory();
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const [profile, setProfile] = useState({
    file: [],
    filepreview: null,
  });
  const onSubmit = (e) => {
  e.preventDefault();
    // if (inputList.length < -1) {
    //  console.log('Please select')
    // } else if(inputList.length === 1) {
      const url1 = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-opdAddMore-paitent/${opdId}`;
          const arr = inputList.map((obj) => axios.post(url1, obj, { headers: { 'Access-Control-Allow-Origin': '*' } }));
          const promise = Promise.allSettled(arr).then((data) => {
            setOpen(false);
            navigate('/dashboard/OPD');
          });
     
    // }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if(inputList.length < -1){
  //     console.log('Please fill the information')
  //    }
    // const url1 = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-opdAddMore-paitent/${opdId}`;
    //     const arr = inputList.map((obj) => axios.post(url1, obj, { headers: { 'Access-Control-Allow-Origin': '*' } }));
    //     const promise = Promise.allSettled(arr).then((data) => {
    //       setOpen(false);
    //       navigate('/dashboard/OPD');
    //     });
   
  // };
  async function handleSubmit(e) {
    e.preventDefault();
 
    const url1 = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-ipdAddMore-paitent/${opdId}`;
      const arr = inputList.map((obj) => axios.post(url1, obj, { headers: { 'Access-Control-Allow-Origin': '*' } }));
      const promise = Promise.allSettled(arr).then((data) => {
        // setOpen(false);
        // navigate('/dashboard/OPD');
      });
      window.location.reload();
  }
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const url1 =`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-ipdAddMore-paitent/${opdId}`;
  //   const arr = inputList.map((obj) => axios.post(url1, obj, { headers: { 'Access-Control-Allow-Origin': '*' } }));
  //   const promise = Promise.allSettled(arr).then((data) => {
  //     setOpen(false);
  //     navigate('/dashboard/OPD');
  //   });
  // }



  const  handleCloseBed = (e) => {
    // console.log('close')
    const id = e.target.value;
    // console.log(id)
    axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-openclose-bednumber/${id}`) // <-- remove ;
      .then((res) => {
        navigate('/dashboard/OPD');
      });
  };

  useEffect(() => {
    getOpdEdit();
    getOpdAddMore();
    getMasterGenderData();
    getMasterBreedData();
    getMasterColorData();
    getMasterStateData();
    getMasterCityData();
    getMasterSpeciesData();
 
   
    // }
  }, []);

 
  return (
    <>
      <section className="screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
              {opdEdit.map((curElem) => {
                // console.log(curElem);
                // const closeId = curElem.bed.id;
                // const butColor= curElem.bed.in_used;
                const date = curElem.dateofadmission;
                const formatDate = Moment(date).format('DD-MM-YYYY');
                return (
                  <div className="">
                    {/* <form action="" className="did-floating-label-content"> */}
                    <div className="container">
                      <div className="row">
                        <div className="row">
                       
                        {/* <div className="text-end">
                           
                        { butColor === '1' ? (
                           <button type="button" className="btn btn-success" value={closeId} onClick={handleCloseBed}>Close Case</button>
                          ) : (
                            <button type="button" className="btn btn-danger" value={closeId} onClick={handleCloseBed}>Open Case</button>
                          )}

                          </div> */}
                          <div className="row justify-content-center">
                            <div className="col-md-4 offset-md-2">
                              {profile.filepreview !== null ? (
                                <img className="infoimg" src={profile.filepreview} alt="" />
                              ) : (
                                <img className="infoimg" src={curElem.s3image} alt="" />
                              )}
                            </div>
                          </div>
                          <div className="row justify-content-between mt-3">
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Date of Admission</label>
                              <div className="mt-2">{formatDate}</div>
                            </div>
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Patient ID</label>
                              <div className="mt-2"><span>{curElem.Patient_id}</span></div>
                            </div>
                            {/* <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Bed/Case ID</label>
                              <div className="mt-2"> <span> {curElem.cage_id} </span></div>
                            </div> */}
                          </div>
                        
                          <div className="row justify-content-center  mt-3">
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Parent Name</label>
                              <div className="mt-2">
                                <span>{curElem.parent_name}</span>
                              </div>
                            </div>

                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Patient Name</label>
                              <div className="mt-2">
                                <span> {curElem.patient_name}</span>
                              </div>
                            </div>

                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Patient Age</label>
                              <div className="mt-2">
                                <span>{curElem.age}</span>
                              </div>
                            </div>
                          </div>
                          <div className="row justify-content-center mt-3">
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Species</label>
                              <div className="">
                                <span>{curElem.masterspecy.name}</span>

                                {/* {masterSpeciesData.map((curElem) => (
                                    <p key={curElem.id} value={curElem.id}>
                                      {curElem.name}
                                    </p>
                                  ))} */}
                              </div>
                            </div>

                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Breed</label>
                              <div className="">
                                <span> {curElem.masterbreed.name}</span>

                                {/* {masterBreedData.map((curElem) => (
                                    <div key={curElem.id} value={curElem.id}>
                                      <p>{curElem.name}</p>
                                    </div>
                                  ))} */}
                              </div>
                            </div>
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Color</label>
                              <div className="">
                                <span>{curElem.mastercolor.name}</span>

                                {/* {masterColorData.map((curElem) => (
                                    <p key={curElem.id} value={curElem.id}>
                                      {curElem.name}
                                    </p>
                                  ))} */}
                              </div>
                            </div>
                          </div>
                          <div className="row justify-content-center mt-3">
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Gender</label>
                              <div className="">
                                <span>{curElem.mastergender.name}</span>

                                {/* {masterGenderData.map((curElem) => (
                                    <option key={curElem.id} value={curElem.id}>
                                      {curElem.name}
                                    </option>
                                  ))} */}
                              </div>
                            </div>

                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">WhatsApp</label>
                              <div className="">
                                <span>{curElem.whatsapp}</span>
                              </div>
                            </div>

                            <div className="col-md-4 form-group mt-3 mt-md-0">
                              <label className="info_opd_bold">Address</label>
                              <div className="">
                                <span>{curElem.address}</span>
                              </div>
                            </div>
                          </div>

                          <div className="row justify-content-center mt-3">
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">City</label>
                              <div className="">
                                <span>{curElem.MasterCity.name}</span>

                                {/* {masterCityData.map((curElem) => (
                                    <p key={curElem.id} value={curElem.id}>
                                      {curElem.name}
                                    </p>
                                  ))} */}
                              </div>
                            </div>
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">State</label>
                              <div className="">
                                <span>{curElem.masterstate.name}</span>
                              </div>
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                              <label className="info_opd_bold">Email</label>
                              <div className="">
                                <span>{curElem.email}</span>
                              </div>
                            </div>
                          </div>

                          <div className="row justify-content-center mt-3">
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Phone</label>
                              <div className="">
                                <span>{curElem.phone}</span>
                              </div>
                            </div>

                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Pincode</label>
                              <div className="">
                                <span>{curElem.pincode}</span>
                              </div>
                            </div>
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Description</label>
                              <div className="description-box">
                                <span>{curElem.description}</span>

                                {/* <textarea className="form-control" rows="10" name="description" required="">{curElem.description}</textarea> */}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="App mt-3">
                          {AddinputList.map((x, i) => {
                            // console.log(x)
                            return (
                              <div className="row justify-content-center mt-3">
                                <div className="col-md-4 form-group ">
                                  <label className="info_opd_bold">Date/Type</label>
                                  <div className="">
                                    <span>{x.date_type}</span>
                                  </div>
                                </div>
                                <div className="col-md-4 form-group ">
                                  <label className="info_opd_bold">Case history/Symptoms</label>
                                  <div className="">
                                    <span>{x.case_history}</span>
                                  </div>
                                </div>
                                <div className="col-md-4 form-group ">
                                  <label className="info_opd_bold">Treatment Medicine Provided</label>
                                  <div className="">
                                    <span>{x.trea_medicine_adv}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div> */}
                        <div className="App mt-3">
                          {AddinputList.map((x, i) => {
                            return (
                              <div className="row justify-content-center mt-3">
                                <div className="col-md-2 form-group ">
                                  <label className="info_opd_bold">Date/Type</label>
                                  <div>
                                    <span>{x.type}</span>
                                  </div>

                                  {/* <input
                                      name="type"
                                      className="form-control"
                                      placeholder="Enter First Name"
                                      value={x.type}
                                      autoComplete="off"
                                      onChange={(e) => handleInputChange(e, i)}
                                    /> */}
                                </div>
                                <div className="col-md-2 form-group ">
                                  <label className="info_opd_bold">Temp P/R</label>
                                  <div>
                                    <span>{x.temp}</span>
                                  </div>
                                  {/* <input
                                      className="form-control"
                                      name="temp"
                                      placeholder="Enter Last Name"
                                      value={x.temp}
                                      onChange={(e) => handleInputChange(e, i)}
                                    /> */}
                                </div>
                                <div className="col-md-2 form-group ">
                                  <label className="info_opd_bold">Feeding</label>
                                  <div>
                                    <span>{x.feeding}</span>
                                  </div>
                                  {/* <input
                                      className="form-control"
                                      name="feeding"
                                      placeholder="Enter Last Name"
                                      value={x.feeding}
                                      onChange={(e) => handleInputChange(e, i)}
                                    /> */}
                                </div>
                                <div className="col-md-3 form-group ">
                                  <label className="info_opd_bold">Clinical Observations</label>
                                  <div>
                                    <span>{x.clinical}</span>
                                  </div>
                                  {/* <input
                                      className="form-control"
                                      name="clinical"
                                      placeholder="Enter Last Name"
                                      value={x.clinical}
                                      onChange={(e) => handleInputChange(e, i)}
                                    /> */}
                                </div>
                                <div className="col-md-3 form-group ">
                                  <label className="info_opd_bold">Treatment Medicine Provided</label>
                                  <div>
                                    <span>{x.treatment}</span>
                                  </div>
                                  {/* <input
                                      className="form-control"
                                      name="treatment"
                                      placeholder="Enter Last Name"
                                      value={x.treatment}
                                      onChange={(e) => handleInputChange(e, i)}
                                    /> */}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    {/* </form> */}
                  </div>
                );
              })}

              {/* <div className="text-end py-4">
                <button type="button" className="btn btn-primary" onClick={handleOpen}>
                  Add Treatment
                </button>
                <Modal
                  open={open}
                  // onClick={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <form className="mt-4 mb-4" onSubmit={onSubmit}>
                      <div className="App">
                        {inputList.map((x, i) => {
                          return (
                            <div className="row justify-content-center">
                              <div className="col-md-3 form-group ">
                                <label className="info_opd_bold">Date/Type</label>
                                <input
                                  type="date"
                                  name="date_type"
                                  className="form-control"
                                  placeholder="Enter Date"
                                  value={x.date_type}
                                  autoComplete="off"
                                  onChange={(e) => handleInputChange(e, i)}
                                />
                              
                              </div>
                              <div className="col-md-4 form-group ">
                                <label className="info_opd_bold">Case history/Symptoms</label>
                                <input
                                  className="form-control"
                                  name="case_history"
                                  placeholder="Enter Case history/Symptoms"
                                  value={x.case_history}
                                  onChange={(e) => handleInputChange(e, i)}
                                />
                                
                              </div>
                              <div className="col-md-5 form-group ">
                                <label className="info_opd_bold">Treatment Medicine Provided</label>
                                <input
                                  className="form-control"
                                  name="trea_medicine_adv"
                                  placeholder="Enter Treatment and Medicine Advised"
                                  value={x.trea_medicine_adv}
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
                                  <button className="btn btn-primary" style={{ margin: 10 }} onClick={handleAddClick}>
                                    Add
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                     <div className="text-end py-4"> 
                     <button  type="submit" id="" className="btn btn-primary savebtn">
                       Save
                      </button>
                      <button type="submit" id="" className="btn  cancelbtn"  onClick={handleClose}>
                      Cancel
                      </button>
                      </div>
                    </form>
                  </Box>
                </Modal>
              </div> */}
                <div className="text-end py-4">
                <button type="button" className="btn btn-primary" onClick={handleOpen}>
                  Add Treatment
                </button>
                <Modal
                  open={open}
                  // onClick={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                  <form className="mt-4 mb-4" onSubmit={handleSubmit}>
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
                                  <button className="btn btn-primary" style={{ margin: 10 }} onClick={handleAddClick}>
                                    Add
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="text-end py-4">
                        <button type="submit" id="" className="btn btn-primary savebtn">Save</button>
                     
                        <button type="submit" id="" className="btn cancelbtn" onClick={handleClose}>Cancel</button>
                      </div>
                  </form>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
