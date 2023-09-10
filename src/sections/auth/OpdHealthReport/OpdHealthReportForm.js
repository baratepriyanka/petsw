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
  const { healthReportId } = useParams();
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
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-multiple-images/${healthReportId}`
    );
    setimaes(await response.json());
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
  // const [inputList, setinputList] = useState([
  //   { date: `${materialDateInput}`, case_history: '', treatment_medicine: '', hospital_id: `${loginId}` },
  // ]);

  // handle click event of the Add button

  const getOpdEdit = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-getOneOpdDemo/${healthReportId}`
    );
    setOpdEdit(await response.json());
    // console.log(response)
  };
  const getOpdAddMore = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-opdAddMore/${healthReportId}`
    );
    setAddinputList(await response.json());

    // console.log(response.data);
  };
  const [opdEditreport, setopdEditreport] = useState([]);

  const getReportData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-uploadreport-editpage/${healthReportId}`
    );
    setopdEditreport(await response.json());

    // console.log(response.data);
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
  const handleInputChange = (e, i) => {
    const newForm = [...formVal];
    newForm[i][e.target.name] = e.target.value;
    setFormVal(newForm);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  // const history = useHistory();
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  const [profile, setProfile] = useState({
    file: [],
    filepreview: null,
  });

  const [loading, setLoading] = useState(false);
  
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

 
  const handleCloseButton = (e) => {
    navigate('/dashboard/Report');
  };
  const componentRef = useRef(null);
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });
  const title = 'petSoftwear';
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
            
              {/* <div className="col-md-1 col-3">
                <button type="button" style={{ display: 'block' }} className="btn btn-primary" onClick={handlePrint}>
                  Print
                </button>
              </div> */}
              
              {opdEdit.map((curElem) => {
                const date = curElem.dateofadmission;
                const formatDate = Moment(date).format('MM-DD-YYYY');
                return (
                  <div className=" mt-2">
                    {/* <form action="" className="did-floating-label-content"> */}
                    <div className="container">
                      <div className="row">
                      <div className="text-end">
                        <button type="button" id="" className="btn cancelbtn" onClick={handleCloseButton}>
                          Back
                        </button>
                      </div>
                        <div className="row">
                          <div className="row justify-content-start mt-3">
                            <div className="col-md-8 form-group">
                              <label className="info_opd_bold">Name of dog receiver/Owner</label>
                              <div className="mt-2">
                                <span>{curElem.parent_name}</span>
                              </div>
                            </div>
                          
                          </div>
                          <div className="row justify-content-center  mt-3">
                          <div className="col-md-6 form-group">
                              <label className="info_opd_bold">Date of Admission</label>
                              <div className="mt-1"> {formatDate}</div>
                            </div>
                            <div className="col-md-6 form-group">
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
                              {/* <div className="">
                                <span> {curElem.masterbreed.name}</span>
                              </div> */}
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
                          <div className="row justify-content-start mt-3">
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
                        </div>
                        <div className="mt-5 mb-2">
                          <h4>Treatment Prescription</h4>
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
                               const date1 = x.date;
                               const formatDate = Moment(date1).format('MM-DD-YYYY');
                              return (
                                <tbody>
                                  <tr className="">
                                    <td>
                                      <div style={{width:'104px;'}}>{formatDate}</div>
                                    </td>
                                    <td>
                                      <div className='prehealopdtd-width'>{x.case_history}</div>
                                    </td>
                                    <td>
                                      <div className='prehealopdtd-width'>{x.treatment_medicine}</div>
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
          </div>
        </div>
      </section>
    </>
  );
}
