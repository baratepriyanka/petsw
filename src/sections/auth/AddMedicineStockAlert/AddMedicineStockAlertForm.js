import React, { useState, useEffect } from 'react';
import './style.css';
import Axios from 'axios';
// @mui
import { Box, Grid } from '@mui/material';
// ----------------------------------------------------------------------

export default function AddMedicineStockAlertForm() {

  const[masterCategoryData, setMasterCategoryData] = useState([]);

  const getMasterCategoryData = async () =>{
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-category`);
    setMasterCategoryData(await response.json());
    console.log(masterCategoryData);
  }
  
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-medicine`;

  const initialvalue = {
    name: '',
    category: '',
    purchaseprice: '',
    saleprice: '',
    quantity: '',
    company: '',
    effects: '',
    storebox: '',
    expiredate: ''   
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { sexErr } = formErrors;
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
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    Axios.post(url, {
      medicine_name: formValues.name,
      category: formValues.category,
      purchase_price: formValues.purchaseprice,
      sale_price: formValues.saleprice,
      quantity: formValues.quantity,
      company: formValues.company,
      effects: formValues.effects,
      store_box: formValues.storebox,
      exp_date: formValues.expiredate,
         
    }).then((res) => {
      console.log(formValues);
      alert("Record has been saved successfully");

    });
  };

  useEffect(() => {
    getMasterCategoryData();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (!values.name) {
      errors.name = 'Patient Name is required';
    }
    if (!values.purchaseprice) {
      errors.purchaseprice = 'Parent Name is required';
    }
    if (!values.category) {
      errors.category = 'Patient Age is required';
    }
    if (!values.saleprice) {
      errors.saleprice = 'Admission Date is required';
    }
    if (!values.quantity) {
      errors.quantity = 'Case is required';
    }
    if (!values.company) {
      errors.company = 'Species is required';
    }   
    if (!values.effects) {
      errors.effects = 'Address is required';
    }
    if (!values.storebox) {
      errors.storebox = 'whatsApp is required';
    }  
    if (!values.expiredate) {
      errors.expiredate = 'whatsApp is required';
    }   

    return errors;
  };
  return (
    <>
      <section className="screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
              <div className="">
                <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                  <div className="container">
                    <div className="row">
                      <div className="row">
                        <div className="row justify-content-between">
                        <div className="col-md-4 form-group">
                            <label>Medicine Name</label>
                            <input
                              type="text"
                              name="medicine_name"
                              className="form-control"
                              id="medicine_name"
                              required=""
                              value={formValues.medicine_name}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.medicine_name}</p>
                          </div>
                          
                          <div className="col-md-4 form-group">
                            <label>Medicine Category</label>                        
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="category"
                              name="category"
                              onChange={handleValueChange}
                              className={sexErr ? ' showError' : ''}
                              value={formValues.category}
                            >
                            {masterCategoryData.map(curElem => (
                              <option key={curElem.id} value={curElem.name}>
                                  {curElem.name}
                              </option>
                              ))}
                            </select>
                            {sexErr && <div style={{ fontWeight: 'bold',color: 'red', paddingBottom: 10 }}>{sexErr}</div>}
                          </div>

                          <div className="col-md-4 form-group">
                            <label>Purchase Price</label>
                            <input
                              type="text"
                              name="purchase_price"
                              className="form-control"
                              id="purchase_price"
                              required=""
                              value={formValues.purchase_price}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.purchase_price}</p>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Sale Price</label>
                            <input
                              type="text"
                              name="sale_price"
                              className="form-control"
                              id="sale_price"
                              required=""
                              value={formValues.sale_price}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.sale_price}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>Quantity</label>
                            <input
                              type="text"
                              name="quantity"
                              className="form-control"
                              id="quantity"
                              required=""
                              value={formValues.quantity}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.quantity}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>Generic Name</label>
                            <input
                              type="text"
                              name="generic_name"
                              className="form-control"
                              id="generic_name"
                              required=""
                              value={formValues.generic_name}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.generic_name}</p>
                          </div>
                          </div>
                          <div className="row justify-content-center">
                          <div className="col-md-4 form-group">
                            <label>Company</label>
                            <input
                              type="text"
                              name="company"
                              className="form-control"
                              id="company"
                              required=""
                              value={formValues.company}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.company}</p>
                          </div>
                        
                       
                          <div className="col-md-4 form-group">
                            <label>Effects</label>
                            <input
                              type="text"
                              name="effects"
                              className="form-control"
                              id="effects"
                              required=""
                              value={formValues.effects}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.effects}</p>
                          </div>
                   
                    
                        {/* <div className="row justify-content-center">                         */}

                          <div className="col-md-4 form-group">
                            <label>Store Box</label>
                            <input
                              type="text"
                              className="form-control"
                              id="store_box"
                              name="store_box"
                              value={formValues.store_box}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.store_box}</p>
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-4 form-group mt-3 mt-md-0">
                            <label>Expiry Date</label>
                            <input
                              type="date"
                              className="form-control"
                              name="exp_date"
                              id="exp_date"
                              required=""
                              value={formValues.exp_date}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p style={{fontWeight: 'bold', color: 'red' }}>{formErrors.exp_date}</p>
                          </div>
                          
                        </div>

                      </div>
                    
                    </div>
                  </div>
                  <div className="text-end py-4">
                    <button type="submit" className="btn btn-primary">
                    Submit
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
