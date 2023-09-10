import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Moment from 'moment';
// @mui
import { Box, Grid } from '@mui/material';
// ----------------------------------------------------------------------

export default function EditDeathReportForm() {
  const { deathReportId } = useParams();

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
  const [deathReportEdit, setDeathReportEdit] = useState([]);
  const getDeathReportEdit = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-ipdOpd-Deathreport/${deathReportId}`
    );
    setDeathReportEdit(await response.json());
  };
  const navigate = useNavigate();
  const handleCloseButton = (e) => {
    navigate('/dashboard/DeathReport');
  };
  useEffect(() => {
    getDeathReportEdit();
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
              {deathReportEdit.map((curElem) => {
                // console.log(curElem)

                const dateSpl = curElem.dateofadmission;
                const changeDate = Moment(dateSpl).format('DD-MM-YYYY');
                const dateRelea = curElem.date_of_release;
                const dateRelease = Moment(dateRelea).format('DD-MM-YYYY');
               
               const dateTime =curElem.deathreports[0].date_of_release;
               const changeDateTime= Moment(dateTime).format('HH:mm A');
              //  console.log(changeDateTime);
                return (
                  <div className="">
                    <form action="" className="did-floating-label-content">
                      <div className="container">
                        <div className="row">
                          <div className="text-end">
                            <button type="button" id="" className="btn cancelbtn" onClick={handleCloseButton}>
                              Back
                            </button>
                          </div>
                          <div className="row">
                            <div className="row mb-3">
                              <div className="row justify-content-start mt-3">
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Name of dog receiver/Owner</label>
                                  <div>
                                    <span>{curElem.parent_name}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="row justify-content-start mt-3">
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Date Of Admission</label>
                                  <div>{curElem.dateofadmission === null ? '' : <span>{changeDate}</span>}</div>
                                </div>
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Contact No.</label>
                                  <div>
                                    {curElem.deathreports[0] === null ? (
                                      <div>
                                        <span>{''}</span>
                                      </div>
                                    ) : (
                                      <div>
                                        <span>{curElem.deathreports[0].contract_no}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="row justify-content-center mt-3">
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Species</label>
                                  <div>
                                    {curElem.masterspecy === null ? (
                                      <div>
                                        <span>{''}</span>
                                      </div>
                                    ) : (
                                      <div>
                                        <span>{curElem.masterspecy.name}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Breed</label>
                                  <div>
                                    {curElem.masterbreed === null ? (
                                      <div>
                                        <span>{''}</span>
                                      </div>
                                    ) : (
                                      <div>
                                        <span>{curElem.masterbreed.name}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Color</label>
                                  <div>
                                    {curElem.mastercolor === null ? (
                                      <div>
                                        <span>{''}</span>
                                      </div>
                                    ) : (
                                      <div>
                                        <span>{curElem.mastercolor.name}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="row justify-content-center mt-3">
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Age</label>
                                  <div>
                                    {' '}
                                    {curElem.masterage === null ? (
                                      <div>
                                        <span>{''}</span>
                                      </div>
                                    ) : (
                                      <div>
                                        <span> {curElem.masterage.age}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Gender</label>
                                  <div>
                                    {curElem.mastergender === null ? (
                                      <div>
                                        <span>{''}</span>
                                      </div>
                                    ) : (
                                      <div>
                                        <span>{curElem.mastergender.name}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Address</label>
                                  <div>
                                    <span>{curElem.address}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="row mb-3">
                                <label className=" info_opd_bold">H/o:-</label>
                                <div className="col-md-10">
                                  {curElem.deathreports[0] === null ? (
                                    <div>
                                      <span>{''}</span>
                                    </div>
                                  ) : (
                                    <div>
                                      <span> {curElem.deathreports[0].certified_reason}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="row mb-3">
                                <label className="info_opd_bold">Cause of Death:-</label>
                                <div className="col-md-10">
                                  {curElem.deathreports[0] === null ? (
                                    <div>
                                      <span>{''}</span>
                                    </div>
                                  ) : (
                                    <div>
                                      <span> {curElem.deathreports[0].cause_of_death}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="row mb-3">
                                <label className="info_opd_bold">
                                  Unfortunately Died <small>(Death)</small>:-
                                </label>
                                <div className="col-md-10">
                                  {curElem.deathreports[0] === null ? (
                                    <div>
                                      <span>{''}</span>
                                    </div>
                                  ) : (
                                    <div>
                                      <span> {curElem.deathreports[0].cause_of_treatment}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-md-3 form-group">
                                <label className="info_opd_bold">Time of Death</label>
                                <div>
                                  <div>
                                    {changeDateTime === null ? (
                                      ''
                                    ) : (
                                      <span>{changeDateTime}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3 form-group">
                                <label className="info_opd_bold">Date</label>
                                <div>
                                  <div>
                                    {curElem.deathreports[0].date_of_release === null ? '' : <span>{dateRelease}</span>}
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-md-3 form-group">
                                <label className="info_opd_bold">Name Of Veterinary Doctor</label>
                                <div><span>{curElem.veterinaryDoctor}</span></div>
                              </div> */}
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
