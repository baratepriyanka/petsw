import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, NavLink } from 'react-router-dom';

import './style.css';
import Axios from 'axios';
// @mui
import { Button, Typography, Box, Modal } from '@mui/material';
import { array } from 'prop-types';
// ----------------------------------------------------------------------
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
const styleForPassword = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // boxShadow: 24,
  p: 2,
};
const stylePopup = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // boxShadow: 24,
  p: 2,
};

export default function LoginForm() {
  const [open, setOpen] = useState(true);
  const [errMsg, seterrMsg] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <section className="login-screen-one ipad-height">
        <div className="container">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12 mt-3">
            <div className="row">
              <div className="">
                <Modal
                  open={open}
                  // onClick={handleClose}onClick={handleOpen}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={stylePopup}>
                   
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-center">
                    An email with a link to reset your password has been sent to the entered email address.
                    </Typography>
                   <div className="text-center">
                   <Button
                        size="small"
                        type="button"
                        variant="contained"
                        component={RouterLink}
                        to="/"
                        
                        className="text-center forpassbtn"
                        sx={{ mt: 2, backgroundColor: '#0d6efd' }}
                      >
                         Go to login Page 
                    </Button>
                   </div>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
