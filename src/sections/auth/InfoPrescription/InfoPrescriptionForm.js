import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Moment from 'moment';
// import { useReactToPrint } from 'react-to-print';
// @mui
import { Box, Grid, Modal, Typography, Button } from '@mui/material';
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
const styleHel = {
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
const styleDeath = {
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
  const { prescriptionId } = useParams();
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;

  const [student, setStudent] = useState([]);
  const [addinputList, setAddInputList] = useState([]);


  const getOpdEdit = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-info-ipd/${prescriptionId}`
    );
    const data = await response.json();
    if (data[0] === null) {
      setStudent(data);
    } else {
      setStudent(data);
    }
    // console.log(student);
  };
  const getOpdAddMore = async () => {
    const response = await fetch(
  `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-prescription-patient/${prescriptionId}`
    );
    setAddInputList(await response.json());
    // console.log(response.data);
  };

  // const history = useHistory();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    file: [],
    filepreview: null,
  });

  const handleCloseButton = (e) => {
    navigate('/dashboard/Prescription');
  };

 
  useEffect(() => {
    getOpdEdit();
    getOpdAddMore();
  }, []);
  return (
    <>
      <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-5">
            <div className="row">
              {/* onSubmit={handleSubmit} */}
              {student[0] === null ? (
                ''
              ) : (
                <div className="table mt-2">
                  {student.map((curElem) => {
                    const dateSpl = curElem.dateofadmission;
                    const changeDate= Moment(dateSpl).format('MM-DD-YYYY HH:mm A');
                    return (
                      <div className="container">
                        <div className="row">
                          <div className="row">
                            <div className="but-fun text-end">
                              <button type="button" id="" className="btn cancelbtn m-1" onClick={handleCloseButton}>
                                Back
                              </button>
                            </div>
                            <div className="row justify-content-center">
                              <div className="col-md-4 offset-md-2 col-10 col-sm-6">
                                {profile.filepreview !== null ? (
                                  <img className="infoimg" src={profile.filepreview} alt="" />
                                ) : (
                                  <img className="infoimg" src={curElem.s3image} alt="" />
                                )}
                              </div>
                            </div>
                            <div className="row justify-content-between mt-3  mb-3">
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Category</label>
                                {curElem.masteripdcategory === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span>{curElem.masteripdcategory.name}</span>
                                  </div>
                                )}
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Date & Time Of Admission</label>
                                <div>
                                  <span>{changeDate}</span>
                                </div>
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Case paper No.</label>
                                {curElem.case_tables[0] === undefined ? (
                                  <div className="mt-2">
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div className="mt-2">
                                    <span>{curElem.case_tables[0].case_id}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="row justify-content-center mb-3">
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Owner Name</label>
                                <div>
                                  <span>{curElem.parent_name}</span>
                                </div>
                              </div>
                              <div className="col-md-8 form-group">
                                <label className="info_opd_bold">Address</label>
                                <div>
                                  <span>{curElem.address}</span>
                                </div>
                              </div>
                            </div>
                            <div className="row justify-content-center mb-3">
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Reg. No.</label>
                                <div>
                                  <span>{curElem.reg_no}</span>
                                </div>
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Fees. Rs.</label>
                                <div>
                                  <span>{curElem.fee}</span>
                                </div>
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Bill No.</label>
                                <div>
                                  <span>{curElem.bill_no}</span>
                                </div>
                              </div>
                            </div>
                            <div className="row justify-content-center mb-3">
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Ward No.</label>

                                {curElem.wardcategory === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span>{curElem.wardcategory.category_name}</span>
                                  </div>
                                )}
                              </div>

                              <div className="col-md-4 form-group mt-3 mt-md-0">
                                <label className="info_opd_bold">Cage/Kennel</label>
                                {curElem.bed === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span>{curElem.bed.bedid}</span>
                                  </div>
                                )}
                              </div>

                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Mobile No.</label>
                                <div>
                                  <span>{curElem.phone}</span>
                                </div>
                              </div>
                            </div>

                            <div className="row justify-content-center mb-3">
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Pet Name</label>
                                <div>
                                  <span>{curElem.patient_name}</span>
                                </div>
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
                            </div>

                            <div className="row justify-content-center mb-3">
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
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Weight</label>
                                <div>
                                  <span>{curElem.weight}</span>
                                </div>
                              </div>

                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Age</label>
                                {curElem.masterage === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span> {curElem.masterage.name}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="row justify-content-start mb-3">
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
                          <div className="row mt-2">
                            <div className="row mb-3">
                              <label className="col-sm-5 info_opd_bold">
                                Special Investigation if any(X-ray.USG):-
                              </label>
                              <div className="col-sm-7">
                                <div className="description-box">
                                  <span>{curElem.xray}</span>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <label className="col-sm-5 info_opd_bold">DISEASE/PROVISINAL DIAGNOSIS:-</label>
                              <div className="col-sm-7">
                                <div className="description-box">
                                  <span>{curElem.diagnosis}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="mt-2">
                <h4>Treatment Prescription</h4>
              </div>
              <div className="App mt-1">
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
                     const dateSpl = x.date;
                     const changeDate= Moment(dateSpl).format('MM-DD-YYYY');
                    return (
                      <tbody>
                        <tr className="">
                          <td>
                            <div style={{width: '104px'}}>{changeDate}</div>
                          </td>
                          <td>
                            <div className="pretd-width">{x.temperature}</div>
                          </td>
                          <td>
                            <div className="pretd-width">{x.feeding}</div>
                          </td>
                          <td>
                            <div className="pretd-width">{x.clinical_observ}</div>
                          </td>
                          <td>
                            <div className="pretd-width">{x.treatment_medicine}</div>
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
      </section>
    </>
  );
}
