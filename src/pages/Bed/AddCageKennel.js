import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import './style.css';
import Axios from 'axios';
// @mui
import {
  Button,
  Typography,
  Box,
  Modal,
  Card,
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

export default function AddCageKennel() {

  const [masterBedCategoryData, setMasterBedCategoryData] = useState([]);
  const getMasterBedCategoryData = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-bed-category/${loginId}`);
   
    setMasterBedCategoryData(await response.json());
  };
  const [masterWardnumber, setMasterWardnumber] = useState([]);
  const getMasterWardnumber = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-wardnumber`);
    setMasterWardnumber(await response.json());
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };	
  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginId = loginData.hospital_id;
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/addbed`;

  const initialvalue = {
    bedid:'',
    ward_no: '',
    description: '',
    hospital_id:`${loginId}`
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { bedErr } = formErrors;
  const { colourErr } = formErrors;
  const { StateErr } = formErrors;
  const { CityErr } = formErrors;
  const { BreedErr } = formErrors;
  const formIsValid = true;
  const formVAlidations = {
    description: 500,
  };
  const formValidationName = {
    bedid: 'cage/cennel',
    description: 'description',
  };
  const formValSelectName = {
    ward_no: 'ward_no',  
  };
  function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length  === 0) { // check if space is at beginning
      event.preventDefault();
    }
  }
  // validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (value) {
      e.target.parentElement.querySelector('p').innerText = '';
      e.target.parentElement.querySelector('p').style.display = 'none';
    } else if (formValidationName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the ${formValidationName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    } else {
      e.target.parentElement.querySelector('p').innerText = `Select ${formValSelectName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }

    if (formVAlidations[name] && value.length > formVAlidations[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formVAlidations[name]} character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const [isLoggedin, setIsLoggedin] = useState(false);
  const logoutRedirect = () => {
    navigate('/');
  };

  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [s3image, setS3image] = useState();
  const [hospid, setHospId] = useState();
  const [hospitalid, setHospitalId] = useState();

  const [errorsMsg, seterrorsMsg] = useState();
  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem('token-info'));  
    if(loginData){
      setFname(loginData.fname);
      setLname(loginData.lname);
      setEmail(loginData.email);
      setS3image(loginData.s3image);
      setHospId(loginData.hosp_id);
      setHospitalId(loginData.hospital_id);
      setIsLoggedin(true);
    }
    else{
      setFname('');
      setLname('');
      setS3image('');
      setEmail('');
      setHospId('');
      setHospitalId('');
      logoutRedirect();
    }
    getMasterBedCategoryData();
    getMasterWardnumber();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      Axios.post(url, {
        bedid:formValues.bedid,
        ward_no: formValues.ward_no,
        description: formValues.description,
        hospital_id: formValues.hospital_id
      }).then((res) => {
        if(res.status === 208){
          seterrorsMsg(res.data.message)
          const msg ='';
          setTimeout(() =>  seterrorsMsg(msg), 1000)
          
        }else{
          setOpen(true);
        }
        
        // alert('Record has been saved successfully');
      });
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    const limit=500;
    if (!values.bedid) {
      errors.bedid = 'Enter the cage/kennel.';
    }
    if (values.ward_no ==='' || values.ward_no === 'select') {
      errors.bedErr= 'Select ward category.';
    }
    if (!values.description) {
      errors.description = 'Enter the description.';
    }else if(values.description.slice(450, limit)){
      errors.description ='Enter the minimum 500 character.';
      }
    return errors;
  };

  const handleCloseButton = (e) => {
    navigate('/dashboard/CageKennelList');
   }
  return (
    <>
    {isLoggedin ? (
      <Card>
      <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
              <div className="">
               <Typography variant="h4" gutterBottom> 
                    Add Cage/Kennel
                 </Typography>
                 <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                  <div className="container">
                    <div className="row mt-5">
                      <div className="row justify-content-center">
                             <input
                              type="hidden"
                              value={formValues.hospital_id}/>
                        <div className="col-md-4 form-group">
                          <label>Ward Category</label>
                          <select
                            style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                            required=""
                            id="ward_no"
                            name="ward_no"
                            onChange={(e) => handleChange(e)}
                            className="form-control"
                            value={formValues.ward_no}
                          >
                            <option>--Select--</option>
                            {masterBedCategoryData.map((curElem) => (
                              <option key={curElem.id} value={curElem.id}>
                                {curElem.category_name}
                              </option>
                            ))}
                          </select>
                          {bedErr && (
                            <p style={{color: 'red'}}>{bedErr}</p>
                            )}

                            {/* {bedErr === '' ? (<div style={{ color: 'red'}}>{bedErr}</div>):('')} */}
                        </div>

                        <div className="col-md-4 form-group">
                          <label>Cage /Kennel Number</label>
                           <input
                                type="text"
                                name="bedid"
                                className="form-control"
                                id="bedid"
                                required=""
                                autoComplete="off"
                                value={formValues.bedid}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => handleChange(e)}
                                placeholder="Enter Cage /Kennel Number"
                              />
                               
                               <p style={{color: 'red' }}>{formErrors.bedid}</p>
                               <p style={{color: 'red' }}>{errorsMsg}</p>
                               {/* {formValues.bedid === '' ? (<div style={{ color: 'red'}}>{formErrors.bedid}</div>):('')} */}
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-8 form-group">
                          <label>Description</label>
                          <textarea
                            name="description"
                            className="form-control"
                            id="description"
                            required=""
                            value={formValues.description}
                            onKeyDown={handleKeyDown}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder='Enter Description'
                          />
                          <p style={{color: 'red' }}>{formErrors.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center py-4">
                      <button type="submit" className="btn btn-primary" >
                      {/* onClick={handleOpen} */}
                      Save
                      </button>
                      <button type="button" className="btn btn-secondary m-2" onClick={handleCloseButton}>
                      Cancel
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
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} className='text-center'>
                        Record has been saved Successfully.
                        </Typography>
                       <div className='text-center'>
                       <Button
                          size="small"
                          type="button"
                          variant="contained"
                          // onClick={deleteOpdRow}
                          onClick={() => navigate('/dashboard/CreateNewCageKennl')}
                          // value={deleteId}
                          id=""
                          className='opdpatientok'
                          sx={{ mt: 2, backgroundColor: '#0d6efd' }}
                        >
                          Ok
                        </Button>
                       </div>
                      </Box>
                    </Modal>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      </Card>
      ) : ( 
          
          <h1>{" "}</h1>
      )}
  </>
  );
}
