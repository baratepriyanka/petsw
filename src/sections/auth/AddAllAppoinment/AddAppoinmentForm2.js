import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Checkbox } from '@mui/material';

// ----------------------------------------------------------------------

export default function AddAppoinmentForm() {
  const initialvalue = {
    patient: '',
    doctor: '',
    Pincode: '',
    AdmissionDate: '',
    Address: '',
    AvailableSlots: '',
    Appointment: '',
    Remarks: '',
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const navigate = useNavigate();

  const addValue = () => {
    setValues1([...values1, '']);
  };

  const [doctor, setDoctor] = React.useState('');
  const [slot, setslot] = React.useState('');

  const { DoctorErr } = formErrors;
  const { PatientErr } = formErrors;
  const { AvailableSlotsErr } = formErrors;
  const { AppointmentErr } = formErrors;
  let formIsValid = true;

  const handledoctor = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...formValues, [name]: value });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const Availableslot = (event) => {
    setslot(event.target.value);
  };

  // const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    patient: Yup.string().required('patient is required'),
    doctor: Yup.string().required('Doctor is required'),
    Date: Yup.string().required('Date is required'),
    AvailableSlots: Yup.string().required('Available Slots is required'),
    Appointment: Yup.string().required(' Appointment Status is required'),
    Remarks: Yup.string().required('Remarks is required'),
  });

  const defaultValues = {
    patient: '',
    doctor: '',
    Date: '',
    availableslots: '',
    Appointment: '',
    Remarks: '',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    Axios.post({
      Remarks: formValues.Remarks,

      status: 0,
      patient_id: 2,
    }).then((res) => {
      console.log(formValues);
    });
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });


  const onSubmit = async () => {
    navigate('/dashboard', { replace: true });
  };

  useEffect(() => {
   
   
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
   
    if (!values.Date) {
      errors.Date = 'Date is required';
    }
    if (values.patient === '' || values.patient === 'select') {
      formIsValid = false;
      errors.PatientErr = 'Select patient.';
    }
    if (values.doctor === '' || values.doctor === 'select') {
      formIsValid = false;
      errors.DoctorErr = 'Select Doctor.';
    }
    if (!values.Remarks) {
      errors.Remarks = 'Remark is required';
    }
    if (values.Appointment === '' || values.Appointment === 'select') {
      formIsValid = false;
      errors.AppointmentErr = 'Select Appointment';
    }
    if (values.AvailableSlots === '' || values.AvailableSlots === 'select') {
      formIsValid = false;
      errors.AvailableSlotsErr = 'Select AvailableSlots';
    }

    return errors;
  };

  return (
    <section className="contact-screen-one ipad-height">
      <div className="container">
        <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
          <div className="row justify-content-center">
            <div className="col-md-4 form-group did-floating-label-content">
              <label>Patient</label>

              <select
                style={{ width: '100%', height: '37px', borderRadius: '7px', marginTop: '7px' }}
                required=""
                type="text"
                id="selectCtrl"
                name="patient"
                onChange={handleChange}
                className={PatientErr ? ' showError' : ''}
                value={formValues.patient}
              >
                <option>Select</option>
                <option>Patient</option>
              </select>
              {PatientErr && <div style={{ fontWeight: 'bold', color: 'red', paddingBottom: 10 }}>{PatientErr}</div>}
            </div>

            <div className="col-md-4 form-group did-floating-label-content">
              <label>Doctor</label>

              <select
                style={{ width: '100%', height: '37px', borderRadius: '7px', marginTop: '7px' }}
                required=""
                type="text"
                id="selectCtrl"
                name="doctor"
                onChange={handleChange}
                className={DoctorErr ? ' showError' : ''}
                value={formValues.doctor}
              >
                <option>Select</option>
                <option>Doctor</option>
              </select>
              {DoctorErr && <div style={{ fontWeight: 'bold', color: 'red', paddingBottom: 10 }}>{DoctorErr}</div>}
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-4 form-group did-floating-label-content">
              <label>Date</label>
              <input
                id="float"
                className="did-floating-input form-control mt-2"
                type="Date"
                name="Date"
                value={formValues.Date}
                onChange={handleChange}
                required=""
                autoComplete="off"
              />
              <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.Date}</p>
            </div>
            <div className="col-md-4 form-group did-floating-label-content">
              <label>Available Slots</label>

              <select
                style={{ width: '100%', height: '37px', borderRadius: '7px', marginTop: '7px' }}
                required=""
                type="text"
                id="selectCtrl"
                name="AvailableSlots"
                onChange={handleChange}
                className={AvailableSlotsErr ? ' showError' : ''}
                value={formValues.AvailableSlots}
              >
                <option>Select</option>
                <option>AvailableSlots</option>
              </select>
              {AvailableSlotsErr && (
                <div style={{ fontWeight: 'bold', color: 'red', paddingBottom: 10 }}>{AvailableSlotsErr}</div>
              )}
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-4 form-group did-floating-label-content">
              <label>Appointment Status</label>
              <select
                style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                required=""
                type="text"
                id="selectCtrl"
                name="Appointment"
                onChange={handleChange}
                className={AppointmentErr ? ' showError' : ''}
                value={formValues.Appointment}
              >
                <option>Select</option>
                <option>Treated</option>
                <option>confirmed</option>
                <option>Cancelled</option>
              </select>
              {AppointmentErr && (
                <div style={{ fontWeight: 'bold', color: 'red', paddingBottom: 10 }}>{AppointmentErr}</div>
              )}
            </div>

            <div className="col-md-4 form-group did-floating-label-content">
              <label>Remarks</label>
              <input
                type="text"
                name="Remarks"
                className="form-control"
                id="Remarks"
                required=""
                value={formValues.Remarks}
                onChange={handleChange}
                autoComplete="off"
              />
              <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.Remarks}</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 form-group did-floating-label-content">
              <Checkbox name="remember" /> <label>Send sms</label>
            </div>
          </div>
          <div className="text-end py-4">
            <button type="submit" className="btn btn-primary">
              Sumbit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
