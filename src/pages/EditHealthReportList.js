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
} from '@mui/material';
// components
import AuthSocial from '../sections/auth/AuthSocial';
// import { RegisterNewPatientForm } from '../sections/auth/RegisterNewPatientForm';
import { EditHealthReportForm } from '../sections/auth/EditHealthReport';

import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

export default function EditHealthReportList() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  const logoutRedirect = () => {
    console.log("hii");
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
      setEmail('');
      setS3image('');
      setHospId('');
      setHospitalId('');
      logoutRedirect();
    }
    // console.log('formErrors');
   
  }, []);

  return (
     <>
    {isLoggedin ? (
      <Page title="EditHealthReportList">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
             Health Report Edit
            </Typography>
          </Stack>

          <Card>
            <EditHealthReportForm />
          </Card>
        </Container>
      </Page>
      ) : ( 
          
          <h1>{" "}</h1>
      )}
  </>
  );
}
