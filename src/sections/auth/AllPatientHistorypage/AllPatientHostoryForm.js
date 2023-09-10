import React, { useState, useEffect, useRef} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Moment from 'moment';
// @mui
import { Box, Grid, TableContainer, TablePagination, Tab, Table } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// ----------------------------------------------------------------------

export default function AllPatientHostoryForm() {
  const { ipdId } = useParams();
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [profile, setProfile] = useState({
    file: [],
    filepreview: null,
  });

  const [patientHistory, setPatientHistory] = useState([]);
  const getPatientHistory = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-info-ptient-history/${ipdId}`
    );
    // setPatientHistory(await response.json());
    const data = await response.json();
    if (data[0] === null) {
      setPatientHistory(data);
    } else {
      setPatientHistory(data);
    }
    // console.log(await response.json());
  };
  const [addinputList, setAddInputList] = useState([]);
  const getOpdAddMore = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-opdAddMore/${ipdId}`
    );
    setAddInputList(await response.json());
    // console.log(await response.json());get-opdAddMore
  };
 
  const [healthReport, setHealthReport] = useState([]);
  const getHealthReport = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-health-report/${ipdId}`
    );
    const data = await response.json();
    if (data[0] === null) {
      setHealthReport(data);
    } else {
      setHealthReport(data);
    }
  };
  const [deathReport, setDeathReport] = useState([]);
  const getDeathReport = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-death-report/${ipdId}`
    );
    const data = await response.json();
    // console.log(data[0])
    if (data[0] === null) {
      setDeathReport(data);
    } else {
      setDeathReport(data);
    }
  };
  const [opdEditreport, setopdEditreport] = useState([]);
  const getReportData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-uploadreport-editpage/${ipdId}`
    );
    const data = await response.json();
    if (data.length === 0) {
      setopdEditreport(data);
    } else {
      setopdEditreport(data);
    }
    // console.log(response.data);
  };
  const [imaes, setimaes] = useState([]);
  const getMultipleImages = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-multiple-images/${ipdId}`
    );
    const data = await response.json();
    if (data.post.length === 0) {
      setimaes(data.post);
      // console.log(imaes)
    } else {
      setimaes(data.post);
    }
  };
  const componentRef = useRef(null);
  const selectOption =componentRef;
