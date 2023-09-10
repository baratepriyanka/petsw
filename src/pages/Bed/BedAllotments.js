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
  TextField
} from '@mui/material';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbarPayment, UserMoreMenu } from '../../sections/@dashboard/user';
// mock
import USERLIST from '../../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'bedId', label: 'Bed Id', alignRight: false },
  { id: 'patient', label: 'Patient', alignRight: false },
  { id: 'allotedTime', label: 'Alloted Date-Time', alignRight: false },
  { id: 'dischargeTime', label: 'Discharge Date-Time', alignRight: false },
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
export default function BedAllotments() {

  const [dataPage, setDataPage] = useState(0);
  const [page, setPage] = useState(0);
  const [perPagerows, setperPagerows] = useState(5);
  const [medicinePageData, setMedicinePageData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [bedAllotmentData, setBedAllotmentData] = useState([]);

  const getBedAllotmentData = async () => {
    // console.log("formErrors");
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-All-bed-allotment`);
    const data = await response.json();
    if (response) {
      const bedAllotmentPatientData = data
        .sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        })
        .map((curElem, name) => {
          return {curElem, name};
        });
        setBedAllotmentData(bedAllotmentPatientData);
        setMedicinePageData([bedAllotmentPatientData]);
    }
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = bedAllotmentData.filter(({ curElem, name }) => {
        // console.log(curElem);
        return Object.values(curElem.Patient.patient_name).join('').toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      // console.log("curElem");
      setFilteredResults(bedAllotmentData);
    }
  };

  const [deleteRow, setDeleteRow] = useState([]);
  const [open, setOpen] = useState(false);
 
  const handleClose = () => {
    setOpen(false);
  };

  // const inputElement = useRef();

  const [deleteId, setDeleteId] = useState();

  const funcDelete = (id) => {
    setOpen(true);
    // console.log(id);
    setDeleteId(id);
  };
  const deleteBedAllotmentRow = async (e) => {
    e.preventDefault();
    const aa = e.target.value;
    // console.log(aa);
    Axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/delete-bed-allotment/${aa}`) // <-- remove ;
      .then((res) => {
        const users = res.message;
        setDeleteRow({ users });
        getBedAllotmentData();
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
    if(loginData){
     
      setFname(loginData.fname);
      setLname(loginData.lname);
      setEmail(loginData.email);
      setS3image(loginData.s3image);
      setHospId(loginData.hosp_id);
      setHospitalId(loginData.hospital_id);
      setIsLoggedin(true);
    }
    else{
      setFname('');
      setLname('');
      setS3image('');
      setEmail('');
      setHospId('');
      setHospitalId('');
      logoutRedirect();
    }

    getBedAllotmentData();
    setPage(0); 
  },[dataPage])

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

  return (
    <>
    {isLoggedin ? (
    <Page title="BedAllotments">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Alloted Bed
          </Typography>
          <Button
            variant="contained"
            className="honbtn"
            component={RouterLink}
            to="/dashboard/AddBedAllotments"
            startIcon={<Iconify icon="eva:plus-fill" />}
            sx={{ backgroundColor: '#08670f' }}
          >
            Add New Allotment
          </Button>
        </Stack>

        <Card>
          <Box>
            {/* <UserListToolbarPayment
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
                sx={search}/>
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
                    const { id, name, role, status, company, avatarUrl } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <>
                        {
                          searchInput.length > 1 ? (
                            filteredResults.slice(page * perPagerows, page * perPagerows + perPagerows).map(({curElem, name}) => {
                            const dateallotedTime= curElem.allotedTime
                            const allotedTime = Moment(dateallotedTime).format('DD MMMM yyyy - HH:mm A')

                            const datedischargeTime= curElem.dischargeTime
                            const dischargeTime = Moment(datedischargeTime).format('DD MMMM yyyy - HH:mm A')
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
                                  <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                                </TableCell>
                                <TableCell align="left">{curElem.bedId}</TableCell>
                                <TableCell align="left">{curElem.Patient.patient_name}</TableCell>
                                <TableCell align="left">{allotedTime}</TableCell>
                                <TableCell align="left">{dischargeTime}</TableCell>

                                <TableCell align="right">
                                  <TableCell align="right">
                                    <TableCell style={{ width: 'maxWidth' }}>
                                      <Box style={{ display: 'flex' }}>
                                        <Button
                                          size="small"
                                          type="button"
                                          variant="contained"
                                          className="honbtn"
                                          component={RouterLink}
                                          to={`/dashboard/EditBedAllotmentList/${curElem.id}`}
                                          sx={{ ml: 1, backgroundColor: '#6da671' }}>
                                          Edit
                                        </Button>
                                        {/* <Button  size="small" type="button" variant="contained" component={RouterLink} to={`/dashboard/InfoBedAllotmentList/${curElem.id}`} sx={{ ml: 1, backgroundColor: '#2d2851'}}>
                                Info
                            </Button>                         */}
                                        <Button
                                          size="small"
                                          type="button"
                                          variant="contained"
                                          onClick={() => funcDelete(curElem.id)}
                                          value={curElem.id}
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
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                              Are you sure you want to delete Bed Allotment?
                                            </Typography>
                                            <Button
                                              size="small"
                                              type="button"
                                              variant="contained"
                                              onClick={deleteBedAllotmentRow}
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
                                                sx={{ mt: 2, ml:1, backgroundColor: '#686868' }}
                                              >
                                                Cancle
                                              </Button>
                                          </Box>
                                        </Modal>
                                      </Box>
                                    </TableCell>
                                  </TableCell>
                                </TableCell>
                              </TableRow>
                            );
                          })
                          ):(
                            bedAllotmentData.slice(page * perPagerows, page * perPagerows + perPagerows).map(({curElem, name}) => {
                              const dateallotedTime= curElem.allotedTime
                              const allotedTime = Moment(dateallotedTime).format('DD MMMM yyyy - HH:mm A')
  
                              const datedischargeTime= curElem.dischargeTime
                              const dischargeTime = Moment(datedischargeTime).format('DD MMMM yyyy - HH:mm A')
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
                                    <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                                  </TableCell>
                                  <TableCell align="left">{curElem.bedId}</TableCell>
                                  <TableCell align="left">{curElem.Patient.patient_name}</TableCell>
                                  <TableCell align="left">{allotedTime}</TableCell>
                                  <TableCell align="left">{dischargeTime}</TableCell>
  
                                  <TableCell align="right">
                                    <TableCell align="right">
                                      <TableCell style={{ width: 'maxWidth' }}>
                                        <Box style={{ display: 'flex' }}>
                                          <Button
                                            size="small"
                                            type="button"
                                            variant="contained"
                                            className="honbtn" 
                                            component={RouterLink}
                                            to={`/dashboard/EditBedAllotmentList/${curElem.id}`}
                                            sx={{ ml: 1, backgroundColor: '#6da671' }}>
                                            Edit
                                          </Button>
                                          {/* <Button  size="small" type="button" variant="contained" component={RouterLink} to={`/dashboard/InfoBedAllotmentList/${curElem.id}`} sx={{ ml: 1, backgroundColor: '#2d2851'}}>
                                  Info
                              </Button>                         */}
                                          <Button
                                            size="small"
                                            type="button"
                                            variant="contained"
                                            onClick={() => funcDelete(curElem.id)}
                                            value={curElem.id}
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
                                              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                Are you sure you want to delete Bed Allotment?
                                              </Typography>
                                              <Button
                                                size="small"
                                                type="button"
                                                variant="contained"
                                                onClick={deleteBedAllotmentRow}
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
                                                sx={{ mt: 2, ml:1, backgroundColor: '#686868' }}
                                              >
                                                Cancle
                                              </Button>
                                            </Box>
                                          </Modal>
                                        </Box>
                                      </TableCell>
                                    </TableCell>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          )
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
          <TablePagination
           rowsPerPageOptions={[5, 10, 25, 50, 100]}
           component="div"
           count={bedAllotmentData.length}
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
