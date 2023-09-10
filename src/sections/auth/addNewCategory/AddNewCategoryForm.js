import * as Yup from 'yup';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment,Box, Select ,MenuItem ,InputLabel,FormControl,OutlinedInput} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterNewPatientForm() {
  const navigate = useNavigate();

  // const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
   
    // address: Yup.string().required('address is required'),
    Title: Yup.string().required('Title is required'),

  
  
  });

  const defaultValues = {
    Patient: '',
    Title: '',    
    remember: true,
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

  const [values, setValues] = React.useState([
    "Testing",
    "Mr. Patient",
   
  ]);
  const [selected, setSelected] = useState("Testing");
  const handleChange = (event) => { 
    setSelected(event.target.value);
  }
  return (

    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}  align="" sx={{ mx: 'auto', my: 5,width:"90%" }}>
      {/* <FormControl sx={{ m: 1}}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          value={selected}
          onChange={handleChange}
          inputProps={{
            name: "PatientName",
            id: "age-simple"
          }}
        >
          {values.map((value, index) => {
            return <MenuItem value={value}>{value}</MenuItem>;
          })}
        </Select>
        </FormControl> */}
        

        {/* <RHFTextField name="patientName" label="Patient Name"/> */}
        {/* <RHFTextField  name="PatientCode" label="Patient Code" />
        <RHFTextField name="StartDateTime" label="Start Date Time" />
        <RHFTextField name="EndDateTime" label="End Date Time" /> */}
        <FormControl sx={{ m: 1}}>
        {/* <InputLabel id="demo-multiple-name-label">Patient</InputLabel> */}
        {/* <Select
          value={selected}
          onChange={handleChange}
          inputProps={{
            name: "Durations",
            id: "age-simple"
          }}
        >
          {values.map((value, index) => {
            return <MenuItem value={value}>{value}</MenuItem>;
          })}
        </Select> */}
        </FormControl>
        {/* <RHFTextField name="Durations" label="Durations" /> */}
        {/* <RHFTextField name="address" label="Address" /> */}
        <RHFTextField name="Category" label="Category" />
        <RHFTextField name="Description" label="Description" />
        {/* <RHFTextField name="Details" label="Details" /> */}

        {/* <FormControl sx={{ m: 1}}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          value={selected}
          onChange={handleChange}
          inputProps={{
            name: "SelectDoctor",
            id: "age-simple"
          }}
        >
          {values.map((value, index) => {
            return <MenuItem value={value}>{value}</MenuItem>;
          })}
        </Select>
        </FormControl> */}


        {/* <RHFTextField name="mobile" label="Mobile" />
        <RHFTextField name="phone" label="Phone" />
        <RHFTextField name="email" label="Email" />
        <RHFTextField name="whatsApp" label="WhatsApp" />
        <RHFTextField name="pincode" label="Pincode" /> */}

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

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}
      <Box textAlign='center' >
      <LoadingButton  size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ my: 5}}>
        Submit
      </LoadingButton>
      </Box>
    </FormProvider>
  );
}
