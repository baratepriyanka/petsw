import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
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
  Modal,
  Tooltip,
} from '@mui/material';
// components
import axios from 'axios';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu, UserListToolbarDoc } from '../../sections/@dashboard/user';
// import { AddNewDocument } from '../sections/auth/addNewDocument';
// mock
import USERLIST from '../../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'category', label: 'Ward ID', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  // { id: 'patient', label: 'Patient', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  // { id: 'documents', label: 'Documents', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
  // { id: 'durations', label: 'Durations', alignRight: false },
  // { id: 'actions ', label: 'Actions ', alignRight: false },
  { id: '' },
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
export default function BedCategory() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(1);

  const [bedCategoryData, setBedCategoryData] = useState([]);
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;
  const getBedCategoryData = async () => {
    // console.log("formErrors");
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-master-bed-category/${loginId}`
    );
    setBedCategoryData(await response.json());
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
    // console.log(id)
    setDeleteId(id);
  };

  const deleteBedRow = async (e) => {
    e.preventDefault();
    const aa = e.target.value;
    // console.log(aa);
    axios
      .post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/delete-bed-category/${aa}`) // <-- remove ;
      .then((res) => {
        const users = res.message;
        setDeleteRow({ users });
        getBedCategoryData();
        setOpen(false);
      });
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
      setS3image('');
      setEmail('');
      setHospId('');
      setHospitalId('');
      logoutRedirect();
    }
    // console.log("formErrors");
    getBedCategoryData();
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

  return (
    <>
      {isLoggedin ? (
        <Page title="BedCategory">
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Ward Category
              </Typography>
              <Button
                variant="contained"
                className="honbtn"
                component={RouterLink}
                to="/dashboard/addNewCategory"
                startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{ backgroundColor: '#08670f' }}
              >
                Add Ward Category
              </Button>
            </Stack>

            <Card>
              <Box>
                {/* <UserListToolbarDoc numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
              </Box>

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
                            {bedCategoryData.map((curElem) => {
                              const desStr = curElem.description;
                              const subStr = desStr.substr(0, 10);
                              const cateStr = curElem.category_name;
                              const categoryStr = cateStr.substr(0, 10);
                              // console.log(desStr);
                              return (
                                <TableRow
                                  hover
                                  key={id}
                                  tabIndex={-1}
                                  role="checkbox"
                                  selected={isItemSelected}
                                  aria-checked={isItemSelected}
                                >
                                  <TableCell align="center">{curElem.id}</TableCell>
                                  {/* <TableCell align="center">{curElem.category_name}</TableCell> */}
                                  {categoryStr.length < 10 ? (
                                    <TableCell align="center">{curElem.category_name}</TableCell>
                                  ) : (
                                    <Tooltip title={curElem.category_name} aria-label="patient_name">
                                      <TableCell align="center">{categoryStr}...</TableCell>
                                    </Tooltip>
                                  )}
                                  {subStr.length < 10 ? (
                                    <TableCell align="center">{curElem.description}</TableCell>
                                  ) : (
                                    <Tooltip title={curElem.description} aria-label="patient_name">
                                      <TableCell align="center">{subStr}...</TableCell>
                                    </Tooltip>
                                  )}

                                  {/* <UserMoreMenu /> */}
                                  <TableCell style={{ width: 'maxWidth' }}>
                                    {/* <UserMoreMenu /> */}
                                    <Box style={{ display: 'flex' }} className="row-button3">
                                      <Button
                                        size="small"
                                        type="button"
                                        className="edit-btn"
                                        variant="contained"
                                        component={RouterLink}
                                        to={`/dashboard/EditWardCategoryList/${curElem.id}`}
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
                                         <div className="text-center">
                                         <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                                            Are you sure you want to delete Ward Category?
                                          </Typography>
                                         </div>
                                         <div className='text-center'>
                                         <Button
                                            size="small"
                                            type="button"
                                            variant="contained"
                                            onClick={deleteBedRow}
                                            // onClick={handleClose}
                                            value={deleteId}
                                            id=""
                                            className="delete-okbtn"
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
                                            className="cancle-okbtn"
                                            id=""
                                            sx={{ mt: 2, ml: 2, backgroundColor: '#686868' }}
                                          >
                                            Cancle
                                          </Button>
                                         </div>
                                        </Box>
                                      </Modal>
                                    </Box>
                                  </TableCell>

                                  <TableCell align="center">
                                    {/* <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label> */}
                                  </TableCell>

                                  <TableCell align="right">{/* <UserMoreMenu /> */}</TableCell>
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

              {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
            </Card>
          </Container>
        </Page>
      ) : (
        <h1>{" "}</h1>
      )}
    </>
  );
}
