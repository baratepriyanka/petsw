import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import AuthSocial from '../sections/auth/AuthSocial';
import { CreatePaymentListForm } from '../sections/auth/CreatePaymentList';

// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------


export default function CreateNewPaymentList () {


  return (
   <>
   <Page title="CreateNewPaymentList ">
      <Container >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Register Patient
          </Typography>
         
        </Stack>

        <Card>  
       
        <CreatePaymentListForm />        
        </Card>
      </Container>
    </Page>

   </>
  );
}
