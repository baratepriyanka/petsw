import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

export default function EditBedForm() {
  const { bedId } = useParams();
  
  const[masterBedCategoryData, setMasterBedCategoryData] = useState([]);
  const getMasterBedCategoryData = async () =>{
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-bed-category/${loginId}`);
    setMasterBedCategoryData(await response.json());
    // console.log(masterMedicineData);
  }
  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginId = loginData.hospital_id;
  const [bedEdit, setBedEdit] = useState({ bedcategory: '', bednumber: '', description: '' , hospital_id: `${loginId}`});
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    const errors = validate(bedEdit);
    // console.log(errors)
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

  useEffect(() => {
    async function getBedEdit() {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-Bed/${bedId}`);
        // console.log(response.data);
        setBedEdit(response.data);
      } catch (error) {
        console.log('Something is Wrong');
      }
    }
    getBedEdit();
    getMasterBedCategoryData();
    // getMasterCategoryData();

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(medicineEdit);
    }
  }, [bedId]);

  // const [bedEdit, setbedEdit] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
 
  const { bedErr } = formErrors;
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
  function handleChange(e) {
    setBedEdit({
      ...bedEdit,
      [e.target.name]: e.target.value,
    });

    const value=e.target.value
    const name=e.target.name

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
  }
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setFormErrors(validate(bedEdit));
      setIsSubmit(true);
     await axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/updatebed/${bedId}`, bedEdit).then((response) => {

        // console.log(response);
     })
    } catch (error) {
     console.log("Something is Wrong");
    }
   }

  const validate = (values) => {
    const errors = {};
    const limit=500;
    if (!values.bedid) {
      errors.bedid = 'Enter the Cage/Kennel number';
    }
    if (!values.ward_no) {
      errors.bedErr = 'Select Ward Category';
    } 
    if (!values.description) {
      errors.description = 'Enter the Description';
    }else if(values.description.slice(450, limit)){
      errors.description ='Enter the minimum 500 character';
      } 

    return errors;
  };
  const handleCloseButton = (e) => {
    navigate('/dashboard/CageKennelList');
   }
  return (
    <>
      <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
              <div className="">
                <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                  <div className="container">
                    {/* {bedEdit.map((bedEdit) => {
                      return ( */}
                        <div className="row">
                          <div className="row justify-content-center">
                          <input
                            type="hidden"
                            value={bedEdit.hospital_id}
                          />
                          <div className="col-md-4 form-group">
                          <label>Ward Category</label>
                          <select
                            style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                            required=""
                            id="ward_no"
                            name="ward_no"
                            onChange={(e) => handleChange(e)}
                            className="form-control"
                            value={bedEdit.ward_no}
                          >
                            {/* <option value=''>--Select--</option> */}
                            {masterBedCategoryData.map((curElem) => (
                              <option key={curElem.id} value={curElem.id}>
                                {curElem.category_name}
                              </option>
                            ))}
                          </select>
                          {bedErr && (
                            <p style={{color: 'red'}}>{bedErr}</p>
                            )}
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
                                value={bedEdit.bedid}
                                onChange={(e) => handleChange(e)}
                                placeholder="Enter Cage /Kennel Number"
                              />
                               <p style={{color: 'red' }}>{formErrors.bedid}</p>
                            </div>
                            </div>
                            <div className="row justify-content-center">
                            <div className="col-md-8 form-group">
                              <label>Description</label>
                              <textarea 
                                type="text"
                                name="description"
                                className="form-control"
                                id="description"
                                required=""
                                value={bedEdit.description}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Description"
                              />
                              <p style={{color: 'red' }}>{formErrors.description}</p>
                            </div>
                            </div>
                        </div>
                      {/* );
                    })} */}
                  </div>
                  <div className="text-center py-4">
                    <button type="submit" className="btn btn-primary" onClick={handleOpen}>
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
                        Record has been updated Successfully.
                        </Typography>
                        <div className='text-center'>
                        <Button
                          size="small"
                          type="button"
                          variant="contained"
                          className='ipdpatientok'
                          // onClick={deleteOpdRow}
                          onClick={() => navigate('/dashboard/CageKennelList')}
                          // value={deleteId}
                          id=""
                          sx={{ mt: 2, backgroundColor: '#0d6efd' }}
                        >
                          Ok
                        </Button>
                        </div>
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
