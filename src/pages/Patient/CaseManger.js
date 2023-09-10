import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Moment from 'moment';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Modal,
  Tooltip
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu, UserListToolbarCaseManger } from '../../sections/@dashboard/user';

// mock
import USERLIST from '../../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Id', label: 'Pet Case ID', alignRight: false },
  { id: 'Date', label: 'Date', alignRight: false },
  { id: 'patient', label: 'Patient Name', alignRight: false },
  { id: 'CaseTitle', label: 'Title', alignRight: false },
  { id: 'Case', label: 'Case', alignRight: false },
  { id: 'action ', label: 'Action ', alignRight: false },
];

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
const search = {
  margin: 5,
  width: '30%',
  display: 'flex',
  alignSelf: 'end',
  justifyContent: 'end',
};
export default function CaseManger() {
  const [dataPage, setDataPage] = useState(0);
  const [page, setPage] = useState(0);
  const [perPagerows, setperPagerows] = useState(10);
  const [medicinePageData, setMedicinePageData] = useState([]);
  // const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(1);

  const [patientData, setPatientData] = useState([]);

  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;

  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/addcase`;

  const initialvalue = {
    patient: '',
    date: '',
    case: '',
    title: '',
    remarks: '',
    hospital_id: `${loginId}`,
  };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { patient } = formErrors;

  const formIsValid = true;
  const formVAlidations = {
    title: 100,
    case: 500,
   
  };
  const formValidationName = {
    title: 'title',
    case: 'case',
   
  };
  const formValSelectName = {
    date: 'date',
    patient: 'patient',

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

  };

  const handleCkeditorState = (e, editor) => {
    const data = editor.getData();
    setFormValues({ ...formValues, case: data });
    // console.log(data);
  };

  const getPatientData = async () => {
    // console.log("hiiiii")
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-patient-name/${loginId}`
    );
    setPatientData(await response.json());
    //  console.log(patientData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [caseData, setCaseData] = useState([]);
  const getIpdData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-case/${loginId}`
    );
    const data = await response.json();
    console.log(data)
    if (response) {
      const casePatientData = data
        .sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        })
        .map((curElem, name) => {
          // console.log(curElem)
          return { curElem, name };
        });
      setCaseData(casePatientData);
      setMedicinePageData([casePatientData]);
    }
  };
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = caseData.filter(({ curElem, name }) => {
        console.log(curElem);
        return Object.values(curElem.Patient.patient_name, curElem.title, curElem.date)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      // console.log("curElem");
      setFilteredResults(caseData);
    }
  };
  const [deleteRow, setDeleteRow] = useState([]);
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [opensave, setOpenSave] = useState(false);
  const handleOpenSave = () => opensave(true);
  const handleCloseSave = () => {
    setOpenSave(false);
    window.location.reload();
  };

  const [deleteId, setDeleteId] = useState();
  const funcDelete = (id) => {
    setOpen(true);
    // console.log(id);
    setDeleteId(id);
  };
  const deleteIpdRow = async (e) => {
    e.preventDefault();
    const aa = e.target.value;
    // console.log(aa);
    Axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/delete-addcase/${aa}`) // <-- remove ;
      .then((res) => {
        const users = res.message;
        setDeleteRow({ users });
        getIpdData();
        setOpen(false);
      });
  };

  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  const logoutRedirect = () => {
    // console.log('hii');
    navigate('/');
  };

  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [s3image, setS3image] = useState();
  const [hospid, setHospId] = useState();
  const [hospitalid, setHospitalId] = useState();
  useEffect(() => {
    // console.log("formErrors");
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

    getPatientData();
    getIpdData();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setOpenSave(true);
      Axios.post(url, {
        patient: formValues.patient,
        date: formValues.date,
        case: formValues.case,
        title: formValues.title,
        hospital_id: formValues.hospital_id,
        status: 0,
      }).then((res) => {
        console.log(formValues);
        // console.log(formCkEditorValue);
      });
    }
  }, [formErrors]);

  useEffect(() => {
    getIpdData();
    setPage(0);
  }, [dataPage]);
  const validate = (values) => {
    const errors = {};
    const limit = 500;
    if (values.patient === '' || values.patient === 'select') {
      errors.patient = 'Select patient.';
    }
    if (!values.date) {
      errors.date = 'Select date.';
    }
    if (!values.case) {
      errors.case = 'Enter the case. ';
    } else if (values.case.slice(500, limit)) {
      errors.case = 'Enter the minimum 500 character.';
    }
    if (!values.title) {
      errors.title = 'Enter the title. ';
    } else if (values.title.slice(100, limit)) {
      errors.title = 'Enter the minimum 100 character.';
    }

    return errors;
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
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

  return (
    <>
      {isLoggedin ? (
        <Page title="CaseManger">
          <Container>
            <Box>
              <Typography variant="h4" sx={{ m: 2 }}>
                Add Case
              </Typography>
              <Card sx={{ mb: 3 }}>
                <section className="contact-screen-one ipad-height">
                  <div className="container">
                    <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
                      <div className="row">
                        <div className="">
                          <form action="" onSubmit={handleSubmit} className="did-floating-label-content">
                            <div className="container">
                              <div className="row mt-3">
                                <div className="row justify-content-center">
                                  <input type="hidden" value={formValues.hospital_id} />
                                  <div className="col-md-4 form-group">
                                    <label>Date</label>
                                    <input
                                      type="date"
                                      name="date"
                                      className="form-control"
                                      id="datecasm"
                                      required=""
                                      onChange={handleChange}
                                      value={formValues.date}
                                      placeholder="Enter the date"
                                    />
                                    <p style={{ color: 'red' }}>{formErrors.date}</p>
                                  </div>
                                  <div className="col-md-4 form-group">
                                    <label>Patient</label>
                                    <select
                                      style={{ width: '100%', height: '35px', borderRadius: '6px' }}
                                      required=""
                                      id="patient"
                                      name="patient"
                                      onChange={handleChange}
                                      value={formValues.patient}
                                      className="form-control"
                                    >
                                      <option value=''>--select--</option>
                                      {patientData.map((curElem) => (
                                        // <option kay={curElem.id} value={curElem.id}>{curElem.name}</option>
                                        <option key={curElem.id} value={curElem.id}>
                                          {curElem.patient_name}
                                        </option>
                                      ))}
                                    </select>
                                    {patient && <p style={{ color: 'red'}}>{patient}</p>}
                                  </div>
                                </div>
                                <div className="row justify-content-center">
                                  <div className="col-md-8 form-group">
                                    <label>Title</label>
                                    <input
                                      type="text"
                                      name="title"
                                      className="form-control"
                                      id="title"
                                      required=""
                                      onChange={handleChange}
                                      onKeyDown={handleKeyDown}
                                      value={formValues.title}
                                      placeholder="Enter the Title"
                                    />
                                    <p style={{ color: 'red' }}>{formErrors.title}</p>
                                  </div>
                                </div>
                                <div className="row justify-content-center">
                                  <div className="col-md-8 form-group ">
                                    <label>Case</label>
                                    <textarea
                                      type="text"
                                      name="case"
                                      className="form-control"
                                      id="title"
                                      required=""
                                      value={formValues.case}
                                      onChange={handleChange}
                                      onKeyDown={handleKeyDown}
                                      placeholder="Enter the Case"
                                    />

                                    <p style={{ color: 'red' }}>{formErrors.case}</p>
                                  </div>
                                </div>
                                <div className="text-center py-4">
                                  <button type="submit" className="btn btn-primary">
                                    Save
                                  </button>
                                </div>
                                <Modal
                                  open={opensave}
                                  // onClick={handleClose}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                      {/* Text in a modal */}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-center">
                                      Record has been Saved Successfully
                                    </Typography>
                                    <div className="text-center">
                                      <Button
                                        size="small"
                                        type="button"
                                        variant="contained"
                                        onClick={handleCloseSave}
                                        id=""
                                        className="text-center opdpatientok"
                                        sx={{ mt: 2, backgroundColor: '#0d6efd' }}
                                      >
                                        Ok
                                      </Button>
                                    </div>
                                  </Box>
                                </Modal>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Card>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ m: 2 }}>
                All Case
              </Typography>
              <Card sx={{ minWidth: 660 }}>
                {/* <Typography variant="h5" sx={{ m: 2 }}>
                  All Case
                </Typography> */}
                {/* <UserListToolbarCaseManger
                  numSelected={selected.length}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                /> */}
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  label="Search"
                  placeholder="Search..."
                  onChange={(e) => searchItems(e.target.value)}
                  sx={search}
                />

                <Scrollbar>
                  <TableContainer sx={{ minWidth: 660 }}>
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
                                ? filteredResults
                                    .slice(page * perPagerows, page * perPagerows + perPagerows)
                                    .map(({ curElem, name }) => {
                                      const date = curElem.date;
                                      const formatDate = Moment(date).format('DD-MM-YYYY');
                                      const parName = curElem.title;
                                      const parentSubStr = parName.substr(0, 15);
                                      const caseName = curElem.case;
                                      const caseSubStr = caseName.substr(0, 15);
                                      // console.log(formatDate)
                                      // console.log(formatDate)
                                      return (
                                        <TableRow
                                          hover
                                          key=""
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
                                          <TableCell align="center" key={curElem.id}>
                                            {curElem.id}
                                          </TableCell>
                                          <TableCell align="center">{formatDate}</TableCell>
                                          <TableCell align="center">{curElem.Patient.patient_name}</TableCell>
                                          {parentSubStr.length < 10 ? (<TableCell align="center">{curElem.title}</TableCell>) : <Tooltip title={curElem.title} aria-label="patient_name">
                                        <TableCell align="center">{parentSubStr}...</TableCell>
                                        </Tooltip>}
                                        {caseSubStr.length < 10 ? (  <TableCell align="center">{curElem.case}</TableCell>) : <Tooltip title={curElem.case} aria-label="patient_name">
                                        <TableCell align="center">{caseSubStr}...</TableCell>
                                        </Tooltip>}
                                       
                                            <TableCell style={{ width: 'maxWidth' }}>
                                              {/* <UserMoreMenu /> */}
                                              <Box style={{ display: 'flex' }} className="row-button6">
                                                <Button
                                                  size="small"
                                                  type="button"
                                                  variant="contained"
                                                  className="edit-btn"
                                                  component={RouterLink}
                                                  to={`/dashboard/EditCaseManager/${curElem.id}`}
                                                  sx={{ ml: 1, backgroundColor: '#6da671' }}
                                                >
                                                  Edit
                                                </Button>
                                                <Button
                                                  size="small"
                                                  type="button"
                                                  variant="contained"
                                                  className="delete-btn"
                                                  onClick={() => funcDelete(curElem.id)}
                                                  sx={{ ml: 1, backgroundColor: '#710808' }}
                                                >
                                                  Delete
                                                </Button>
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
                                                    <Typography
                                                      id="modal-modal-description"
                                                      sx={{ mt: 2 }}
                                                      className="text-center"
                                                    >
                                                      Are you sure you want to delete Case Manager?
                                                    </Typography>
                                                    <div className="text-center">
                                                      <Button
                                                        size="small"
                                                        type="button"
                                                        variant="contained"
                                                        onClick={deleteIpdRow}
                                                        className="delete-okbtn"
                                                        // onClick={handleClose}
                                                        value={deleteId}
                                                        id=""
                                                        sx={{ mt: 2, backgroundColor: '#2768ff' }}
                                                      >
                                                        Ok
                                                      </Button>
                                                      <Button
                                                        size="small"
                                                        type="button"
                                                        variant="contained"
                                                        className="delete-canclebtn"
                                                        onClick={handleClose}
                                                        // value={deleteId}
                                                        id=""
                                                        sx={{ mt: 2, ml: 1, backgroundColor: '#686868' }}
                                                      >
                                                        Cancel
                                                      </Button>
                                                    </div>
                                                  </Box>
                                                </Modal>
                                              </Box>
                                            </TableCell>
                                            {/* <UserMoreMenu /> */}
                                    
                                        </TableRow>
                                      );
                                    })
                                : caseData
                                    .slice(page * perPagerows, page * perPagerows + perPagerows)
                                    .map(({ curElem, name }) => {
                                      const date = curElem.date;
                                      const formatDate = Moment(date).format('DD-MM-YYYY');
                                      const parName = curElem.title;
                                      const parentSubStr = parName.substr(0, 15);
                                      const caseName = curElem.case;
                                      const caseSubStr = caseName.substr(0, 15);
                                      // console.log(formatDate)
                                      return (
                                        <TableRow
                                          hover
                                          key=""
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
                                          <TableCell align="center" key={curElem.id}>
                                            {curElem.id}
                                          </TableCell>
                                          <TableCell align="center">{formatDate}</TableCell>
                                          <TableCell align="center">{curElem.Patient.patient_name}</TableCell>
                                          {parentSubStr.length < 10 ? (<TableCell align="center">{curElem.title}</TableCell>) : <Tooltip title={curElem.title} aria-label="patient_name">
                                        <TableCell align="center">{parentSubStr}...</TableCell>
                                        </Tooltip>}
                                        {caseSubStr.length < 10 ? (  <TableCell align="center">{curElem.case}</TableCell>) : <Tooltip title={curElem.case} aria-label="patient_name">
                                        <TableCell align="center">{caseSubStr}...</TableCell>
                                        </Tooltip>}
                                        
                                          
                                            <TableCell style={{ width: 'maxWidth' }}>
                                              {/* <UserMoreMenu /> */}
                                              <Box style={{ display: 'flex' }} className="row-button6">
                                                <Button
                                                  size="small"
                                                  type="button"
                                                  variant="contained"
                                                  className="edit-btn"
                                                  component={RouterLink}
                                                  to={`/dashboard/EditCaseManager/${curElem.id}`}
                                                  sx={{ ml: 1, backgroundColor: '#6da671' }}
                                                >
                                                  Edit
                                                </Button>
                                                <Button
                                                  size="small"
                                                  type="button"
                                                  variant="contained"
                                                  className="delete-btn"
                                                  onClick={() => funcDelete(curElem.id)}
                                                  sx={{ ml: 1, backgroundColor: '#710808' }}
                                                >
                                                  Delete
                                                </Button>
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
                                                    <Typography
                                                      id="modal-modal-description"
                                                      sx={{ mt: 2 }}
                                                      className="text-center"
                                                    >
                                                      Are you sure you want to delete Case Manager?
                                                    </Typography>
                                                    <div className="text-center">
                                                      <Button
                                                        size="small"
                                                        type="button"
                                                        variant="contained"
                                                        className="delete-okbtn"
                                                        onClick={deleteIpdRow}
                                                        // onClick={handleClose}
                                                        value={deleteId}
                                                        id=""
                                                        sx={{ mt: 2, backgroundColor: '#2768ff' }}
                                                      >
                                                        Ok
                                                      </Button>
                                                      <Button
                                                        size="small"
                                                        type="button"
                                                        variant="contained"
                                                        className="cancle-okbtn"
                                                        onClick={handleClose}
                                                        // value={deleteId}
                                                        id=""
                                                        sx={{ mt: 2, ml: 2, backgroundColor: '#686868' }}
                                                      >
                                                        Cancel
                                                      </Button>
                                                    </div>
                                                  </Box>
                                                </Modal>
                                              </Box>
                                            </TableCell>
                                            {/* <UserMoreMenu /> */}
                                     
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
                  count={caseData.length}
                  rowsPerPage={perPagerows}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>
            </Box>
          </Container>
        </Page>
      ) : (
        <h1>{" "}</h1>
      )}
    </>
  );
}
