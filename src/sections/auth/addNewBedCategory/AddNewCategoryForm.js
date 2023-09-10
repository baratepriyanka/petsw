import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Axios from 'axios';
// @mui
import { Button, Typography, Box, Modal } from '@mui/material';
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

export default function AddNewDoctorForm() {
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/addbedcategory`;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;
  const initialvalue = {
    category_name: '',
    description: '',
    hospital_id: `${loginId}`,
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { departmentErr } = formErrors;
  const { colourErr } = formErrors;
  const { StateErr } = formErrors;
  const { CityErr } = formErrors;
  const { BreedErr } = formErrors;
  const formIsValid = true;

  // validation
  const formVAlidations = {
    description: 500,
    category_name: 50,
  };
  const formValidationName = {
    category_name: 'ward category',
    description: 'description',
  };
  function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length === 0) {
      // check if space is at beginning
      event.preventDefault();
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleCloseButton = (e) => {
    navigate('/dashboard/WardCategory');
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setOpen(true);
      Axios.post(
        url,
        {
          category_name: formValues.category_name,
          description: formValues.description,
          hospital_id: formValues.hospital_id,
        },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      ).then((res) => {
        console.log(res);
        // alert("Record has been saved successfully");
      });
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    const limit = 500;
    if (!values.category_name) {
      errors.category_name = 'Enter the ward category.';
    } else if (values.category_name.slice(50, limit)) {
      errors.category_name = 'Enter the minimum 50 character.';
    }
    if (!values.description) {
      errors.description = 'Enter the description.';
    } else if (values.description.slice(450, limit)) {
      errors.description = 'Enter the minimum 450 character.';
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
                      <input type="hidden" value={formValues.hospital_id} />
                      <div className="row justify-content-center">
                        <div className="col-md-4 form-group">
                          <label>Ward Category</label>
                          <input
                            type="text"
                            name="category_name"
                            className="form-control"
                            id="category_name"
                            required=""
                            value={formValues.category_name}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            autoComplete="off"
                            placeholder="Enter Ward Category"
                          />
                          <p style={{ color: 'red' }}>{formErrors.category_name}</p>
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
                            placeholder="Enter Description"
                          />
                          <p style={{ color: 'red' }}>{formErrors.description}</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">
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
                            <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-center">
                              Record has been saved Successfully.
                            </Typography>
                            <div className="text-center">
                              <Button
                                size="small"
                                type="button"
                                variant="contained"
                                // onClick={deleteOpdRow}
                                onClick={() => navigate('/dashboard/WardCategory')}
                                // value={deleteId}
                                id=""
                                className="ipdpatientok"
                                sx={{ mt: 2, backgroundColor: '#0d6efd' }}
                              >
                                Ok
                              </Button>
                            </div>
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
