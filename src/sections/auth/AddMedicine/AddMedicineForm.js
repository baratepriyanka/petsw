import React, { useState, useEffect, useRef } from 'react';
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

export default function AddMedicine() {
  const [masterCategoryData, setMasterCategoryData] = useState([]);

  const getMasterCategoryData = async () => {
    // console.log("formErrors");
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-category`
    );
    setMasterCategoryData(await response.json());
    // console.log(masterCategoryData);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;

  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-medicine`;
  const [medicinename, setMedicinename] = useState('');
  const [genericname, setGenericname] = useState('');
  const [companyname, setCompanyname] = useState('');

  const initialvalue = {
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
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [values1, setValues1] = React.useState([]);
  const { categoryErr } = formErrors;
  const { colourErr } = formErrors;
  const { StateErr } = formErrors;
  const { CityErr } = formErrors;
  const { BreedErr } = formErrors;
  const formIsValid = true;

  const medcapiletter = useRef(null);
  const genefircapiletter = useRef(null);
  const compfircapiletter = useRef(null);
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
  function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length  === 0) { // check if space is at beginning
      event.preventDefault();
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const firstLaterCapital = medcapiletter.current.value;
    const hosfirstcapiletter = genefircapiletter.current.value;
    const lastfirstcapiletter = compfircapiletter.current.value;
    const firstLater = firstLaterCapital.charAt(0).toUpperCase() + firstLaterCapital.slice(1);
    const hosfirstLater = hosfirstcapiletter.charAt(0).toUpperCase() + hosfirstcapiletter.slice(1);
    const lastfirstLater = lastfirstcapiletter.charAt(0).toUpperCase() + lastfirstcapiletter.slice(1);
    if (firstLaterCapital === undefined) {
      setMedicinename();
      setGenericname();
      setCompanyname();
    } else {
      setMedicinename(firstLater);
      setGenericname(hosfirstLater);
      setCompanyname(lastfirstLater);
    }
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

    // if (formValName[name] && value.length > formValName[name]) {
    //   e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formValName[name]} digit .`;
    //   e.target.parentElement.querySelector('p').style.display = 'block';
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const [isLoggedin, setIsLoggedin] = useState(false);
  const logoutRedirect = () => {
    // console.log("hii");
    navigate('/');
  };

  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [s3image, setS3image] = useState();

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem('token-info'));
    if (loginData) {
      setFname(loginData.fname);
      setLname(loginData.lname);
      setEmail(loginData.email);
      setS3image(loginData.s3image);
      setIsLoggedin(true);
    } else {
      setFname('');
      setLname('');
      setEmail('');
      setS3image('');
      logoutRedirect();
    }

    getMasterCategoryData();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
      setOpen(true);
      Axios.post(url, {
        medicine_name: formValues.medicine_name,
        category: formValues.category,
        purchase_price: formValues.purchase_price,
        generic_name: formValues.generic_name,
        sale_price: formValues.sale_price,
        quantity: formValues.quantity,
        company: formValues.company,
        effects: formValues.effects,
        store_box: formValues.store_box,
        exp_date: formValues.exp_date,
        hospital_id: formValues.hospital_id,
      }).then((res) => {
        // console.log(formValues);
        // alert('Record has been saved successfully');
      });
    }
  }, [formErrors]);
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
    } else if (values.generic_name.slice(50, limit)) {
      errors.generic_name = 'Enter the minimum 50 character.';
    }
    if (values.category === '' || values.category=== 'select') {
      errors.categoryErr = 'Select category.';
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
  };
  return (
    <>
      {isLoggedin ? (
        <section className="screen-one ipad-height">
          <div className="container">
            <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
              <div className="row">
                <div className="">
                  <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                    <div className="container">
                      <div className="row">
                        <input type="hidden" value={formValues.hospital_id} />
                        <div className="row">
                          <div className="row justify-content-between">
                            <div className="col-md-4 form-group">
                              <label>
                                Medicine Name<span className="man_filed">*</span>
                              </label>
                              <input
                                type="text"
                                name="medicine_name"
                                className="form-control"
                                id="medicine_name"
                                required=""
                                ref={medcapiletter}
                                value={medicinename}
                                onKeyDown={handleKeyDown}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Enter Medicine Name"
                              />
                              <p style={{ color: 'red' }}>{formErrors.medicine_name}</p>
                            </div>

                            <div className="col-md-4 form-group">
                              <label>
                                Medicine Category<span className="man_filed">*</span>
                              </label>
                              <select
                                style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                                required=""
                                type="text"
                                id="category"
                                name="category"
                                onChange={handleChange}
                                className="form-control"
                                value={formValues.category}
                              >
                                <option value=''>--select--</option>
                                {masterCategoryData.map((curElem) => (
                                  <option key={curElem.id} value={curElem.id}>
                                    {curElem.name}
                                  </option>
                                ))}
                              </select>
                              {categoryErr && <p style={{ color: 'red' }}>{categoryErr}</p>}
                            </div>

                            <div className="col-md-4 form-group">
                              <label>
                                Purchase Price<span className="man_filed">*</span>
                              </label>
                              <input
                                type="number"
                                name="purchase_price"
                                className="form-control"
                                id="purchase_price"
                                required=""
                                value={formValues.purchase_price}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Enter Purchase Price"
                              />
                              <p style={{ color: 'red' }}>{formErrors.purchase_price}</p>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-md-4 form-group">
                              <label>
                                Sale Price<span className="man_filed">*</span>
                              </label>
                              <input
                                type="number"
                                name="sale_price"
                                className="form-control"
                                id="sale_price"
                                required=""
                                value={formValues.sale_price}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Enter Sale Price"
                              />
                              <p style={{ color: 'red' }}>{formErrors.sale_price}</p>
                            </div>

                            <div className="col-md-4 form-group">
                              <label>
                                Quantity<span className="man_filed">*</span>
                              </label>
                              <input
                                type="number"
                                name="quantity"
                                className="form-control"
                                id="quantity"
                                required=""
                                minLength="5"
                                size="5"
                                maxLength="5"
                                value={formValues.quantity}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Enter Quantity"
                              />
                              <p style={{ color: 'red' }}>{formErrors.quantity}</p>
                            </div>

                            <div className="col-md-4 form-group">
                              <label>
                                Generic Name<span className="man_filed">*</span>
                              </label>
                              <input
                                type="text"
                                name="generic_name"
                                className="form-control"
                                id="generic_name"
                                required=""
                                ref={genefircapiletter}
                                value={genericname}
                                onKeyDown={handleKeyDown}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Enter Generic Name"
                              />
                              <p style={{ color: 'red' }}>{formErrors.generic_name}</p>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-md-4 form-group">
                              <label>
                                Company<span className="man_filed">*</span>
                              </label>
                              <input
                                type="text"
                                name="company"
                                className="form-control"
                                id="company"
                                required=""
                                ref={compfircapiletter}
                                value={companyname}
                                onKeyDown={handleKeyDown}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Enter Company"
                              />
                              <p style={{ color: 'red' }}>{formErrors.company}</p>
                            </div>

                            <div className="col-md-4 form-group">
                              <label>
                                Effect<span className="man_filed">*</span>
                              </label>
                              <input
                                type="text"
                                name="effects"
                                className="form-control"
                                id="effects"
                                required=""
                                value={formValues.effects}
                                onKeyDown={handleKeyDown}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Enter Effect"
                              />
                              <p style={{ color: 'red' }}>{formErrors.effects}</p>
                            </div>

                            {/* <div className="row justify-content-center">                         */}

                            <div className="col-md-4 form-group">
                              <label>
                                Store Box<span className="man_filed">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="store_box"
                                name="store_box"
                                value={formValues.store_box}
                                onKeyDown={handleKeyDown}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Enter Store Box"
                              />
                              <p style={{ color: 'red' }}>{formErrors.store_box}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                              <label>
                                Expiry Date<span className="man_filed">*</span>
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                name="exp_date"
                                id="exp_date"
                                required=""
                                value={formValues.exp_date}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Enter Expiry Date"
                              />
                              <p style={{ color: 'red' }}>{formErrors.exp_date}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">
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
                          <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-center">
                            Record has been saved Successfully.
                          </Typography>
                          <div className="text-center">
                            <Button
                              size="small"
                              type="button"
                              variant="contained"
                              className="ipdpatientok"
                              // onClick={deleteOpdRow}
                              onClick={() => navigate('/dashboard/MedicineList')}
                              // value={deleteId}
                              id=""
                              sx={{ mt: 2, backgroundColor: '#2065D1' }}
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
      ) : (
        <h1>{" "}</h1>
      )}
    </>
  );
}
