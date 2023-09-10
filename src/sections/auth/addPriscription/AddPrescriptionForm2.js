import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment,Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AddPrescriptionForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    date: Yup.string().required('First name required'),
    patient: Yup.string().required('Last name required'),
    doctor: Yup.string().email('Email must be a valid email address').required('Email is required'),
    medicine: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    date: '',
    patient: '',
    doctor: '',
    medicine: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <Stack spacing={3}  align="" sx={{ mx: 'auto', my: 5,width:"90%" }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}  mb={5}>
          <RHFTextField name="date" label="Date" />
          <RHFTextField name="patient" label="Patient" />
          <RHFTextField name="doctor" label="Doctor" />
        </Stack>

        
        {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}> */}
        <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    // sy={{ maxWidth: 500 }} ml={5}
                   sx={{maxWidth: '500px', maxHeight: '500px'}}
                    mb={5}
                    maxWidth="sm"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                        
                        
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />

                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    // sx={{ maxWidth: 800 }}
                    mb={5}
                    maxWidth="sm"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
        {/* </Stack> */}
        <RHFTextField name="medicine" label="Medicine"  mb={5}/>

        {/* <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}

        <Box textAlign='center' >
        <LoadingButton  size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ my: 5}}>
          Add Prescription
        </LoadingButton>
      </Box>
      </Stack>
    </FormProvider>
  );
}
