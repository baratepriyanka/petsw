import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Moment from 'moment';
import './style.css';
import Axios from 'axios';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  Modal,
  Input,
  TextField,
  Tooltip,
} from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Close';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'User ID', alignRight: false },
  { id: 'fname', label: 'First Name', alignRight: false },
  { id: 'lname', label: 'Last Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'mobileno', label: 'Mobile No.', alignRight: false },
  // { id: 'action', label: 'Action', alignRight: false },
];
// { id: 'prescriptionid', label: 'Prescription Id', alignRight: false },
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
const styleuser = {
  position: 'absolute',
  top: '50%',
  center: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 1700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};
const style = {
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
const search = {
  margin: 5,
  width: '30%',
  display: 'flex',
  alignSelf: 'end',
  justifyContent: 'end',
};
export default function OPD() {
  const [dataPage, setDataPage] = useState(0);
  const [page, setPage] = useState(0);
  const [perPagerows, setperPagerows] = useState(10);
  const [medicinePageData, setMedicinePageData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [opdData, setOpdData] = useState([]);
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;
  // console.log(loginData);

  const getOpdData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/getall-usermanagment/${loginId}`
    );
    const data = await response.json();
    if (response) {
      const patientData = data
        .sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        })
        .map((curElem, name) => {
          return { curElem, name };
        });
      setOpdData(patientData);
      setMedicinePageData([patientData]);
      //  console.log(opdData)
    }
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = opdData.filter(({ curElem, name }) => {
        // console.log(curElem);
        return Object.values(curElem).join('').toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      // console.log("curElem");
      setFilteredResults(opdData);
    }
  };

  const [masterUserRole, setmasterUserRole] = useState([]);
  const getmasterUserRole = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/master-userrole`
    );
    setmasterUserRole(await response.json());
  };
  const [masterdepartment, setMasterDepartment] = useState([]);
  const getMasterDepartment = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-department`
    );
    setMasterDepartment(await response.json());
  };

  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  const logoutRedirect = () => {
    navigate('/');
  };
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [s3image, setS3image] = useState();
  const [hospid, setHospId] = useState();
  const [hospitalid, setHospitalId] = useState();

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem('token-info'));
    if (loginData) {
      setFname(loginData.fname);
      setLname(loginData.lname);
      setEmail(loginData.email);
      setS3image(loginData.s3image);
      setHospId(loginData.hosp_id);
      setHospitalId(loginData.hospital_id);
      setIsLoggedin(true);
    } else {
      setFname('');
      setLname('');
      setEmail('');
      setS3image('');
      setHospId('');
      setHospitalId('');
      logoutRedirect();
    }
    // console.log('formErrors');
    getOpdData();
    getmasterUserRole();
    getMasterDepartment();
    setPage(0);
  }, [dataPage]);

  // const [page, setPage] = useState(0);

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(1);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'desc';
    setOrder(isAsc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setperPagerows(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  function handleKeyDown(event) {
    if (event.keyCode === 32 && event.target.value.length  === 0) { // check if space is at beginning
      event.preventDefault();
    }
  }
  const [select, setSelect] = useState();
  const [open, setOpen] = useState(false);
  const handleCapacity = (e) => {
    // console.log(e.target.value)
    setSelect(e.target.value);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  const handleCloseForPassword = () =>{
    setOpen(false);

  }
  const [profile, setProfile] = useState({
    file: [],
    profile: null,
  });
  const [profileUser, setProfileUser] = useState({
    file: [],
    profile: null,
  });
  const initialvalue = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: '',
    hospital_id: `${loginId}`,
    address: '',
    user_type: `${select}`,
    // admin: `${isChecked}` ? '0' :'1'
  };
  // console.log(initialvalue)
  const initialvalueUser = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    hospital_id: `${loginId}`,
    address: '',
    user_type: `${select}`,
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errMsg, seterrMsg] = useState();
  const [formValuesUser, setFormValuesUser] = useState(initialvalueUser);
  const [formErrorsUser, setFormErrorsUser] = useState({});
  const [isSubmitUser, setIsSubmitUser] = useState(false);
  const { departmentErr } = formErrors;
  let formIsValid = true;

  const formVAlidations = {
    first_name: 50,
    address: 500,
    patientname: 50,
  };
  const formValName = {
    phone: 11,
  };
  const formValidationName = {
    first_name: 'first name',
    last_name: 'last name',
    address: 'address',
    email: 'a valid email',
    phone: ' mobile no',
  };

  const formValSelectName = {
    department: 'department',
  };
  const formValPattern = {
    first_name: 'first name',
    last_name: 'last name',
  };
  const formEmailPatt = {
    email: 'email',
   };
   const phonePattern = {
    phone: 'mobile no',
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const value1 = e.target.value;
    console.log(value1)
    const letters = /^[a-zA-Z\s]*$/;
    const namePattern = letters.test(value1)
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailPat = emailPattern.test(value1);
    const phonePatte = /(^[0-9]+(\.[0-9]+)?$)/;
    const paPattern = phonePatte.test(value1.phone);
    if (value) {
      e.target.parentElement.querySelector('p').innerText = '';
      e.target.parentElement.querySelector('p').style.display = 'none';
    } else if (formValidationName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the ${formValidationName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    } else {
      // console.log(formValSelectName[name])
      e.target.parentElement.querySelector('p').innerText = `Select ${formValSelectName[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }

    if (formVAlidations[name] && value.length > formVAlidations[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formVAlidations[name]} character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }

    if (formValName[name] && value.length > formValName[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the minimum 10 digit.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    if (formValPattern[name] && namePattern === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter only character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    // if (formEmailPatt[name] && emailPat === false) {
    //   e.target.parentElement.querySelector('p').innerText = `Enter the a valid email.`;
    //   e.target.parentElement.querySelector('p').style.display = 'block';
    // }
    if (phonePattern[name] && paPattern === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter the only 10 digit.`;
      e.target.parentElement.querySelector('p').style.display = 'block';

    }
  };

  const handleInputChange = (event) => {
    setProfile({
      ...profile,
      file: event.target.files[0],
      profile: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleInputChangeUser = (event) => {
    setProfileUser({
      ...profileUser,
      file: event.target.files[0],
      profile: URL.createObjectURL(event.target.files[0]),
    });
  };
  const [errMsgvalidation, setErrImgvalidation] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    // if (profile.file.length === 0) {
    //   setErrImgvalidation('Please upload profile.');
    // }
  };
  const handleSubmitUser = (e) => {
    e.preventDefault();
    setFormErrorsUser(validateUser(formValuesUser));
    setIsSubmitUser(true);
    // if (profileUser.file.length === 0) {
    //   setErrImgvalidation('Please upload profile.');
    // }
  
  };

  const formVAlidationsUser = {
    first_name: 50,
    address: 500,
    patientname: 50,
  };
  const formValNameUser = {
    phone: 11,
  };
  const formValidationNameUser = {
    first_name: 'first name',
    last_name: 'last name',
    address: 'address',
    email: 'a valid email',
    phone: ' mobile no',
  };
  const formValUserPattern = {
    first_name: 'first name',
    last_name: 'last name',
  };
  const formValEmailPatt = {
    email: 'email',
   };
   const phonePatternUser = {
    phone: 'mobile no',
  };
  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setFormValuesUser({ ...formValuesUser, [name]: value });
    const value1 = e.target.value;
    const letters = /^[a-zA-Z\s]*$/;
    const namePattern = letters.test(value1)
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailPat = emailPattern.test(value1);
    const phonePattern = /^\d{10}$/;
    const paPattern=phonePattern.test(value1.phone);
    if (value) {
      e.target.parentElement.querySelector('p').innerText = '';
      e.target.parentElement.querySelector('p').style.display = 'none';
    } else if (formValidationNameUser[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the ${formValidationNameUser[name]}.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }

    if (formVAlidationsUser[name] && value.length > formVAlidationsUser[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the minimum ${formVAlidationsUser[name]} character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }

    if (formValNameUser[name] && value.length > formValNameUser[name]) {
      e.target.parentElement.querySelector('p').innerText = `Enter the minimum 10 digit.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    if (formValUserPattern[name] && namePattern === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter only character.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
    // if (formValEmailPatt[name] && emailPat === false) {
    //   e.target.parentElement.querySelector('p').innerText = `Enter the a valid email.`;
    //   e.target.parentElement.querySelector('p').style.display = 'block';
    // }
    if (phonePatternUser[name] && paPattern === false) {
      e.target.parentElement.querySelector('p').innerText = `Enter the only 10 digit.`;
      e.target.parentElement.querySelector('p').style.display = 'block';
    }
  };

  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-usermanagment`;
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (select === '1') {
        Axios.post(
          url,
          {
            first_name: formValues.first_name,
            last_name: formValues.last_name,
            phone: formValues.phone,
            email: formValues.email,
            hospital_id: formValues.hospital_id,
            department: formValues.department,
            address: formValues.address,
            user_type: select,
          },
          { headers: { 'Access-Control-Allow-Origin': '*' } }
        ).then((res) => {
          if (res.data.message) {
            seterrMsg(res.data.message);

          } else {
            const errorMsg = '';
            seterrMsg(errorMsg);
            const data = res.data.post;
            window.location.reload();
            const data1 = new FormData();
            data1.append('profile', profile.file);
            const urlImg = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-user-doctor-profile/${data}`;
            const response1 = Axios.post(urlImg, data1)
              .then((res) => {
              // setTimeout(window.location.reload(), 2000);
                window.location.reload();
                //  setResponseId(data);
              })
              .catch((error) => {
                console.log('profile should be less then 1 Mb in size.');
                // alert('profile should be less then 1 Mb in size.');
              });
          }
        });
        // if (profile.file.length === 0) {
        //   setErrImgvalidation('Please upload profile.');
        //   // console.log('Please upload profile');
        // } else {
          
        // }
      }
    }
  }, [formErrors]);
  useEffect(() => {
    if (Object.keys(formErrorsUser).length === 0 && isSubmitUser) {
    
      if (select === '0') {
        Axios.post(
          url,
          {
            first_name: formValuesUser.first_name,
            last_name: formValuesUser.last_name,
            phone: formValuesUser.phone,
            email: formValuesUser.email,
            hospital_id: formValuesUser.hospital_id,
            address: formValuesUser.address,
            user_type: `${select}`,
          },
          { headers: { 'Access-Control-Allow-Origin': '*' } }
        ).then((res) => {
          if (res.data.message) {
            seterrMsg(res.data.message);
          } else {
            const errorMsg = '';
            seterrMsg(errorMsg);
            const data = res.data.post;
            window.location.reload();
            const data1 = new FormData();
            data1.append('profile', profileUser.file);
            const urlImg = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/add-user-doctor-profile/${data}`;
            const response1 = Axios.post(urlImg, data1)
              .then((res) => {
                // console.log(res);
                window.location.reload();
                //  setResponseId(data);
              })
              .catch((error) => {
                console.log('profile should be less then 1 Mb in size.');
              });
          }
        });
        // if (profileUser.file.length === 0) {
        //   setErrImgvalidation('Please upload profile.');
        //   // console.log('Please upload profile');
        // } else {
         
        // }
      }
    }
  }, [formErrorsUser]);

  const validateUser = (values) => {
    const errors = {};
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailRegenx = regex.test(values.email);
    const namePattern = /^[a-zA-Z\s]*$/;
    const firstNamePattern = namePattern.test(values.first_name);
    const lastNamePattern = namePattern.test(values.last_name);
    const PHONE_PATTERN = /(^[0-9]+(\.[0-9]+)?$)/;
    const paPattern = PHONE_PATTERN.test(values.phone);
    const limit = 500;
    if (!values.email) {
      errors.email = 'Enter email.';
    } else if (emailRegenx === false) {
      errors.email = 'Please enter a valid email.';
    }
    if (!values.first_name) {
      errors.first_name = 'Enter first name.';
    } else if (firstNamePattern === false) {
      errors.first_name = 'Please enter characters only.';
    } else if (values.first_name.slice(50, limit)) {
      errors.first_name = 'Enter the minimum 50 character.';
    }
    if (!values.last_name) {
      errors.last_name = 'Enter last name.';
    } else if (lastNamePattern === false) {
      errors.last_name = 'Please enter characters only.';
    } else if (values.last_name.slice(50, limit)) {
      errors.last_name = 'Enter the minimum 50 character.';
    }
    if (!values.address) {
      errors.address = 'Enter address';
    } else if (values.address.slice(450, limit)) {
      errors.address = 'Enter the minimum 500 character.';
    }
    if (!values.phone) {
      errors.phone = 'Enter  mobile no.';
    } 

    return errors;
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailRegenx = regex.test(values.email);
    const namePattern = /^[a-zA-Z\s]*$/;
    const firstNamePattern = namePattern.test(values.first_name);
    const lastNamePattern = namePattern.test(values.last_name);
    const PHONE_PATTERN = /(^[0-9]+(\.[0-9]+)?$)/;
    const paPattern = PHONE_PATTERN.test(values.phone);
    const limit = 500;
    if (!values.email) {
      errors.email = 'Enter email.';
    } else if (emailRegenx === false) {
      errors.email = 'Please enter a valid email.';
    }
    if (!values.first_name) {
      errors.first_name = 'Enter first name.';
    } else if (firstNamePattern === false) {
      errors.first_name = 'Please enter characters only';
    } else if (values.first_name.slice(50, limit)) {
      errors.first_name = 'Enter the minimum 50 character';
    }
    if (!values.last_name) {
      errors.last_name = 'Enter last name.';
    } else if (lastNamePattern === false) {
      errors.last_name = 'Please enter characters only';
    } else if (values.last_name.slice(50, limit)) {
      errors.last_name = 'Enter the minimum 50 character';
    }
    if (values.department === '' || values.department === 'select') {
      formIsValid = false;
      errors.departmentErr = 'Select department';
    }
    if (!values.address) {
      errors.address = 'Enter address.';
    } else if (values.address.slice(450, limit)) {
      errors.address = 'Enter the minimum 500 character';
    }
    if (!values.phone) {
      errors.phone = 'Enter mobile no';
    }
    // if (!values.profile) {
    //   errors.profile = 'Profile is required';
    // }
    return errors;
  };

  return (
    <>
      {isLoggedin ? (
        <Page title="Users">
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Users
              </Typography>
              {/* <Button
                variant="contained"
                className="honbtn"
                component={RouterLink}
                to="/dashboard/CreateNewUserManagement"
                startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{ backgroundColor: '#08670f' }}
              >
                Create New User
              </Button> */}

              <select
                style={{ width: '20%', height: '35px', borderRadius: '6px' }}
                required=""
                id="admin"
                name="admin"
                className="form-control"
                value={select}
                onChange={handleCapacity}
              >
                <option>--Select--</option>
                {masterUserRole.map((curElem) => (
                  <option key={curElem.id} value={curElem.value}>
                    {curElem.type}
                  </option>
                ))}
              </select>
            </Stack>
            <Modal
              open={open}
              // onClick={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
              
                <div className="row">
               
                  {select === '1' ? (
                    <form action="" onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                      <h6 className="text-center mb-4 add-user-name">Create New Doctor</h6>
                      <div className="row">
                        <div className="row">
                          <input type="hidden" value={formValues.hospital_id} />
                          <input type="hidden" value={select} />
                          <div className="col-md-6 form-group">
                            <label>
                              First_Name<span className="man_filed">*</span>
                            </label>
                            <input
                              type="text"
                              name="first_name"
                              className="form-control"
                              id="first_name"
                              required=""
                              value={formValues.first_name}
                              onKeyDown={handleKeyDown}
                              onChange={handleChange}
                              autoComplete="off"
                              placeholder="Enter First Name"
                            />
                            {/* {formValues.first_name === '' ? (
                              <div style={{ color: 'red' }}>{formErrors.first_name}</div>
                            ) : (
                              ''
                            )} */}
                            <p style={{ color: 'red' }}>{formErrors.first_name}</p>
                          </div>
                          <div className="col-md-6 form-group">
                            <label>
                              Last_Name<span className="man_filed">*</span>
                            </label>
                            <input
                              type="text"
                              name="last_name"
                              className="form-control"
                              id="last_name"
                              required=""
                              value={formValues.last_name}
                              onKeyDown={handleKeyDown}
                              onChange={handleChange}
                              autoComplete="off"
                              placeholder="Enter Last Name"
                            />
                            {/* {formValues.last_name === '' ? (
                              <div style={{ color: 'red' }}>{formErrors.last_name}</div>
                            ) : (
                              ''
                            )} */}
                            <p style={{ color: 'red' }}>{formErrors.last_name}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-6 form-group">
                                <label className="profile-user">
                                  Profile
                                </label>
                                <div className="add_img_doctor_div">
                                  <label className="add_img_doctor">
                                    <Tooltip
                                      title="Add Image"
                                      aria-label=""
                                      componentsProps={{
                                        tooltip: {
                                          sx: {
                                            marginTop: '-5px',
                                          },
                                        },
                                      }}
                                    >
                                      <i className="fas fa-edit add_doc_faicon" />
                                    </Tooltip>
                                    <input
                                      type="file"
                                      className="form-control"
                                      id="profile"
                                      name="profile"
                                      onChange={handleInputChange}
                                      autoComplete="off"
                                      style={{ display: 'none' }}
                                    />
                                  </label>
                                </div>

                                <div className="add_img_doctor_div">
                                  {profile.profile !== null ? (
                                    <div>
                                      <img className="doc_profile_img" src={profile.profile} alt="" />
                                    </div>
                                  ) : (
                                    <div>
                                      <img className="doc_profile_img" src={formValues.s3image} alt="" />
                                    </div>
                                  )}
                                </div>
                                <small>profile should be less then 1 mb in size.</small>
                                {/* {profile.file.length === 0 ? (
                                  <div style={{ color: 'red' }}>{errMsgvalidation}</div>
                                ) : (
                                  ''
                                )} */}
                              </div>
                              <div className="col-md-6 form-group">
                                <div className="row">
                                  <div className="col-md-12 form-group">
                                    <label>
                                      Email<span className="man_filed">*</span>
                                    </label>
                                    <input
                                      type="email"
                                      name="email"
                                      className="form-control"
                                      id="email"
                                      required=""
                                      value={formValues.email}
                                      onChange={handleChange}
                                      autoComplete="off"
                                      placeholder="Enter Email"
                                    />
                                    <p style={{ color: 'red' }}>{formErrors.email}</p>
                                    <p style={{ color: 'red' }}>{errMsg}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12 form-group">
                                    <label>
                                      Mobile No.<span className="man_filed">*</span>
                                    </label>
                                    <input type="text"
                                      className="form-control"
                                      id="phone"
                                      name="phone"
                                      required=""
                                      value={formValues.phone}
                                      onChange={handleChange}
                                      autoComplete="off"
                                      minLength={10}
                                      size="10"
                                      maxLength={10}
                                      pattern='[0-9]{10}'
                                      placeholder="Enter Mobile.No"
                                    />
                                    <p style={{ color: 'red' }}>{formErrors.phone}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12 form-group">
                                    <label>
                                      Department<span className="man_filed">*</span>
                                    </label>
                                    <select
                                      style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                                      required=""
                                      id="department"
                                      name="department"
                                      onChange={(e) => handleChange(e)}
                                      value={formValues.department}
                                      className="form-control"
                                    >
                                      <option value="">--select--</option>
                                      {masterdepartment.map((curElem) => (
                                        <option key={curElem.id} value={curElem.id}>
                                          {curElem.name}
                                        </option>
                                      ))}
                                    </select>
                                    {/* {formValues.department === '' ? (
                                      <div style={{ color: 'red' }}>{formErrors.department}</div>
                                    ) : (
                                      ''
                                    )} */}
                                    {departmentErr && <p style={{ color: 'red' }}>{departmentErr}</p>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 form-group">
                            <label>
                              Address<span className="man_filed">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              name="address"
                              id="address"
                              required=""
                              value={formValues.address}
                              onKeyDown={handleKeyDown}
                              onChange={handleChange}
                              autoComplete="off"
                              placeholder="Enter Address"
                            />
                            {/* {formValues.address === '' ? <div style={{ color: 'red' }}>{formErrors.address}</div> : ''} */}
                            <p style={{ color: 'red' }}>{formErrors.address}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <button type="submit" className="btn btn-primary m-2">
                          Submit
                        </button>
                        <button type="button" className="btn btn-secondary m-1" onClick={handleClose}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <form action="" onSubmit={handleSubmitUser} method="post" encType="multipart/form-data">
                        <h6 className="text-center mb-4 add-user-name">Create New User</h6>
                        <div className="row">
                          <div className="row">
                            <input type="hidden" value={formValuesUser.hospital_id} />
                            <input type="hidden" value={select} />
                            <div className="col-md-6 form-group">
                              <label>
                                First_Name<span className="man_filed">*</span>
                              </label>
                              <input
                                type="text"
                                name="first_name"
                                className="form-control"
                                id="first_name"
                                required=""
                                value={formValuesUser.first_name}
                                onKeyDown={handleKeyDown}
                                onChange={handleChangeUser}
                                autoComplete="off"
                                placeholder="Enter First Name"
                              />
                              {/* {formValuesUser.first_name === '' ? (
                                <div style={{ color: 'red' }}>{formErrorsUser.first_name}</div>
                              ) : (
                                ''
                              )} */}
                              <p style={{ color: 'red' }}>{formErrorsUser.first_name}</p>
                            </div>
                            <div className="col-md-6 form-group">
                              <label>
                                Last_Name<span className="man_filed">*</span>
                              </label>
                              <input
                                type="text"
                                name="last_name"
                                className="form-control"
                                id="last_name"
                                required=""
                                value={formValuesUser.last_name}
                                onKeyDown={handleKeyDown}
                                onChange={handleChangeUser}
                                autoComplete="off"
                                placeholder="Enter Last Name"
                              />
                              {/* {formValuesUser.last_name === '' ? (
                                <div style={{ color: 'red' }}>{formErrorsUser.last_name}</div>
                              ) : (
                                ''
                              )} */}
                              <p style={{ color: 'red' }}>{formErrorsUser.last_name}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-6 form-group">
                                  <label className="profile-user">Profile</label>
                                  <div className="add_img_doctor_div">
                                    <label className="add_img_doctor">
                                      <Tooltip
                                        title="Add Image"
                                        aria-label=""
                                        componentsProps={{
                                          tooltip: {
                                            sx: {
                                              marginTop: '-5px',
                                            },
                                          },
                                        }}
                                      >
                                        <i className="fas fa-edit add_doc_faicon" />
                                      </Tooltip>
                                      <input
                                        type="file"
                                        className="form-control"
                                        id="profile"
                                        name="profile"
                                        onChange={handleInputChangeUser}
                                        autoComplete="off"
                                        style={{ display: 'none' }}
                                      />
                                    </label>
                                  </div>

                                  <div className="add_img_doctor_div">
                                    {profileUser.profile !== null ? (
                                      <div>
                                        <img className="doc_profile_img" src={profileUser.profile} alt="" />
                                      </div>
                                    ) : (
                                      <div>
                                        <img className="doc_profile_img" src={formValuesUser.s3image} alt="" />
                                        {/* <div style={{ color: 'red' }}>{formErrorsUser.profile}</div> */}
                                      </div>
                                    )}

                                    <small>profile should be less then 1 mb in size.</small>
                                    {/* {profileUser.file.length === 0 ? (
                                      <div style={{ color: 'red' }}>{errMsgvalidation}</div>
                                    ) : (
                                      ''
                                    )} */}
                                  </div>
                                </div>
                                <div className="col-md-6 form-group">
                                  <div className="row">
                                    <div className="col-md-12 form-group">
                                      <label>
                                        Email<span className="man_filed">*</span>
                                      </label>
                                      <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        id="email"
                                        required=""
                                        value={formValuesUser.email}
                                        onChange={handleChangeUser}
                                        autoComplete="off"
                                        placeholder="Enter Email"
                                      />
                                      <p style={{ color: 'red' }}>{formErrorsUser.email}</p>
                                      <p style={{ color: 'red' }}>{errMsg}</p>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-12 form-group">
                                      <label>
                                        Mobile No.<span className="man_filed">*</span>
                                      </label>
                                      <input
                                      type="text"
                                      className="form-control"
                                      id="phone"
                                      name="phone"
                                      required=""
                                      value={formValuesUser.phone}
                                      onChange={handleChangeUser}
                                      autoComplete="off"
                                      minLength={10}
                                      size="10"
                                      maxLength={10}
                                      pattern='[0-9]{10}'
                                      placeholder="Enter Mobile.No"
                                     />
                                      
                                      <p style={{ color: 'red' }}>{formErrorsUser.phone}</p>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-12 form-group">
                                      <label>
                                        Address<span className="man_filed">*</span>
                                      </label>
                                      <textarea
                                        className="form-control"
                                        name="address"
                                        id="address"
                                        required=""
                                        value={formValuesUser.address}
                                        onKeyDown={handleKeyDown}
                                        onChange={handleChangeUser}
                                        autoComplete="off"
                                        placeholder="Enter Address"
                                      />
                                      {/* {formValuesUser.address === '' ? (
                                        <div style={{ color: 'red' }}>{formErrorsUser.address}</div>
                                      ) : (
                                        ''
                                      )} */}
                                      <p style={{ color: 'red' }}>{formErrorsUser.address}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-2">
                          <button type="submit" className="btn btn-primary m-2">
                            Submit
                          </button>
                          <button type="button" className="btn btn-secondary m-1" onClick={handleClose}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </Box>
            </Modal>

            <Card>
              {/* <UserListToolbar icon='search'
                placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)} /> */}

              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Search"
                placeholder="Search..."
                onChange={(e) => searchItems(e.target.value)}
                sx={search}
              />

              {/* <Input icon='search'
                placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)}/> */}
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={USERLIST.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />

                    <TableBody>
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { id, name, role, status, company, avatarUrl, isVerified } = row;
                        const isItemSelected = selected.indexOf(name) !== -1;

                        return (
                          <>
                            {searchInput.length > 1
                              ? // {
                                filteredResults
                                  .slice(page * perPagerows, page * perPagerows + perPagerows)
                                  .map(({ curElem, name }) => {
                                    return (
                                      <TableRow
                                        key={curElem.id}
                                        hover
                                        tabIndex={-1}
                                        role="checkbox"
                                        selected={isItemSelected}
                                        aria-checked={isItemSelected}
                                      >
                                        {/* <TableCell padding="checkbox">
                                          <Checkbox
                                            checked={isItemSelected}
                                            onChange={(event) => handleClick(event, name)}
                                          />
                                        </TableCell> */}
                                        <TableCell align="center">{curElem.user_id} </TableCell>
                                        <TableCell align="center">{curElem.first_name}</TableCell>
                                        <TableCell align="center">{curElem.last_name}</TableCell>
                                        <TableCell align="center">{curElem.email}</TableCell>
                                        <TableCell align="center">{curElem.phone}</TableCell>

                                        <TableCell align="right">
                                          <TableCell style={{ width: 'maxWidth' }}>
                                            <Box style={{ display: 'flex' }}>
                                              {/* <Button
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                className="honbtn"
                                                component={RouterLink}
                                                to={`/dashboard/EditUserManagment/${curElem.id}`}
                                                sx={{ ml: 1, backgroundColor: '#6da671' }}
                                              >
                                                Edit
                                              </Button> */}
                                              {/* <Button
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                id="abcd"
                                                component={RouterLink}
                                                to={`/dashboard/InfoOpdList/${curElem.id}`}
                                                sx={{ ml: 1, backgroundColor: '#2d2851' }}
                                              >
                                                Info
                                              </Button> */}
                                              {/* <Button
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                onClick={() => funcDelete(curElem.id)}
                                                sx={{ ml: 1, backgroundColor: '#710808' }}
                                              >
                                                {' '}
                                                Delete
                                              </Button> */}
                                            </Box>
                                          </TableCell>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })
                              : opdData
                                  .slice(page * perPagerows, page * perPagerows + perPagerows)
                                  .map(({ curElem, name }) => {
                                    return (
                                      <TableRow
                                        key={curElem.id}
                                        hover
                                        tabIndex={-1}
                                        role="checkbox"
                                        selected={isItemSelected}
                                        aria-checked={isItemSelected}
                                      >
                                        {/* <TableCell padding="checkbox">
                                          <Checkbox
                                            checked={isItemSelected}
                                            onChange={(event) => handleClick(event, name)}
                                          />
                                        </TableCell> */}
                                        <TableCell align="center">{curElem.user_id} </TableCell>
                                        <TableCell align="center">{curElem.first_name}</TableCell>
                                        <TableCell align="center">{curElem.last_name}</TableCell>
                                        <TableCell align="center">{curElem.email}</TableCell>
                                        <TableCell align="center">{curElem.phone}</TableCell>

                                        <TableCell align="right">
                                          <TableCell style={{ width: 'maxWidth' }}>
                                            <Box style={{ display: 'flex' }}>
                                              {/* <Button
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                className="honbtn"
                                                component={RouterLink}
                                                to={`/dashboard/EditUserManagment/${curElem.id}`}
                                                sx={{ ml: 1, backgroundColor: '#6da671' }}
                                              >
                                                Edit
                                              </Button> */}
                                              {/* <Button
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                id="abcd"
                                                component={RouterLink}
                                                to={`/dashboard/InfoOpdList/${curElem.id}`}
                                                sx={{ ml: 1, backgroundColor: '#2d2851' }}
                                              >
                                                Info
                                              </Button> */}
                                              {/* <Button
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                onClick={() => funcDelete(curElem.id)}
                                                sx={{ ml: 1, backgroundColor: '#710808' }}
                                              >
                                                {' '}
                                                Delete
                                              </Button> */}
                                            </Box>
                                          </TableCell>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                          </>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>

                    {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={opdData.length}
                rowsPerPage={perPagerows}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
        </Page>
      ) : (
        <h1>{" "}</h1>
      )}
    </>
  );
}
