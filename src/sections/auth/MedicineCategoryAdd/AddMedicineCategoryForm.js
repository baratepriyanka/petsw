import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
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

export default function AddMedicineListForm() {

  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-master-category`;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  const initialvalue = {
    name: '',
    description: '',
     
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const formVAlidations = {
    name: 20,
    description: 500,
  };
  const formValidationName = {
    name: 'category name',
    description:'description'
  };
  function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length  === 0) { // check if space is at beginning
      event.preventDefault();
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
   
  };

  useEffect(() => {
  
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      Axios.post(url, {
        name: formValues.name,
        description: formValues.description,
        
      }).then((res) => {
        setOpen(true)
        // console.log(formValues);
        // alert("Record has been saved successfully");
  
      });
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const limit=500;
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
                              value={formValues.name}
                              onKeyDown={handleKeyDown}
                              onChange={handleChange}
                              autoComplete="off"
                              placeholder='Enter Category'
                            />
                            <p style={{color: 'red' }}>{formErrors.name}</p>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                        <div className="col-md-4 form-group">
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
                    </div>
                  </div>
                  <div className="text-center" style={{marginLeft: '-29px'}}>
                    <button type="submit" className="btn btn-primary">
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
                        Record has been saved Successfully.
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

