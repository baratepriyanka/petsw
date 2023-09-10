import React, { useState } from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
// import { Button } from '@mui/lab';
import { Toolbar, Tooltip, IconButton, Typography,Link, Stack, InputAdornment,Box, Select ,MenuItem ,InputLabel,FormControl,OutlinedInput, Button} from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbarPatient.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};


export default function UserListToolbarPatient({ numSelected, filterName, onFilterName }) {

  // const [Menu, setMenu] = React.useState([
  //   "copy",
  //   "Excel",
  //   "CSV",
  //   "PDF",
  //   "Print"
  // ]);

  // const [Menuselected, setMenuSelected] = useState("copy");
  // const handleChangeMenu = (event) => { 
  //   setMenuSelected(event.target.value);
  // }
  const [values, setValues] = React.useState([
    "100",
    "200",
    "300",
    "400"
  ]);
  const [selected, setSelected] = useState("100");
  const handleChange = (event) => { 
    setSelected(event.target.value);
  }
  return (
    <>
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      
       

       
          <Box className="boxbutton text-center">
          <Button  size="small" type="button" variant="contained"  sx={{ ml: 2, backgroundColor: '#9aa1b0'}}>
              Copy
          </Button>
          <Button  size="small" type="button" variant="contained"  sx={{ ml: 2, backgroundColor: '#9aa1b0'}}>
              Excel
          </Button>
          <Button  size="small" type="button" variant="contained"  sx={{ ml: 2, backgroundColor: '#9aa1b0'}}>
              CSV
          </Button>
          <Button  size="small" type="button" variant="contained"  sx={{ ml: 2, backgroundColor: '#9aa1b0'}}>
              PDF
          </Button>
          <Button  size="small" type="button" variant="contained"  sx={{ ml: 2, backgroundColor: '#9aa1b0'}}>
              Print
          </Button>
          </Box>
       

      
    </RootStyle>
    </>
  );
}
