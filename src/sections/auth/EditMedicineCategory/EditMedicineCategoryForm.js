import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
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

export default function AddMedicineListForm() {
  const {medCatId} = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    const errors = validate(medCatIdEdit);
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

  const[medCatIdEdit, setmedCatIdEdit] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    async function getmedCategoryIdEdit() {
     try {
      const response = await axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-master-category/${medCatId}`)
      // console.log(response.data);
      setmedCatIdEdit(response.data);
     } catch (error) {
      console.log("Something is Wrong");
     }
    }
    getmedCategoryIdEdit();
   
   
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(medCatIdEdit);
    }
   }, [medCatId]);

   const formVAlidations = {
    name: 20,
    description: 500,
  };
  const formValidationName = {
    name: 'category name',
    description:'description'
  };
   function handleChange(e) {
    setmedCatIdEdit({
     ...medCatIdEdit,
     [e.target.name]: e.target.value
    })
    const value=e.target.value
    const name=e.target.name
    if (value) {
      e.target.parentElement.querySelector('p').innerText = '';
      e.target.parentElement.querySelector('p').style.display = 'none';
    } else{
      e.target.parentElement.querySelector('p').innerText = `Enter the ${formValidationName[name]}.`;
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
      setFormErrors(validate(medCatIdEdit));
      setIsSubmit(true);
     await axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/update-master-category/${medCatId}`, medCatIdEdit)
    //  console.log("valid");
    //  alert("Record has been saved successfully");

    } catch (error) {
     console.log("Something is Wrong");
    }
   }

   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);
 
 
  const validate = (values) => {
    const errors = {};
    const limit=225;
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (!values.name) {
      errors.name = 'Enter the category name. ';
    }else if(values.name.slice(20, limit)){
      errors.name ='Enter the minimum 20 character';
    }

    if (!values.description) {
    errors.description ='Enter the description';
    }else if(values.description.slice(500, limit)){
    errors.description ='Enter the minimum 500 character';
    }  
    return errors;
  };

  const handleCloseButton = () =>{
    navigate('/dashboard/MedicineCategory')
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
                    <div className="row">
                      <div className="row">
                        <div className="row justify-content-center">
                        <div className="col-md-4 form-group">
                            <label>Category</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              id="name"
                              required=""
                              value={medCatIdEdit.name}
                                onChange={e => handleChange(e)}
                              autoComplete="off"
                              placeholder='Enter Category'
                            />
                            <p style={{ color: 'red' }}>{formErrors.name}</p>
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
                              value={medCatIdEdit.description}
                                onChange={e => handleChange(e)}
                              autoComplete="off"
                              placeholder='Enter Description'

                            />
                            <p style={{ color: 'red' }}>{formErrors.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center" style={{marginLeft: '-29px'}}>
                    <button type="submit" className="btn btn-primary" onClick={handleOpen}>
                    Save
                    </button>
                    <button type="button" className="btn btn-secondary m-3" onClick={handleCloseButton}>
                      Cancel
                    </button>
                 
                  </div>
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
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-center">
                        Record has been updated Successfully.
                        </Typography>
                       <div className='text-center'>
                       <Button
                          size="small"
                          type="button"
                          variant="contained"
                          // onClick={deleteOpdRow}
                          className='ipdpatientok'
                          onClick={() => navigate('/dashboard/MedicineCategory')}
                          // value={deleteId}
                          id=""
                          sx={{ mt: 2, backgroundColor: '#0d6efd' }}
                        >
                          Ok
                        </Button>
                       </div>
                      </Box>
                    </Modal>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