// console.log(selectOption);
  const navigate = useNavigate();
  const handleCloseButton = (e) => {
    navigate('/dashboard/DelPatientHistory');
  };
  useEffect(() => {
    getPatientHistory();
    getOpdAddMore();
    getHealthReport();
    getDeathReport();
    getReportData();
    getMultipleImages();
  }, []);

  return (
    <>
      <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
             
              {patientHistory[0] === null ? (
                ''
              ) : (<div> {patientHistory.map((curElem) => {
                const date=curElem.dateofadmission;
                const chageDateFor = Moment(date).format('MM-DD-YYYY  HH:mm A');

                return (
                  <div className="table mt-2">
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
                                {curElem.dateofadmission === null ? (''):<span>{chageDateFor }</span>}
                               
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
                            </div></div>
                        </div>
                        <div className="row mt-3">
                          <div className="row mb-3">
                            <label className="col-sm-5 info_opd_bold">Special Investigation if any(X-ray.USG):-</label>
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
                  </div>
                );
              })}</div>)}
             
            </div>

            <div className="row mt-1">
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Treatment Prescription" value="1" />
                    <Tab label="Health Report" value="2" />
                    <Tab label="Death Report" value="3" />
                    <Tab label="Documents" value="4" />
                    <Tab label="Patient Images" value="5" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="App">
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
                        console.log(x)
                        const date = x.date;
                        const changeDate =Moment(date).format('MM-DD-YYYY ');
                        return (
                          <tbody>
                            <tr className="">
                              <td>
                                <div style={{width:'104px'}}>{changeDate}</div>
                              </td>
                              <td>
                                <div className='hostd-width'>{x.temperature}</div>
                              </td>
                              <td>
                                <div className='hostd-width'>{x.feeding}</div>
                              </td>
                              <td>
                                <div className='hostd-width'>{x.clinical_observ}</div>
                              </td>
                              <td>
                                <div className='hostd-width'>{x.treatment_medicine}</div>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </Table>
                  </div>
                </TabPanel>
                
                 <TabPanel value="2">
                  {healthReport[0] === null ? (<small>no avaliable data</small>) :  <div className="row">
                    {healthReport.map((curElem) => {
                        const date = curElem.date_of_release;
                        const changeDate =Moment(date).format('MM-DD-YYYY');
                        const dateRelease = curElem.date_of_release;
                        const changeDateRelease =Moment(dateRelease).format('MM-DD-YYYY');
                        
                      return ( 
                        <div className="">
                        <div className="row justify-content-start">
                          <div className="col-md-6 form-group">
                            <label className="info_opd_bold">Date Of Release</label>
                            <div className="">
                                 {curElem.date_of_release === null ? (''):<span>{changeDate }</span>}
                              
                            </div>
                          </div>
                          <div className="col-md-6 form-group">
                            <label className="info_opd_bold">Contract No.</label>
                            <div className="">
                            {curElem.contract_no === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span>{curElem.contract_no}</span>
                                  </div>
                                )}
                            </div>
                          </div>
                          </div>
                          <div className="row justify-content-start mt-1">
                            <div className="col-md-10 form-group">
                              <label className="info_opd_bold">
                                {' '}
                                H/o : This is to be certified that dog was suffering from
                              </label>
                              <div className="">
                              {curElem.certified_reason === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                   <span>{curElem.certified_reason}</span>
                                  </div>
                                )}
                               
                              </div>
                            </div>
                            <div className="col-md-10 form-group">
                              <label className="info_opd_bold">Animal</label>
                              <div>
                              {curElem.animal=== null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                   <span>{curElem.animal}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row justify-content-start  mt-1">
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold"> Time Of Release</label>
                              <div>
                              {curElem.createdAt === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span>{curElem.createdAt.substr(11, 5)}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Date</label>
                              <div>
                              {curElem.date_of_release === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span>{changeDateRelease}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          
                        </div>
                        </div>
                      );
                    })}
                  </div>}
                 
                </TabPanel>
                <TabPanel value="3">
                  {deathReport[0] === null ? (<small>no avaliable data</small>) : <div className="row">
                    {deathReport.map((curElem) => {

                      return (
                        <div className="row">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">Date Of Admission</label>
                           <div>{curElem.date_of_release === null ? (''):<span>{curElem.date_of_release.substr(0, 10) }</span>}</div>
                          </div>
                          <div className="col-md-6 form-group">
                            <label className="info_opd_bold">Contract No.</label>
                            <div className="">
                              <span>{curElem.contract_no}</span>
                            </div>
                          </div>
                          <div className="row justify-content-start mt-1">
                            <div className="col-md-10 form-group">
                              <label className="info_opd_bold"> H/o :</label>
                              <div className="">
                                <span>{curElem.certified_reason}</span>
                              </div>
                            </div>
                          </div>
                          <div className="row justify-content-start  mt-1">
                            <label className="info_opd_bold">Cause of Death:-</label>
                            <div className="col-md-10">
                              <div>
                                <span> {curElem.cause_of_death}</span>
                              </div>
                            </div>
                          </div>
                          <div className="row justify-content-start  mt-1">
                            <label className="info_opd_bold">
                              Unfortunately Died <small>(Death)</small>:-
                            </label>
                            <div className="col-md-10">
                              <div>
                                <span> {curElem.cause_of_treatment}</span>
                              </div>
                            </div>
                          </div>
                          <div className="row justify-content-start  mt-1">
                            <div className="col-md-3 form-group">
                              <label className="info_opd_bold">Time of Death</label>
                             <div>{curElem.date_of_release === null ? (''):<span>{curElem.date_of_release.substr(11 ,15 ) }</span>}</div>
                            </div>

                            <div className="col-md-3 form-group">
                              <label className="info_opd_bold">Date</label>
                            <div>
                            {curElem.date_of_release === null ? (''):<span>{curElem.date_of_release.substr(0, 10) }</span>}
                            </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div> }
                 
                </TabPanel> 
                <TabPanel value="4">
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
                <TabPanel value="5">
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
      </section>
    </>
  );
}
