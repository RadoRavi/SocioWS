import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
  Fade
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  Person,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { Navigate, useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const Navbar = () => {
  const anchorRef = React.useRef(null);
  const theme = useTheme();
  const navigate = useNavigate()
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const dark2 = theme.palette.neu
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;
  const primaryLight = theme.palette.primary.light;

  const isNonMobileScreen = useMediaQuery("(min-width:800px)");
  const [profileToggle, setProfileToggle] = useState(false);
  const [anchorPopperEl, setAnchorPopperEl] = useState(null);
  const { mode, user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
const handleClick=(event)=>{
    setAnchorPopperEl(anchorPopperEl?null:event.currentTarget)
}

const handleSearch=()=>{
  return navigator.bluetooth.requestDevice(({
    acceptAllDevices: true,
    optionalServices: ['battery_service'] // Required to access service later.
  }))
  .then(device => device.gatt.connect())
  .then(server => {
    // Getting Battery Service…
    return server.getPrimaryService('battery_service');
  })
  .then(service => {
    // Getting Battery Level Characteristic…
    return service.getCharacteristic('battery_level');
  })
  .then(characteristic => {
    // Reading Battery Level…
    return characteristic.readValue();
  })
  .then(value => {
    console.log(`Battery percentage is ${value.getUint8(0)}`);
  })
  .catch(error => { console.error(error); });
}

const clickAwayHandler=(event)=>{
    setAnchorPopperEl(null)
}
  const logout=()=> {
    dispatch(setLogout());
    navigate("/")
    sessionStorage.setItem("res",null)
  }
  const redirectToProfile=()=> {
    dispatch(setLogout());
    navigate("/profile")
  }

  return (
    <FlexBetween padding="1rem 6%"  sx={{
      zIndex:1000,
      margin:"20px 1%",
      height:"60px",
      backgroundColor:"white",
      width:"98%",
      borderRadius:"8px",
      position:"fixed",
      overflow:"hidden",
      top:"0",
      border:"4px solid #ffc30f"


    }}>
      <FlexBetween gap="1.7rem" >
        <Typography
          fontWeight="bold"
          fontSize="clamp(2rem, 2.4rem, 2.8rem)"
          color='dark'
          onClick={() => Navigate("/")}
          sx={{
            "&:hover": {
              color: dark,
              cursor: "pointer",
            },
          }}
        >
          Socio
        </Typography>
      </FlexBetween>
      
        <FlexBetween gap="2rem">
        {isNonMobileScreen && (
          <FlexBetween padding=".5rem .8rem" borderRadius="1rem">
            <InputBase placeholder="Search" gap="1rem" />
            <IconButton onClick={handleSearch}>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
        <a  href="#createPost"><CreateIcon></CreateIcon></a>
          <Message color={primaryLight}></Message>
          <FormControl variant="standard" value="firstName">
            <IconButton onClick={handleClick}>
              <Person />
            </IconButton>
            <Popper
            open={Boolean(anchorPopperEl)}
            anchorEl={anchorPopperEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
                }}
                transformOrigin={{
                vertical: "bottom",
                horizontal: "top",
                }}
                transition>
                {({ TransitionProps }) => (
    <Fade {...TransitionProps} timeout={350}>
      <Box sx={{ borderRadius:2, 
                 paddingX:2, 
                 paddingY:.5,
                 bgcolor: 'cream',
                 boxShadow:2,
                 zIndex:100000,
                 backgroundColor:'white'}}>
        <MenuList>
            <MenuItem>
                <Typography onClick={redirectToProfile}>
                    My Profile
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography onClick={logout}>
                    Log Out
                </Typography>
            </MenuItem>
        </MenuList>
      </Box>
    </Fade>
  )}
</Popper>
          </FormControl>
        </FlexBetween>
      
    </FlexBetween>
  );
};

export default Navbar;
