import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

export default function InfoDoctorFormOne() {
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
  const {doctorId} = useParams();
  const[doctorInfo, setDoctorInfo] = useState([]);

  const getDoctorInfo = async () => {   
    const response = await fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/web/get-one-doctor/${doctorId}`);
    setDoctorInfo(await response.json());
    console.log(doctorInfo);
  }
  useEffect(() =>{
    console.log("formErrors");
    getDoctorInfo();   
},[])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} align="" sx={{ mx: 'auto', my: 5, width: '90%' }}>
     
          {
            doctorInfo.map((curElem)=>{
              return(
                <>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} key={curElem.id}>
          <RHFTextField name="name" label="Name" value={curElem.doctor_name} />
          <RHFTextField name="email" label="Email" value={curElem.email} />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>       
          <RHFTextField name="education" label="Education" value={curElem.education} />
          <RHFTextField name="gender" label="Gender" value={curElem.gender} />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="phone" label="Phone" value={curElem.phone}/>
          <RHFTextField name="department" label="Department" value={curElem.department} />       
       
        </Stack>

        <RHFTextField name="profile" label="Profile" value={curElem.profile}/>
        

        <img src={file} alt="" style={{ height: '200px', width: '30%', border: '1px solid black' }} />
      

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
     </>                     
        )
        })
        }
                    
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
