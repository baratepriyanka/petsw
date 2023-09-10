import { useRef, useState,useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
// mocks_
import account from '../../_mock/account';

// ----------------------------------------------------------------------


const MENU_OPTIONS = [
  {
    label: 'View Profile',
    icon: 'eva:person-fill',
    linkTo: '/dashboard/ProfilePage',
  }
];

const EDIT_MENU_OPTIONS = [
  {
    label: 'Edit Profile',
    icon: 'eva:person-fill',
    linkTo: `/dashboard/EditProfilePage`,
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const {profileId} = useParams();
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const navigate = useNavigate();

  const logout = () => {
    const loginData = JSON.parse(localStorage.getItem('token-info'));  
    if(loginData){
      localStorage.removeItem('token-info');
      // localStorage.setItem('token-info', '');
      navigate('/');
    }
    };
     const [fname, setFname] = useState('');
      const [lname, setLname] = useState('');
      const [email, setEmail] = useState('');
      const [s3image, setS3image] = useState();
      const [hospid, setHospId] = useState();
      const [hospitalid, setHospitalId] = useState();

      const isZero = false;
    const account = {
      displayName: `${fname} ${lname}`,
      email: `${email}`,
      photoURL: `${s3image}` ? s3image : '/static/mock-images/avatars/avatar_default.jpg',
    };
    // ? s3image : '/static/mock-images/avatars/avatar_default.jpg'
    useEffect(() => {
      const loginData = JSON.parse(localStorage.getItem('token-info'));  
      // console.log(loginData.hospitalid);
      if(loginData){
        // console.log(loginData.fname); 
        setFname(loginData.fname);
        setLname(loginData.lname);
        setEmail(loginData.email);
        setS3image(loginData.s3image);
        setHospId(loginData.hosp_id);
        setHospitalId(loginData.hospital_id);

      }
      else{
        setFname('');
        setLname('');
        setEmail('');
        setS3image('');
        setHospId('');
        setHospitalId('');
      }
}, []);



  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo } component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>
        <Stack sx={{ p: 1 }}>
          {EDIT_MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
