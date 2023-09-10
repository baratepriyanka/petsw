import React, { useState, useEffect } from 'react';
import {useParams ,useNavigate} from 'react-router-dom';
import './style.css';
import axios from 'axios';
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

export default function EditOpdForm() {
  const {doctorId} = useParams();
  const [masterGenderData, setMasterGenderData] = useState([]);

  const getMasterGenderData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-department`);
    setMasterGenderData(await response.json());
    // console.log(masterGenderData);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    const errors = validate(curElem);
    console.log(errors)
    if (Object.keys(errors).length) {
      setFormErrors(errors);
    } else {
      setOpen(true);
      // navigate('afterlogin');
    }
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginId = loginData.hospital_id

  const [curElem, setcurElem] = useState({
    doctor_name: '',
    email: '',
    education: '',
    phone: '',
    department: '',
    gender: '',
    password:'',
    address: '',
    hospital_id: `${loginId}`
  });
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


  useEffect(() => {
    async function getDoctorEdit() {
      try {
       const response = await axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-doctor/${doctorId}`)
      //  console.log(student.data);
       setcurElem(response.data);
       
      } catch (error) {
       console.log("Something is Wrong");
       console.log(error.response.data);
      }
     }
    getDoctorEdit();
    getMasterGenderData();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(curElem);
    }
  }, [doctorId]);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { department } = formErrors;
  const { colourErr } = formErrors;
  const{StateErr}=formErrors;
  const {CityErr}=formErrors;
  const{BreedErr}=formErrors;
  const formIsValid = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcurElem({ ...curElem, [name]: value });
  };

  async function handleSubmit (e) {
    e.preventDefault();
    try {
      setFormErrors(validate(curElem));
      setIsSubmit(true);
      await axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/updatedoctor/${doctorId}`, curElem)
      .then((response) =>{
        const data = response.data.post
        const data1 = new FormData();
        data1.append('profile', profile.file);
        const url1 = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/update-doctor-demo/${doctorId}`;
        const response1 = axios.post(url1, data1, {headers: {"Access-Control-Allow-Origin": "*"}})
        .then((res) =>{
          console.log("res")
          // console.log(response1)
        }).catch((error)=>{
          alert(error.response.data);
        })
          
      })
     
     } catch (error) {
      console.log("Something is Wrong");
     }
  };

 
  const validate = (values) => {
    const errors = {};
    const limit = 225;
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (!values.doctor_name) {
      errors.doctor_name = 'Enter the Patient name';
    }else if(values.doctor_name.slice(20, limit)){
      errors.doctor_name ='Enter the minimum 20 character';
      }   
    if (!values.department) {
      errors.department = 'Department is selected';
    }
    if (!values.profile) {
      errors.profile = 'profile is selected';
    }
    // if (!values.education) {
    //   errors.education = 'Case is required';
    // }
    if (!values.address) {
      errors.address = 'Enter the Address ';
    }else if(values.address.slice(50, limit)){
      errors.address ='Enter the minimum 50 character';
      }

    if (!values.email) {
      errors.email = 'Enter the Email ';
    } else if (!regex.test(values.email)) {
      errors.email = 'this is not a valid email';
    }

    if (!values.phone) {
      errors.phone = 'Enter the  Mobile number';
    } else if (values.phone.length < 10) {
      errors.phone = 'this is not a valid mobile number';
    }else if (values.phone.length > 10) {
      errors.phone = 'minimum 10 digit';
    } 
    if (!values.password) {
      errors.password = 'Enter the password ';
    }
     
    return errors;
  };
  return (
    <>
       <section className="contact-screen-one ipad-height">
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
                          value={curElem.hospital_id}
                        />
                          <div className="col-md-4 form-group">
                            <label>Doctor Name</label>
                            <input
                              type="text"
                              name="doctor_name"
                              className="form-control"
                              id="doctor_name"
                              required=""
                              value={curElem.doctor_name}
                              onChange={e => handleChange(e)}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.doctor_name}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>Email</label>
                            <input
                              type="text"
                              name="email"
                              className="form-control"
                              id="email"
                              required=""
                              value={curElem.email}
                                 onChange={e => handleChange(e)}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.email}</p>
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
                              value={curElem.password}
                                 onChange={e => handleChange(e)}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.password}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              name="address"
                              className="form-control"
                              id="address"
                              required=""
                              value={curElem.address}
                                 onChange={e => handleChange(e)}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.address}</p>
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
                              value={curElem.phone}
                                 onChange={e => handleChange(e)}
                              autoComplete="off"
                            />
                            <p style={{ color: 'red' }}>{formErrors.phone}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label>Department</label>
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="department"
                              name="department"
                                 onChange={e => handleChange(e)}
                              className={department ? ' showError' : ''}
                              value={curElem.department}
                            >
                              <option>--select--</option>

                              {masterGenderData.map((curElem) => (
                                <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                                </option>
                              ))}
                              {/* {{ background: props.backg, ...style }} */}
                            </select>
                            {department && (
                              <div style={{ color: 'red', paddingBottom: 10 }}>{department}</div>
                            )}
                          </div>

                          </div>
                          <div className="row justify-content-center">
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
                              ) : <img className="previewimg" src={curElem.s3image} alt="UploadImage" />}
                              </div>
                            </div>
                            
                          </div>
                          <div className="text-end py-4">
                    <button type="submit" className="btn btn-primary" onClick={handleOpen}>
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
                        Record has been updated successfully.
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

