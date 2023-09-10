import { useState, useEffect,useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, matchPath, useLocation,useParams } from 'react-router-dom';
// import './styledemo.css'

// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active }) {

  const { opdId } = useParams();

  const theme = useTheme();
  const isActiveRoot = active(item.path, );
  const { title, path, icon, info, children} = item;
  const Id=item.id;
  // const data=opdId && Id === "opd";
// console.log(id);
  const [open, setOpen] = useState(isActiveRoot);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  };

  const activeSubStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
  };
  const objectStyle = {
    color: "white",
    backgroundColor: "#ac5353",
    padding: "10px"
  };
  const objectStyleValid = {
    color: "Red",
    backgroundColor: "#bc3553",
    padding: "10px"
  };
  const isValid = true;
  // if(opdId && Id === "opd"){
  // <span style={isValid ? activeRootStyle : objectStyleValid}>{Id}</span>
  //   // console.log(item.id)
  //   // console.log(active)

  // }  

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path} = item;
              const isActiveSub = active(path);
            //  console.log(isActiveSub); 
              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }
 
  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
      // id={id} 
      >
      {/* value={opdId && Id === "opd" ? activeRootStyle: activeSubStyle} */}
      {/* value={opdId && Id === "opd" ? activeRootStyle: activeSubStyle} */}

      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} 
      />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
  

};

export default function NavSection({ navConfig, isActiveRoot, ...other }) {
  const objectStyle = {
    color: "white",
    backgroundColor: "#ac5353",
    padding: "10px"
  };
  const objectStyleValid = {
    color: "Red",
    backgroundColor: "#bc3553",
    padding: "10px"
  };

  const handleOpen1 = () => {
  console.log("Open")
  };
const { pathname } = useLocation();
const { opdId } = useParams();
// console.log(window.location.href)
// console.log("window.location.href")
// console.log(window.location.protocol)
// console.log("window.location.protocol")
// console.log(window.location.hostname)
// console.log("window.location.hostname")
// console.log(window.location.pathname)
// console.log(window.location.pathname)
// console.log(pathname.split('/'))

// console.log(pathname==='/dashboard/registerNewPatient')
const active1 = {backgroundColor: 'green'}
const inactive = {}
// console.log(pathname)
// const data= navConfig[1].path;
//  console.log(data)

const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) :  false );
// useEffect(() => {
if(pathname ==='/dashboard/registerNewPatient' || pathname ===`/dashboard/EditOpdList/${opdId}` || pathname ===`/dashboard/InfoOpdList/${opdId}`){
const data= navConfig[1].path;
//  console.log(data)
}

// console.log(data)

// },[]);


  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }} >
        {navConfig.map((item) =>
          // console.log(item),
          <NavItem  key={item.title} item={item} active={match} />

        )}
      </List>
    </Box>
  );
}
