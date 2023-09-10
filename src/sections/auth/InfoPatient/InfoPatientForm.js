import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Moment from 'moment';
// import { useReactToPrint } from 'react-to-print';
// // @mui
import { Box, Grid, Modal, Button, Typography, Tab } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import Table from 'react-bootstrap/Table';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

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
  const { patientId } = useParams();
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [imaes, setimaes] = useState([]);
  const getMultipleImages = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-multiple-images/${patientId}`
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
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-getOneOpdDemo/${patientId}`
    );
    setOpdEdit(await response.json());
    // console.log(response)
  };
  const getOpdAddMore = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-opdAddMore/${patientId}`
    );
    setAddinputList(await response.json());

    // console.log(response.data);
  };
  const [opdEditreport, setopdEditreport] = useState([]);

  const getReportData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-uploadreport-editpage/${patientId}`
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
    window.location.reload();
    setOpen(false);
  };
  const [profile, setProfile] = useState({
    file: [],
    filepreview: null,
  });




  useEffect(() => {
    getOpdEdit();
    getOpdAddMore();
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
        data[index].emailCheck = 'Enter Case history/Symptoms';
        data[index].emailFormat = '';
        valid = false;
      }

      if (data[index].treatment_medicine === '') {
        data[index].Check = 'Enter treatment Medicine Provided';
        data[index].emFormat = '';
        valid = false;
      }
    }
    setFormVal(data);
    return valid;
  };

  const handleCloseButton = (e) => {
    navigate('/dashboard/DelPatientHistory');
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
                      </div>
                    </div>
                    {/* </form> */}
                  </div>
                );
              })}

              <div className="row mt-1">
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Treatment Prescription" value="1" />
                      <Tab label="Documents" value="2" />
                      <Tab label="Patient Images" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <div className="App">
                      <Table responsive="md" className="table table-class">
                        <thead>
                          <tr>
                            <th className="info_opd_bold">Date/Type</th>
                            <th className="info_opd_bold">Case History/Symptoms</th>
                            <th className="info_opd_bold">Treatment Medicine Provided</th>
                          </tr>
                        </thead>
                        {AddinputList.map((x, i) => {
                          const date = x.date;
                          const changeDate = Moment(date).format('MM-DD-YYYY ');
                          return (
                            <tbody>
                              <tr className="">
                                <td>
                                  <div style={{width: '104px;'}}>{changeDate}</div>
                                </td>
                                <td>
                                  <div className="preheatd-width">{x.case_history}</div>
                                </td>
                                <td>
                                  <div className="preheatd-width">{x.treatment_medicine}</div>
                                </td>
                                
                              </tr>
                            </tbody>
                          );
                        })}
                      </Table>
                    </div>
                  </TabPanel>

                  <TabPanel value="2">
                    <div className="row">
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
                  </TabPanel>
                  <TabPanel value="3">
                    <div className=" row  ">
                      {imaes.length === 0 ? (
                        <small>No Images Uploaded Here</small>
                      ) : (
                        <div className="row mt-1">
                          {imaes.map((item) => {
                            // console.log(item);
                            return (
                              <div className="col-md-3 mt-2 mb-2">
                                <div className="">
                                  <div className="">
                                    <img className="pat_img" src={item.s3image} alt="UploadImage" />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </TabPanel>
                </TabContext>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
