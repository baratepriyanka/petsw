import React, { useState, useEffect } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
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

export default function EditBedCategoryForm() {
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;
  const {bedCategoryId} = useParams();
  const[bedCategoryEdit, setBedCategoryEdit] = useState({
    category_name: "",
    description: "",
    hospital_id: `${loginId}`,
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    const errors = validate(bedCategoryEdit);
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

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  const formIsValid = true;
  
  useEffect(() => {
    async function getBedCategoryEdit() {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-bed-category/${bedCategoryId}`);
        // console.log(response.data);
        setBedCategoryEdit(response.data);
      } catch (error) {
        alert(error.response.data);
      }
    }
    getBedCategoryEdit();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(bedCategoryEdit);
    }
  }, [bedCategoryId]);
  
  const formVAlidations = {
    description: 500,
    category_name:50
  };
  const formValidationName = {
    category_name: 'ward category',
    description: 'description',
  };
    function handleChange(e) {
      setBedCategoryEdit({
        ...bedCategoryEdit,
        [e.target.name]: e.target.value,
      });
      
      const value=e.target.value
      const name=e.target.name
      if (value) {
        e.target.parentElement.querySelector('p').innerText = '';
        e.target.parentElement.querySelector('p').style.display = 'none';
      } else {
        e.target.parentElement.querySelector('p').innerText = `Enter the ${formValidationName[name]}.`;
        e.target.parentElement.querySelector('p').style.display = 'block';
      } 
  
      if (formVAlidations[name] && value.length > formVAlidations[name]) {
        e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formVAlidations[name]} character.`;
        e.target.parentElement.querySelector('p').style.display = 'block';
      }
    }
  
  async function handleSubmit (e) {
    e.preventDefault();
    try
    {
      setFormErrors(validate(bedCategoryEdit));
      setIsSubmit(true);
      await axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/update-bed-category/${bedCategoryId}`, bedCategoryEdit)
      // alert("Record has been saved successfully");
    }
    catch (error) {
      console.log("Something is Wrong");
     }
  }
 const handleCloseButton = (e) => {
  navigate('/dashboard/WardCategory');
 }

  
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    const limit=500;
    if (!values.category_name) {
      errors.category_name = 'Enter the Ward Category ';
    }else if(values.category_name.slice(50, limit)){
      errors.category_name ='Enter the minimum 50 character';
    }   
    if (!values.description) {
      errors.description = 'Enter the Description';
    }else if(values.description.slice(450, limit)){
      errors.description ='Enter the minimum 500 character';
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
                  {/* {
                    bedCategoryEdit.map((bedCategoryEdit)=>{
                        return( */}
                    <div className="row">
                      <input type="hidden" value={bedCategoryEdit.hospital_id} />
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Ward Category</label>
                            <input
                              type="text"
                              name="category_name"
                              className="form-control"
                              id="category_name"
                              required=""
                              value={bedCategoryEdit.category_name}
                              onChange={handleChange}
                              autoComplete="off"
                              placeholder='Enter Ward Category'
                            />
                            <p style={{color: 'red' }}>{formErrors.category_name}</p>
                          </div>
                          </div>
                        <div className="row justify-content-center">

                          <div className="col-md-4 form-group">
                            <label>Description</label>
                            <textarea
                            type="text"
                            name="description"
                            className="form-control"
                            id="description"
                            required=""
                            value={bedCategoryEdit.description}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder='Enter Description'
                          />
                            <p style={{ color: 'red' }}>{formErrors.description}</p>
                          </div>
                        </div>
                       
                          <div className="text-center">
                        <button type="submit" className="btn btn-primary" onClick={handleOpen}>
                        Save
                        </button>
                        <button type="button" className="btn btn-secondary m-2" onClick={handleCloseButton}>
                        {/* onClick={handleOpen} */}
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
                          // onClick={deleteOpdRow}
                          className='ipdpatientok'
                          onClick={() => navigate('/dashboard/WardCategory')}
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
                    </div>
                    {/* )
                      })
                      } */}
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

