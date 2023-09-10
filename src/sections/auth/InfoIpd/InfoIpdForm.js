import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Moment from 'moment';
// import { useReactToPrint } from 'react-to-print';
// @mui
import { Box, Grid, Modal, Typography, Button } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import Table from 'react-bootstrap/Table';

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 1700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};
const styleHel = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 1700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // boxShadow: 24,
  p: 2,
};
const styleDeath = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 1700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // boxShadow: 24,
  p: 2,
};
export default function InfoIpdForm() {
  const { ipdId } = useParams();
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;

  // const today = new Date();

  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const monthWithOffset = dateNow.getUTCMonth() + 1;
  const month = monthWithOffset.toString().length < 2 ? `0${monthWithOffset}` : monthWithOffset;
  const date = dateNow.getUTCDate().toString().length < 2 ? `0${dateNow.getUTCDate()}` : dateNow.getUTCDate();
  const ghours = dateNow.getHours();
  const gMinutes = dateNow.getMinutes();
  const gSeconds = dateNow.getSeconds();
  const time = `${ghours}:${gMinutes}`;
  const materialDateInput = `${year}-${month}-${date}`;
  const dtime = `${materialDateInput}T${time}`;
  // console.log(dtime)
  const [date1, setDate] = useState(Moment().format('YYYY-MM-DDTHH:mm'));

  // const [date1, setDate] = useState(new Date().toISOString().substr(0, 16));
  useEffect(() => {
    setDate(Moment().format('YYYY-MM-DDTHH:mm'));
    // }, 1000);
  }, []);
  const [student, setStudent] = useState([]);
  const [addinputList, setAddInputList] = useState([]);
  const [inputList, setInputList] = useState([
    {
      date: `${materialDateInput}`,
      clinical_observ: '',
      treatment_medicine: '',
      hospital_id: `${loginId}`,
      temperature: '',
      feeding: '',
    },
  ]);

  const getOpdEdit = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-info-ipd/${ipdId}`
    );
    const data = await response.json();
    if (data[0] === null) {
      setStudent(data);
    } else {
      setStudent(data);
    }
    // console.log(student);
  };
  const getOpdAddMore = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-opdAddMore/${ipdId}`
    );
    setAddInputList(await response.json());
    // console.log(response.data);
  };

  const [opdEditreport, setopdEditreport] = useState([]);
  const getReportData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-uploadreport-editpage/${ipdId}`
    );
    const data = await response.json();
    if (data.length === 0) {
      setopdEditreport(data);
    } else {
      setopdEditreport(data);
    }
    // console.log(response.data);
  };
  const [imaes, setimaes] = useState([]);
  const getMultipleImages = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-multiple-images/${ipdId}`
    );
    const data = await response.json();
    if (data.post.length === 0) {
      setimaes(data.post);
      // console.log(imaes)
    } else {
      setimaes(data.post);
    }
  };

  const download = (e) => {
    const data = e.target.href;
  };

  const [formVal, setFormVal] = useState([
    {
      date: `${materialDateInput}`,
      temperature: '',
      feeding: '',
      treatment_medicine: '',
      clinical_observ: '',
      hospital_id: `${loginId}`,
      case_id: '',
    },
  ]);

  const addRow = () => {
    setFormVal([
      ...formVal,
      {
        date: `${materialDateInput}`,
        temperature: '',
        feeding: '',
        treatment_medicine: '',
        clinical_observ: '',
        hospital_id: `${loginId}`,
      },
    ]);
  };
  const onRemove = (i) => {
    const newForm = [...formVal];
    newForm.splice(i, 1);
    setFormVal(newForm);
  };
  const formInputChange = {
    temperature: 500,
    feeding: 500,
    treatment_medicine: 500,
    clinical_observ: 500,
  };
  const formInputValiName = {
    treatment_medicine: 'treatment medicine provided ',
    temperature: 'temperature',
    feeding: 'feeding',
    clinical_observ: 'Clinical Observations',
  };
  const handleInputChange = (e, i) => {
    const newForm = [...formVal];
    newForm[i][e.target.name] = e.target.value;
    setFormVal(newForm);
    const value = e.target.value;
    const name = e.target.name;

    if (value) {
      e.target.parentElement.querySelector('p').innerText = '';
      e.target.parentElement.querySelector('p').style.display = 'none';
    } else if (formInputValiName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the ${formInputValiName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    if (formInputChange[name] && value.length > formInputChange[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formInputChange[name]} character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  // const history = useHistory();
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  const [profile, setProfile] = useState({
    file: [],
    filepreview: null,
  });
  const [btncolor, setBtnColor] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    const errorRes = formValidation(formVal);
    if (errorRes) {
      const url1 = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-ipdAddMore-paitent/${ipdId}`;
      const arr = formVal.map((obj) => axios.post(url1, obj, { headers: { 'Access-Control-Allow-Origin': '*' } }));
      const promise = Promise.allSettled(arr).then((data) => {
        // console.log(data);
        // window.location.reload();
        handleClose();
      });
    } else {
      // error msg
    }
  }

  const formValidation = (formVal) => {
    const data = [...formVal];
    let valid = true;
    for (let index = 0; index < data.length; index += 1) {
      // const element = data[index];
      if (data[index].date === '') {
        data[index].dateCheck = 'Enter date';
        data[index].dateLengthCheck = '';
        valid = false;
      }

      if (data[index].temperature === '') {
        data[index].tempCheck = 'Enter temperature';
        data[index].tempFormat = '';
        valid = false;
      }

      if (data[index].feeding === '') {
        data[index].feedingCheck = 'Enter feeding';
        data[index].feedingLengthCheck = '';
        valid = false;
      }
      if (data[index].treatment_medicine === '') {
        data[index].Checkv = 'Enter treatment medicine provided';
        data[index].emFormat = '';
        valid = false;
      }
      if (data[index].clinical_observ === '') {
        data[index].clinical_observCheck = 'Enter clinical observations';
        data[index].clinical_observemFormat = '';
        valid = false;
      }
    }
    setFormVal(data);
    return valid;
  };
  const handleCloseButton = (e) => {
    navigate('/dashboard/IPD');
  };
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const title = 'petSoftwear';
  const today = new Date();
  // console.log(today)
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  const today1 = `${mm}/${dd}/${yyyy}`;
  // const [date1, setDate] = useState(new Date().toISOString().substr(0, 16));
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setDate(new Date().toISOString().substr(0, 16));
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, []);
  const initialvalue = {
    hospital_id: `${loginId}`,
    date_of_release: `${date1}`,
    certified_reason: '',
    contract_no: '',
    animal: '',
    case_id: '',
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [disId, setDisId] = useState();
  const [butId, setButId] = useState();
  const [errorsMsg, seterrorsMsg] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [openHel, setOpenHel] = useState(false);
  const handleOpenHel = (e) => {
    setOpenHel(true);
  };
  const handleCloseHel = () => {
    setOpenHel(false);
  };
  const formVAlidations = {
    animal: 500,
    certified_reason: 500,
  };
  const formValidationName = {
    certified_reason: 'certified',
    contract_no: 'contract no',
    animal: 'animal',
  };
  const formValSelectName = {
    date_of_release: 'date_of_release',
  };
  const handleChange = (e) => {
    // console.log(e.target)
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
  };
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-health-report/${ipdId}`;
  const closebedid = useRef(null);
  const handleSubmitHal = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if (setIsSubmit(true)) {
      const closedId = closebedid.current.value;
      axios
        .post(
          `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-openclose-bednumber/${closedId}`
        ) // <-- remove ;
        .then((res) => {
          console.log(res);
        });
    }
  };
  const caseIdref = useRef(null);
  useEffect(() => {
    getOpdEdit();
    getOpdAddMore();
    getReportData();
    getMultipleImages();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const id = caseIdref.current.value;
      axios
        .post(url, {
          date_of_release: formValues.date_of_release,
          certified_reason: formValues.certified_reason,
          animal: formValues.animal,
          hospital_id: formValues.hospital_id,
          contract_no: formValues.contract_no,
          case_id: `${id}`,
        })
        .then((res) => {
          seterrorsMsg(res.data.message);
          navigate('/dashboard/IPD');
          setOpenHel(true);
        });
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.certified_reason) {
      errors.certified_reason = 'Enter the certified.';
    }
    if (!values.animal) {
      errors.animal = 'Enter the animal.';
    }
    if (!values.date_of_release) {
      errors.date_of_release = 'select release date.';
    }
    if (!values.contract_no) {
      errors.contract_no = 'Enter the contract no.';
    }

    return errors;
  };

  const inivalue = {
    date_of_release: `${date1}`,
    cause_of_death: '',
    cause_of_treatment: '',
    certified_reason: '',
    hospital_id: `${loginId}`,
    contract_no: '',
  };
  const [formValDea, setFormValDea] = useState(inivalue);
  const [formErr, setFormErr] = useState({});
  const [isSubmitDeath, setIsSubmitDeath] = useState(false);
  const [curId, setCurId] = useState();
  const [butDeathId, setButDeathId] = useState();
  const [openDeath, setOpenDeath] = useState(false);

  const compRef = useRef(null);
  const handleOpenDeath = (e) => {
    setOpenDeath(true);
  };
  const handleCloseDeath = () => {
    setOpenDeath(false);
  };
  const formDeathVAlidations = {
    certified_reason: 500,
    cause_of_death: 500,
    cause_of_treatment: 500,
  };
  const formDeathValidationName = {
    cause_of_death: 'cause of death',
    certified_reason: 'certified',
    contract_no: 'contract no',
    cause_of_treatment: 'cause of treatment',
  };
  const formDeathValSelectName = {
    date_of_release: 'release date',
  };

  function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length  === 0) { // check if space is at beginning
      event.preventDefault();
    }
  }
  const handleChangeDeath = (e) => {
    const { name, value } = e.target;
    setFormValDea({ ...formValDea, [name]: value });
    if (value) {
      e.target.parentElement.querySelector('p').innerText = '';
      e.target.parentElement.querySelector('p').style.display = 'none';
    } else if (formDeathValidationName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the ${formDeathValidationName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    } else {
      e.target.parentElement.querySelector('p').innerText = `select ${formDeathValSelectName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }

    if (formDeathVAlidations[name] && value.length > formDeathVAlidations[name]) {
      e.target.parentElement.querySelector(
        'p'
      ).innerText = `Enter the minimum ${formDeathVAlidations[name]} character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
  };
  const handleSubmitDeath = (e) => {
    e.preventDefault();
    setFormErr(valdate(formValDea));
    setIsSubmitDeath(true);
    if (setIsSubmitDeath(true)) {
      const closId = compRef.current.value;
      axios
        .post(
          `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-openclose-bednumber/${closId}`
        ) // <-- remove ;
        .then((res) => {
          // console.log(res);
        });
    }
  };
  const urlDeath = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-death-report/${ipdId}`;
  useEffect(() => {
    if (Object.keys(formErr).length === 0 && isSubmitDeath) {
      axios
        .post(urlDeath, {
          date_of_release: formValDea.date_of_release,
          certified_reason: formValDea.certified_reason,
          cause_of_death: formValDea.cause_of_death,
          cause_of_treatment: formValDea.cause_of_treatment,
          hospital_id: formValDea.hospital_id,
          contract_no: formValDea.contract_no,
        })
        .then((res) => {
          seterrorsMsg(res.data.message);
          navigate('/dashboard/IPD');
        });
    }
  }, [formErr]);

  const valdate = (values) => {
    const errors = {};
    if (!values.certified_reason) {
      errors.certified_reason = 'Enter the certified.';
    }
    if (!values.cause_of_death) {
      errors.cause_of_death = 'Enter the cause of death.';
    }
    if (!values.cause_of_treatment) {
      errors.cause_of_treatment = 'Enter the cause of treatment.';
    }
    if (!values.date_of_release) {
      errors.date_of_release = 'select release date.';
    }
    if (!values.contract_no) {
      errors.contract_no = 'Enter the contract no.';
    }
    return errors;
  };

  return (
    <>
      <section className="contact-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-5">
            <div className="row">
              {/* onSubmit={handleSubmit} */}

              {student[0] === null ? (
                ''
              ) : (
                <div className="tabledata">
                  {student.map((curElem) => {
                    //  console.log(curElem)
                    const dateSpl = curElem.dateofadmission;
                    const changeDate = Moment(dateSpl).format('MM-DD-YYYY HH:mm A');
                    return (
                      <div className="table" ref={componentRef}>
                        <div className="">
                          <div className="ml-5">
                            <h2 className="text-center">{title}</h2>
                            <h6 className="text-center">{today1}</h6>
                            <div className="printimg">
                              {profile.filepreview !== null ? (
                                <img className="infoimg" src={profile.filepreview} alt="" />
                              ) : (
                                <img className="infoimg" src={curElem.s3image} alt="" />
                              )}
                            </div>
                            <Table responsive="md" className="table table-class">
                              <thead>
                                <tr>
                                  <th className="info_opd_bold">Category</th>
                                  <th className="info_opd_bold">Date & Time Of Admission</th>
                                  <th className="info_opd_bold">Case paper No</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="">
                                  <td>
                                    {curElem.masteripdcategory === null ? (
                                      <div>
                                        <span>{''}</span>
                                      </div>
                                    ) : (
                                      <div>
                                        <span>{curElem.masteripdcategory.name}</span>
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    <span>{changeDate}</span>
                                  </td>
                                  <td>
                                    {curElem.case_tables[0] === undefined ? (
                                      <div className="mt-2">
                                        <span>{''}</span>
                                      </div>
                                    ) : (
                                      <div className="mt-2">
                                        <span>{curElem.case_tables[0].case_id}</span>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                              <thead>
                                <tr>
                                  <th className="info_opd_bold">Name of the Owner</th>
                                  <th className="info_opd_bold" colSpan="2">
                                    Address
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="">
                                  <td>
                                    <span>{curElem.parent_name}</span>
                                  </td>
                                  <td>
                                    <span>{curElem.address}</span>
                                  </td>
                                </tr>
                              </tbody>
                              <thead>
                                <tr>
                                  <th className="info_opd_bold">Reg. No.</th>
                                  <th className="info_opd_bold">Fees. Rs.</th>
                                  <th className="info_opd_bold">Bill No.</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="">
                                  <td>
                                    <span>{curElem.reg_no}</span>
                                  </td>
                                  <td>
                                    <span>{curElem.fee}</span>
                                  </td>
                                  <td>
                                    <span>{curElem.bill_no}</span>
                                  </td>
                                </tr>
                              </tbody>
                              <thead>
                                <tr>
                                  <th className="info_opd_bold">Ward No.</th>
                                  <th className="info_opd_bold">Cage/Kennel</th>
                                  <th className="info_opd_bold">Mobile No.</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="">
                                  <td>
                                    <span>{curElem.ward_no}</span>
                                  </td>
                                  <td>
                                    <span>{curElem.cage_kennel}</span>
                                  </td>
                                  <td>
                                    <span>{curElem.phone}</span>
                                  </td>
                                </tr>
                              </tbody>
                              <thead>
                                <tr>
                                  <th className="info_opd_bold">Patient Name</th>
                                  <th className="info_opd_bold">Breed</th>
                                  <th className="info_opd_bold">Species</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="">
                                  <td>
                                    <span>{curElem.patient_name}</span>
                                  </td>
                                  <td>
                                    {curElem.masterbreed === null ? (
                                      <div>
                                        <span>{''}</span>
                                      </div>
                                    ) : (
                                      <div>
                                        <span>{curElem.masterbreed.name}</span>
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    {curElem.masterspecy === null ? (
                                      <div>
                                        <span>{''}</span>
                                      </div>
                                    ) : (
                                      <div>
                                        <span>{curElem.masterspecy.name}</span>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                              <thead>
                                <tr>
                                  <th className="info_opd_bold">Colour</th>
                                  <th className="info_opd_bold">Weight</th>
                                  <th className="info_opd_bold">Age</th>
                                  <th className="info_opd_bold">Gender</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="">
                                  <td>
                                    {curElem.mastercolor === null ? (
                                      <div>
                                        <span>{''}</span>
                                      </div>
                                    ) : (
                                      <div>
                                        <span> {curElem.mastercolor.name}</span>
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    <span>{curElem.weight}</span>
                                  </td>
                                  <td>
                                    {curElem.masterage === null ? (
                                      <div>
                                        <span>{''}</span>
                                      </div>
                                    ) : (
                                      <div>
                                        <span> {curElem.masterage.name}</span>
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    {curElem.mastergender === null ? (
                                      <div>
                                        <span>{''}</span>
                                      </div>
                                    ) : (
                                      <div>
                                        <span> {curElem.mastergender.name}</span>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              </tbody>

                              <tbody>
                                <tr className="">
                                  <th className="info_opd_bold">Special Investigation if any(X-ray.USG):-</th>
                                  <td>
                                    <span>{curElem.xray}</span>
                                  </td>
                                </tr>
                                <tr className="">
                                  <th className="info_opd_bold">DISEASE/PROVISINAL DIAGNOSIS:-</th>
                                  <td>
                                    <span>{curElem.diagnosis}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                            <div className="">
                              <h4>Treatment Prescription</h4>
                            </div>
                            <div className="App">
                              <Table responsive="md" className="table table-class">
                                <thead>
                                  <tr>
                                    <th className="info_opd_bold">Date/Type</th>
                                    <th>Temprature</th>
                                    <th className="info_opd_bold">Feeding</th>
                                    <th className="info_opd_bold">Clinical Observations</th>
                                    <th className="info_opd_bold">Treatment Medicine Provided</th>
                                  </tr>
                                </thead>
                                {addinputList.map((x, i) => {
                                  const dateSpl = x.date;
                                  const changeDate = Moment(dateSpl).format('MM-DD-YYYY');
                                  return (
                                    <tbody>
                                      <tr className="">
                                        <td>
                                          <span>{changeDate}</span>
                                        </td>
                                        <td>
                                          <span>{x.temperature}</span>
                                        </td>
                                        <td>
                                          <span>{x.feeding}</span>
                                        </td>
                                        <td>
                                          <span>{x.clinical_observ}</span>
                                        </td>
                                        <td>
                                          <span>{x.treatment_medicine}</span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  );
                                })}
                              </Table>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {student[0] === null ? (
                ''
              ) : (
                <div className="table mt-2">
                  {student.map((curElem) => {
                    console.log(curElem);
                    const dateSpl = curElem.dateofadmission;
                    const changeDate = Moment(dateSpl).format('MM-DD-YYYY HH:mm A');
                    const colorBtn = curElem.bed.in_used;
                    const colBtn = curElem.bed.in_used;
                    const closeId = curElem.bed.id;
                    const cloId = curElem.bed.id;

                    return (
                      <div className="container">
                        <div className="row">
                          <div className="row">
                            <div className="text-end but-fun">
                              <button type="button" id="" className="btn cancelbtn m-1" onClick={handleCloseButton}>
                                Back
                              </button>
                              {/* <button type="button" className="btn btn-primary m-1" onClick={handlePrint}>
                                Print
                              </button> */}
                              {colorBtn === '1' ? (
                                <button
                                  type="button"
                                  className="btn btn-success cageBtn m-1"
                                  id={curElem.id}
                                  value={closeId}
                                  onClick={handleOpenHel}
                                >
                                  Discharge
                                </button>
                              ) : (
                                ''
                              )}

                              {colBtn === '1' ? (
                                <button
                                  type="button"
                                  className="btn btn-danger cageBtn m-1"
                                  value={cloId}
                                  onClick={handleOpenDeath}
                                >
                                  Death
                                </button>
                              ) : (
                                ''
                              )}
                              <Modal
                                open={openHel}
                                // onClick={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box sx={styleHel}>
                                  <Typography
                                    id="modal-modal-description"
                                    variant="h5"
                                    component="h2"
                                    sx={{ mt: 2 }}
                                    className="text-center info_opd_bold"
                                  >
                                    Add Health Report
                                  </Typography>
                                  <p style={{ color: 'green' }}>{errorsMsg}</p>
                                  <form action="" onSubmit={handleSubmitHal} className="did-floating-label-content">
                                    <div className="row">
                                      <input type="hidden" value={formValues.hospital_id} />
                                      <input type="hidden" value={closeId} ref={closebedid} />
                                      <input type="hidden" ref={caseIdref} value={curElem.case_tables[0].id} />
                                      <div className="col-md-6 form-group">
                                        <label className="info_opd_bold">
                                          Date of Release<span className="man_filed">*</span>
                                        </label>
                                        <input
                                          type="datetime-local"
                                          name="date_of_release"
                                          className="form-control"
                                          required=""
                                          placeholder="Enter Date of Release"
                                          value={formValues.date_of_release}
                                          onChange={handleChange}
                                          autoComplete="off"
                                        />
                                        <p style={{ color: 'red' }}>{formErrors.date_of_release}</p>
                                      </div>
                                      <div className="col-md-6 form-group">
                                        <label className="info_opd_bold">
                                          Contract No.<span className="man_filed">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          name="contract_no"
                                          className="form-control"
                                          required=""
                                          placeholder="Enter the Contract No."
                                          value={formValues.contract_no}
                                          onChange={handleChange}
                                          autoComplete="off"
                                        />
                                        <p style={{ color: 'red' }}>{formErrors.contract_no}</p>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-12 form-group">
                                        <label className="info_opd_bold">
                                          H/o : This is to be certified that dog was suffering from
                                          <span className="man_filed">*</span>{' '}
                                        </label>
                                        <textarea
                                          name="certified_reason"
                                          className="form-control"
                                          required=""
                                          placeholder="Enter certified "
                                          value={formValues.certified_reason}
                                          onChange={handleChange}
                                          autoComplete="off"
                                        />
                                        <p style={{ color: 'red' }}>{formErrors.certified_reason}</p>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-12 form-group">
                                        <label className="info_opd_bold">
                                          Animal <span className="man_filed">*</span>
                                        </label>
                                        <textarea
                                          name="animal"
                                          className="form-control"
                                          required=""
                                          placeholder="Enter The animal"
                                          value={formValues.animal}
                                          onChange={handleChange}
                                          autoComplete="off"
                                        />
                                        <p style={{ color: 'red' }}>{formErrors.animal}</p>
                                      </div>
                                    </div>

                                    <div className="mt-3 text-center">
                                      <button type="submit" className="btn btn-primary savebtn">
                                        Save
                                      </button>
                                      <button type="button" className="btn btn-primary" onClick={handleCloseHel}>
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                </Box>
                              </Modal>
                              <Modal
                                open={openDeath}
                                // onClick={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box sx={styleDeath}>
                                  <Typography
                                    id="modal-modal-description"
                                    variant="h5"
                                    component="h2"
                                    sx={{ mt: 2 }}
                                    className="text-center info_opd_bold"
                                  >
                                    Add Death Report
                                  </Typography>
                                  <p style={{ color: 'green' }}>{errorsMsg}</p>
                                  <form action="" onSubmit={handleSubmitDeath} className="did-floating-label-content">
                                    <div className="row">
                                      <input type="hidden" value={formValDea.hospital_id} />
                                      <input type="hidden" value={cloId} ref={compRef} />
                                      <div className="col-md-5 form-group">
                                        <label className="info_opd_bold">
                                          Date of Release<span className="man_filed">*</span>
                                        </label>
                                        <input
                                          type="datetime-local"
                                          name="date_of_release"
                                          className="form-control"
                                          required=""
                                          placeholder="Enter Date of Release"
                                          value={formValDea.date_of_release}
                                          onChange={handleChangeDeath}
                                          autoComplete="off"
                                        />
                                        <p style={{ color: 'red' }}>{formErr.date_of_release}</p>
                                      </div>
                                      <div className="col-md-6 form-group">
                                        <label className="info_opd_bold">
                                          Contract No.<span className="man_filed">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          name="contract_no"
                                          className="form-control"
                                          required=""
                                          placeholder="Enter the Contract No."
                                          value={formValDea.contract_no}
                                          onChange={handleChangeDeath}
                                          autoComplete="off"
                                        />
                                        <p style={{ color: 'red' }}>{formErr.contract_no}</p>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-12 form-group">
                                        <label className="info_opd_bold">
                                          H/o <span className="man_filed">*</span>{' '}
                                        </label>
                                        <textarea
                                          name="certified_reason"
                                          className="form-control"
                                          required=""
                                          placeholder="Enter Certified"
                                          value={formValDea.certified_reason}
                                          onChange={handleChangeDeath}
                                          autoComplete="off"
                                        />
                                        <p style={{ color: 'red' }}>{formErr.certified_reason}</p>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-12 form-group">
                                        <label className="info_opd_bold">
                                          Cause of Death <span className="man_filed">*</span>
                                        </label>
                                        <textarea
                                          name="cause_of_death"
                                          className="form-control"
                                          required=""
                                          placeholder="Enter The Cause of Death"
                                          value={formValDea.cause_of_death}
                                          onChange={handleChangeDeath}
                                          autoComplete="off"
                                        />
                                        <p style={{ color: 'red' }}>{formErr.cause_of_death}</p>
                                      </div>
                                      <div className="col-md-12 form-group">
                                        <label className="info_opd_bold">
                                          Unfortunately Died<span className="man_filed">*</span>
                                        </label>
                                        <textarea
                                          name="cause_of_treatment"
                                          className="form-control"
                                          required=""
                                          placeholder="Enter The Cause of Treatment"
                                          value={formValDea.cause_of_treatment}
                                          onChange={handleChangeDeath}
                                          autoComplete="off"
                                        />
                                        <p style={{ color: 'red' }}>{formErr.cause_of_treatment}</p>
                                      </div>
                                    </div>
                                    {/* <div className="row">
                                   
                                  </div> */}
                                    <div className="mt-3 text-center">
                                      <button type="submit" className="btn btn-primary savebtn">
                                        Save
                                      </button>
                                      <button type="button" className="btn btn-primary" onClick={handleCloseDeath}>
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                </Box>
                              </Modal>
                            </div>

                            <div className="row justify-content-center">
                              <div className="col-md-4 offset-md-2 col-10 col-sm-6">
                                {profile.filepreview !== null ? (
                                  <img className="infoimg" src={profile.filepreview} alt="" />
                                ) : (
                                  <img className="infoimg" src={curElem.s3image} alt="" />
                                )}
                              </div>
                            </div>
                            <div className="row justify-content-between mt-3  mb-3">
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Category</label>
                                {curElem.masteripdcategory === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span>{curElem.masteripdcategory.name}</span>
                                  </div>
                                )}
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Date & Time Of Admission</label>
                                <div>
                                  <span>{changeDate}</span>
                                </div>
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Case paper No.</label>
                                {curElem.case_tables[0] === undefined ? (
                                  <div className="mt-2">
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div className="mt-2">
                                    <span>{curElem.case_tables[0].case_id}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="row justify-content-center mb-3">
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Name of the Owner</label>
                                <div>
                                  <span>{curElem.parent_name}</span>
                                </div>
                              </div>
                              <div className="col-md-8 form-group">
                                <label className="info_opd_bold">Address</label>
                                <div>
                                  <span>{curElem.address}</span>
                                </div>
                              </div>
                            </div>
                            <div className="row justify-content-center mb-3">
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Reg. No.</label>
                                <div>
                                  <span>{curElem.reg_no}</span>
                                </div>
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Fees. Rs.</label>
                                <div>
                                  <span>{curElem.fee}</span>
                                </div>
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Bill No.</label>
                                <div>
                                  <span>{curElem.bill_no}</span>
                                </div>
                              </div>
                            </div>
                            <div className="row justify-content-center mb-3">
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Ward No.</label>

                                {curElem.wardcategory === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span>{curElem.wardcategory.category_name}</span>
                                  </div>
                                )}
                              </div>

                              <div className="col-md-4 form-group mt-3 mt-md-0">
                                <label className="info_opd_bold">Cage/Kennel</label>
                                {curElem.bed === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span>{curElem.bed.bedid}</span>
                                  </div>
                                )}
                              </div>

                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Mobile No.</label>
                                <div>
                                  <span>{curElem.phone}</span>
                                </div>
                              </div>
                            </div>

                            <div className="row justify-content-center mb-3">
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Patient Name</label>
                                <div>
                                  <span>{curElem.patient_name}</span>
                                </div>
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Breed</label>
                                {curElem.masterbreed === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span>{curElem.masterbreed.name}</span>
                                  </div>
                                )}
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Species</label>
                                {curElem.masterspecy === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span>{curElem.masterspecy.name}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="row justify-content-center mb-3">
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Colour</label>
                                {curElem.mastercolor === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span> {curElem.mastercolor.name}</span>
                                  </div>
                                )}
                              </div>
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Weight</label>
                                <div>
                                  <span>{curElem.weight}</span>
                                </div>
                              </div>

                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Age</label>
                                {curElem.masterage === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span> {curElem.masterage.age}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="row justify-content-start mb-3">
                              <div className="col-md-4 form-group">
                                <label className="info_opd_bold">Gender</label>
                                {curElem.mastergender === null ? (
                                  <div>
                                    <span>{''}</span>
                                  </div>
                                ) : (
                                  <div>
                                    <span> {curElem.mastergender.name}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="row mb-3">
                              <label className="col-sm-5 info_opd_bold">
                                Special Investigation if any(X-ray.USG):-
                              </label>
                              <div className="col-sm-7">
                                <div className="description-box">
                                  <span>{curElem.xray}</span>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <label className="col-sm-5 info_opd_bold">DISEASE/PROVISINAL DIAGNOSIS:-</label>
                              <div className="col-sm-7">
                                <div className="description-box">
                                  <span>{curElem.diagnosis}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="mt-5">
                <h4 className="fw-bold">Treatment Prescription</h4>
              </div>
              <div className="App mt-3">
                <Table responsive="md" className="table table-class">
                  <thead>
                    <tr>
                      <th className="info_opd_bold">Date/Type</th>
                      <th>Temprature</th>
                      <th className="info_opd_bold">Feeding</th>
                      <th className="info_opd_bold">Clinical Observations</th>
                      <th className="info_opd_bold">Treatment Medicine Provided</th>
                    </tr>
                  </thead>
                  {addinputList.map((x, i) => {
                    const dateSpl = x.date;
                    const changeDate = Moment(dateSpl).format('MM-DD-YYYY');
                    return (
                      <tbody>
                        <tr className="">
                          <td>
                            <div style={{ width: '104px' }}>{changeDate}</div>
                          </td>
                          <td>
                            <div className="infotd-width">{x.temperature}</div>
                          </td>
                          <td>
                            <div className="infotd-width">{x.feeding}</div>
                          </td>
                          <td>
                            <div className="infotd-width">{x.clinical_observ}</div>
                          </td>
                          <td>
                            <div className="infotd-width">{x.treatment_medicine}</div>
                          </td>
                        </tr>
                      </tbody>
                     
                    );
                  })}
                </Table>
              </div>
              <div className="text-end py-4">
                <button type="button" className="btn btn-primary" onClick={handleOpen}>
                  Add Treatment
                </button>
                <Modal
                  open={open}
                  // onClick={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <form className="mt-4 mb-4" onSubmit={handleSubmit}>
                      <div className="info-App">
                        <Table responsive="md" className="table table-class">
                          <thead>
                            <tr>
                              <th className="">
                                Date / Type<span className="man_filed">*</span>
                              </th>
                              <th>
                                Temprature<span className="man_filed">*</span>
                              </th>
                              <th>
                                Feeding<span className="man_filed">*</span>
                              </th>
                              <th>
                                Clinical Observations<span className="man_filed">*</span>
                              </th>
                              <th>
                                Treatment Medicine Provided <span className="man_filed">*</span>
                              </th>
                            </tr>
                          </thead>
                          {formVal.map((item, i) => (
                            <tbody>
                              <input type="hidden" value={item.hospital_id} />
                              <tr className="">
                                <td>
                                  <input
                                    type="date"
                                    name="date"
                                    className="form-control"
                                    placeholder="Enter Date"
                                    value={item.date}
                                    autoComplete="off"
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                  <p style={{ color: 'red' }}>
                                    {item.nameCheck} {item.nameLengthCheck}
                                  </p>
                                  {/* {item.date=== '' ? (<div style={{ color: 'red' }}>
                                    {item.nameCheck} {item.nameLengthCheck}
                                  </div>):('')} */}
                                </td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    name="temperature"
                                    placeholder="Enter temprature"
                                    value={item.temperature}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                  {/* {item.temperature=== '' ? (<div style={{ color: 'red' }}>
                                   {item.tempCheck} {item.tempFormat}
                                  </div>):('')} */}
                                  <p style={{ color: 'red' }}>
                                    {item.tempCheck} {item.tempFormat}
                                  </p>
                                </td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    name="feeding"
                                    placeholder="Enter feeding"
                                    value={item.feeding}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                  {/* {item.feeding=== '' ? (<div style={{ color: 'red' }}>
                                      {item.feedingCheck} {item.feedingLengthCheck}
                                  </div>):('')} */}
                                  <p style={{ color: 'red' }}>
                                    {item.feedingCheck} {item.feedingLengthCheck}
                                  </p>
                                </td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    name="clinical_observ"
                                    placeholder="Enter Clinical Observations"
                                    value={item.clinical_observ}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                  {/* {item.clinical_observ=== '' ? (<div style={{ color: 'red' }}>
                                   {item.clinical_observCheck} {item.clinical_observemFormat}
                                  </div>):('')} */}
                                  <p style={{ color: 'red' }}>
                                    {item.clinical_observCheck} {item.clinical_observemFormat}
                                  </p>
                                </td>
                                <td>
                                  <textarea
                                    className="form-control"
                                    name="treatment_medicine"
                                    placeholder="Enter Treatment"
                                    value={item.treatment_medicine}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                  {/* {item.treatment_medicine=== '' ? (<div style={{ color: 'red' }}>
                                   {item.Checkv} {item.emFormat}
                                  </div>):('')} */}
                                  <p style={{ color: 'red' }}>
                                    {item.Checkv} {item.emFormat}
                                  </p>
                                </td>
                                <td>
                                  {/* {i === 0 ? (
                                    ''
                                  ) : (
                                    <DeleteIcon
                                      onClick={() => onRemove(i)}
                                      sx={{ color: 'red', cursor: 'pointer', mt: 2 }}
                                    />
                                  )} */}
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </Table>
                      </div>

                      <div className="App modelhiddenIpd">
                        {formVal.map((item, i) => (
                          <div className="row justify-content-center">
                            <input type="hidden" value={item.hospital_id} />
                            <div className="col-md-2 form-group ">
                              <label className="info_opd_bold">
                                Date / Type<span className="man_filed">*</span>
                              </label>

                              <input
                                name="date"
                                type="date"
                                className="form-control"
                                placeholder="Enter date"
                                value={item.date}
                                autoComplete="off"
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <div style={{ color: 'red' }}>
                                {item.nameCheck} {item.nameLengthCheck}
                              </div>
                            </div>
                            <div className="col-md-2 form-group ">
                              <label className="info_opd_bold">
                                Temp P/R<span className="man_filed">*</span>
                              </label>

                              <input
                                className="form-control"
                                name="temperature"
                                placeholder="Enter temprature"
                                value={item.temperature}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <div style={{ color: 'red' }}>
                                {item.tempCheck} {item.tempFormat}
                              </div>
                            </div>
                            <div className="col-md-2 form-group ">
                              <label className="info_opd_bold">
                                Feeding<span className="man_filed">*</span>
                              </label>

                              <input
                                className="form-control"
                                name="feeding"
                                placeholder="Enter feeding"
                                value={item.feeding}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <div style={{ color: 'red' }}>
                                {item.feedingCheck} {item.feedingLengthCheck}
                              </div>
                            </div>
                            <div className="col-md-3 form-group ">
                              <label className="info_opd_bold">
                                Clinical Observations<span className="man_filed">*</span>
                              </label>

                              <input
                                className="form-control"
                                name="clinical_observ"
                                placeholder="Enter Clinical Observations"
                                value={item.clinical_observ}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <div style={{ color: 'red' }}>
                                {item.clinical_observCheck} {item.clinical_observemFormat}
                              </div>
                            </div>
                            <div className="col-md-3 form-group ">
                              <label className="info_opd_bold">
                                Treatment Medicine Provided<span className="man_filed">*</span>
                              </label>

                              <input
                                className="form-control"
                                name="treatment_medicine"
                                placeholder="Enter Treatment"
                                value={item.treatment_medicine}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <div style={{ color: 'red' }}>
                                {item.Checkv} {item.emFormat}
                              </div>
                            </div>

                            <div className="btn-box">
                              {/* {i === 0 ? (
                                ''
                              ) : (
                                <DeleteIcon
                                  onClick={() => onRemove(i)}
                                  sx={{ color: 'red', cursor: 'pointer', mt: 2 }}
                                />
                              )} */}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <button type="button" className="btn btn-primary" style={{ margin: 10 }} onClick={addRow}>
                          Add More
                        </button>
                      </div>
                      <div className="text-end" style={{ marginRight: '22px' }}>
                        <button type="submit" id="" className="btn btn-primary savebtn">
                          Save
                        </button>
                        <button type="button" id="" className="btn cancelbtn" onClick={handleClose}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </Box>
                </Modal>
              </div>

              <div className="mt-1 mb-2">
                <div className="row mt-3">
                  <h4 className="fw-bold">Test Report</h4>
                  {opdEditreport.length === 0 ? (
                    <small>No Report Uploaded Here</small>
                  ) : (
                    <div className="row">
                      {opdEditreport.map((elm) => {
                        // console.log(elm.img_url_type);
                        return (
                          <div className="col-md-2 mb-2">
                            {elm.img_url_type === '2' ? (
                              <div className="">
                                <div className="text-center">
                                  <div className="mt-1">
                                    <a href={elm.s3_url} target="_blank" rel="noopener noreferrer" className="">
                                      {' '}
                                      <i className="fas fa-file-pdf pdf-icon" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="">
                                <div className="zoomdiv">
                                  <div className="repodrt_file zoom">
                                    <img className="zoom" src={elm.s3_url} alt="" />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-1 mb-5">
                <div className="multipeimgrow mt-3">
                  <h4 className="fw-bold">Images</h4>
                  {imaes.length === 0 ? (
                    <small>No Images Uploaded Here</small>
                  ) : (
                    <div className="container">
                      <div className="row">
                        {imaes.map((item) => {
                          return (
                            
                            <div className="col-md-4">
                              <div className="image mb-2">
                                {' '}
                                <img src={item.s3image} alt="" />{' '}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
