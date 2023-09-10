import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Checkbox } from '@mui/material';

// ----------------------------------------------------------------------

export default function InfoAppointmentForm() {

  const {appointmentId} = useParams();

  const [masterAppointmentData, setMasterAppointmentData] = useState([]);
  const getMasterAppointmentData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-appointment-status`);
    setMasterAppointmentData(await response.json());
  };

  const [masterAppointmentSlotData, setMasterAppointmentSlotData] = useState([]);
  const getMasterAppointmentSlotData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-appointment-slots`);
    setMasterAppointmentSlotData(await response.json());
  };
  const [masterPatientData, setMasterPatientData] = useState([]);
  const getMasterPatientData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-patient-name`);
    setMasterPatientData(await response.json());
  };

  const [masterDoctorData, setMasterDoctorData] = useState([]);
  const getMasterDoctorData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-doctor`);
    setMasterDoctorData(await response.json());
  };

  const[appointmentInfo, setAppointmentInfo] = useState([]);
  const getAppointmentInfo = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-info-appointment/${appointmentId}`);
    setAppointmentInfo(await response.json());
    // console.log(response.data);
  };
  useEffect(() => {
    // async function getAppointmentInfo() {
    //     try {
    //      const response = await axios.get(`http://localhost:8086/web/get-one-appointment/${appointmentId}`)
    //     setAppointmentInfo(response.data);
    //     } catch (error) {
    //      console.log("Something is Wrong");
    //     }
    //    }

    getAppointmentInfo();
    getMasterAppointmentData();
    getMasterAppointmentSlotData();
    getMasterPatientData();
    getMasterDoctorData();
  }, []);


  
  return (
    <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-5">
            <div className="row">
              {/* onSubmit={handleSubmit} */}
              {appointmentInfo.map((curElem) => {
                // console.log(curElem.toString());
                // console.log(curElem.Patient.patient_name);
               
                return (
              <div className="">
                <form action=""  className="did-floating-label-content">
                  <div className="container">
                    <div className="row">
                      <div className="row">
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group mb-4">
                            <label className="info_opd_bold">Patient</label>
                           <div>{curElem.Patient.patient_name}</div>
                          </div>
                          <div className="col-md-4 form-group mb-4">
                            <label className="info_opd_bold">Doctor</label>
                            <div>{curElem.Doctor.doctor_name}</div>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label  className="info_opd_bold">Admission Date</label>
                           <div>{curElem.date}</div>
                          </div>
                          <div className="col-md-4 form-group mb-4">
                            <label className="info_opd_bold">Available Slots</label>
                            <div>{curElem.MasterAvaliableSlot.name}</div>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group mb-4">
                            <label className="info_opd_bold">Appointment Status</label>
                            <div>{curElem.MasterAppointmentStatus.name}</div>
                          </div>
                          <div className="col-md-4 form-group mb-4">
                            <label className="info_opd_bold">Remarks</label>
                            <div>{curElem.remarks}</div>
                           
                          </div>
                        </div>
                        {/* <div className="row justify-content-center">
                          <div className="col-md-8 form-group did-floating-label-content">
                            <Checkbox name="remember" /> <label>Send sms</label>
                          </div>
                        </div> */}
                        
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
  );
}
