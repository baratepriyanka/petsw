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
  p: 2,
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
  const { patientId } = useParams();
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;

  const [student, setStudent] = useState([]);
  const [addinputList, setAddInputList] = useState([]);
  const getOpdEdit = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-ipdpatient/${patientId}`
    );
    setStudent(await response.json());
    // console.log(await response.json());
  };
  const getOpdAddMore = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-opd-ipdAddMore/${patientId}`
    );
    setAddInputList(await response.json());
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
    // console.log(response.data);
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
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    file: [],
    filepreview: null,
  });
  const handleCloseButton = (e) => {
    navigate('/dashboard/PatientList');
  };

  const [Wardnumber, setWardnumber] = useState([]);
  const getWardnumber = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-wardnumber/${loginId}`
    );
    setWardnumber(await response.json());
  };

  const initialvalue = {
    hospital_id: `${loginId}`,
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [bedFormId, setbedFormId] = useState({});
  const [masterbedNumber, setBedNumber] = useState([]);
  const [errorsMsg, seterrorsMsg] = useState("Please update ward number and bed number ");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(
          `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/find-bed-ward/${patientId}`
        );
        setbedFormId(student.data);
        // console.log(student);
      } catch (error) {
        console.log('Something is Wrong');
      }
    }
    getStudent();
    getOpdEdit();
    getOpdAddMore();
    getReportData();
    getMultipleImages();
    getWardnumber();
  }, []);
  const componentRef = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setbedFormId({ ...bedFormId, [name]: value });

    const id=componentRef.current.value
    const response = fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-cageid/${id}`
    ).then(response => response.json())

    .then(data =>
      {if(data.length === 0){
        setBedNumber(data)
      }else{
        setBedNumber(data)}
      }
    ).catch((err) => {
      alert(err.message);
    })
  }
 
  async function handleSubmit(e) {
    e.preventDefault();
    axios
    .post(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-ipdpatient-active/${patientId}`,
      { hospital_id: formValues.hospital_id }
    ) // <-- remove ;
    .then((res) => {
      // const data = res.data.post;
    });

 await axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-updatebedid-onactivepage/${patientId}`,bedFormId
    )
    .then((response) => {
      setOpen(false);
      navigate('/dashboard/IPD');
      // console.log(response);
     
    })
  }
  return (
    <>
      <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-5">
            <div className="row">
              {student.map((curElem) => {
                const activeBut = curElem.discharge_death_status;
                const dateSpl = curElem.dateofadmission;
                const formatDate = Moment(dateSpl).format('MM-DD-YYYY  HH:mm A');
                const releaseDate=curElem.healthreports[0].date_of_release;
                const dateRelease =Moment(releaseDate).format('MM-DD-YYYY');
                return (
                  <div className="table mt-2">
                    <div className="container">
                      <div className="row">
                        <div className="row">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">Date of Release</label>
                            {curElem.healthreports[0] === null ? (
                              <div>
                                <span>{''}</span>
                              </div>
                            ) : (
                              <div>
                                <span>{dateRelease}</span>
                              </div>
                            )}
                          </div>
                          <div className="text-end but-fun">
                            <button type="button" id="" className="btn cancelbtn m-1" onClick={handleCloseButton}>
                              Back
                            </button>
                            {activeBut === '1' ? (
                              ''
                            ) : (
                              <button
                                type="button"
                                className="btn cageBtn m-2 addnewcasebtn"
                                id={curElem.id}
                                value=""
                                onClick={handleOpen}>
                                Add New Case
                              </button>
                             
                            )}
                          </div>
                          <input type="hidden" value={formValues.hospital_id} />
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
                                <span>{formatDate}</span>
                              </div>
                            </div>
                            <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Case paper No.</label>
                              <div className="mt-2">
                                {' '}
                                <span>{curElem.case_tables[0].case_id}</span>
                              </div>
                            </div>
                            {/* <div className="col-md-4 form-group">
                              <label className="info_opd_bold">Bed/Cage ID</label>
                              <div>
                                <span>{curElem.cage_id}</span>
                              </div>
                            </div> */}
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
                                  <span> {curElem.masterage.age}</span>
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
                        <div className="row mt-3">
                          <div className="row mb-3">
                            <label className="col-sm-5 info_opd_bold">Special Investigation if any(X-ray.USG):-</label>
                            <div className="col-sm-7">
                              <div className="description-box">
                                <span>{curElem.xray}</span>
                                {/* <textarea className="form-control" name="description" required="">
                                  {curElem.xray}
                                </textarea> */}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <label className="col-sm-5 info_opd_bold">DISEASE/PROVISINAL DIAGNOSIS:-</label>
                            <div className="col-sm-7">
                              <div className="description-box">
                                <span>{curElem.diagnosis}</span>
                                {/* <textarea className="form-control" name="description" required="">
                                  {curElem.diagnosis}
                                </textarea> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="App mt-3">
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
                              const releaseDate=x.date;
                              const dateRelease =Moment(releaseDate).format('MM-DD-YYYY');
                              return (
                                <tbody>
                                  <tr className="">
                                    <td>
                                      <div style={{width: '104px'}}>{dateRelease}</div>
                                    </td>
                                    <td>
                                      <div className="preactivetd-width">{x.temperature}</div>
                                    </td>
                                    <td>
                                      <div className="preactivetd-width">{x.feeding}</div>
                                    </td>
                                    <td>
                                      <div className="preactivetd-width">{x.clinical_observ}</div>
                                    </td>
                                    <td>
                                      <div className="preactivetd-width">{x.treatment_medicine}</div>
                                    </td>
                                  </tr>
                                </tbody>
                                // <div className="row justify-content-center mt-3">
                                //   <div className="col-md-2 form-group ">
                                //     <label className="info_opd_bold">Date / Type</label>
                                //     <div>
                                //       <span>{x.date}</span>
                                //     </div>
                                //   </div>
                                //   <div className="col-md-2 form-group ">
                                //     <label className="info_opd_bold">Temp P/R</label>
                                //     <div>
                                //       <span>{x.temperature}</span>
                                //     </div>
                                //   </div>
                                //   <div className="col-md-2 form-group ">
                                //     <label className="info_opd_bold">Feeding</label>
                                //     <div>
                                //       <span>{x.feeding}</span>
                                //     </div>
                                //   </div>
                                //   <div className="col-md-3 form-group ">
                                //     <label className="info_opd_bold">Clinical Observations</label>
                                //     <div>
                                //       <span>{x.clinical_observ}</span>
                                //     </div>
                                //   </div>
                                //   <div className="col-md-3 form-group ">
                                //     <label className="info_opd_bold">Treatment Medicine Provided</label>
                                //     <div>
                                //       <span>{x.treatment_medicine}</span>
                                //     </div>
                                //   </div>
                                // </div>
                              );
                            })}
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="mt-5 mb-5">
                <div className="row mt-3">
                  <h4 className="mb-3">Test Report</h4>
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
              {/* <div className="mt-3 mb-5">
              
                <div className="multipeimgrow mt-3">
                  <h3>Images</h3>
                  {imaes.length === 0 ? (
                    <small>No Images Uploaded Here</small>
                  ) : (
                    <div className="row mt-1 multipeimg">
                      {imaes.map((item) => {
                        // console.log(item);
                        return (
                          <div className="col-md-3 mt-2 mb-2">
                            <div className="zoom-muldiv">
                              <div className="repodrt_file zoom-mul">
                                <img className="multiple_img zoom-mul" src={item.s3image} alt="UploadImage" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div> */}
               <div className="mt-1 mb-5">
                <div className="multipeimgrow mt-3">
                  <h4 className="fw-bold">Images</h4>
                    {imaes.length === 0 ? (<small>No Images Uploaded Here</small>):  <div className="container">
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
                        <div className="image mb-2"> <img src={item.s3image} alt=""/> </div>
                    </div>
                      );
                    })}
                  </div>
                  </div>
                  }
                </div>
              </div> 
            </div>
            <Modal
              open={open}
              // onClick={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleHel}>
                <p style={{ color: 'red' }}  className="text-center">{errorsMsg}</p>
                <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                  <div className="row justify-content-center">
                    <div className="col-md-8 form-group">
                      <label className="info_opd_bold">
                        Ward No.<span className="man_filed">*</span>
                      </label>
                      <select
                        style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                        required=""
                        id=""
                        name="ward_no"
                        ref={componentRef}
                        className="form-control"
                        onChange={handleChange}
                        value={bedFormId.ward_no}
                      >
                        <option>--Select--</option>
                        {Wardnumber.map((curElem) => (
                          <option key={curElem.id} value={curElem.id}>
                            {curElem.category_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-8 form-group">
                      <label className="info_opd_bold">
                        Cage/Kennel<span className="man_filed">*</span>
                      </label>
                      {  masterbedNumber.length===0 ? ( <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required
                              type="text"
                              id="cage_kennel"
                              name="cage_kennel"
                              defaultValue={bedFormId.cage_kennel}
                              // onChange={handleChange}
                              value={bedFormId.cage_kennel}
                              className="form-control"
                              >
                                <option  value={bedFormId.cage_kennel}>
                               { bedFormId.cage_kennel}
                                </option>
                            </select>): <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required
                              type="text"
                              id="cage_kennel"
                              name="cage_kennel"
                              defaultValue={student.cage_kennel}
                              value={student.cage_kennel}
                              className="form-control"
                              onChange={handleChange}
                            >
                               <option>---Select ---</option>
                              {masterbedNumber.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.bedid}
                                </option>
                              ))}
                            </select>
                            }
                    </div>
                  </div>

                  <div className="mt-5 text-center m-0">
                    <button type="submit" className="btn btn-primary savebtn">
                      Save
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleClose}>
                      Cancel
                    </button>
                  </div>
                </form>
              </Box>
            </Modal>
          </div>
        </div>
      </section>
    </>
  );
}
