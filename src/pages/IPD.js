import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import './style.css';
import Moment from 'moment';
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
  TextField,
  Tooltip,
} from '@mui/material';
// components
// import deleteImg from './assets/delete.png';
// import DeleteIcon from '@mui/icons-material/Close';
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
  { id: 'petId', label: 'Pet Case ID', alignRight: false },
  { id: 'patientName', label: 'Patient Name', alignRight: false },
  { id: 'ownerName', label: 'Owner Name', alignRight: false },
  { id: 'kennel', label: 'Ward', alignRight: false },
  { id: 'date', label: 'Date & Time Of Admission', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
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
  p: 4,
};
const search = {
  margin: 5,
  width: '30%',
  display: 'flex',
  alignSelf: 'end',
  justifyContent: 'end',
};
const styleRe = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // boxShadow: 24,
  p: 1,
};
const styleImg = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // boxShadow: 24,
  p: 1,
};
export default function IPD() {
  const [dataPage, setDataPage] = useState(0);
  const [page, setPage] = useState(0);
  const [perPagerows, setperPagerows] = useState(10);
  const [medicinePageData, setMedicinePageData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [ipdData, setIpdData] = useState([]);

  const [masteruploadreport, setmasterUploadReport] = useState([]);
  const getMasterUploadReport = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-upload-report`
    );
    setmasterUploadReport(await response.json());
  };
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;

  const getIpdData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-ipd/${loginId}`
    );
    const data = await response.json();
    console.log(data)
    if (response) {
      const ipdPatientData = data
        .sort((a, b) => {
          // return console.log(a.patient_name)
          return a.name > b.name ? 1 : -1;
        })
        .map((curElem, name) => {
          return { curElem, name };
        });
      setIpdData(ipdPatientData);
      setMedicinePageData([ipdPatientData]);
    }
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = ipdData.filter(({ curElem, name }) => {
        console.log(curElem);
        return Object.values(curElem).join('').toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      // console.log("curElem");
      setFilteredResults(ipdData);
    }
  };

  const [deleteRow, setDeleteRow] = useState([]);
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [deleteId, setDeleteId] = useState();

  const funcDelete = (id) => {
    setOpen(true);
    setDeleteId(id);
  };
  const deleteIpdRow = async (e) => {
    e.preventDefault();
    const aa = e.target.value;
    console.log(aa);
    Axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/delete-ipd/${aa}`) // <-- remove ;
      .then((res) => {
        const users = res.message;
        setDeleteRow({ users });
        getIpdData();
        setOpen(false);
      });
  };
  // const deleteIpdRow = (e) => {
  //   const id = e.target.value;
  //   Axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/delete-ipd/${id}`) // <-- remove ;
  //     .then((res) => {
  //       // const users = res.message;
  //       const users = res.message;
  //             setDeleteRow({ users });
  //             getIpdData();
  //             setOpen(false);
  //     });
  // };

  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  const logoutRedirect = () => {
    console.log('hii');
    navigate('/');
  };

  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [s3image, setS3image] = useState();
  const [hospid, setHospId] = useState();
  const [hospitalid, setHospitalId] = useState();

  // const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(1);

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

  const [editing, setEditing] = useState(false);
  const editRow = (e) => {
    e.preventDefault();
    const aa = e.target.value;
    console.log(aa);
    console.log('fffffffff');
  };
  const [select, setSelect] = useState();
  const handleCapacity = (e) => {
    setSelect(e.target.value);
  };
  const [reportfile, setReportfile] = useState({
    file: [],
    filepreview: null,
  });
  const handleInputReportFile = (event) => {
    setReportfile({
      ...reportfile,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const [openRep, setopenRep] = useState(false);
  const handleCloseRep = () => {
    setopenRep(false);
  };
  const [reportId, setreportId] = useState();
  const handleopenRep = (e) => {
    const id = e.target.value;
    setopenRep(true);
    setreportId(id);
  };
  const [errMsg, setErrImg] = useState();
  const [errMsgvalidation, setErrImgvalidation] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (select === '1') {
      if(reportfile.file.length === 0){
        setErrImgvalidation("Please upload Blood Test File.")

    }else{
      setLoading(true);
      const reportFile = new FormData();

      reportFile.append('url', reportfile.file);
      reportFile.append('hospital_id', `${loginId}`);
      reportFile.append('opd_ipd_id', `${select}`);
      const urlReport = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-add-upload-report/${reportId}`;
      const response1 = Axios.post(urlReport, reportFile,{ headers: { 'Access-Control-Allow-Origin': '*' } })
      .then((res) => {
          // console.log(res)
          const errMsg = '';
          setErrImg(errMsg);
          setLoading(false);
          window.location.reload();
        })
        .catch((error) => {
          setLoading(false);
          const errMsg = 'The minimum file size is 1 MB.';
          setErrImg(errMsg);
          const removeErrMsg='';
          setTimeout(() => setErrImg(removeErrMsg), 1000)
        });
      }
    } else if (select === '2') {
      if(reportfile.file.length === 0){
        setErrImgvalidation("Please upload MRI Test File.")

    }else{
      setLoading(true);
      const reportFile = new FormData();
      reportFile.append('url', reportfile.file);
      reportFile.append('opd_ipd_id', `${select}`);
      reportFile.append('hospital_id', `${loginId}`);
      const urlReport = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-add-upload-report/${reportId}`;
      const response1 = Axios.post(urlReport, reportFile,{ headers: { 'Access-Control-Allow-Origin': '*' } })
        .then((res) => {
          const errMsg = '';
          setErrImg(errMsg);
          setLoading(true);
          window.location.reload();
        })
        .catch((error) => {
          setLoading(false);
          const errMsg = 'The minimum file size is 1 MB.';
          setErrImg(errMsg);
          const removeErrMsg='';
          setTimeout(() => setErrImg(removeErrMsg), 1000)
        });
      }
    } else if (select === '3') {
      if(reportfile.file.length === 0){
        setErrImgvalidation("Please upload X-ray Test File.")

    }else{
      setLoading(true);
      const reportFile = new FormData();
      reportFile.append('url', reportfile.file);
      reportFile.append('opd_ipd_id', `${select}`);
      reportFile.append('hospital_id', `${loginId}`);
      const urlReport = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-add-upload-report/${reportId}`;
      const response1 = Axios.post(urlReport, reportFile,{ headers: { 'Access-Control-Allow-Origin': '*' } })
        .then((res) => {
          // handleCloseRep();
          const errMsg = '';
          setErrImg(errMsg);
          setLoading(true);
          window.location.reload(); // console.log(response1);
        })
        .catch((error) => {
          setLoading(false);
          const errMsg = 'The minimum file size is 1 MB.';
          setErrImg(errMsg);
          const removeErrMsg='';
          setTimeout(() => setErrImg(removeErrMsg), 1000)
        });
      }
    }
  };

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
    getIpdData();
    setPage(0);
    getMasterUploadReport();
  }, [dataPage]);

  // multiple images function
  const [openimg, setOpenImg] = useState(false);
  const [imgId, setimgId] = useState();
  const handleOpenImg = (e) => {
    const id = e.target.value;
    setOpenImg(true);
    setimgId(id);
  };

  const handleCloseImg = () => {
    setOpenImg(false);
  };
  const [profile, setProfile] = useState([]);

  const handleInputChangeImg = (e) => {
    setProfile(e.target.files);
    // const file = e.target.files[0];
    // console.log(file)
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const urlfile = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/uploadmultiple/${imgId}`;
    const data = new FormData();
    data.append('hospital_id', `${loginId}`);
    Array.from(profile).forEach((img) => {
      data.append('profile', img);
    });
    Axios.post(urlfile, data,{ headers: { 'Access-Control-Allow-Origin': '*' } })
      .then((response) => {
        // console.log(response)
        // handleCloseImg()
        const errMsg = '';
        setErrImg(errMsg);
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        const errMsg = 'The minimum file size is 1 MB.';
        setErrImg(errMsg);
        // console.log(err)
      });
  };

  return (
    <>
      {isLoggedin ? (
        <Page title="Ipd">
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                IPD
              </Typography>
              <Button
                variant="contained"
                className="honbtn"
                component={RouterLink}
                to="/dashboard/IpdNewPatientjs"
                startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{ backgroundColor: '#08670f' }}
              >
                Register New IPD Patient
              </Button>
            </Stack>

            <Card>
              {/* <UserListToolbar
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
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      // order={order}
                      // orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      // rowCount={USERLIST.length}
                      // numSelected={selected.length}
                      // onRequestSort={handleRequestSort}
                      // onSelectAllClick={handleSelectAllClick}
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
                                    const parName = curElem.parent_name;
                                    const parentSubStr = parName.substr(0, 10);
                                    const paitName = curElem.patient_name;
                                    const patientSubStr = paitName.substr(0, 10);
                                    const date = curElem.dateofadmission;
                                    const ampm = date <= 12 ? 'pm' : 'am';
                                    const wardcategoryName = curElem.wardcategory.category_name;
                                    const wardcategorySubstr = wardcategoryName.substr(0, 10);
                                    // console.log(ampm)
                                    const formatDate = Moment(date).format('DD-MM-YYYY HH:mm A');
                                    // console.log(formatDate)
                                    return (
                                      <TableRow
                                      key={curElem.id}
                                        hover
                                        tabIndex={-1}
                                        // role="checkbox"
                                        // selected={isItemSelected}
                                        // aria-checked={isItemSelected}
                                      >
                                        {/* <TableCell padding="checkbox">
                                          <Checkbox
                                            checked={isItemSelected}
                                            onChange={(event) => handleClick(event, name)}
                                          />
                                        </TableCell> */}
                                        <TableCell align="center" key={curElem.id}>
                                          {curElem.patient_id}
                                        </TableCell>

                                        {patientSubStr.length < 8 ? (
                                          <TableCell align="center">{curElem.patient_name}</TableCell>
                                        ) : (
                                          <Tooltip title={curElem.patient_name} aria-label="patient_name">
                                            <TableCell align="center">{patientSubStr}...</TableCell>
                                          </Tooltip>
                                        )}

                                        {parentSubStr.length < 8 ? (
                                          <TableCell align="center">{curElem.parent_name}</TableCell>
                                        ) : (
                                          <Tooltip title={curElem.parent_name} aria-label="patient_name">
                                            <TableCell align="center">{parentSubStr}...</TableCell>
                                          </Tooltip>
                                        )}

                                        {/* {curElem.wardcategory === null ? (
                                          <TableCell align="center">{''}</TableCell>
                                        ) : (
                                          <TableCell align="center">{curElem.wardcategory.category_name}</TableCell>
                                        )} */}
                                        {wardcategorySubstr.length < 10 ? (
                                          <TableCell align="center">{curElem.wardcategory.category_name}</TableCell>
                                        ) : (
                                          <Tooltip title={curElem.wardcategory.category_name} aria-label="patient_name">
                                            <TableCell align="center">{wardcategorySubstr}...</TableCell>
                                          </Tooltip>
                                        )}


                                        <TableCell align="center">{formatDate}</TableCell>

                                        {/* <TableCell align="right"> */}
                                          <TableCell style={{ width: 'maxWidth' }}>
                                            <Box style={{ display: 'flex' }}>
                                              <Button
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                className="edit-btn"
                                                component={RouterLink}
                                                to={`/dashboard/EditIpdList/${curElem.id}`}
                                                sx={{ ml: 1, backgroundColor: '#6da671' }}
                                              >
                                                Edit
                                              </Button>
                                              <Button
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                className="info-btn"
                                                id="abcd"
                                                component={RouterLink}
                                                to={`/dashboard/InfoIpdList/${curElem.id}`}
                                                sx={{ ml: 1, backgroundColor: '#2d2851' }}
                                              >
                                                Info
                                              </Button>
                                              {/* <Button  size="small" type="button" variant="contained"  sx={{ ml: 1, backgroundColor: '#30818d'}}>
                                      History
                                  </Button>                          */}
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
                                              <Button
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                value={curElem.id}
                                                onClick={handleopenRep}
                                                className="report-btn"

                                                // onClick={() => handleopenRep(curElem.id)}
                                                sx={{ ml: 1, backgroundColor: '#103996' }}
                                              >
                                                Reports
                                              </Button>
                                              <Button
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                value={curElem.id}
                                                className="image-btn"
                                                onClick={handleOpenImg}
                                                sx={{ ml: 1, backgroundColor: '#086971' }}
                                              >
                                                {' '}
                                                Images
                                              </Button>
                                              <Modal
                                                open={openimg}
                                                // onClick={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                              >
                                                <Box sx={styleImg}>
                                                  <form action="" onSubmit={handleFileSubmit}>
                                                  <h5 className='text-center'>Add Multiple Images</h5>
                                                  <div className="row mt-2 justify-content-center">
                                                    <div className="col-md-8 form-group mt-1 justify-content-center">
                                                      <input
                                                        type="file"
                                                        className="form-control "
                                                        id="profile"
                                                        name="profile"
                                                        accept=".jpg,.jpeg,.png,.gif"
                                                        multiple
                                                        autoComplete="off"
                                                        onChange={handleInputChangeImg}
                                                      />
                                                    </div>
                                                    <small className='text-center'>profile should be less then 1 mb in size.</small>
                                                    </div>
                                                    <div className="row mt-2 justify-content-center">
                                                      {Array.from(profile).map((item) => {
                                                        // console.log(item)
                                                        return (
                                                          // <span>
                                                          <div className="col-md-4 mt-2 justify-content-center">
                                                            <img
                                                              className="multiple_img"
                                                              src={item ? URL.createObjectURL(item) : null}
                                                              alt="UploadImage"
                                                            />
                                                          </div>
                                                          // </span>
                                                        );
                                                      })}
                                                      {loading ? (
                                                        <>
                                                          <div className="loading-overlay">
                                                            <span className="fas fa-spinner fa-3x fa-spin">{''}</span>
                                                          </div>
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </div>
                                                    <div className="mt-2 text-center">
                                                      <button type="submit" className="btn btn-primary">
                                                        Save
                                                      </button>
                                                      <button
                                                        type="submit"
                                                        className="btn btn-secondary m-3"
                                                        onClick={handleCloseImg}
                                                      >
                                                        Cancel
                                                      </button>
                                                    </div>

                                                    {<div style={{ color: 'red' }}>{errMsg}</div>}
                                                  </form>
                                                </Box>
                                              </Modal>
                                              <Modal
                                                open={openRep}
                                                // onClick={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                              >
                                                <Box sx={styleRe}>
                                                <div className="text-end">
                                                  <button
                                                    type="button"
                                                    id=""
                                                    className="btn repcancelbtn"
                                                    onClick={handleCloseRep}
                                                  >
                                                    {/* <DeleteIcon  sx={{ color: '#f15151'}} /> */}
                                                
                                                    {/* <img src={deleteImg} alt="" width="15px;" /> */}
                                                  </button>
                                                  </div>
                                                  {/* <div className="row mb-4"> */}
                                                    <div className="row justify-content-center" style={{marginLeft:'20px'}}>
                                                      {/* <div className="mt-3 mb-4"> */}
                                                        <h5>Upload Test Report</h5>
                                                      {/* </div> */}
                                                      <div className="upload_report mt-1">
                                                        <div className="col-md-10 form-group">
                                                          <label className="info_opd_bold mb-2">Select Document Type</label>
                                                          <select
                                                            style={{
                                                              width: '100%',
                                                              height: '35px',
                                                              borderRadius: '6px',
                                                            }}
                                                            value={select}
                                                            onChange={handleCapacity}
                                                            className="form-control"
                                                            // ref={ref}
                                                          >
                                                            <option>--select--</option>
                                                            {masteruploadreport.map((curElem, i) => (
                                                              <option key={curElem.id} value={curElem.id}>
                                                                {curElem.name}
                                                              </option>
                                                            ))}
                                                          </select>
                                                        </div>
                                                        <div className="upload-report mt-3">
                                                          {select === '1' && (
                                                            <form className="mt-4 mb-4" onSubmit={handleSubmit}>
                                                              {loading ? (
                                                                <>
                                                                  <div className="loading-overlay">
                                                                    <span className="fas fa-spinner fa-3x fa-spin">
                                                                      {''}
                                                                    </span>
                                                                  </div>
                                                                </>
                                                              ) : (
                                                                <>
                                                                  <div className="row">
                                                                    <input
                                                                      type="hidden"
                                                                      name="opd_ipd_id"
                                                                      value={select}
                                                                    />
                                                                    <div className="col-md-10 form-group ">
                                                                      <label>Blood Test</label>
                                                                      <input
                                                                        type="file"
                                                                        className="form-control "
                                                                        id="url"
                                                                        name="url"
                                                                        autoComplete="off"
                                                                        data-value={select}
                                                                        value={reportfile.url}
                                                                        onChange={handleInputReportFile}
                                                                      />
                                                                        {reportfile.file.length ===0 ? ( <div style={{color:'red'}}>{errMsgvalidation}</div>) : ('')}
                                                                    </div>
                                                                  </div>
                                                                  <div className="text-center mt-3">
                                                                    <button
                                                                      type="submit"
                                                                      id=""
                                                                      className="btn btn-primary savebtn"
                                                                    >
                                                                      Save
                                                                    </button>
                                                                  </div>
                                                                  {<div style={{ color: 'red' }}>{errMsg}</div>}
                                                                </>
                                                              )}
                                                            </form>
                                                          )}
                                                          {select === '2' && (
                                                            <form className="mt-4" onSubmit={handleSubmit}>
                                                              {loading ? (
                                                                <>
                                                                  <div className="loading-overlay">
                                                                    <span className="fas fa-spinner fa-3x fa-spin">
                                                                      {''}
                                                                    </span>
                                                                  </div>
                                                                </>
                                                              ) : (
                                                                <>
                                                                  <div className="row">
                                                                    <div className="col-md-10 form-group ">
                                                                      <input
                                                                        type="hidden"
                                                                        name="opd_ipd_id"
                                                                        value={select}
                                                                      />
                                                                      <label>MRI Test</label>
                                                                      <input
                                                                        type="file"
                                                                        className="form-control "
                                                                        id="url"
                                                                        name="url"
                                                                        autoComplete="off"
                                                                        value={reportfile.url}
                                                                        onChange={handleInputReportFile}
                                                                      />
                                                                        {reportfile.file.length ===0 ? ( <div style={{color:'red'}}>{errMsgvalidation}</div>) : ('')}
                                                                    </div>
                                                                  </div>
                                                                  <div className="text-center mt-3">
                                                                    <button
                                                                      type="submit"
                                                                      id=""
                                                                      className="btn btn-primary savebtn"
                                                                    >
                                                                      Save
                                                                    </button>
                                                                  </div>
                                                                  {<div style={{ color: 'red' }}>{errMsg}</div>}
                                                                </>
                                                              )}
                                                            </form>
                                                          )}

                                                          {select === '3' && (
                                                            <form className="mt-4" onSubmit={handleSubmit}>
                                                              {loading ? (
                                                                <>
                                                                  <div className="loading-overlay">
                                                                    <span className="fas fa-spinner fa-3x fa-spin">
                                                                      {''}
                                                                    </span>
                                                                  </div>
                                                                </>
                                                              ) : (
                                                                <>
                                                                  <div className="row">
                                                                    <div className="col-md-10 form-group">
                                                                      <input
                                                                        type="hidden"
                                                                        name="opd_ipd_id"
                                                                        value={select}
                                                                      />
                                                                      <label>X-ray Test</label>
                                                                      <input
                                                                        type="file"
                                                                        className="form-control "
                                                                        id="url"
                                                                        name="url"
                                                                        value={reportfile.url}
                                                                        autoComplete="off"
                                                                        onChange={handleInputReportFile}
                                                                      />
                                                                       {reportfile.file.length ===0 ? ( <div style={{color:'red'}}>{errMsgvalidation}</div>) : ('')}
                                                                    </div>
                                                                  </div>
                                                                  <div className="text-center mt-3">
                                                                    <button
                                                                      type="submit"
                                                                      id=""
                                                                      className="btn btn-primary savebtn"
                                                                    >
                                                                      Save
                                                                    </button>
                                                                  </div>
                                                                  {<div style={{ color: 'red' }}>{errMsg}</div>}
                                                                </>
                                                              )}
                                                            </form>
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  {/* </div> */}
                                                </Box>
                                              </Modal>
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
                                                  <div className="text-center">
                                                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    Are you sure you want to Delete IPD Patient?
                                                  </Typography>
                                                  </div>
                                                 <div className="text-center">
                                                 <Button
                                                    size="small"
                                                    type="button"
                                                    variant="contained"
                                                   className='delete-okbtn'
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
                                                   className='cancle-okbtn'
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
                                        {/* </TableCell> */}
                                      </TableRow>
                                    );
                                  })
                              : ipdData
                                  .slice(page * perPagerows, page * perPagerows + perPagerows)
                                  .map(({ curElem, name }) => {
                                    // console.log(curElem);
                                    const parName = curElem.parent_name;
                                    const parentSubStr = parName.substr(0, 10);
                                    const paitName = curElem.patient_name;
                                    const patientSubStr = paitName.substr(0, 10);
                                    const date = curElem.dateofadmission;
                                    const formatDate = Moment(date).format('DD-MM-YYYY HH:mm A');
                                    const wardcategoryName = curElem.wardcategory.category_name;
                                    const wardcategorySubstr = wardcategoryName.substr(0, 10);
                                    // console.log(formatDate);
                                    return (
                                      <TableRow
                                        key=""
                                        hover
                                        tabIndex={-1}
                                        // role="checkbox"
                                        // selected={isItemSelected}
                                        // aria-checked={isItemSelected}
                                      >
                                        {/* <TableCell padding="checkbox">
                                          <Checkbox
                                            checked={isItemSelected}
                                            onChange={(event) => handleClick(event, name)}
                                          />
                                        </TableCell> */}
                                        <TableCell align="center" key={curElem.id}>
                                          {curElem.patient_id}
                                        </TableCell>
                                        {/* <TableCell align="center">{curElem.patient_name}</TableCell>
                                        <TableCell align="center">{curElem.parent_name}</TableCell> */}
                                        {patientSubStr.length < 10 ? (
                                          <TableCell align="center">{curElem.patient_name}</TableCell>
                                        ) : (
                                          <Tooltip title={curElem.patient_name} aria-label="patient_name">
                                            <TableCell align="center">{patientSubStr}...</TableCell>
                                          </Tooltip>
                                        )}

                                        {parentSubStr.length < 10 ? (
                                          <TableCell align="center">{curElem.parent_name}</TableCell>
                                        ) : (
                                          <Tooltip title={curElem.parent_name} aria-label="patient_name">
                                            <TableCell align="center">{parentSubStr}...</TableCell>
                                          </Tooltip>
                                        )}
                                        {/* {curElem.wardcategory === null ? (
                                          <TableCell align="center">{''}</TableCell>
                                        ) : (
                                          <TableCell align="center">{curElem.wardcategory.category_name}</TableCell>
                                        )} */}
                                        {wardcategorySubstr.length < 10 ? (
                                          <TableCell align="center">{curElem.wardcategory.category_name}</TableCell>
                                        ) : (
                                          <Tooltip title={curElem.wardcategory.category_name} aria-label="patient_name">
                                            <TableCell align="center">{wardcategorySubstr}...</TableCell>
                                          </Tooltip>
                                        )}


                                        <TableCell align="center">{formatDate}</TableCell>

                                        {/* <TableCell align="right"> */}
                                          <TableCell style={{ width: 'maxWidth' }}>
                                            <Box style={{ display: 'flex' }}>
                                              <Button
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                className="edit-btn"
                                                component={RouterLink}
                                                to={`/dashboard/EditIpdList/${curElem.id}`}
                                                sx={{ ml: 1, backgroundColor: '#6da671' }}
                                              >
                                                Edit
                                              </Button>
                                              <Button
                                                size="small"
                                                type="button"
                                                className="info-btn"
                                                variant="contained"
                                                id="abcd"
                                                component={RouterLink}
                                                to={`/dashboard/InfoIpdList/${curElem.id}`}
                                                sx={{ ml: 1, backgroundColor: '#2d2851' }}
                                              >
                                                Info
                                              </Button>
                                              {/* <Button  size="small" type="button" variant="contained"  sx={{ ml: 1, backgroundColor: '#30818d'}}>
                                        History
                                    </Button>                          */}
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
                                              <Button
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                value={curElem.id}
                                                className="report-btn"
                                                onClick={handleopenRep}
                                                // onClick={() => handleopenRep(curElem.id)}
                                                sx={{ ml: 1, backgroundColor: '#103996' }}
                                              >
                                                Reports
                                              </Button>

                                              <Button
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                value={curElem.id}
                                                className="image-btn"
                                                onClick={handleOpenImg}
                                                sx={{ ml: 1, backgroundColor: '#086971' }}
                                              >
                                                {' '}
                                                Images
                                              </Button>
                                              <Modal
                                                open={openimg}
                                                // onClick={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                              >
                                                <Box sx={styleImg}>
                                                  <form action="" onSubmit={handleFileSubmit}>
                                                  <h5 className='text-center'>Add Multiple Images</h5>
                                                  <div className="row mt-2 justify-content-center">
                                                    <div className="col-md-8 form-group mt-1 justify-content-center">
                                                      <input
                                                        type="file"
                                                        className="form-control "
                                                        id="profile"
                                                        name="profile"
                                                        accept=".jpg,.jpeg,.png,.gif"
                                                        multiple
                                                        autoComplete="off"
                                                        onChange={handleInputChangeImg}
                                                      />
                                                    </div>
                                                    <small className='text-center'>profile should be less then 1 mb in size.</small>
                                                    </div>
                                                    <div className="row mt-2 justify-content-center">
                                                      {Array.from(profile).map((item) => {
                                                        // console.log(item)
                                                        return (
                                                          // <span>
                                                          <div className="col-md-4 mt-2 justify-content-center">
                                                            <img
                                                              className="multiple_img"
                                                              src={item ? URL.createObjectURL(item) : null}
                                                              alt="UploadImage"
                                                            />
                                                          </div>
                                                          // </span>
                                                        );
                                                      })}
                                                      {loading ? (
                                                        <>
                                                          <div className="loading-overlay">
                                                            <span className="fas fa-spinner fa-3x fa-spin">{''}</span>
                                                          </div>
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </div>
                                                    <div className="mt-2 text-center">
                                                      <button type="submit" className="btn btn-primary">
                                                        Save
                                                      </button>
                                                      <button
                                                        type="submit"
                                                        className="btn btn-secondary m-3"
                                                        onClick={handleCloseImg}
                                                      >
                                                        Cancel
                                                      </button>
                                                    </div>

                                                    {<div style={{ color: 'red' }}>{errMsg}</div>}
                                                  </form>
                                                </Box>
                                              </Modal>
                                              <Modal
                                                open={openRep}
                                                // onClick={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                              >
                                                <Box sx={styleRe}>
                                                <div className="text-end">
                                                  <button
                                                    type="button"
                                                    id=""
                                                    className="btn repcancelbtn"
                                                    onClick={handleCloseRep}
                                                  >
                                                      {/* <DeleteIcon  sx={{ color: '#f15151'}} /> */}
                                                    {/* <img src={deleteImg} alt="" width="15px;" /> */}
                                                  </button>
                                                  </div>
                                                  <div className="row justify-content-center" style={{marginLeft:'20px'}}>
                                                    {/* <div className="justify-content-center"> */}
                                                      {/* <div className="mt-3 mb-4"> */}
                                                        <h5>Upload Test Report</h5>
                                                      {/* </div> */}
                                                      <div className="upload_report mt-1">
                                                        <div className="col-md-10 form-group">
                                                          <label className="info_opd_bold mb-2">Select Document Type</label>
                                                          <select
                                                            style={{
                                                              width: '100%',
                                                              height: '35px',
                                                              borderRadius: '6px',
                                                            }}
                                                            value={select}
                                                            onChange={handleCapacity}
                                                            className="form-control"
                                                            // ref={ref}
                                                          >
                                                            <option>--select--</option>
                                                            {masteruploadreport.map((curElem, i) => (
                                                              <option key={curElem.id} value={curElem.id}>
                                                                {curElem.name}
                                                              </option>
                                                            ))}
                                                          </select>
                                                        </div>
                                                        <div className="upload-report mt-3">
                                                          {select === '1' && (
                                                            <form className="mt-4" onSubmit={handleSubmit}>
                                                              {loading ? (
                                                                <>
                                                                  <div className="loading-overlay">
                                                                    <span className="fas fa-spinner fa-3x fa-spin">
                                                                      {''}
                                                                    </span>
                                                                  </div>
                                                                </>
                                                              ) : (
                                                                <>
                                                                  <div className="row">
                                                                    <input
                                                                      type="hidden"
                                                                      name="opd_ipd_id"
                                                                      value={select}
                                                                    />
                                                                    <div className="col-md-10 form-group ">
                                                                      <label>Blood Test</label>
                                                                      <input
                                                                        type="file"
                                                                        className="form-control "
                                                                        id="url"
                                                                        name="url"
                                                                        autoComplete="off"
                                                                        data-value={select}
                                                                        value={reportfile.url}
                                                                        onChange={handleInputReportFile}
                                                                      />
                                                                      {reportfile.file.length ===0 ? ( <div style={{color:'red'}}>{errMsgvalidation}</div>) : ('')}
                                                                    
                                                                    </div>
                                                                  </div>
                                                                  <div className="text-center mt-3">
                                                                    <button
                                                                      type="submit"
                                                                      id=""
                                                                      className="btn btn-primary savebtn"
                                                                    >
                                                                      Save
                                                                    </button>
                                                                  </div>
                                                                  {<div style={{ color: 'red' }}>{errMsg}</div>}
                                                                </>
                                                              )}
                                                            </form>
                                                          )}
                                                          {select === '2' && (
                                                            <form className="mt-4" onSubmit={handleSubmit}>
                                                              {loading ? (
                                                                <>
                                                                  <div className="loading-overlay">
                                                                    <span className="fas fa-spinner fa-3x fa-spin">
                                                                      {''}
                                                                    </span>
                                                                  </div>
                                                                </>
                                                              ) : (
                                                                <>
                                                                  <div className="row">
                                                                    <div className="col-md-10 form-group ">
                                                                      <input
                                                                        type="hidden"
                                                                        name="opd_ipd_id"
                                                                        value={select}
                                                                      />
                                                                      <label>MRI Test</label>
                                                                      <input
                                                                        type="file"
                                                                        className="form-control "
                                                                        id="url"
                                                                        name="url"
                                                                        autoComplete="off"
                                                                        value={reportfile.url}
                                                                        onChange={handleInputReportFile}
                                                                      />
                                                                       {reportfile.file.length ===0 ? ( <div style={{color:'red'}}>{errMsgvalidation}</div>) : ('')}
                                                                    </div>
                                                                  </div>
                                                                  <div className="text-center mt-3">
                                                                    <button
                                                                      type="submit"
                                                                      id=""
                                                                      className="btn btn-primary savebtn"
                                                                    >
                                                                      Save
                                                                    </button>
                                                                  </div>
                                                                  {<div style={{ color: 'red' }}>{errMsg}</div>}
                                                                </>
                                                              )}
                                                            </form>
                                                          )}

                                                          {select === '3' && (
                                                            <form className="mt-4" onSubmit={handleSubmit}>
                                                              {loading ? (
                                                                <>
                                                                  <div className="loading-overlay">
                                                                    <span className="fas fa-spinner fa-3x fa-spin">
                                                                      {''}
                                                                    </span>
                                                                  </div>
                                                                </>
                                                              ) : (
                                                                <>
                                                                  <div className="row">
                                                                    <div className="col-md-10 form-group">
                                                                      <input
                                                                        type="hidden"
                                                                        name="opd_ipd_id"
                                                                        value={select}
                                                                      />
                                                                      <label>X-ray Test</label>
                                                                      <input
                                                                        type="file"
                                                                        className="form-control "
                                                                        id="url"
                                                                        name="url"
                                                                        value={reportfile.url}
                                                                        autoComplete="off"
                                                                        onChange={handleInputReportFile}
                                                                      />
                                                                       {reportfile.file.length ===0 ? ( <div style={{color:'red'}}>{errMsgvalidation}</div>) : ('')}
                                                                    </div>
                                                                  </div>
                                                                  <div className="text-center mt-3">
                                                                    <button
                                                                      type="submit"
                                                                      id=""
                                                                      className="btn btn-primary savebtn"
                                                                    >
                                                                      Save
                                                                    </button>
                                                                  </div>
                                                                  {<div style={{ color: 'red' }}>{errMsg}</div>}
                                                                </>
                                                              )}
                                                            </form>
                                                          )}
                                                        </div>
                                                      </div>
                                                    {/* </div> */}
                                                  </div>
                                                </Box>
                                              </Modal>
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
                                                <div className='text-center'>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    Are you sure you want to Delete IPD Patient?
                                                  </Typography>
                                                </div>
                                                  <div className='text-center'>
                                                  <Button
                                                    size="small"
                                                    type="button"
                                                    variant="contained"
                                                    onClick={deleteIpdRow}
                                                    // onClick={handleClose}
                                                    value={deleteId}
                                                    className="delete-okbtn"
                                                    id=""
                                                    sx={{ mt: 2, backgroundColor: '#2768ff' }}
                                                  >
                                                    Ok
                                                  </Button>

                                                  <Button
                                                    size="small"
                                                    type="button"
                                                    variant="contained"
                                                    onClick={handleClose}
                                                    className="cancle-okbtn"
                                                    // value={deleteId}
                                                    id=""
                                                    sx={{ mt: 2, ml: 2, backgroundColor: '#686868' }}
                                                  >
                                                    cancel
                                                  </Button>
                                                  </div>
                                                </Box>
                                              </Modal>
                                            </Box>
                                          </TableCell>
                                        {/* </TableCell> */}
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
                count={ipdData.length}
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
