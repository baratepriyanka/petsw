import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Moment from 'moment';
// import { useReactToPrint } from 'react-to-print';
// @mui
import { Box, Grid, Modal, Button, Typography } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import Table from 'react-bootstrap/Table';

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
const butStyle = {
  bgcolor: '#710808',
  justifyContent: 'flex-end',
  display: 'flex',
  float: 'right',
};
export default function InfoOpdForm() {
  const { opdId } = useParams();
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;

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
  const [masterbedNumber, setBedNumber] = useState([]);
  const getBedNumberData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-All-bednumber`
    );
    setBedNumber(await response.json());
  };
  const [imaes, setimaes] = useState([]);
  const getMultipleImages = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-multiple-images/${opdId}`
    );
    const data = await response.json();
    if (data.post.length === 0) {
      setimaes(data.post);
      // console.log(imaes)
    } else {
      setimaes(data.post);
    }
  };

  // data function
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const monthWithOffset = dateNow.getUTCMonth() + 1;
  const month = monthWithOffset.toString().length < 2 ? `0${monthWithOffset}` : monthWithOffset;
  const date = dateNow.getUTCDate().toString().length < 2 ? `0${dateNow.getUTCDate()}` : dateNow.getUTCDate();
  const materialDateInput = `${year}-${month}-${date}`;

  const [opdEdit, setOpdEdit] = useState([]);
  const [AddinputList, setAddinputList] = useState([{ date: '', case_history: '', treatment_medicine: '' }]);
  // handle click event of the Add button
  const getOpdEdit = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-getOneOpdDemo/${opdId}`
    );
    setOpdEdit(await response.json());
    // console.log(response)
  };
  const getOpdAddMore = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-opdAddMore/${opdId}`
    );
    setAddinputList(await response.json());

    // console.log(response.data);
  };
  const [opdEditreport, setopdEditreport] = useState([]);

  const getReportData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-uploadreport-editpage/${opdId}`
    );
    const data = await response.json();
    if (data.length === 0) {
      setopdEditreport(data);
    } else {
      setopdEditreport(data);
    }
  };

  // add more value function
  const [formVal, setFormVal] = useState([
    { date: `${materialDateInput}`, case_history: '', treatment_medicine: '', hospital_id: `${loginId}` },
  ]);
  const addRow = () => {
    setFormVal([
      ...formVal,
      { date: `${materialDateInput}`, case_history: '', treatment_medicine: '', hospital_id: `${loginId}` },
    ]);
  };
  const onRemove = (id) => {
    const newForm = [...formVal];
    newForm.splice(id, 1);
    setFormVal(newForm);
  };
  const formInputChange = {
    case_history: 500,
    treatment_medicine: 500,
  };
  const formInputValiName = {
    case_history: 'case_history',
    treatment_medicine: 'treatment_medicine',
  };
  function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length  === 0) { // check if space is at beginning
      event.preventDefault();
    }
  }
  const handleInputChange = (e, i) => {
    const newForm = [...formVal];
    newForm[i][e.target.name] = e.target.value;
    setFormVal(newForm);
    const value = e.target.value;
    const name = e.target.name;

    if (value) {
      e.target.parentElement.querySelector('p').innerText = '';
      e.target.parentElement.querySelector('p').style.display = 'none';
    } else if (formInputValiName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the ${formInputValiName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    if (formInputChange[name] && value.length > formInputChange[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formInputChange[name]} character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  // const history = useHistory();
  const navigate = useNavigate();
  const handleClose = () => {
    window.location.reload();
    setOpen(false);
  };
  const [profile, setProfile] = useState({
    file: [],
    filepreview: null,
  });

  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const errorRes = formValidation(formVal);
    if (errorRes) {
      const url1 = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-opdAddMore-paitent/${opdId}`;
      const arr = formVal.map((obj) => axios.post(url1, obj, { headers: { 'Access-Control-Allow-Origin': '*' } }));
      const promise = Promise.allSettled(arr).then((data) => {
        // console.log(data);
        handleClose();
      });
    } else {
      // error msg
    }
  }

  const handleCloseBed = (e) => {
    // console.log('close')
    const id = e.target.value;
    // console.log(id)
    axios
      .post(
        `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-openclose-bednumber/${id}`
      ) // <-- remove ;
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
    getReportData();
    getMultipleImages();
    // }
  }, []);
  const formValidation = (formVal) => {
    const data = [...formVal];

    let valid = true;
    for (let index = 0; index < data.length; index += 1) {
      // const element = data[index];
      if (data[index].date === '') {
        data[index].nameCheck = 'Enter date';
        data[index].nameLengthCheck = '';
        valid = false;
      }

      if (data[index].case_history === '') {
        data[index].emailCheck = 'Enter Case history/symptoms';
        data[index].emailFormat = '';
        valid = false;
      }

      if (data[index].treatment_medicine === '') {
        data[index].Check = 'Enter treatment medicine provided';
        data[index].emFormat = '';
        valid = false;
      }
    }
    setFormVal(data);
    return valid;
  };

  // const handleCloseButton = (e) => {
  //   navigate('/dashboard/OPD');
  // };
  // const componentRef = useRef(null);
  // const handlePrint = useReactToPrint({
  // //   content: () => componentRef.current,
  // // });
  // const title = 'petSoftwear';
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  const today1 = `${mm}/${dd}/${yyyy}`;
  const [inputList, setInputList] = useState([
    { date: `${materialDateInput}`, case_history: '', treatment_medicine: '', hospital_id: `${loginId}` },
  ]);

  return (
    <>
      <section className="screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
              <div className="tabledata">
                {opdEdit.map((curElem) => {
                  const date = curElem.dateofadmission;
                  const formatDate = Moment(date).format('MM-DD-YYYY ');
                  return (
                    <div className="table " ref={componentRef}>
                      <div className="">
                        <div className="ml-5">
                          <h2 className="text-center">{title}</h2>
                          <h6 className="text-center">{today1}</h6>
                          <div className="printimg">
                            {profile.filepreview !== null ? (
                              <img className="infoimg" src={profile.filepreview} alt="" />
                            ) : (
                              <img className="infoimg" src={curElem.s3image} alt="" />
                            )}
                          </div>
                          <Table responsive="md" className="table table-class">
                            <thead>
                              <tr>
                                <th className="info_opd_bold" colSpan="2">
                                  Date of Admission
                                </th>
                                <th className="info_opd_bold">Case paper No.</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="">
                                <td colSpan="2">
                                  <span>{formatDate}</span>
                                </td>
                                <td>
                                  <span>{curElem.case_tables[0].case_id}</span>
                                </td>
                              </tr>
                            </tbody>
                            <thead>
                              <tr>
                                <th className="info_opd_bold">Name of the Owner</th>
                                <th className="info_opd_bold" colSpan="2">
                                  Address
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="">
                                <td>
                                  <span>{curElem.parent_name}</span>
                                </td>
                                <td>
                                  <span>{curElem.address}</span>
                                </td>
                              </tr>
                            </tbody>
                            <thead>
                              <tr>
                                <th className="info_opd_bold">Species</th>
                                <th className="info_opd_bold">Breed</th>
                                <th className="info_opd_bold">Colour</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="">
                                <td>
                                  {curElem.masterspecy === null ? (
                                    <div className="">
                                      <span>{''}</span>
                                    </div>
                                  ) : (
                                    <div className="">
                                      <span> {curElem.masterspecy.name}</span>
                                    </div>
                                  )}
                                </td>
                                <td>
                                  {curElem.masterbreed === null ? (
                                    <div className="">
                                      <span>{''}</span>
                                    </div>
                                  ) : (
                                    <div className="">
                                      <span> {curElem.masterbreed.name}</span>
                                    </div>
                                  )}
                                </td>
                                <td>
                                  {curElem.mastercolor === null ? (
                                    <div className="">
                                      <span>{''}</span>
                                    </div>
                                  ) : (
                                    <div className="">
                                      <span>{curElem.mastercolor.name}</span>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                            <thead>
                              <tr>
                                <th className="info_opd_bold">Patient Name</th>
                                <th className="info_opd_bold">Age</th>
                                <th className="info_opd_bold">Gender</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="">
                                <td>
                                  <span> {curElem.patient_name}</span>
                                </td>
                                <td>
                                  {curElem.masterage === null ? (
                                    <div className="">
                                      <span>{''}</span>
                                    </div>
                                  ) : (
                                    <div className="">
                                      <span>{curElem.masterage.age}</span>
                                    </div>
                                  )}
                                </td>
                                <td>
                                  {curElem.mastergender === null ? (
                                    <div className="">
                                      <span>{''}</span>
                                    </div>
                                  ) : (
                                    <div className="">
                                      <span>{curElem.mastergender.name}</span>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                            <thead>
                              <tr>
                                <th className="info_opd_bold">Email</th>
                                <th className="info_opd_bold">Mobile No.</th>
                                <th className="info_opd_bold">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="">
                                <td>
                                  <span> {curElem.email}</span>
                                </td>
                                <td>
                                  <span>{curElem.phone}</span>
                                </td>
                                <td>
                                  <span>{curElem.description}</span>
                                </td>
                              </tr>
                            </tbody>
                            <thead>
                              <tr>
                                <th className="info_opd_bold">State</th>
                                <th className="info_opd_bold">City</th>
                                <th className="info_opd_bold">Pincode</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="">
                                <td>
                                  {curElem.masterstate === null ? (
                                    <div className="">
                                      <span>{''}</span>
                                    </div>
                                  ) : (
                                    <div className="">
                                      <span>{curElem.masterstate.name}</span>
                                    </div>
                                  )}
                                </td>
                                <td>
                                  {curElem.MasterCity === null ? (
                                    <div className="">
                                      <span>{''}</span>
                                    </div>
                                  ) : (
                                    <div className="">
                                      <span>{curElem.MasterCity.name}</span>
                                    </div>
                                  )}
                                </td>
                                <td>
                                  <span>{curElem.pincode}</span>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                          <div className="">
                            <h4>Treatment Prescription</h4>
                          </div>
                          <div className="App">
                            <Table responsive="md" className="table table-class">
                              <thead>
                                <tr>
                                  <th className="info_opd_bold">Date/ Type</th>
                                  <th className="info_opd_bold">Case History /Symptoms</th>
                                  <th className="info_opd_bold">Treatment Medicine Provided</th>
                                </tr>
                              </thead>
                              {AddinputList.map((x, i) => {
                                return (
                                  <tbody>
                                    <tr className="">
                                      <td>
                                        <span>{x.date.substr(0, 10)}</span>
                                      </td>
                                      <td>
                                        <span>{x.case_history}</span>
                                      </td>
                                      <td>
                                        <span>{x.treatment_medicine}</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                );
                              })}
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {opdEdit.map((curElem) => {
                const date = curElem.dateofadmission;
                const formatDate = Moment(date).format('MM-DD-YYYY ');
                return (
                  <div className="mt-2">
                    <div className="container">
                      <div className="row">
                      <div className="row justify-content-end">
                            <div className="col-md-1">
                            <button type="button" id="" className="btn cancelbtn" onClick={handleCloseButton}>
                              Back
                            </button>
                            </div>
                            <div className="col-md-1">
                             {/* <button
                              type="button"
                              style={{ display: 'block' }}
                              className="btn btn-primary"
                              onClick={handlePrint}
                            >
                              Print
                            </button> */}
                            </div>
                           
                            {''}
                           
                          </div>
                        <div className="row">
                          
                          <div className="row justify-content-center">
                            <div className="col-md-4 offset-md-2 col-10 col-sm-6">
                              {profile.filepreview !== null ? (
                                <img className="infoimg" src={profile.filepreview} alt="" />
                              ) : (
                                <div>
                                  <img className="infoimg" src={curElem.s3image} alt="" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row justify-content-between mt-3">
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Date of Admission</label>
                              <div className="mt-2"> {formatDate}</div>
                            </div>
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Case paper No.</label>
                              <div className="mt-2">
                                <span>{curElem.case_tables[0].case_id}</span>
                              </div>
                            </div>
                          </div>

                          <div className="row justify-content-center  mt-3">
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Name of the Owner</label>
                              <div className="mt-2">
                                <span>{curElem.parent_name}</span>
                              </div>
                            </div>
                            <div className="col-md-8 form-group">
                              <label className="info_opd_bold">Address</label>
                              <div className="description-box">
                                <span>{curElem.address}</span>
                              </div>
                            </div>
                          </div>
                          <div className="row justify-content-center mt-3">
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Species</label>
                              {curElem.masterspecy === null ? (
                                <div className="">
                                  <span>{''}</span>
                                </div>
                              ) : (
                                <div className="">
                                  <span> {curElem.masterspecy.name}</span>
                                </div>
                              )}
                            </div>
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Breed</label>
                              {curElem.masterbreed === null ? (
                                <div className="">
                                  <span>{''}</span>
                                </div>
                              ) : (
                                <div className="">
                                  <span> {curElem.masterbreed.name}</span>
                                </div>
                              )}
                            </div>
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Colour</label>
                              {curElem.mastercolor === null ? (
                                <div className="">
                                  <span>{''}</span>
                                </div>
                              ) : (
                                <div className="">
                                  <span>{curElem.mastercolor.name}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row justify-content-center mt-3">
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Patient Name</label>
                              <div className="mt-2">
                                <span> {curElem.patient_name}</span>
                              </div>
                            </div>

                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Age</label>
                              {curElem.masterage === null ? (
                                <div className="">
                                  <span>{''}</span>
                                </div>
                              ) : (
                                <div className="">
                                  <span>{curElem.masterage.age}</span>
                                </div>
                              )}
                            </div>
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Gender</label>
                              {curElem.mastergender === null ? (
                                <div className="">
                                  <span>{''}</span>
                                </div>
                              ) : (
                                <div className="">
                                  <span>{curElem.mastergender.name}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="row justify-content-center mt-3">
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                              <label className="info_opd_bold">Email</label>
                              <div className="">
                                <span>{curElem.email}</span>
                              </div>
                            </div>
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Mobile No.</label>
                              <div className="">
                                <span>{curElem.phone}</span>
                              </div>
                            </div>
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Description</label>
                              <div className="description-box">
                                <span>{curElem.description}</span>
                              </div>
                            </div>
                          </div>

                          <div className="row justify-content-center mt-3">
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">State</label>
                              {curElem.masterstate === null ? (
                                <div className="">
                                  <span>{''}</span>
                                </div>
                              ) : (
                                <div className="">
                                  <span>{curElem.masterstate.name}</span>
                                </div>
                              )}
                            </div>
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">City</label>
                              {curElem.MasterCity === null ? (
                                <div className="">
                                  <span>{''}</span>
                                </div>
                              ) : (
                                <div className="">
                                  <span>{curElem.MasterCity.name}</span>
                                </div>
                              )}
                            </div>

                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Pincode</label>
                              <div className="">
                                <span>{curElem.pincode}</span>
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
                        <div className="mt-5 mb-2">
                          <h4 className="fw-bold">Treatment Prescription</h4>
                        </div>
                        <div className="App mt-3">
                          <Table responsive="md" className="table table-class">
                            <thead>
                              <tr>
                                <th className="info_opd_bold">Date/ Type</th>
                                <th className="info_opd_bold">Case History /Symptoms</th>
                                <th className="info_opd_bold">Treatment Medicine Provided</th>
                              </tr>
                            </thead>
                            {AddinputList.map((x, i) => {
                              return (
                                <tbody>
                                  <tr className="">
                                    <td >
                                      <div style={{width: '104px'}}>{x.date.substr(0, 10)}</div>
                                    </td>
                                    <td className="">
                                      <div className="td-width">{x.case_history}</div>
                                    </td>
                                    <td className="">
                                      <div className="td-width">{x.treatment_medicine}</div>
                                    </td>
                                  </tr>
                                </tbody>
                               
                              );
                            })}
                          </Table>
                        </div>
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
                      <div className="info-opdApp">
                        <Table responsive="sm" className="table table-class">
                          <thead>
                            <tr>
                              <th className="">
                                Date / Type<span className="man_filed">*</span>
                              </th>
                              <th className="">
                                Case History/Symptoms<span className="man_filed">*</span>
                              </th>
                              <th className="">
                                Treatment Medicine Provided<span className="man_filed">*</span>
                              </th>
                            </tr>
                          </thead>
                          {formVal.map((item, i) => (
                            <tbody>
                              <tr className="">
                                <td>
                                  <input
                                    type="date"
                                    name="date"
                                    className="form-control"
                                    placeholder="Enter Date"
                                    value={item.date}
                                    autoComplete="off"
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                  {/* {item.date === '' ? (
                                    <div style={{ color: 'red' }}>
                                      {item.nameCheck} {item.nameLengthCheck}
                                    </div>
                                  ) : (
                                    ''
                                  )} */}
                                  <p style={{ color: 'red' }}>
                                    {item.nameCheck} {item.nameLengthCheck}
                                  </p>
                                </td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    name="case_history"
                                    placeholder="Enter Case history/Symptoms"
                                    value={item.case_history}
                                    onChange={(e) => handleInputChange(e, i)}
                                    onKeyDown={handleKeyDown}
                                  />
                                  {/* {item.case_history === '' ? (
                                    <div style={{ color: 'red' }}>
                                      {item.emailCheck} {item.emailFormat}
                                    </div>
                                  ) : (
                                    ''
                                  )} */}
                                  <p style={{ color: 'red' }}>
                                    {item.emailCheck} {item.emailFormat}
                                  </p>
                                </td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    name="treatment_medicine"
                                    placeholder="Enter Treatment Medicine Provided"
                                    value={item.treatment_medicine}
                                    onChange={(e) => handleInputChange(e, i)}
                                    onKeyDown={handleKeyDown}
                                  />
                                  {/* {item.treatment_medicine === '' ? (
                                    <div style={{ color: 'red' }}>
                                      {item.Check} {item.emFormat}
                                    </div>
                                  ) : (
                                    ''
                                  )} */}
                                  <p style={{ color: 'red' }}>
                                    {item.Check} {item.emFormat}
                                  </p>
                                </td>
                                <td>
                                  {/* {i === 0 ? (
                                    ''
                                  ) : (
                                    <DeleteIcon
                                      onClick={() => onRemove(i)}
                                      sx={{ color: 'red', cursor: 'pointer', mt: 2 }}
                                    />
                                  )} */}
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </Table>
                      </div>

                      <div className="App modelhidden">
                        {formVal.map((item, i) => (
                          <div className="row justify-content-center">
                            <input type="hidden" value={item.hospital_id} />
                            <div className="col-md-3 form-group ">
                              <label className="info_opd_bold">
                                Date / Type<span className="man_filed">*</span>
                              </label>
                              <input
                                type="date"
                                name="date"
                                className="form-control"
                                placeholder="Enter Date"
                                value={item.date}
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <div style={{ color: 'red' }}>
                                {item.nameCheck} {item.nameLengthCheck}
                              </div>
                            </div>
                            <div className="col-md-3 form-group ">
                              <label className="info_opd_bold">
                                Case history/Symptoms<span className="man_filed">*</span>
                              </label>
                              <textarea
                                className="form-control"
                                name="case_history"
                                placeholder="Enter Case history/Symptoms"
                                value={item.case_history}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <div style={{ color: 'red' }}>
                                {item.emailCheck} {item.emailFormat}
                              </div>
                            </div>
                            <div className="col-md-3 form-group ">
                              <label className="info_opd_bold">
                                Treatment Medicine Provided<span className="man_filed">*</span>
                              </label>
                              <textarea
                                className="form-control"
                                name="treatment_medicine"
                                placeholder="Enter Treatment Medicine Provided"
                                value={item.treatment_medicine}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <div style={{ color: 'red' }}>
                                {item.Check} {item.emFormat}
                              </div>
                            </div>
                            <div className="col-md-2">
                              {/* {i === 0 ? (
                                ''
                              ) : (
                                // <DeleteIcon
                                  onClick={() => onRemove(i)}
                                  sx={{ color: 'red', cursor: 'pointer', mt: 2 }}
                                />
                              )} */}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <button type="button" className="btn btn-primary" style={{ margin: 10 }} onClick={addRow}>
                          Add More
                        </button>
                      </div>
                      <div className="text-end" style={{marginRight: '22px'}}>
                        <button type="submit" id="" className="btn btn-primary savebtn">
                          Save
                        </button>

                        <button type="button" id="" className="btn cancelbtn" onClick={handleClose}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </Box>
                </Modal>
              </div>
                        <div className="mt-1 mb-5">
                <div className="row mt-3">
                  <h4 className="fw-bold">Test Report</h4>
                  {opdEditreport.length === 0 ? (
                    <small>No Report Uploaded Here</small>
                  ) : (
                    <div className="row">
                      {opdEditreport.map((elm) => {
                        // console.log(elm.img_url_type);
                        return (
                          <div className="col-md-2 mb-2">
                            {elm.img_url_type === '2' ? (
                              <div className="">
                                <div className="text-center">
                                  <div className="mt-1">
                                    <a href={elm.s3_url} target="_blank" rel="noopener noreferrer" className="">
                                      {' '}
                                      <i className="fas fa-file-pdf pdf-icon" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="">
                                <div className="zoomdiv">
                                  <div className="repodrt_file zoom">
                                    <img className="zoom" src={elm.s3_url} alt="" />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                        </div>
                        <div className="mt-1 mb-5">
                          <div className="multipeimgrow mt-3">
                            <h4 className="fw-bold">Images</h4>
                            {imaes.length === 0 ? (
                              <small>No Images Uploaded Here</small>
                            ) : (
                              <div className="container">
                                <div className="row">
                                  {imaes.map((item) => {
                                    return (
                                      // <div className="col-md-3">
                                      //   <div className="zoom-muldiv-opd">
                                      //     <div className="zoom-mul-opd">
                                      //       <img className="zoom-mul-opd" src={item.s3image} alt="UploadImage" />
                                      //     </div>
                                      //   </div>
                                      // </div>
                                      <div className="col-md-4">
                                        <div className="image mb-2">
                                          {' '}
                                          <img src={item.s3image} alt="" />{' '}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>    
                      </div>
                    </div>
                    {/* </form> */}
                  </div>
                );
              })}

              
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
