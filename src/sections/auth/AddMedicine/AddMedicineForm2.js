import * as Yup from 'yup';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, Select, MenuItem ,InputLabel,FormControl,Box} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AddMedicineListForm() {
  const navigate = useNavigate();

  const [category, setCategory] = React.useState('');

  const handlecategory = (event)=>{
    setCategory(event.target.value);
  }


  // const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    category:Yup.string().required('Category is required'),
    purchaseprice: Yup.string().required('Purchase price is required'),
    saleprice: Yup.string().required('Sale Price is required'),
    quantity: Yup.string().required('Quantity is required'),
    genericname: Yup.string().required('Generic Name is required'),
    company: Yup.string().required('Company is required'),
    effects: Yup.string().required('Effects is required'),
    storebox: Yup.string().required('Store Box is required'),
    expiredate: Yup.string().required('Expire Date is required'),
   
   
  });

  const defaultValues = {
    name: '',
    category: '',
    purchaseprice: '',
    saleprice: '',
    quantity: '',
    company: '',
    effects: '',
    storebox: '',
    expiredate: ''
    
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
          <Stack  spacing={3}  align="" sx={{ mx: 'auto', my: 5,width:"90%" }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

        <RHFTextField name="name" label="Name" />      
       
        <RHFTextField name="purchaseprice" label="Purchase Price" />
        </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <RHFTextField name="saleprice" type=""  label="Sale Price" />
        <RHFTextField name="quantity" type=""  label="Quantity" />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <RHFTextField name="company" type=""  label="Company" />
     
        <RHFTextField name="effects" type=""  label="Effects" />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

        <RHFTextField name="storebox" type=""  label="Store Box" />     
        <RHFTextField name="expiredate" type=""  label="Expire Date" />
        </Stack>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={category}
          label="Category"
          onChange={handlecategory}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>category</MenuItem>
          <MenuItem value={20}>category</MenuItem>
          <MenuItem value={30}>category</MenuItem>
        </Select>
     
      </FormControl>
       
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>
      <Box textAlign='center' >
      <LoadingButton textalign="center" size="large" type="submit" variant="contained" loading={isSubmitting}  sx={{ my: 5}}>
        Submit
      </LoadingButton>
      </Box>
    </FormProvider>
  );
}
