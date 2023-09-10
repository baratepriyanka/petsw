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
  const { prescriptionId } = useParams();
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;

  const [opdEdit, setOpdEdit] = useState([]);
  const [AddinputList, setAddinputList] = useState([{ date: '', case_history: '', treatment_medicine: '' }]);

  const getOpdEdit = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-getOneOpdDemo/${prescriptionId}`
    );
    setOpdEdit(await response.json());
  };
  const getOpdAddMore = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-prescription-patient/${prescriptionId}`
    );
    setAddinputList(await response.json());
  };

  // const history = useHistory();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    file: [],
    filepreview: null,
  });

  useEffect(() => {
    getOpdEdit();
    getOpdAddMore();

    // }
  }, []);

  const handleCloseButton = (e) => {
    navigate('/dashboard/Prescription');
  };

  return (
    <>
      <section className="screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
              {opdEdit.map((curElem) => {
                const date = curElem.dateofadmission;
                const formatDate = Moment(date).format('MM-DD-YYYY ');
                return (
                  <div className=" mt-2">
                    <div className="container">
                      <div className="row">
                        <div className="text-end">
                          <button type="button" id="" className="btn cancelbtn" onClick={handleCloseButton}>
                            Back
                          </button>
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
                              <label className="info_opd_bold">Case paper No</label>
                              <div className="mt-2">
                                <span>{curElem.patient_id}</span>
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
                              <label className="info_opd_bold">Name</label>
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
                              <label className="info_opd_bold">Phone</label>
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
                        <div className="mt-3 mb-2">
                          <h4>Treatment Prescription</h4>
                        </div>
                        <div className="App mt-1">
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
                                      <div style={{width: '104px;'}}>{x.date.substr(0, 10)}</div>
                                    </td>
                                    <td>
                                      <div className='preopdtd-width'>{x.case_history}</div>
                                    </td>
                                    <td>
                                      <div className='preopdtd-width'>{x.treatment_medicine}</div>
                                    </td>
                                  </tr>
                                </tbody>
                              );
                            })}
                          </Table>
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
