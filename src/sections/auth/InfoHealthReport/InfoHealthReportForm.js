import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import axios from 'axios';
// @mui
import { Box, Grid } from '@mui/material';
// ----------------------------------------------------------------------

export default function EditHealthReportForm() {
  const { healthReportId } = useParams();

  const [masterGenderData, setMasterGenderData] = useState([]);

  const getMasterGenderData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-gender`);
    setMasterGenderData(await response.json());
    console.log(masterGenderData);
  };

  const [masterBreedData, setMasterBreedData] = useState([]);

  const getMasterBreedData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-breed`);
    setMasterBreedData(await response.json());
    console.log(masterBreedData);
  };
  const [masterColorData, setMasterColorData] = useState([]);

  const getMasterColorData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-color`);
    setMasterColorData(await response.json());
    console.log(masterColorData);
  };

  const [masterStateData, setMasterStateData] = useState([]);

  const getMasterStateData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-state`);
    setMasterStateData(await response.json());
   
  };

  const [masterCityData, setMasterCityData] = useState([]);

  const getMasterCityData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-city`);
    setMasterCityData(await response.json());
   
  };

  const [masterSpeciesData, setmasterSpeciesData] = useState([]);
  const getMasterSpeciesData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-species`);
    setmasterSpeciesData(await response.json());
  };

  // const url = `http://localhost:8086/web/updatepatient/${healthReportId}`;

  const [healthReportEdit, setHealthReportEdit] = useState([]);

  const getHealthReportEdit = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-getOneOpdDemo/${healthReportId}`);
    setHealthReportEdit(await response.json());
  };
  useEffect(() => {
    // async function getHealthReportEdit() {
    //  try {
    //   const response = await axios.get(`http://localhost:8086/web/get-one-health-report/${healthReportId}`)
    //   console.log(response.data);
    //   setHealthReportEdit(response.data);
    //  } catch (error) {
    //   console.log("Something is Wrong");
    //  }
    // }
    getHealthReportEdit();
    getMasterGenderData();
    getMasterBreedData();
    getMasterColorData();
    getMasterStateData();
    getMasterCityData();
    getMasterSpeciesData();
    
  }, []);


 
  return (
    <>
      <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
             {
              healthReportEdit.map((curElem) => {
                // console.log(curElem); 
           
                return (
                  <div className="">
                    <form action="" className="did-floating-label-content">
                      <div className="container">
                        <div className="row">
                          <div className="row" key={curElem.id}>
                            <div className="row mb-3">
                              <div className="row justify-content-between mt-3">
                                <div className="col-md-7 form-group">
                                  <label className="info_opd_bold">Name of dog receiver/Owner</label>
                                  <div>
                                    <span>{curElem.parent_name}</span></div>
                                </div>
                                <div className="col-md-3 form-group">
                                  <label className="info_opd_bold">Contract No.</label>
                                  <div><span>{curElem.contractNo}</span></div>
                                </div>
                              </div>
                              <div className="row justify-content-center mt-3">
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Date Of Admission</label>
                                  <div><span>{curElem.dateofadmission}</span></div>
                                </div>
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Date Of Release</label>
                                  <div><span>{curElem.dateOfRelease}</span></div>
                                </div>
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Address</label>
                                  <div><span>{curElem.address}</span></div>
                                </div>
                              </div>
                              <div className="row justify-content-center mt-3">
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Breed</label>
                                  <div><span>{curElem.masterbreed.name}</span></div>
                                </div>
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Species</label>
                                  <div><span>{curElem.masterspecy.name}</span>
                                  </div>
                                </div>
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Color</label>
                                  <div><span>{curElem.mastercolor.name}</span></div>
                                </div>
                              </div>
                              <div className="row justify-content-start mt-3">
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Age</label>
                                  <div><span>{curElem.age}</span></div>
                                </div>
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Gender</label>
                                  <div><span>{curElem.mastergender.name}</span></div>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="row mb-3">
                                <label className="col-sm-6 info_opd_bold">
                                  H/o:This is to be certified that dog was suffering from:-
                                </label>
                                <div className="col-sm-6">
                                  {/* <div>{curElem.diseases}</div> */}
                                  <div className="description-box">
                               <span>{curElem.diseases}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="row mb-3">
                                <label className="col-sm-6 info_opd_bold">Treatment Given:-</label>
                                <div className="col-sm-6">
                                  {/* <div>{curElem.treatment}</div> */}
                                  <div className="description-box">
                              <span>{curElem.treatment}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <label className="col-sm-6 info_opd_bold">Animal:-</label>
                                <div className="col-sm-6">
                                  {/* <div>{curElem.animal}</div> */}
                                  <div className="description-box">
                              <span>{curElem.animal}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-md-3 form-group">
                                <label className="info_opd_bold">Time of Release</label>
                                <div>{curElem.releaseTime}</div>
                              </div>
                              <div className="col-md-3 form-group">
                                <label className="info_opd_bold">Date</label>
                                <div>{curElem.dateOfAdmission}</div>
                              </div>
                              <div className="col-md-3 form-group">
                                <label className="info_opd_bold">Name Of Veterinary Doctor</label>
                                <div>{curElem.veterinaryDoctor}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
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
