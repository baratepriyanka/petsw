import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import './style.css';
import Axios from 'axios';
// @mui
import { Box, Grid } from '@mui/material';
// ----------------------------------------------------------------------

export default function InfoBedCategoryForm() {

  const {bedCategoryId} = useParams();
  const[bedCategoryEdit, setBedCategoryEdit] = useState([]);

  const getBedCategoryEdit = async () => {   
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-bed-category/${bedCategoryId}`);
    setBedCategoryEdit(await response.json());
    console.log("bedCategoryEdit");
    console.log(bedCategoryEdit);
  }
  
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web//updatebed/${bedCategoryId}`;

  const initialvalue = {
    bedcategory: '',
    description: '',
    
  };
  const [curElem, setcurElem] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { departmentErr } = formErrors;
  const { colourErr } = formErrors;
  const{StateErr}=formErrors;
  const {CityErr}=formErrors;
  const{BreedErr}=formErrors;
  const formIsValid = true;

  // validation

  const addValue = () => {
    setValues1([...values1, '']);
  };
  const handleValueChange = (index, e) => {
    values1[index] = e.target.value;
    console.log(values1);
    setValues1(values1);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setcurElem({ ...curElem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(curElem));
    setIsSubmit(true);
    Axios.post(url, {
      bedcategory: curElem.bedcategory,
      description: curElem.description,
            
      status: 0,      
    }).then((res) => {
      console.log(curElem);
    });
  };
 

  
  useEffect(() => {
    getBedCategoryEdit();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(curElem);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (!values.bedcategory) {
      errors.bedcategory = 'Bed Category is required';
    }   
    if (!values.description) {
      errors.description = 'description  is selected';
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
                  {
                    bedCategoryEdit.map((curElem)=>{
                        return(
                    <div className="row">
               
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Bed Category</label>
                            <input
                              type="text"
                              name="bedcategory"
                              className="form-control"
                              id="bedcategory"
                              required=""
                              value={curElem.bedcategory}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.bedcategory}</p>
                          </div>
                          </div>
                        <div className="row justify-content-center">

                          <div className="col-md-4 form-group">
                            <label>Description</label>
                            <input
                              type="description"
                              name="description"
                              className="form-control"
                              id="description"
                              required=""
                              value={curElem.description}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.description}</p>
                          </div>
                        </div>
                       
                          <div className="text-end py-4">
                    <button type="submit" className="btn btn-primary">
                      Sumbit
                    </button>
                  </div>
                    </div>
                    )
                      })
                      }
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

