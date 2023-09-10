import React, { useState, useEffect, useRef } from 'react';
import { useNavigate} from 'react-router-dom';
import './style.css';
import Axios from 'axios';
// @mui
import { 
  Button,
  Typography,
  Box,
  Modal 
} from '@mui/material';
// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};

export default function RegisterNewPatientForm() {
  const [image, setImage] = useState({ preview: '', raw: '' });

  const [masterGenderData, setMasterGenderData] = useState([]);

  const getMasterGenderData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-gender`);
    setMasterGenderData(await response.json());
  };

  const [masterDoctorData, setMasterDoctorData] = useState([]);

  const getMasterDoctorData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-doctor`);
    setMasterDoctorData(await response.json());
  };

  const [masterbloodgroup, setMasterbloodgroup] = useState([]);

  const getMasterbloodgroup = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-bloodgroup`);
    setMasterbloodgroup(await response.json());
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  const [patientname, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();
  const [bloodgroup, setBloodgroup] = useState();
  const [doctorid, setDoctorid] = useState();
  const [profile, setProfile] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (event) => {
    setProfile({
      ...profile,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };



  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { departmentErr } = formErrors;
  const { doctorerr } = formErrors;
  let formIsValid = true;
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-patient`;
  const handleSubmit = (e) => {
    // console.log("jhuj");
    e.preventDefault();
    const data = new FormData();
    data.append('patient_name', patientname);
    data.append('email', email);
    data.append('password', password);
    data.append('address', address);
    data.append('phone', phone);
    data.append('birthday', birthday);
    data.append('gender', gender);
    // data.append('birthday', birthday);
    data.append('bloodgroup', bloodgroup);
    data.append('doctor_id', doctorid);
    data.append('profile', profile.file);

    setFormErrors(validate(data));
    setIsSubmit(true);
    Axios.post(url, data, {headers: {"Access-Control-Allow-Origin": "*"}})
    // alert("please Enter valid data")
    .then((res) => {
      setOpen(true);
        
      })
      .catch((err) =>alert(err.res.data)
      );
  };

  useEffect(() => {
    getMasterGenderData();
    getMasterDoctorData();
    getMasterbloodgroup();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(data);
    }
  }, [formErrors]);
    const validate = (values) => {
      const errors = {};
      const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
      if (!values.patientName) {
        errors.patientName = 'Patient Name is required';
      }
      if (!values.patientId) {
        errors.patientId = 'Parent Name is required';
      }
      if (!values.doctor_id) {
        errors.doctorerr = 'Doctor Name is required';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      }
      if (!values.birthday) {
        errors.birthday = 'Admission Date is required';
      }
      if (values.gender === '' || values.gender === 'select') {
        formIsValid = false;
        errors.gender = 'select gender';
      }
      if (values.bloodgroup === '' || values.bloodgroup === 'select') {
        formIsValid = false;
        errors.bloodgroup = 'select Blood Group';
      }

      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!regex.test(values.email)) {
        errors.email = 'this is not a valid email';
      }
      if (!values.phone) {
        errors.phone = 'Phone is required';
      } else if (values.phone < 10) {
        errors.phone = 'this is not a valid phonenumber';
      }
      if (!values.address) {
        errors.address = 'Address is required';
      }
      if (!values.profile) {
        errors.profile = 'profile is required';
      }

      return errors;
    };

  return (
    <>
      <section className="screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
              <div className="">
                <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                  <div className="container">
                    <div className="row">
                      <div className="row justify-content-center">
                        <div className="col-md-4 form-group">
                          <label>Patient Name</label>
                          <input
                            type="text"
                            name="patient_name"
                            className="form-control"
                            id="patient_name"
                            required=""
                            // value={formValues.patient_name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="off"
                          />
                          {/* <p style={{ color: 'red' }}>{formErrors.patientName}</p> */}
                        </div>

                        <div className="col-md-4 form-group mt-3 mt-md-0">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            required=""
                            // value={formValues.email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                          />
                          {/* <p style={{ color: 'red' }}>{formErrors.email}</p> */}
                        </div>

                        <div className="col-md-4 form-group">
                          <label>password</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            required=""
                            // value={formValues.password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                          />
                          {/* <p style={{ color: 'red' }}>{formErrors.password}</p> */}
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            id="address"
                            required=""
                            // value={formValues.address}
                            onChange={(e) => setAddress(e.target.value)}
                            autoComplete="off"
                          />
                          {/* <p style={{ color: 'red' }}>{formErrors.address}</p> */}
                        </div>

                        <div className="col-md-4 form-group">
                          <label>Phone</label>
                          <input
                            type="number"
                            className="form-control"
                            id="phone"
                            name="phone"
                            // value={formValues.phone}
                            onChange={(e) => setPhone(e.target.value)}
                            autoComplete="off"
                          />
                          {/* <p style={{ color: 'red' }}>{formErrors.phone}</p> */}
                        </div>

                        <div className="col-md-4 form-group">
                          <label>Gender</label>
                          <select
                            style={{
                              width: '100%',
                              height: '35px',
                              borderRadius: '6px',
                            }}
                            required=""
                            type="text"
                            id="gender"
                            name="gender"
                            onChange={(e) => setGender(e.target.value)}
                            className={gender ? ' showError' : ''}
                            // value={formValues.gender}
                          >
                            <option>--select--</option>
                            {masterGenderData.map((curElem) => (
                              <option key={curElem.id} value={curElem.id}>
                                {curElem.name}
                              </option>
                            ))}
                          </select>

                            {/* {gender && (
                            <div style={{ color: "red" }}>
                              {gender}
                            </div>
                          )} */}

                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-4 form-group">
                          <label>Birth Date</label>
                          <input
                            type="date"
                            name="birthday"
                            className="form-control"
                            id="birthday"
                            required=""
                            // value={formValues.birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            autoComplete="off"
                          />
                          {/* <p style={{ color: 'red' }}>{formErrors.birthday}</p> */}
                        </div>

                        <div className="col-md-4 form-group mb-4">
                          <label>Doctor</label>
                          <select
                            style={{
                              width: '100%',
                              height: '35px',
                              borderRadius: '6px',
                            }}
                            required=""
                            type="text"
                            id="doctor_id"
                            name="doctor_id"
                            onChange={(e) => setDoctorid(e.target.value)}
                            className={doctorerr ? " showError" : ""}
                            // value={formValues.doctor_id}
                          >
                            <option>--select--</option>
                            {masterDoctorData.map((curElem) => (
                              <option key={curElem.id} value={curElem.id}>
                                {curElem.doctor_name}
                              </option>
                            ))}
                          </select>
                          {/* {doctorerr && (
                            <div style={{ color: "red" }}>
                              {doctorerr}
                            </div>
                          )} */}
                        </div>
                        <div className="col-md-4 form-group mb-4">
                          <label>Blood Group</label>
                          <select
                            style={{
                              width: '100%',
                              height: '35px',
                              borderRadius: '6px',
                            }}
                            required=""
                            type="text"
                            id="bloodgroup"
                            name="bloodgroup"
                            onChange={(e) => setBloodgroup(e.target.value)}
                            className={bloodgroup ? ' showError' : ''}
                            // value={formValues.bloodgroup}
                          >
                            <option>--select--</option>
                            {masterbloodgroup.map((curElem) => (
                              <option key={curElem.id} value={curElem.id}>
                                {curElem.name}
                              </option>
                            ))}
                          </select>

                          {/* {bloodgroup && <div style={{ color: 'red' }}>{bloodgroup}</div>} */}
                        </div>
                      
                      </div>
                      <div className="row ">
                        <div className="col-md-4 form-group">
                          <label>profile</label>
                          <input
                            type="file"
                            className="form-control "
                            id="profile"
                            name="profile"
                            // value={profile}
                            onChange={handleInputChange}
                            // onChange={(e) => setProfile(e.target.files[0])}
                            autoComplete="off"
                          />
                          {/* <img src={profile}/>  */}
                          {/* <p style={{ color: 'red' }}>{formErrors.profile}</p> */}
                        </div>
                        <div className="col-md-4 form-group">
                        {profile.filepreview !== null ? (
                          <img className="previewimg" src={profile.filepreview} alt="UploadImage" />
                        ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-end py-4">
                    <button type="submit" className="btn btn-primary">
                    Submit
                    </button>
                    <Modal
                      open={open}
                      // onClick={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          {/* Text in a modal */}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Record has been saved successfully.
                        </Typography>
                        <Button
                          size="small"
                          type="button"
                          variant="contained"
                          // onClick={deleteOpdRow}
                          onClick={() => navigate('/dashboard/PatientList')}
                          // value={deleteId}
                          id=""
                          sx={{ mt: 2, backgroundColor: '#710808' }}
                        >
                          Ok
                        </Button>
                      </Box>
                    </Modal>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
