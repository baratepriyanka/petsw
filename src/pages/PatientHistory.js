import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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
  Tab,
  Modal,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, DoctorListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'timeslot', label: 'Time Slot', alignRight: false },
  { id: 'doctor', label: 'Doctor', alignRight: false },
  { id: 'appointmentstatus', label: 'Status', alignRight: false },
];
const TABLE_CASE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
];
const TABLE_PRE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'doctor', label: 'Doctor', alignRight: false },
  { id: 'medicine', label: 'Medicine', alignRight: false },
];
const TABLE_DOC_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'document', label: 'Document', alignRight: false },
];
const TABLE_BED_HEAD = [
  { id: 'bedid', label: 'BedId', alignRight: false },
  { id: 'alloted time', label: 'Alloted Time', alignRight: false },
  { id: 'dischargtime', label: 'Discharg Time', alignRight: false },
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
const proImg = {
  width: '200px',
};
export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(1);

  const { patientId } = useParams();

  const [patientInfo, setpatientInfo] = useState([]);
  const getpatientInfo = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-info-patient/${patientId}`
    );
    setpatientInfo(await response.json());
  };

  const [patientAppoi, setpatientAppoi] = useState([]);
  const getpatientAppoi = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-appointment`
    );
    setpatientAppoi(await response.json());
  };
  const [caseData, setCaseData] = useState([]);
  const getIpdData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-case`
    );
    setCaseData(await response.json());
  };

  const [prescriptionData, setPrescriptionData] = useState([]);
  const getPrescriptionData = async () => {
    // console.log("formErrors");
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-prescription`
    );
    setPrescriptionData(await response.json());
  };

  const [documentsData, setDocumentsData] = useState([]);
  const getDocumentsData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-documents`
    );
    setDocumentsData(await response.json());
  };

  const [bedListData, setBedListData] = useState([]);

  const getBedListData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-All-bed-allotment`
    );
    setBedListData(await response.json());
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
    // console.log(id);
    setDeleteId(id);
  };
  const deleteAppontmentRow = async (e) => {
    const aa = e.target.value;
    // console.log(aa);
    Axios.post(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/delete-appointment/${aa}`
    ) // <-- remove ;
      .then((res) => {
        const users = res.message;
        setDeleteRow({ users });
        getpatientInfo();
        setOpen(false);
      });
    // const response = await fetch(`http://localhost:8086/web/delete-patient/${aa}`);
    //   setDeleteRow(await response.json());
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
    getpatientInfo();
    getpatientAppoi();
    getIpdData();
    getPrescriptionData();
    getDocumentsData();
    getBedListData();
  }, []);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {isLoggedin ? (
        <Page title="User">
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Doctor Appointments
              </Typography>
            </Stack>

            <Card>
              <section className="contact-screen-one ipad-height">
                <div className="container">
                  <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
                    <div className="row">
                      {/* onSubmit={handleSubmit} */}
                      {patientInfo.map((curElem) => {
                        // console.log(curElem);
                        // console.log(curElem.MasterState.name);

                        return (
                          <div className="">
                            <form action="" className="did-floating-label-content">
                              <div className="container">
                                <div className="row">
                                  <div className="row justify-content-center">
                                    <div className="col-md-4">
                                      <div className="row justify-content-center">
                                        <div className="col-md-5 form-group mt-4">
                                          <img className="" src={curElem.s3image} alt="UploadImage" width={250} />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-md-7">
                                      <div className="row justify-content-center">
                                        <div className="col-md-3 form-group">
                                          <label className="info_opd_bold">Patient Name</label>
                                          <div>{curElem.patient_name}</div>
                                        </div>

                                        <div className="col-md-3 form-group">
                                          <label className="info_opd_bold">Email</label>
                                          <div>{curElem.email}</div>
                                        </div>

                                        <div className="col-md-3 form-group">
                                          <label className="info_opd_bold">password</label>
                                          <div>{curElem.password}</div>
                                        </div>
                                      </div>

                                      <div className="row justify-content-center mt-3">
                                        <div className="col-md-3 form-group">
                                          <label className="info_opd_bold">Address</label>
                                          <div>{curElem.address}</div>
                                        </div>

                                        <div className="col-md-3 form-group">
                                          <label className="info_opd_bold">Phone</label>
                                          <div>{curElem.phone}</div>
                                        </div>

                                        <div className="col-md-3 form-group">
                                          <label className="info_opd_bold">Gender</label>
                                          <div>{curElem.mastergender.name}</div>
                                        </div>
                                      </div>
                                      <div className="row justify-content-center mt-3">
                                        <div className="col-md-3 form-group">
                                          <label className="info_opd_bold">Birth Date</label>
                                          <div>{curElem.birthday}</div>
                                        </div>

                                        <div className="col-md-3 form-group">
                                          <label className="info_opd_bold">Doctor</label>
                                          <div>{curElem.Doctor.doctor_name}</div>
                                        </div>

                                        <div className="col-md-3 form-group">
                                          <label className="info_opd_bold">Blood Group</label>
                                          <div>{curElem.masterbloodgroup.name}</div>
                                        </div>
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
            </Card>
            <Card sx={{ mt: 5 }}>
              <Box sx={{ typography: 'body1' }}>
                <Scrollbar>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Appointments" value="1" />
                        <Tab label="Case History" value="2" />
                        <Tab label="Prescription" value="3" />
                        <Tab label="Documents" value="4" />
                        <Tab label="Bed" value="5" />
                      </TabList>
                    </Box>

                    <TabPanel value="1">
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
                                    {patientAppoi.map((curElem) => {
                                      console.log(curElem);
                                      const date = curElem.date;
                                      const formatDate = Moment(date).format('DD-MM-YYYY');
                                      return (
                                        <TableRow
                                          hover
                                          key={curElem.id}
                                          tabIndex={-1}
                                          role="checkbox"
                                          selected={isItemSelected}
                                          aria-checked={isItemSelected}
                                        >
                                          <TableCell padding="checkbox">
                                            <Checkbox
                                              checked={isItemSelected}
                                              onChange={(event) => handleClick(event, name)}
                                            />
                                          </TableCell>

                                          <TableCell align="left">{curElem.id}</TableCell>
                                          <TableCell align="left">{formatDate}</TableCell>
                                          <TableCell align="left">{curElem.available_slot}</TableCell>
                                          <TableCell align="left">{curElem.Doctor.doctor_name}</TableCell>
                                          <TableCell align="left">{curElem.masterappointmentstatus.name}</TableCell>
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
                    </TabPanel>
                    <TabPanel value="2">
                      <Scrollbar>
                        <TableContainer sx={{ minWidth: 660 }}>
                          <Table>
                            <UserListHead
                              order={order}
                              orderBy={orderBy}
                              headLabel={TABLE_CASE_HEAD}
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
                                    {caseData.map((curElem) => {
                                      const date = curElem.date;
                                      const formatDate = Moment(date).format('DD-MM-YYYY');
                                      return (
                                        <TableRow
                                          hover
                                          key={curElem.id}
                                          tabIndex={-1}
                                          role="checkbox"
                                          selected={isItemSelected}
                                          aria-checked={isItemSelected}
                                        >
                                          <TableCell padding="checkbox">
                                            <Checkbox
                                              checked={isItemSelected}
                                              onChange={(event) => handleClick(event, name)}
                                            />
                                          </TableCell>

                                          <TableCell align="left">{curElem.id}</TableCell>
                                          <TableCell align="left">{formatDate}</TableCell>
                                          <TableCell align="left">{curElem.title}</TableCell>
                                          <TableCell align="left">{curElem.case}</TableCell>
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
                    </TabPanel>

                    <TabPanel value="3">
                      <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                          <Table>
                            <UserListHead
                              order={order}
                              orderBy={orderBy}
                              headLabel={TABLE_PRE_HEAD}
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
                                    {prescriptionData.map((curElem) => {
                                      const date = curElem.date;
                                      const formatDate = Moment(date).format('DD-MM-YYYY');
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
                                          <TableCell padding="checkbox">
                                            <Checkbox
                                              checked={isItemSelected}
                                              onChange={(event) => handleClick(event, name)}
                                            />
                                          </TableCell>
                                          <TableCell align="left">{curElem.id}</TableCell>

                                          <TableCell align="left">{formatDate}</TableCell>
                                          <TableCell align="left">{curElem.Doctor.doctor_name}</TableCell>
                                          <TableCell align="left">{curElem.Medicine.medicine_name}</TableCell>
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
                    </TabPanel>
                    <TabPanel value="4">
                      <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                          <Table>
                            <UserListHead
                              order={order}
                              orderBy={orderBy}
                              headLabel={TABLE_DOC_HEAD}
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
                                    {documentsData.map((curElem) => {
                                      const date = curElem.date;
                                      const formatDate = Moment(date).format('DD-MM-YYYY');
                                      return (
                                        <TableRow
                                          hover
                                          key={curElem.id}
                                          tabIndex={-1}
                                          role="checkbox"
                                          selected={isItemSelected}
                                          aria-checked={isItemSelected}
                                        >
                                          <TableCell padding="checkbox">
                                            <Checkbox
                                              checked={isItemSelected}
                                              onChange={(event) => handleClick(event, name)}
                                            />
                                          </TableCell>
                                          <TableCell align="left">{curElem.id}</TableCell>

                                          <TableCell align="left"> {formatDate}</TableCell>
                                          <TableCell align="left">{curElem.description}</TableCell>
                                          <TableCell align="left">
                                            {' '}
                                            <img
                                              src={curElem.s3image}
                                              alt="document"
                                              style={{ width: '100px', height: '100px' }}
                                            />
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
                    </TabPanel>
                    <TabPanel value="5">
                      <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                          <Table>
                            <UserListHead
                              order={order}
                              orderBy={orderBy}
                              headLabel={TABLE_BED_HEAD}
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
                                    {bedListData.map((curElem) => {
                                      // console.log(curElem)
                                      return (
                                        <TableRow
                                          hover
                                          key={curElem.id}
                                          tabIndex={-1}
                                          role="checkbox"
                                          selected={isItemSelected}
                                          aria-checked={isItemSelected}
                                        >
                                          <TableCell padding="checkbox">
                                            <Checkbox
                                              checked={isItemSelected}
                                              onChange={(event) => handleClick(event, name)}
                                            />
                                          </TableCell>
                                          <TableCell align="left">{curElem.id}</TableCell>
                                          <TableCell align="left">{curElem.allotedTime}</TableCell>
                                          <TableCell align="left">{curElem.dischargeTime}</TableCell>
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
                    </TabPanel>
                  </TabContext>
                </Scrollbar>
              </Box>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={USERLIST.length}
                rowsPerPage={rowsPerPage}
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
