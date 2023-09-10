import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import axios from 'axios';
// @mui
import { Box, Grid } from '@mui/material';
// ----------------------------------------------------------------------

export default function InfoBedForm() {
  const { bedId } = useParams();
  const [bedEdit, setBedEdit] = useState({ bedcategory: '', bednumber: '', description: '' });

  // const url = 'http://localhost:8086/web/addbed';

  const[masterBedCategoryData, setMasterBedCategoryData] = useState([]);

  const getMasterBedCategoryData = async () =>{
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-bed-category`);
    setMasterBedCategoryData(await response.json());
    // console.log(masterMedicineData);
  }


  useEffect(() => {
    getMasterBedCategoryData();
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
    // getMasterCategoryData();

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(medicineEdit);
    }
  }, [bedId]);

  // const [bedEdit, setbedEdit] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { bedErr } = formErrors;
  const { colourErr } = formErrors;
  const { StateErr } = formErrors;
  const { CityErr } = formErrors;
  const { BreedErr } = formErrors;
  const formIsValid = true;

  // validation

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setbedEdit({ ...bedEdit, [name]: value });
  // };
  function handleChange(e) {
    setBedEdit({
      ...bedEdit,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault()
    try {
     await axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/updatebed/${bedId}`, bedEdit)
     console.log("valid");
     setFormErrors(validate(bedEdit));
     setIsSubmit(true);
    } catch (error) {
     console.log("Something is Wrong");
    }
   }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate(bedEdit));
  //   setIsSubmit(true);
  //   Axios.post(url, {
  //     bedcategory: bedEdit.bedcategory,
  //     bednumber: bedEdit.bednumber,
  //     description: bedEdit.description,
  //   }).then((res) => {
  //     console.log(bedEdit);
  //   });
  // };

  // useEffect(() => {
  //   getBedEdit();
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(bedEdit);
  //   }
  // }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (!values.bedcategory) {
      errors.bedcategory = 'Patient Name is required';
    }
    if (!values.bednumber) {
      errors.bednumber = 'Parent Name is required';
    }
    if (!values.description) {
      errors.description = 'Patient Age is required';
    }

    return errors;
  };
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
                          <div className="form-group">
                            <label>Bed Category</label>                                                  
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="bedcategory"
                              name="bedcategory"
                               onChange={e => handleChange(e)}
                              className={bedErr ? ' showError' : ''}
                              value={bedEdit.bedcategory}
                            >
                            <option>--select--</option>
                            {masterBedCategoryData.map(curElem => (
                              <option key={curElem.id} value={curElem.bedcategory}>
                                  {curElem.bedcategory}
                              </option>
                              ))}
                            </select>
                            {bedErr && <div style={{ fontWeight: 'bold',color: 'red', paddingBottom: 10 }}>{bedErr}</div>}
                          </div>

                            <div className=" form-group">
                              <label>Bed ID</label>
                              <input
                                type="text"
                                name="bednumber"
                                className="form-control"
                                id="bednumber"
                                required=""
                                value={bedEdit.bednumber}
                                onChange={handleChange}
                                autoComplete="off"
                              />
                              <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.bednumber}</p>
                            </div>

                            <div className=" form-group">
                              <label>description</label>
                              <input
                                type="text"
                                name="description"
                                className="form-control"
                                id="description"
                                required=""
                                value={bedEdit.description}
                                onChange={handleChange}
                                autoComplete="off"
                              />
                              <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.description}</p>
                            </div>
                          </div>
                        </div>
                      {/* );
                    })} */}
                  </div>
                  <div className="text-end py-4">
                    <button type="submit" className="btn btn-primary">
                      Sumbit
                    </button>
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
