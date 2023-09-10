import React, { useState, useEffect, useRef } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Moment from 'moment';
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

export default function EditMedicineForm() {
  
  const {medicineId} = useParams();
  const[masterCategoryData, setMasterCategoryData] = useState([]);
  const getMasterCategoryData = async () =>{
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-category`);
    setMasterCategoryData(await response.json());
  }
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    const errors = validate(medicineEdit);
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
  const loginId = loginData.hospital_id;
  const [medicinename, setMedicinename] = useState('');
  const [curDate, setCurDate] = useState('');
  const [genericname, setGenericname] = useState('');
  const [companyname, setCompanyname] = useState('');

  const[medicineEdit, setMedicineEdit] = useState({
    medicine_name: `${medicinename}`,
    purchase_price: '',
    generic_name: `${genericname}`,
    category: '',
    sale_price: '',
    quantity: '',
    company: `${companyname}`,
    effects: '',
    store_box: '',
    exp_date: '',
    hospital_id: `${loginId}`,
  });
  // console.log(medicineEdit)
  useEffect(() => {
    async function getMedicineEdit() {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-medicine/${medicineId}`)
        // console.log(response.data);
        setMedicineEdit(response.data);
        // console.log(response.data.exp_date.substr(0, 10));
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
  getMedicineEdit();
  getMasterCategoryData();
  
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(medicineEdit);
    }
   }, [medicineId]);

   const formVAlidations = {
    medicine_name: 50,
    generic_name: 50,
    company: 50,
  };
  const formValName = {
    purchase_price: 2,
    sale_price: 2,
    quantity: 2
  };
  const formValidationName = {
    medicine_name: 'medicine name',
    generic_name: 'generic name',
    company: 'company name',
    effects: 'effects',
    store_box: 'store box',
    quantity:'quantity',
    sale_price: 'sale price',
    purchase_price:'purchase price'
  };
  const formValSelectName = {
    category: 'category',
    exp_date: 'exp_date',
   
  };
  // const medcapiletter = useRef(null);
  // const currDate = useRef(null);
  // const genefircapiletter = useRef(null);
  // const compfircapiletter = useRef(null);

  function handleChange(e) {
    setMedicineEdit({
     ...medicineEdit,
     [e.target.name]: e.target.value
    })
    // const firstLaterCapital = medcapiletter.current.value;
    // const hosfirstcapiletter = genefircapiletter.current.value;
    // const lastfirstcapiletter = compfircapiletter.current.value;
    // const firstLater = firstLaterCapital.charAt(0).toUpperCase() + firstLaterCapital.slice(1);
    // const hosfirstLater = hosfirstcapiletter.charAt(0).toUpperCase() + hosfirstcapiletter.slice(1);
    // const lastfirstLater = lastfirstcapiletter.charAt(0).toUpperCase() + lastfirstcapiletter.slice(1);
    // if (firstLaterCapital === undefined) {
    //   setMedicinename();
    //   setGenericname();
    //   setCompanyname();
    // } else {
    //   setMedicinename(firstLater);
    //   setGenericname(hosfirstLater);
    //   setCompanyname(lastfirstLater);
    // }
    const value=e.target.value
    const name=e.target.name
    if (value) {
      e.target.parentElement.querySelector('p').innerText = '';
      e.target.parentElement.querySelector('p').style.display = 'none';
    } else if (formValidationName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the ${formValidationName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    } else {
      e.target.parentElement.querySelector('p').innerText = `select ${formValSelectName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }

    if (formVAlidations[name] && value.length > formVAlidations[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formVAlidations[name]} character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }

    if (formValName[name] && value.length > formValName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formValName[name]} digit .`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }

   }

   async function handleSubmit(e) {
    e.preventDefault()
    try {
      setFormErrors(validate(medicineEdit));
      setIsSubmit(true);
     await axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/update-medicine/${medicineId}`, medicineEdit)
    } catch (error) {
     console.log("Something is Wrong");
    }
   }
   
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);
   const [values1, setValues1] = React.useState([]);
   const { category } = formErrors;
   const { colourErr } = formErrors;
   const{StateErr}=formErrors;
   const {CityErr}=formErrors;
   const{BreedErr}=formErrors;
   const formIsValid = true;
 
  const validate = (values) => {
    const errors = {};
    const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    const limit = 225;
    const regExp = /^[-+]?[0-9]+\.[0-9]+$/;
    const perPriceRegExp = regExp.test(values.purchase_price);
    const salePriceRegExp = regExp.test(values.sale_price);

    const namePattern = /^[a-zA-Z\s]*$/;
    const medicinNamePattern = namePattern.test(values.medicine_name);
    const genericNamePattern = namePattern.test(values.generic_name);
    const companyNamePattern = namePattern.test(values.company);

    if (!values.medicine_name) {
      errors.medicine_name = 'Enter the medicine name.';
    } else if (medicinNamePattern === false) {
      errors.medicine_name = 'Please enter characters only.';
    } else if (values.medicine_name.slice(50, limit)) {
      errors.medicine_name = 'Enter the minimum 50 character.';
    }
    if (!values.purchase_price) {
      errors.purchase_price = 'Enter the purchase price.';
    }
    //  else if (perPriceRegExp === false) {
    //   errors.purchase_price = 'The valid purchase price Ex.20.00.';
    // }
    if (!values.generic_name) {
      errors.generic_name = 'Enter the generic name. ';
    } else if (genericNamePattern === false) {
      errors.generic_name = 'Please enter characters only.';
    } else if (values.generic_name.slice(50, limit)) {
      errors.generic_name = 'Enter the minimum 50 character.';
    }
    if (values.category === '' || values.category=== 'select') {
      errors.categoryErr = 'select category.';
    }
    // if (!values.sale_price) {
    //   errors.sale_price = 'Enter the Sale price.';
    // }
    if (!values.sale_price) {
      errors.sale_price = 'Enter the sale price.';
    } 
    // else if (salePriceRegExp === false) {
    //   errors.sale_price = 'The valid sale price Ex.20.00';
    // }
    if (!values.quantity) {
      errors.quantity = 'Enter the quantity.';
    }
    if (!values.company) {
      errors.company = 'Enter the company name.';
    } else if (companyNamePattern === false) {
      errors.company = 'Please enter characters only.';
    } else if (values.company.slice(50, limit)) {
      errors.company = 'Enter the minimum 50 character.';
    }
    if (!values.effects) {
      errors.effects = 'Enter the effect.';
    } else if (values.effects.slice(50, limit)) {
      errors.effects = 'Enter the minimum 50 character.';
    }
    if (!values.store_box) {
      errors.store_box = 'Enter the store box.';
    }
    if (!values.exp_date) {
      errors.exp_date = 'select expiry date.';
    }
    return errors;
  };

  const handleCloseButton = (e) => {
    navigate('/dashboard/MedicineList');
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
                        <div className="row justify-content-between">
                        <input
                            type="hidden"
                            value={ medicineEdit.hospital_id}
                          />
                        <div className="col-md-4 form-group">
                            <label>Medicine Name</label>
                            <input
                              type="text"
                              name="medicine_name"
                              className="form-control"
                              id="medicine_name"
                              required=""
                              // ref={medcapiletter}
                              value={medicineEdit.medicine_name}
                               onChange={e => handleChange(e)}
                              autoComplete="off"
                              placeholder='Enter Medicine Name'
                            />
                            <p style={{ color: 'red' }}>{formErrors.medicine_name}</p>
                          </div>
                          
                          <div className="col-md-4 form-group">
                            <label>Medicine Category</label>                                                  
                            <select
                              style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                              required=""
                              type="text"
                              id="category"
                              name="category"
                               onChange={e => handleChange(e)}
                              className={category ? ' showError' : ''}
                              value={medicineEdit.category}
                            >
                            <option>--select--</option>
                            {masterCategoryData.map(curElem => (
                              <option key={curElem.id} value={curElem.id}>
                                  {curElem.name}
                              </option>
                              ))}
                            </select>
                            {category && <div style={{color: 'red', paddingBottom: 10 }}>{category}</div>}
                          </div>

                          <div className="col-md-4 form-group">
                            <label>Purchase Price</label>
                            <input
                              type="text"
                              name="purchase_price"
                              className="form-control"
                              id="purchase_price"
                              required=""
                              value={medicineEdit.purchase_price}
                               onChange={e => handleChange(e)}
                              autoComplete="off"
                              placeholder='Enter Purchase Price'
                            />
                            <p style={{ color: 'red' }}>{formErrors.purchase_price}</p>
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
                              value={medicineEdit.sale_price}
                               onChange={e => handleChange(e)}
                              autoComplete="off"
                              placeholder='Enter Sale Price'

                            />
                            <p style={{ color: 'red' }}>{formErrors.sale_price}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>Quantity</label>
                            <input
                              type="number"
                              name="quantity"
                              className="form-control"
                              id="quantity"
                              required=""
                              minLength="5"
                              size="5"
                              maxLength="5"
                              value={medicineEdit.quantity}
                               onChange={e => handleChange(e)}
                              autoComplete="off"
                              placeholder='Enter quantity'

                            />
                            <p style={{ color: 'red' }}>{formErrors.quantity}</p>
                          </div>

                          <div className="col-md-4 form-group">
                            <label>Generic Name</label>
                            <input
                              type="text"
                              name="generic_name"
                              className="form-control"
                              id="generic_name"
                              required=""
                              // ref={genericname}
                              value={medicineEdit.generic_name}
                               onChange={e => handleChange(e)}
                              autoComplete="off"
                              placeholder='Enter Generic Name'

                            />
                            <p style={{ color: 'red' }}>{formErrors.generic_name}</p>
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
                              // ref={compfircapiletter}
                              value={medicineEdit.company}
                               onChange={e => handleChange(e)}
                              autoComplete="off"
                              placeholder='Enter Company'

                            />
                            <p style={{ color: 'red' }}>{formErrors.company}</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <label>Effect</label>
                            <input
                              type="text"
                              name="effects"
                              className="form-control"
                              id="effects"
                              required=""
                              value={medicineEdit.effects}
                               onChange={e => handleChange(e)}
                              autoComplete="off"
                              placeholder='Enter Effect'

                            />
                            <p style={{ color: 'red' }}>{formErrors.effects}</p>
                          </div>
                   
                          <div className="col-md-4 form-group">
                            <label>Store Box</label>
                            <input
                              type="text"
                              className="form-control"
                              id="store_box"
                              name="store_box"
                              value={medicineEdit.store_box}
                               onChange={e => handleChange(e)}
                              autoComplete="off"
                              placeholder='Enter Store Box'

                            />
                            <p style={{ color: 'red' }}>{formErrors.store_box}</p>
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-4 form-group mt-3 mt-md-0">
                            <label>Expiry Date</label>
                            <input
                              type="date"
                              name="exp_date"
                              className="form-control"
                              required=""
                              // value={medicineEdit.exp_date}
                              value={medicineEdit.exp_date}
                              autoComplete="off"
                              placeholder='Enter Expiry Date'
                              onChange={e => handleChange(e)}/>
                            <p style={{ color: 'red' }}>{formErrors.exp_date}</p>
                          </div>
                          
                        </div>

                      </div>
                    
                    </div>
                  </div>
                  <div className="text-center py-4">
                    <button type="submit" className="btn btn-primary" onClick={handleOpen}>
                    Save
                    </button>
                    <button type="button" className="btn btn-secondary m-3" onClick={handleCloseButton}>
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
                          onClick={() => navigate('/dashboard/MedicineList')}
                          id=""
                          sx={{ mt: 2, backgroundColor: '#0d6efd' }} >
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
