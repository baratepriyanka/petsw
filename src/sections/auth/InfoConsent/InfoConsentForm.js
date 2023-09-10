import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import Axios from 'axios';
// @mui
import { Box, Grid } from '@mui/material';
// ----------------------------------------------------------------------

export default function InfoConsentForm() {
  const { consentId } = useParams();
  const [consentEdit, setconsentEdit] = useState([]);

  const getconsentEdit = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-info-consent/${consentId}`);
    setconsentEdit(await response.json());
    // console.log("consentEdit");
    // console.log(consentEdit);
  };
  const [masterGenderData, setMasterGenderData] = useState([]);

  const getMasterGenderData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-gender`);
    setMasterGenderData(await response.json());
    // console.log(masterGenderData);
  };

  const [masterBreedData, setMasterBreedData] = useState([]);

  const getMasterBreedData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-breed`);
    setMasterBreedData(await response.json());
    // console.log(masterBreedData);
  };
  const [masterColorData, setMasterColorData] = useState([]);

  const getMasterColorData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-color`);
    setMasterColorData(await response.json());
    // console.log(masterColorData);
  };

  const [masterStateData, setMasterStateData] = useState([]);

  const getMasterStateData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-state`);
    setMasterStateData(await response.json());
    // console.log(masterStateData);
  };

  const [masterCityData, setMasterCityData] = useState([]);

  const getMasterCityData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-city`);
    setMasterCityData(await response.json());
    // console.log(masterCityData);
  };

  const [masterSpeciesData, setmasterSpeciesData] = useState([]);
  const getMasterSpeciesData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-species`);
    setmasterSpeciesData(await response.json());
  };

  useEffect(() => {
    getMasterGenderData();
    getMasterBreedData();
    getMasterColorData();
    getconsentEdit();
    getMasterSpeciesData();
    // getMasterStateData();
    // getMasterCityData();
  }, []);

  return (
    <>
      <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-5">
            <div className="row">
              {consentEdit.map((curElem) => {
                // console.log(curElem);
                return (
                  <div className="">
                    <form action="" className="did-floating-label-content">
                      <div className="container">
                        <div className="row">
                          <div className="row mb-3">
                            <div className="row justify-content-center mt-3">
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Name of dog receiver/Owner</label>
                                <div>{curElem.ownerName}</div>
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Contact No.</label>
                                <div>{curElem.contractNo}</div>
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Date Of Admission</label>
                                <div>{curElem.dateOfAdmission}</div>
                              </div>
                            </div>
                            <div className="row justify-content-center mt-3">
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Breed</label>
                                <div>{curElem.masterbreed.name}</div>
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Species</label>
                                <div>{curElem.masterspecy.name}</div>
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Color</label>
                                <div>{curElem.mastercolor.name}</div>
                              </div>
                            </div>
                            <div className="row justify-content-center mt-3">
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Age</label>
                                <div>{curElem.age}</div>
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Gender</label>
                                <div>{curElem.mastergender.name}</div>
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Address</label>
                                <div>{curElem.address}</div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <p>
                              I undersigned{' '}
                              <input
                                type="text"
                                name="undersigned"
                                id="undersigned"
                                value={curElem.undersigned}
                                autoComplete="off"
                                className="consentform info_opd_bold text-center"
                              />{' '}
                              taking dog as describe above with my own responsibility after indentification from dog
                              pound with permission from veterinary department.
                            </p>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-3 form-group">
                              <label className="info_opd_bold">Time</label>
                              <div>{curElem.time}</div>
                            </div>
                            <div className="col-md-3 form-group">
                              <label className="info_opd_bold">Id No.</label>

                              <div>{curElem.idNo}</div>
                            </div>
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Vehicle No.</label>
                              <div>{curElem.vehicleNo}</div>
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
