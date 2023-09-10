import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import './style.css';
import axios from 'axios';
// @mui
import { Box, Grid } from '@mui/material';
// ----------------------------------------------------------------------

export default function InfoMedicineForm() {

  const {medicineId} = useParams();
  

  const[masterCategoryData, setMasterCategoryData] = useState([]);

  const getMasterCategoryData = async () =>{
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-category`);
    setMasterCategoryData(await response.json());
    console.log(masterCategoryData);
  }
  
  const[medicineEdit, setMedicineEdit] = useState([]);

  const getMedicineEdit = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-infomedicine/${medicineId}`);
    setMedicineEdit(await response.json());
    // console.log(response.data);
  };
  useEffect(() => {
    // async function getMedicineEdit() {
    //  try {
    //   const response = await axios.get(`http://localhost:8086/web/get-one-medicine/${medicineId}`)
    //   // console.log(response.data);
    //   setMedicineEdit(response.data);
    //  } catch (error) {
    //   console.log("Something is Wrong");
    //  }
    // }
    getMedicineEdit();
    getMasterCategoryData();
   }, []);

  return (
    <>
      <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
            {
            medicineEdit.map((curElem) => {
                console.log(curElem);
                // console.log(curElem.MasterState.name);
               
                return (
              <div className="">
                <form action="" className="did-floating-label-content">
                  <div className="container">
                    <div className="row">
                      <div className="row">
                        <div className="row justify-content-between mt-3">
                        <div className="col-md-4 form-group">
                            <label className="info_opd_bold">Medicine Name</label>
                            <div>{curElem.medicine_name}</div>
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">Medicine Category</label> 
                            <div>{curElem.MasterCategory.name}</div>                                                 
                          </div>

                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">Purchase Price</label>
                            <div>{curElem.PurchasePrice}</div>
                          </div>
                        </div>
                        <div className="row justify-content-center mt-3">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">Sale Price</label>
                            <div>{curElem.sale_price}</div>
                          </div>

                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">Quantity</label>
                            <div>{curElem.quantity}</div>
                          </div>

                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">Generic Name</label>
                            <div>{curElem.generic_name}</div>
                          </div>
                          </div>
                          <div className="row justify-content-center mt-3">
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">Company</label>
                            <div>{curElem.company}</div>
                          </div>
                        
                       
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">Effects</label>
                            <div>{curElem.effects}</div>
                          </div>
                          <div className="col-md-4 form-group">
                            <label className="info_opd_bold">Store Box</label>
                            <div>{curElem.store_box}</div>
                          </div>
                          </div>
                          <div className="row mt-3">
                          <div className="col-md-4 form-group mt-3 mt-md-0">
                            <label className="info_opd_bold">Expiry Date</label>
                            <div>{curElem.exp_date}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
                );
              })} 
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
