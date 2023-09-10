import * as Yup from 'yup';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Button, InputAdornment, Select, MenuItem, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AddNewDoctorForm() {
  const navigate = useNavigate();

  const [file, setFile] = useState();
  const handleChange = (e) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  // const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string().required('Phone is required'),
    department: Yup.string().required('Department is required'),
    profile: Yup.string().required('Profile is required'),
  });

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    department: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} align="" sx={{ mx: 'auto', my: 5, width: '90%' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label="Name" />
          <RHFTextField name="email" label="Email" />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="password" label="Password" />
          <RHFTextField name="address" label="Address" />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="phone" label="Phone" />
          <RHFTextField name="department" label="Department">
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value=""
              label="Age"
              // onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </RHFTextField>
        </Stack>

        <RHFTextField name="profile" label="Profile" />
        {/* <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden />
        </Button> */}

        <img src={file} alt="" style={{ height: '200px', width: '30%', border: '1px solid black' }} />
        {/* <RHFTextField hidden name="Image Upload" type="file" onChange={handleChange} /> */}
        {/* <Button variant="contained" component="label" onChange={handleChange} sx={{ my: 5 }}>
          Upload File
          <input type="file" hidden />
        </Button>  */}

        <Box textAlign="left">
          <LoadingButton
            size="large"
            component="label"
            variant="contained"
            onChange={handleChange}
            sx={{ my: 5 }}
            color="success"
          >
            Select Image
            <input type="file" hidden />
          </LoadingButton>
        </Box>
        {/* <input type="file" onChange={handleChange} style={{}}/>
            <img src={file} alt="images"/> */}

        {/* <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <Box textAlign="center">
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ my: 5 }}>
          submit
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
