import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { useReactToPrint } from 'react-to-print';
// import * as XLSX from 'xlsx';
import Axios from 'axios';

// import { CSVLink, CSVDownload } from 'react-csv';
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
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
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu, UserListToolbarPatient } from '../../sections/@dashboard/user';
// mock
import USERLIST from '../../_mock/user';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'wardId', label: 'Ward No.', alignRight: false },
  { id: 'bedcategory', label: 'Cage/Kennel Id', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
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
export default function CageKennelList() {
  // const [page, setPage] = useState(0);
  const loginData = JSON.parse(localStorage.getItem('token-info'));
  const loginId = loginData.hospital_id;

  const [dataPage, setDataPage] = useState(0);
  const [page, setPage] = useState(0);
  const [perPagerows, setperPagerows] = useState(10);
  const [medicinePageData, setMedicinePageData] = useState([]);
  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(1);

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [bedListData, setBedListData] = useState([]);
  const [bedPrintData, setBedPrintData] = useState([]);

  //  const getExToGetData = async() => {
  //   const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-Bed`);
  //   setBedButData(await response.json())
  //  }
  // const getPdfFile = async(e) =>{
  //   fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-Bed`)
  //   .then((blob) => {
  //   const url = window.URL.createObjectURL(new Blob([blob]));
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.setAttribute('download', 'file.pdf');
  //   document.body.appendChild(link);
  //   link.click();

  //   })
  // }

  // const print = async(bedButData) =>{
  // [ ...bedButData]
  //   node.contentWindow.print();

  // }
  const [bedCsvData, setBedCsvData] = useState([]);
  const getBedCsvData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-Bed-Data/${loginId}`
    );
    setBedCsvData(await response.json());
  };
// console.log(loginId)
  const getBedListData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-all-Bed/${loginId}`
    );
    const data = await response.json();
    // setBedListData(await response.json())
    if (response) {
      const prescription = data
        .sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        })
        .map((curElem, name) => {
          return { curElem, name };
        });
      setBedListData(prescription);
      setMedicinePageData([prescription]);
    }
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = bedListData.filter(({ curElem, name }) => {
        // console.log(curElem);
        return Object.values(curElem).join('').toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      // console.log("curElem");
      setFilteredResults(bedListData);
    }
  };

  const [deleteRow, setDeleteRow] = useState([]);
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  // const inputElement = useRef();

  const [deleteId, setDeleteId] = useState();

  const funcDelete = (id) => {
    setOpen(true);

    setDeleteId(id);
  };
  const deleteOpdRow = async (e) => {
    e.preventDefault();
    const aa = e.target.value;
    // console.log(aa);
    Axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/delete-Bed/${aa}`) // <-- remove ;
      .then((res) => {
        const users = res.message;
        setDeleteRow({ users });
        getBedListData();
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
    getBedCsvData();
    getBedListData();
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
  // print button
  const componentRef = useRef(null);
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });
  // excle button
  // const downloadExcel = () => {
  //   const newData = bedCsvData.map((row) => {
  //     // console.log(row)
  //     // delete row.tableData;
  //     return row;
  //   });
  //   console.log(newData);
  //   const workSheet = XLSX.utils.json_to_sheet(newData);
  //   const workBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workBook, workSheet, 'Bed List Data');
  //   const buf = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });
  //   XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' });
  //   XLSX.writeFile(workBook, 'BedListData.xlsx');
  // };
  // csv button
  // const downloadFile = ({ data, fileName, fileType }) => {
  //   const blob = new Blob([data], { type: fileType });
  //   const a = document.createElement('a');
  //   a.download = fileName;
  //   a.href = window.URL.createObjectURL(blob);
  //   const clickEvt = new MouseEvent('click', {
  //     view: window,
  //     bubbles: true,
  //     cancelable: true,
  //   });
  //   a.dispatchEvent(clickEvt);
  //   a.remove();
  // };

  // const exportToCsv = (e) => {
  //   e.preventDefault();
  //   const headers = ['Id,Ward,BedNumber,Description', 'CreatedAt'];
  //   // const headers = ['Ward,Cage/Kennel Id,Description,Status'];
  //   const usersCsv = bedCsvData.reduce((acc, user) => {
  //     const { id, wardno, bedid, description, createdAt } = user;
  //     acc.push([id, wardno, bedid, description, createdAt].join(','));
  //     return acc;
  //   }, []);

  //   downloadFile({
  //     data: [...headers, ...usersCsv].join('\n'),
  //     fileName: 'BedListData.csv',
  //     fileType: 'text/csv',
  //   });
  // };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <>
      {isLoggedin ? (
        <Page title="BedList">
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Cage/Kennel
              </Typography>
              <Button
                variant="contained"
                className="honbtn"
                component={RouterLink}
                to="/dashboard/CreateNewCageKennl"
                startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{ backgroundColor: '#08670f' }}
              >
                Add Cage/Kennel
              </Button>
            </Stack>

            <Card>
              <Box>
                <div className="row">
                  <div className="row m-4">
                    <div className="col-md-4 col-sm-5 form-group">
                      <input
                        className="form-control"
                        label="Search"
                        placeholder="Search..."
                        onChange={(e) => searchItems(e.target.value)}
                      />
                    </div>
                    {/* <div className="col-md-7 col-sm-5 justify-content-end">
                      <button type="button" className="btn p-1 m-1 btn-secondary" onClick={downloadExcel}>
                        Excel
                      </button>
                      <button type="button" className="btn p-1 m-1 btn-secondary" onClick={exportToCsv}>
                        Csv
                      </button>
                      <button type="button" className="btn p-1 m-1 btn-secondary" onClick={handlePrint}>
                        Print
                      </button>
                    </div> */}
                  </div>
                </div>
                {/* </Stack> */}
                {/* <Stack direction="horizontal" gap={3} >
              
                <div className="col-md-4 form-group m-4">
                  <input
                    id="outlined-basic"
                    
                    label="Search"
                    placeholder="Search..."
                    onChange={(e) => searchItems(e.target.value)}
                    // value={email}
                  />
                  </div>
                  <button type="submit" className="btn btn-primary m-0 p-0">
                          Submit
                        </button>
                  {/* <Button variant="secondary">Submit</Button> */}
                {/* <Button  size="small" type="button" variant="contained"  sx={{ backgroundColor: '#9aa1b0'}} onClick={handlePrint}>
                  Print
                </Button> 
                <div className="bg-light border">Third item</div>
              </Stack> */}
              </Box>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table ref={componentRef}>
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
                                    const desStr = curElem.description;
                                    const subStr = desStr.substr(0, 10);
                                    return (
                                      <TableRow
                                        hover
                                        key={curElem.id}
                                        tabIndex={-1}
                                        role="checkbox"
                                        selected={isItemSelected}
                                        aria-checked={isItemSelected}
                                      >
                                        <Tooltip title={curElem.wardcategory.category_name} aria-label="category_name">
                                          <TableCell align="center">{curElem.ward_no}</TableCell>
                                        </Tooltip>
                                        <TableCell align="center">{curElem.bedid}</TableCell>
                                        {subStr.length < 8 ? (
                                          <TableCell align="center">{curElem.description}</TableCell>
                                        ) : (
                                          <Tooltip title={curElem.description} aria-label="patient_name">
                                            <TableCell align="center">{subStr}...</TableCell>
                                          </Tooltip>
                                        )}

                                        <TableCell align="center" value={curElem.in_used}>
                                          {curElem.in_used === '0' ? (
                                             <Tooltip title='Available' aria-label="patient_name">
                                             <TableCell align="center"> Available</TableCell>
                                           </Tooltip>
                                            // <Button
                                            //   size="small"
                                            //   type="button"
                                            //   variant="contained"
                                            //   className="avail-btn"
                                            //   sx={{ backgroundColor: '#78CD51' }}
                                            // >
                                            //   Available
                                            // </Button>
                                          ) : (
                                            <Tooltip title='not Available' aria-label="patient_name">
                                            <TableCell align="center">not Avail</TableCell>
                                          </Tooltip>
                                            // <Button
                                            //   size="small"
                                            //   type="button"
                                            //   variant="contained"
                                            //   className="notavail-btn"
                                            //   sx={{ backgroundColor: '#710808' }}
                                            // >
                                            //   Not Available
                                            // </Button>
                                          )}
                                        </TableCell>

                                        <TableCell style={{ width: 'maxWidth' }}>
                                          <Box style={{ display: 'flex' }}  className="row-button3">
                                            <Button
                                              size="small"
                                              type="button"
                                              variant="contained"
                                              className="edit-btn"
                                              component={RouterLink}
                                              to={`/dashboard/EditCageKennlList/${curElem.id}`}
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
                                                <div className='text-center'>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                  Are you sure you want to Delete Cage/Kennel?
                                                </Typography>
                                                </div>
                                               <div className='text-center'>
                                               <Button
                                                  size="small"
                                                  type="button"
                                                  variant="contained"
                                                  onClick={deleteOpdRow}
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

                                        <TableCell align="center">{/* <UserMoreMenu /> */}</TableCell>
                                      </TableRow>
                                    );
                                  })
                              : bedListData
                                  .slice(page * perPagerows, page * perPagerows + perPagerows)
                                  .map(({ curElem, name }) => {
                                    const desStr = curElem.description;
                                    const subStr = desStr.substr(0, 10);
                                    return (
                                      <TableRow
                                        hover
                                        key={curElem.id}
                                        tabIndex={-1}
                                        role="checkbox"
                                        selected={isItemSelected}
                                        aria-checked={isItemSelected}
                                      >
                                        <Tooltip title={curElem.wardcategory.category_name} aria-label="category_name">
                                          <TableCell align="center">
                                            {curElem.ward_no}
                                          </TableCell>
                                        </Tooltip>
                                        <TableCell align="center">
                                          {curElem.bedid}
                                        </TableCell>
                                        {subStr.length < 8 ? (
                                          <TableCell align="center">
                                            {curElem.description}
                                          </TableCell>
                                        ) : (
                                          <Tooltip
                                            title={curElem.description}
                                            aria-label="patient_name"
                                            sx={{ m: 0, p: 0 }}
                                          >
                                            <TableCell align="center">{subStr}...</TableCell>
                                          </Tooltip>
                                        )}

                                        {/* <TableCell align="right" value={curElem.in_used}> */}
                                          {curElem.in_used === '0' ? (
                                            // <Button
                                            //   size="small"
                                            //   type="button"
                                            //   variant="contained"
                                            //   className="avail-btn"
                                            //   sx={{ backgroundColor: '#78CD51' }}
                                            // >
                                            //   Available
                                            // </Button>
                                            <Tooltip title='Available' aria-label="in_used">
                                            <TableCell align="center">Available</TableCell>
                                            {/* <div>Available</div> */}
                                            </Tooltip>
                                          ) : (
                                            // <Button 
                                            //   size="small"
                                            //   type="button"
                                            //   variant="contained"
                                            //   className="notavail-btn"
                                            //   sx={{ backgroundColor: '#710808' }}
                                            // >
                                            //   Not Available
                                            // </Button>
                                            <Tooltip title='Not Available' aria-label="in_used">
                                            <TableCell align="center">Not Avail...</TableCell>
                                            {/* <div>not Avail</div> */}
                                            </Tooltip>
                                          )}
                                        {/* </TableCell> */}

                                        <TableCell style={{ width: 'maxWidth' }}>
                                          <Box style={{ display: 'flex' }}  className="row-button3">
                                            <Button
                                              size="small"
                                              type="button"
                                              variant="contained"
                                              className="edit-btn"
                                              component={RouterLink}
                                              to={`/dashboard/EditCageKennlList/${curElem.id}`}
                                              sx={{ ml: 1, backgroundColor: '#6da671' }}
                                            >
                                              Edit
                                            </Button>
                                            {/* <Button
              size="small"
              type="button"
              variant="contained"
              component={RouterLink} to={`/dashboard/InfoBedList/${curElem.id}`}
              sx={{ ml: 1, backgroundColor: '#2d2851' }}
            >
              Info
            </Button>
            <Button
              size="small"
              type="button"
              variant="contained"
              sx={{ ml: 1, backgroundColor: '#30818d' }}
            >
              History
            </Button> */}
                                            {/* <Button
              size="small"
              type="button"
              variant="contained"
              sx={{ ml: 1, backgroundColor: '#0bd5f3' }}
            >
              Payment
            </Button> */}
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
                                                <div className='text-center'>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                  Are you sure you want to Delete Cage/Kennel?
                                                </Typography>
                                                </div>
                                               <div className='text-center'>
                                               <Button
                                                  size="small"
                                                  type="button"
                                                  variant="contained"
                                                  onClick={deleteOpdRow}
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

                                        <TableCell align="center">{/* <UserMoreMenu /> */}</TableCell>
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
                rowsPerPageOptions={[ 10, 25, 50, 100]}
                component="div"
                count={bedListData.length}
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
