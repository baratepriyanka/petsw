import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import axios from 'axios';
// @mui
import { Box, Grid } from '@mui/material';
// ----------------------------------------------------------------------

export default function EditOpdForm() {
  const { doctorId } = useParams();
  const [masterGenderData, setMasterGenderData] = useState([]);

  const getMasterGenderData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-department`);
    setMasterGenderData(await response.json());
    // console.log(masterGenderData);
  };

  const [infocurElem, setInfocurElem] = useState([]);

  const getDoctorEdit = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-info-doctor/${doctorId}`);
    setInfocurElem(await response.json());
    // console.log(response.data);
  };

  const [profile, setProfile] = useState({
    file: [],
    filepreview: null,
  });

  useEffect(() => {
    // async function getDoctorEdit() {
    //   try {
    //     const response = await axios.get(`http://localhost:8086/web/get-one-doctor/${doctorId}`);
    //     //  console.log(student.data);
    //     setcurElem(response.data);
    //   } catch (error) {
    //     console.log('Something is Wrong');
    //   }
    // }
    getDoctorEdit();
    getMasterGenderData();
  }, []);

  return (
    <>
      <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-5">
            <div className="row">
               {/* onSubmit={handleSubmit} */}
               {infocurElem.map((curElem) => {
                 console.log(curElem);
              

                return (
              <div className="">
                <form action="" className="did-floating-label-content">
                  <div className="container">
                    <div className="row">
                      <div className="row justify-content-center mb-3">
                        <div className="col-md-4 form-group">
                          <label className="info_opd_bold">Doctor Name</label>
                          <div>{curElem.doctor_name}</div>
                        </div>

                        <div className="col-md-4 form-group">
                          <label className="info_opd_bold">Email</label>
                          <div>{curElem.email}</div>
                        </div>
                      </div>
                      <div className="row justify-content-center mb-3">
                        <div className="col-md-4 form-group">
                          <label className="info_opd_bold">Password</label>
                          <div>{curElem.password}</div>
                        </div>

                        <div className="col-md-4 form-group">
                          <label className="info_opd_bold">Address</label>
                          <div>{curElem.address}</div>
                        </div>
                      </div>
                      <div className="row justify-content-center mb-3">
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                          <label className="info_opd_bold">Mobile No.</label>
                          <div>{curElem.phone}</div>
                        </div>
                        <div className="col-md-4 form-group">
                          <label className="info_opd_bold">Department</label>
                          <div>{curElem.masterdepartment.name}</div>
                        </div>
                      </div>
                      <div className="row justify-content-center mb-3">
                            <div className="col-md-4 form-group">
                                {profile.filepreview !== null ? (
                                  <img className="previewimg" src={profile.filepreview} alt="UploadImage" />
                                ) : <img className="previewimg" src={curElem.s3image} alt="UploadImage" />}
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
