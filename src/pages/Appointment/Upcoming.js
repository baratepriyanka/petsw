import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import Moment from 'moment';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu, AllAppoiToolbar } from '../../sections/@dashboard/user';
// mock
import USERLIST from '../../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Id', label: 'Pet Case ID', alignRight: false },
  { id: 'patient', label: 'Patient ', alignRight: false },
  { id: 'doctor', label: 'Doctor', alignRight: false },
  { id: 'datetime', label: 'Date', alignRight: false },
  { id: 'remarks', label: 'Remarks', alignRight: false },
  { id: 'appointmentstatus', label: 'Appointment Status', alignRight: false },
  // { id: 'options', label: 'Options', alignRight: false },
];

// ----------------------------------------------------------------------
const search = {
  margin: 5,
  width: '30%',
  display: 'flex',
  alignSelf: 'end',
  justifyContent: 'end',
};
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

export default function AllAppointment() {

  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginId = loginData.hospital_id;

  const [upcomingAppointmentData, setUpcomingAppointmentData] = useState([]);
  const [medicinePageData, setMedicinePageData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const getUpcomingAppointmentData = async () => {
    // console.log("formErrors");
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-upcoming-appointment/${loginId}`
    );
    const data = await response.json();
    if (response) {
      const appointmentPatientData = data
        .sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        })
        .map((curElem, name) => {
          return { curElem, name };
        });
      setUpcomingAppointmentData(appointmentPatientData);
      setMedicinePageData([appointmentPatientData])
      //  console.log(opdData)
    }
    // setUpcomingAppointmentData(await response.json());
  };
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = upcomingAppointmentData.filter(({ curElem, name }) => {
        // console.log(curElem);
        return Object.values(curElem).join('').toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      // console.log("curElem");
      setFilteredResults(upcomingAppointmentData);
    }
  }
  const [deleteRow, setDeleteRow] = useState([]);

  const deleteAppontmentRow = async (e) => {
    e.preventDefault();
    const aa = e.target.value;
    console.log(aa);
    Axios.post(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/delete-appointment/${aa}`
    ) // <-- remove ;
      .then((res) => {
        const users = res.message;
        setDeleteRow({ users });
      });
  };

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

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [perPagerows, setperPagerows] = useState(10);
  
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
    setPage(0);
    // console.log('formErrors');
    getUpcomingAppointmentData();
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
    setperPagerows(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

console.log(upcomingAppointmentData)


  return (
    <>
      {isLoggedin ? (
        <Page title="PatientList">
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
              Upcoming  Appointment
              </Typography>
            </Stack>

            <Card>
              {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
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
                            {/* {upcomingAppointmentData.map(({ curElem, name }) => {
                             
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
                                  
                                  <TableCell align="center">{curElem.appointment_id}</TableCell>
                                  <TableCell align="center">{curElem.Patient.patient_name}</TableCell>
                                  <TableCell align="center">{curElem.user.first_name}{curElem.user.last_name}</TableCell>
                                  <TableCell align="center">{formatDate}</TableCell>
                                  <TableCell align="center">{curElem.remarks}</TableCell>
                                  <TableCell align="center">{curElem.masterappointmentstatus.name}</TableCell>
                                </TableRow>
                              );
                            })} */}
                         {searchInput.length > 1
                              ? filteredResults
                                  .slice(page * perPagerows, page * perPagerows + perPagerows)
                                  .map(({ curElem, name }) => {
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
                                        
                                        <TableCell align="center">{curElem.appointment_id}</TableCell>
                                        <TableCell align="center">{curElem.Patient.patient_name}</TableCell>
                                        <TableCell align="center">{curElem.user.first_name} {""} {curElem.user.last_name}</TableCell>
                                        <TableCell align="center">{formatDate}</TableCell>
                                        <TableCell align="center">{curElem.remarks}</TableCell>
                                        <TableCell align="center">{curElem.masterappointmentstatus.name}</TableCell>
                                      </TableRow>
                                    );
                                  })
                                  : upcomingAppointmentData
                                  .slice(page * perPagerows, page * perPagerows + perPagerows)
                                  .map(({ curElem, name }) => {
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
                                        
                                        <TableCell align="center">{curElem.appointment_id}</TableCell>
                                        <TableCell align="center">{curElem.Patient.patient_name}</TableCell>
                                        <TableCell align="center">{curElem.user.first_name} {""} {curElem.user.last_name}</TableCell>
                                        <TableCell align="center">{formatDate}</TableCell>
                                        <TableCell align="center">{curElem.remarks}</TableCell>
                                        <TableCell align="center">{curElem.masterappointmentstatus.name}</TableCell>
                                      </TableRow>
                                    );
                                  })

                                }

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

              {/* <TablePagination
                rowsPerPageOptions={[10, 25,50,100]}
                component="div"
                count={upcomingAppointmentData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
              
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={upcomingAppointmentData.length}
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
