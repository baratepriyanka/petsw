import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Moment from 'moment';
// import { useReactToPrint } from 'react-to-print';
// @mui
import { Box, Grid, Modal } from '@mui/material';
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
export default function InfoIpdForm() {
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

  const [masteripdcategory, setMasteripdcategory] = useState([]);
  const getMasteripdcategory = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/ipd-category`
    );
    setMasteripdcategory(await response.json());
  };

  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const monthWithOffset = dateNow.getUTCMonth() + 1;
  const month = monthWithOffset.toString().length < 2 ? `0${monthWithOffset}` : monthWithOffset;
  const date = dateNow.getUTCDate().toString().length < 2 ? `0${dateNow.getUTCDate()}` : dateNow.getUTCDate();
  const materialDateInput = `${year}-${month}-${date}`;

  const [student, setStudent] = useState([]);
  const [addinputList, setAddInputList] = useState([]);
  const getOpdEdit = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-ipdOpd-healthreport/${healthReportId}`
    );
    const data = await response.json();
    setStudent(data);
  };
  const getOpdAddMore = async () => {
    // const response = await fetch(
    //   `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-opd-ipdAddMore/${healthReportId}`
    // );
    // setAddInputList(await response.json());
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
  const [imaes, setimaes] = useState([]);
  const getMultipleImages = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-multiple-images/${healthReportId}`
    );
    setimaes(await response.json());
  };
  const [allhealthreports, setAllHealthReports] = useState([]);
  // const caseIdref = useRef(null);
  const getallhealthreports = async () => {
    // const id =caseIdref.current.value
    // console.log(id)
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-health-report/${healthReportId}`
    );
    setAllHealthReports(await response.json());
    // console.log(await response.json())
  };

  const download = (e) => {
    const data = e.target.href;
  };
  useEffect(() => {
    getOpdEdit();
    getallhealthreports();
    getOpdAddMore();
    getMasteripdcategory();
    getMasterBreedData();
    getMasterColorData();
    getMasterGenderData();
    getReportData();
    getMultipleImages();
  }, []);
  const navigate = useNavigate();
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

  return (
    <>
      <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-5">
            <div className="row">
             
              {/* <div className="col-md-1 col-3">
                <button type="button" className="btn btn-primary" onClick={handlePrint}>
                  Print
                </button>
              </div> */}

              {student.map((curElem) => {
                const date=curElem.dateofadmission;
                const chageDateFor = Moment(date).format('DD-MM-YYYY');
               
                return (
                  <div className="table mt-2">
                    {/* <form action="" className="did-floating-label-content"> */}
                    <div className="container">
                      <div className="row">
                      <div className="text-end">
                <button type="button" id="" className="btn cancelbtn" onClick={handleCloseButton}>
                  Back
                </button>
              </div>
                        <div className="row">
                          <div className="row justify-content-between mt-3  mb-3">
                            <div className="col-md-6 form-group">
                              <label className="info_opd_bold">Name of dog receiver/Owner</label>
                              <div className="mt-2">
                                <span>{curElem.parent_name}</span>
                              </div>
                            </div>
                            <div className="col-md-6 form-group">
                              <label className="info_opd_bold">Date of Admission</label>
                              <div>
                                <span>{chageDateFor}</span>
                              </div>
                            </div>
                          </div>

                          <div className="row justify-content-start mb-3">
                            <div className="col-md-10 form-group">
                              <label className="info_opd_bold">Address</label>
                              <div className="">
                                <span>{curElem.address}</span>
                              </div>
                            </div>
                          </div>

                          <div className="row justify-content-center mb-3">
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Species</label>
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
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Breed</label>
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
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Colour</label>
                              {curElem.mastercolor === null ? (
                                <div>
                                  <span>{''}</span>
                                </div>
                              ) : (
                                <div>
                                  <span> {curElem.mastercolor.name}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="row justify-content-start mb-3">
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Age</label>
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
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Gender</label>
                              {curElem.mastergender === null ? (
                                <div>
                                  <span>{''}</span>
                                </div>
                              ) : (
                                <div>
                                  <span> {curElem.mastergender.name}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* <div className="mt-1">
                          <h5 className="info_opd_bold">Treatment Given / Prescription</h5>
                        </div> */}
                        {/* <div className="App">
                          <Table responsive="md" className="table table-class">
                            <thead>
                              <tr>
                                <th className="info_opd_bold">Date/Type</th>
                                <th>Temprature</th>
                                <th className="info_opd_bold">Feeding</th>
                                <th className="info_opd_bold">Clinical Observations</th>
                                <th className="info_opd_bold">Treatment Medicine Provided</th>
                              </tr>
                            </thead>
                            {addinputList.map((x, i) => {
                              return (
                                <tbody>
                                  <tr className="">
                                    <td>
                                      <span>{x.date}</span>
                                    </td>
                                    <td>
                                      <span>{x.temperature}</span>
                                    </td>
                                    <td>
                                      <span>{x.feeding}</span>
                                    </td>
                                    <td>
                                      <span>{x.clinical_observ}</span>
                                    </td>
                                    <td>
                                      <span>{x.treatment_medicine}</span>
                                    </td>
                                  </tr>
                                </tbody>
                              );
                            })}
                          </Table>
                        </div> */}
                      </div>
                    </div>
                    {/* </form> */}
                  </div>
                );
              })}

              {allhealthreports.map((report) => {
               
                return (
                  <div className="row" style={{ borderBottom: '1px solid', marginTop: '20px' }} key={report.id}>
                    {report.healthreports === 0 ? (
                      ''
                    ) : (
                      <div>
                        {report.healthreports.map((curElem) => {
                           const date=curElem.date_of_release;
                           const chageDateFor = Moment(date).format('DD-MM-YYYY');
                          //  console.log(curElem)
                          return (
                            <div className="row">
                              <div className="row justify-content-start">
                                <div className="col-md-5 form-group">
                                  <label className="info_opd_bold">Date Of Release</label>
                                  <div className="mt-1">
                                    <span>{chageDateFor}</span>
                                  </div>
                                </div>

                                <div className="col-md-5 form-group">
                                  <label className="info_opd_bold">Contract No.</label>
                                  <div className="mt-1">
                                    <span>{curElem.contract_no}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="row justify-content-start">
                                <div className="col-md-10 form-group">
                                  <label className="info_opd_bold">
                                    {' '}
                                    H/o : This is to be certified that dog was suffering from
                                  </label>
                                  <div className="mt-1">
                                    <span> {curElem.certified_reason}</span>
                                  </div>
                                </div>
                                <div className="col-md-10 form-group">
                                  <label className="info_opd_bold">Animal</label>
                                  <div className="mt-1">
                                    <span> {curElem.animal}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="row justify-content-start mb-3">
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Time Of Release</label>
                                  <div className="mt-1">
                                    <span>{curElem.date_of_release.substr(11, 5)}</span>
                                  </div>
                                </div>
                                <div className="col-md-4 form-group">
                                  <label className="info_opd_bold">Date</label>
                                  <div className="mt-1">
                                    <span>{chageDateFor}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {report.opd_ipds.length === 0 ? (
                      ''
                    ) : (
                      <div className="App">
                        <div className="mt-1 mb-3">
                          <h5 className="info_opd_bold">Treatment Prescription</h5>
                        </div>
                        <Table responsive="md" className="table table-class">
                          <thead>
                            <tr>
                              <th className="info_opd_bold">Date/Type</th>
                              <th>Temprature</th>
                              <th className="info_opd_bold">Feeding</th>
                              <th className="info_opd_bold">Clinical Observations</th>
                              <th className="info_opd_bold">Treatment Medicine Provided</th>
                            </tr>
                          </thead>

                          {report.opd_ipds.map((x) => {
                             const date=x.date;
                             const chageDateFor = Moment(date).format('MM-DD-YYYY');
                            return (
                              <tbody>
                                <tr className="">
                                  <td>
                                    <div style={{width: '104px;'}}>{chageDateFor}</div>
                                  </td>
                                  <td>
                                    <div className='prehealtd-width'>{x.temperature}</div>
                                  </td>
                                  <td>
                                    <div className='prehealtd-width'>{x.feeding}</div>
                                  </td>
                                  <td>
                                    <div className='prehealtd-width'>{x.clinical_observ}</div>
                                  </td>
                                  <td>
                                    <div className='prehealtd-width'>{x.treatment_medicine}</div>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}
                        </Table>
                      </div>
                    )}
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
