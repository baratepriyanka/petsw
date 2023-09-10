import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
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
  Modal,
  TextField,
} from '@mui/material';

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
  { id: 'doctorid', label: 'Doctor ID', alignRight: false },
  { id: 'name', label: 'Doctor Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'mobileno', label: 'Mobile No.', alignRight: false },
  { id: 'department', label: 'Department', alignRight: false },
  { id: 'profile', label: 'Profile', alignRight: false },
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
export default function User() {
  // const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(1);

  const [dataPage, setDataPage] = useState(0);
  const [page, setPage] = useState(0);
  const [perPagerows, setperPagerows] = useState(5);
  const [medicinePageData, setMedicinePageData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [listOfDoctor, setlistOfDoctor] = useState([]);

  const loginData = JSON.parse(localStorage.getItem('token-info')); 
  const loginId = loginData.hospital_id;

  const getListOfDoctor = async () => {
    // console.log("formErrors");
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-doctor/${loginId}`
    );
    const data = await response.json();
    if (response) {
      const doctorPatientData = data
        .sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        })
        .map((curElem, name) => {
          return { curElem, name };
        });
      setlistOfDoctor(doctorPatientData);
      setMedicinePageData([doctorPatientData]);
      //  console.log(opdData)
    }
    // setlistOfDoctor(await response.json());
    // console.log(listOfDoctor);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = listOfDoctor.filter(({ curElem, name }) => {
        console.log(curElem);
        return Object.values(curElem).join('').toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      // console.log("curElem");
      setFilteredResults(listOfDoctor);
    }
  };

  const [infoDoctor, setInfoDoctor] = useState([]);
  const getInfoOfDoctor = async (e) => {
    e.preventDefault();
    const aa = e.target.value;
    console.log(aa);
    // console.log("formErrors");
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-doctor/${aa}`
    );
    setInfoDoctor(await response.json());
    console.log(listOfDoctor);
  };
  const [deleteDoctorRow, setDeleteDoctorRow] = useState([]);
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
  const deleteDoctorListRow = async (e) => {
    e.preventDefault();
    const aa = e.target.value;
    console.log(aa);
    Axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/delete-doctor/${aa}`) // <-- remove ;
      .then((res) => {
        const users = res.message;
        setDeleteDoctorRow({ users });
        getListOfDoctor();
        setOpen(false);
      });
    // const response = await fetch(`http://localhost:8086/web/delete-patient/${aa}`);
    //   setDeleteRow(await response.json());
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
    getListOfDoctor();
    setPage(0);
  }, [dataPage]);

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
        <Page title="User">
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Doctors
              </Typography>
              <Button
                variant="contained"
                className="honbtn"
                component={RouterLink}
                to="/dashboard/AddNewDoctor"
                startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{ backgroundColor: '#08670f' }}
              >
                Add New Doctor
              </Button>
            </Stack>

            <Card>
              {/* <DoctorListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
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
                                        {/* <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {curElem.doctor_name}
                              </Typography>
                            </Stack>
                          </TableCell> */}
                                        <TableCell align="left" key={curElem.id}>
                                          {curElem.id}
                                        </TableCell>
                                        <TableCell align="left">{curElem.doctor_name}</TableCell>
                                        <TableCell align="left">{curElem.email}</TableCell>
                                        <TableCell align="left">{curElem.phone}</TableCell>
                                        <TableCell align="left">{curElem.masterdepartment.name}</TableCell>

                                        <TableCell align="left">
                                          <Avatar alt={name} src={curElem.s3image} />
                                        </TableCell>
                                        <TableCell>
                                          {/* <UserMoreMenu /> */}
                                          <Box style={{ display: 'flex' }}>
                                            <Button
                                              size="small"
                                              type="button"
                                              variant="contained"
                                              className="honbtn"
                                              component={RouterLink}
                                              to={`/dashboard/EditDoctorList/${curElem.id}`}
                                              sx={{ ml: 1, mb: 2, backgroundColor: '#6da671' }}
                                            >
                                              Edit
                                            </Button>
                                            <Button
                                              size="small"
                                              type="button"
                                              variant="contained"
                                              className="honbtn"
                                              component={RouterLink}
                                              to={`/dashboard/InfoDoctorList/${curElem.id}`}
                                              sx={{ ml: 1, mb: 2, backgroundColor: '#2d2851' }}
                                              value={curElem.id}
                                            >
                                              Info
                                            </Button>

                                            {/* <Button  size="small" type="button" variant="contained"  sx={{ ml: 1,mb:2, backgroundColor: '#30818d'}}  component={RouterLink} to={`/dashboard/AppointmentDoctorList/${curElem.id}`} value={curElem.id}>
                                            Appointments
                                          </Button> */}
                                            {/* <Button  size="small" type="button" variant="contained"  sx={{ ml: 1, mb:2, backgroundColor: '#0bd5f3'}}>
                                Holiday
                            </Button>
                            <Button  size="small" type="button" variant="contained"  sx={{ ml: 1,mb:2, backgroundColor: '#0bd5f3'}}>
                                TimeSchedule
                            </Button> */}
                                            <Button
                                              size="small"
                                              type="button"
                                              variant="contained"
                                              onClick={() => funcDelete(curElem.id)}
                                              sx={{ ml: 1, mb: 2, backgroundColor: '#710808' }}
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
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                  Are you sure you want to delete Doctor?
                                                </Typography>
                                                <Button
                                                  size="small"
                                                  type="button"
                                                  variant="contained"
                                                  onClick={deleteDoctorListRow}
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
                                                  onClick={handleClose}
                                                  // value={deleteId}
                                                  id=""
                                                  sx={{ mt: 2, ml: 1, backgroundColor: '#686868' }}
                                                >
                                                  Cancle
                                                </Button>
                                              </Box>
                                            </Modal>
                                          </Box>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })
                              : listOfDoctor
                                  .slice(page * perPagerows, page * perPagerows + perPagerows)
                                  .map(({ curElem, name }) => {
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
                                        {/* <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Avatar alt={name} src={avatarUrl} />
                                  <Typography variant="subtitle2" noWrap>
                                    {curElem.doctor_name}
                                  </Typography>
                                </Stack>
                              </TableCell> */}
                                        <TableCell align="left" key={curElem.id}>
                                          {curElem.id}
                                        </TableCell>
                                        <TableCell align="left">{curElem.doctor_name}</TableCell>
                                        <TableCell align="left">{curElem.email}</TableCell>
                                        <TableCell align="left">{curElem.phone}</TableCell>
                                        <TableCell align="left">{curElem.masterdepartment.name}</TableCell>

                                        <TableCell align="left">
                                          <Avatar alt={name} src={curElem.s3image} />
                                        </TableCell>
                                        <TableCell>
                                          {/* <UserMoreMenu /> */}
                                          <Box style={{ display: 'flex' }}>
                                            <Button
                                              size="small"
                                              type="button"
                                              variant="contained"
                                              className="honbtn"
                                              component={RouterLink}
                                              to={`/dashboard/EditDoctorList/${curElem.id}`}
                                              sx={{ ml: 1, mb: 2, backgroundColor: '#6da671' }}
                                            >
                                              Edit
                                            </Button>
                                            <Button
                                              size="small"
                                              type="button"
                                              variant="contained"
                                              className="honbtn"
                                              component={RouterLink}
                                              to={`/dashboard/InfoDoctorList/${curElem.id}`}
                                              sx={{ ml: 1, mb: 2, backgroundColor: '#2d2851' }}
                                              value={curElem.id}
                                            >
                                              Info
                                            </Button>

                                            {/* <Button  size="small" type="button" variant="contained"  sx={{ ml: 1,mb:2, backgroundColor: '#30818d'}}  component={RouterLink} to={`/dashboard/AppointmentDoctorList/${curElem.id}`} value={curElem.id} >
                                            Appointments
                                          </Button> */}
                                            {/* <Button  size="small" type="button" variant="contained"  sx={{ ml: 1, mb:2, backgroundColor: '#0bd5f3'}}>
                                    Holiday
                                </Button>
                                <Button  size="small" type="button" variant="contained"  sx={{ ml: 1,mb:2, backgroundColor: '#0bd5f3'}}>
                                    TimeSchedule
                                </Button> */}
                                            <Button
                                              size="small"
                                              type="button"
                                              variant="contained"
                                              onClick={() => funcDelete(curElem.id)}
                                              sx={{ ml: 1, mb: 2, backgroundColor: '#710808' }}
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
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                  Are you sure you want to delete Doctor?
                                                </Typography>
                                                <Button
                                                  size="small"
                                                  type="button"
                                                  variant="contained"
                                                  onClick={deleteDoctorListRow}
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
                                                  onClick={handleClose}
                                                  // value={deleteId}
                                                  id=""
                                                  sx={{ mt: 2, ml: 1, backgroundColor: '#686868' }}
                                                >
                                                  Cancle
                                                </Button>
                                              </Box>
                                            </Modal>
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
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={listOfDoctor.length}
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
