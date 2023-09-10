import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
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
  { id: 'petReportId', label: 'Pet Case ID', alignRight: false },
  { id: 'parentName', label: 'Parent Name', alignRight: false },
  { id: 'admissionDate', label: 'Admission Date ', alignRight: false },
  { id: 'deathTime', label: 'Death Date/ Time', alignRight: false },
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
export default function DeathReport() {
  const [dataPage, setDataPage] = useState(0);
  const [page, setPage] = useState(0);
  const [perPagerows, setperPagerows] = useState(10);
  const [medicinePageData, setMedicinePageData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [deathReportData, setDeathReportData] = useState([]);
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;
  const getDeathReportData = async () => {
    // console.log("formErrors");
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/patient-death-report/${loginId}`
    );
    const data = await response.json();
    if (response) {
      const reportPatientData = data
        .sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        })
        .map((curElem, name) => {
          return { curElem, name };
        });
      setDeathReportData(reportPatientData);
      setMedicinePageData([reportPatientData]);
      //  console.log(opdData)
    }
  };
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = deathReportData.filter(({ curElem, name }) => {
        console.log(curElem);
        return Object.values(curElem).join('').toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      // console.log("curElem");
      setFilteredResults(deathReportData);
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
    // console.log(id);
    setDeleteId(id);
  };
  const deleteDeathReportRow = async (e) => {
    e.preventDefault();
    const aa = e.target.value;
    // console.log(aa);
    Axios.post(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/delete-death-report/${aa}`
    ).then((res) => {
      const users = res.message;
      setDeleteRow({ users });
      getDeathReportData();
      setOpen(false);
    });
    // const response = await fetch(`http://localhost:8086/web/delete-patient/${aa}`);
    //   setDeleteRow(await response.json());
  };

  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  const logoutRedirect = () => {
    // console.log("hii");
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
    // console.log("formErrors");
    getDeathReportData();
    setPage(0);
  }, [dataPage]);

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
    // setEditing(true)
    const aa = e.target.value;
    console.log(aa);
    console.log('fffffffff');
    // setCurrentUser({ id: user.id, name: user.name, username: user.username })
  };

  return (
    <>
      {isLoggedin ? (
        <Page title="Opd">
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Death Reports
              </Typography>
              {/* <Button
                variant="contained"
                className="honbtn"
                component={RouterLink}
                to="/dashboard/NewDeathReportjs"
                startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{ backgroundColor: '#08670f' }}
              >
                Register New Death Report
              </Button> */}
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
                                    const parName = curElem.parent_name;
                                    const parentSubStr = parName.substr(0, 10);
                                    const paitName = curElem.patient_name;
                                    const patientSubStr = paitName.substr(0, 10);
                                    const date = curElem.dateofadmission;
                                    // console.log(date);
                                    const formatDate = Moment(date).format('DD-MM-YYYY HH:mm A');
                                    const relTime = curElem.deathreports[0].date_of_release;
                                    const realtDateTime = Moment(relTime).format('DD-MM-YYYY HH:mm A');
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
                                        <TableCell align="center" key={curElem.id}>
                                          {curElem.patient_id}
                                        </TableCell>
                                        <TableCell align="center">{curElem.patient_name}</TableCell>
                                        <TableCell align="center">{formatDate}</TableCell>
                                        <TableCell align="center">{realtDateTime}</TableCell>
                                      
                                          <TableCell style={{ width: 'maxWidth' }}>
                                            <Box style={{ display: 'flex' }} className="row-button1">
                                              {curElem.added_from === '0' ? (
                                                <Button
                                                  size="small"
                                                  type="button"
                                                  variant="contained"
                                                  className="info-btn"
                                                  component={RouterLink}
                                                  to={`/dashboard/OpdHealthReport/${curElem.id}`}
                                                  sx={{ ml: 1, backgroundColor: '#2d2851' }}
                                                >
                                                  Info
                                                </Button>
                                              ) : (
                                                <Button
                                                  size="small"
                                                  type="button"
                                                  variant="contained"
                                                  className="info-btn"
                                                  component={RouterLink}
                                                  to={`/dashboard/InfoDeathReportList/${curElem.id}`}
                                                  sx={{ ml: 1, backgroundColor: '#2d2851' }}
                                                >
                                                  Info
                                                </Button>
                                              )}
                                            </Box>
                                          </TableCell>
                                      
                                      </TableRow>
                                    );
                                  })
                              : deathReportData
                                  .slice(page * perPagerows, page * perPagerows + perPagerows)
                                  .map(({ curElem, name }) => {
                                    console.log(curElem)
                                    const parName = curElem.parent_name;
                                    const parentSubStr = parName.substr(0, 10);
                                    const paitName = curElem.patient_name;
                                    const patientSubStr = paitName.substr(0, 10);
                                    const date = curElem.dateofadmission;
                                    const formatDate = Moment(date).format('DD-MM-YYYY HH:mm A');
                                    const relTime = curElem.deathreports[0].date_of_release;
                                    const realtDateTime = Moment(relTime).format('DD-MM-YYYY HH:mm A');
                                   
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
                                        {/* <TableCell align="left" key={curElem.id}>
                                          {curElem.patient_id}
                                        </TableCell> */}
                                        
                                           <TableCell align="center" key={curElem.id}>
                                           {curElem.patient_id}
                                         </TableCell>
                                        
                                        <TableCell align="center">{curElem.patient_name}</TableCell>
                                        <TableCell align="center">{formatDate}</TableCell>
                                        <TableCell align="center">{realtDateTime}</TableCell>

                                      
                                          <TableCell style={{ width: 'maxWidth' }}>
                                            <Box style={{ display: 'flex' }} className="row-button1">
                                            {curElem.added_from ==='0' ? (
                                            <Button
                                            size="small"
                                            type="button"
                                            variant="contained"
                                            className="info-btn"
                                            component={RouterLink}
                                            to={`/dashboard/OpdHealthReport/${curElem.id}`}
                                            sx={{ ml: 1, backgroundColor: '#2d2851' }}
                                          
                                          >
                                          Info
                                          </Button>
                                          ) :   <Button
                                          size="small"
                                          type="button"
                                          variant="contained"
                                          className="info-btn"
                                          component={RouterLink}
                                          to={`/dashboard/InfoDeathReportList/${curElem.id}`}
                                          sx={{ ml: 1, backgroundColor: '#2d2851' }}
                                        
                                        >
                                         Info
                                        </Button>}
                                            </Box>
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
                count={deathReportData.length}
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
