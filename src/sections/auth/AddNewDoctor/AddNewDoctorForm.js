import React, { useState, useEffect } from 'react';
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
}
export default function AddNewDoctorForm() {
  const [masterdepartment, setMasterDepartment] = useState([]);
  const getMasterDepartment = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-department`);
    setMasterDepartment(await response.json());
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginId = loginData.hospital_id;

  const [hospitalId, sethospitalId] = useState(loginId);
  const [doctorName, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [department, setDepartment] = useState();
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
  const [erro, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { departmentErr } = formErrors;



  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/adddoctor`;


  const handleSubmit = async (e) => {
    // console.log("jhuj");
    e.preventDefault();
      const data = new FormData();
      data.append('hospital_id',hospitalId);
      data.append('doctor_name',doctorName);
      data.append('email', email);
      data.append('password', password);
      data.append('address', address);
      data.append('phone', phone);
      data.append('department', department);
      data.append('profile', profile.file);
      setFormErrors(validate(data));
      setIsSubmit(true);
     const response = await Axios.post(url, data, {headers: {"Access-Control-Allow-Origin": "*"}})
    //  setOpen(true)
     .then((res) => {
      console.log(res)
      setOpen(true);
    })
    .catch((err) => 
    alert(err.res.data)
    );
  };
 
  useEffect(() => {
    getMasterDepartment();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(data);
    }
  }, [formErrors]);
  const validate = (values)  => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (!values.doctorName) {
      errors.doctor_name = 'Patient Name is required';
    }
    if (!values.department) {
      errors.departmentErr  = 'Department  is selected';
    }
    if (!values.profile) {
      errors.profile = 'Profile is required';
    }
    if (!values.address) {
      errors.address = 'Address is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
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
    if (!values.image) {
      errors.image = 'image is required';
    }

    return errors;
  };

  return (
    <>
   
      <section className="screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-5">
            <div className="row">
              <div className="">
                <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                  <div className="container">
                    <div className="row">
                      <div className="row justify-content-center">
                      <input
                              type="hidden"
                              name="hospital_id"
                              onChange={(e) => sethospitalId(e.target.value)}/>
                        <div className="col-md-4 form-group">
                          <label>Doctor Name</label>
                          <input
                            type="text"
                            name="doctor_name"
                            className="form-control"
                            id="doctor_name"
                            required=""
                            // value={doctorName}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="off"
                          />
                          {/* <p style={{ color: 'red' }}>{formErrors.doctorName}</p> */}
                        </div>

                        <div className="col-md-4 form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="email"
                            required=""
                            // value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                          />
                          {/* <p style={{ color: 'red' }}>{formErrors.email}</p> */}
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-4 form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            required=""
                            // value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                          />
                          {/* <p style={{ color: 'red' }}>{formErrors.password}</p> */}
                        </div>

                        <div className="col-md-4 form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            name="address"
                            className="form-control"
                            id="address"
                            required=""
                            // value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            autoComplete="off"
                          />
                          {/* <p style={{ color: 'red' }}>{formErrors.address}</p> */}
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                          <label>Mobile No.</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            id="phone"
                            required=""
                            // value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            autoComplete="off"
                          />
                          {/* <p style={{ color: 'red' }}>{formErrors.phone}</p> */}
                        </div>
                        <div className="col-md-4 form-group">
                          <label>Department</label>
                          <select
                            style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                            required=""
                            type="text"
                            id="department"
                            name="department"
                            //  onChange={e => handleChange(e)}
                            // value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            // className={departmentErr  ? ' showError' : ''}
                          >
                            <option>--select--</option>
                            {masterdepartment.map((curElem) => (
                              <option key={curElem.id} value={curElem.id}>
                                {curElem.name}
                              </option>
                            ))}
                          </select>
                          {/* {departmentErr && <div style={{ color: 'red', paddingBottom: 10 }}>{departmentErr}</div>} */}
                        </div>  
                      </div>
                      <div className="row justify-content-center">
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
                        {/* <img src={profile}  className="images_pro" alt='' /> */}
                        <div className="col-md-4 form-group">
                        {profile.filepreview !== null ? (
                          <img className="previewimg" src={profile.filepreview} alt="UploadImage" />
                        ) : null}
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
                          onClick={() => navigate('/dashboard/ListOfDoctor')}
                          // value={deleteId}
                          id=""
                          sx={{ mt: 2, backgroundColor: '#710808' }}
                        >
                          Ok
                        </Button>
                      </Box>
                    </Modal>
                      </div>
                    </div>
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
