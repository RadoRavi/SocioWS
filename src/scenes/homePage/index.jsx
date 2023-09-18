import {Button, Typography,useMediaQuery} from '@mui/material'
import Navbar from '../navBar/index'
import Box from "@mui/material/Box"
import {useSelector} from "react-redux"
import { makeStyles } from '@mui/styles';
import { ClassNames } from '@emotion/react';
import SignupForm from '../../components/LoginForm'
import { styled } from '@mui/material/styles';
import { autoBatchEnhancer } from '@reduxjs/toolkit';

export const CustomBox = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("https://i0.wp.com/www.thesocialformula.net/wp-content/uploads/2021/11/Diversity_Blog_People_01-2.png?fit=1920%2C1080&ssl=1")', // Replace with the URL of your image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100vw', // Adjust this to set the width of the Box
  height: '100vh', // Adjust this to set the height of the Box
  display:'flex',

  }));
  


const HomePage = ()=>{
  const isMobileScreen = useMediaQuery("(max-width:800px)");
  const mode = useSelector((state)=>state.authReducer.mode)
    return (
      <CustomBox sx={{
      
        opacity:1
      }}>
        <Box
      sx={{
        display:'flex',
        width: isMobileScreen ? "90vw" : "60vw",
        height:isMobileScreen ? "700px" : "500px",
        backgroundColor: 'primary.light',
        opacity: [0.9, 0.9, 0.9],
        margin:'auto',
        '&:hover': {
          opacity: [1, 1, 1],
        },
      }}
    >
      <Box sx={{
        float:'left',
        width:isMobileScreen ? "40%" : "60%",
        backgroundColor:"rgb(245,232,205)",
        display:'flex',
        flexDirection:'column'
      }}>
        <Typography variant='h1' padding={isMobileScreen ? "4rem .5rem" : "3rem 2rem"}>
          Explore people who are not around you!
        </Typography>
        <Typography padding={isMobileScreen ? ".5rem" : "3rem 2rem"} sx={{
          marginTop:'auto',
          fontSize:"10px",
          

          
        }}>
        People who use our service may have uploaded your contact information to Socio. Learn more.
        </Typography>
      </Box>
      <Box sx={{
        float:'left',
        width:isMobileScreen ? "60%" : "40%",
        display:'flex',
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:'rgb(43,69,48)'
      }}>
        
        <SignupForm></SignupForm>
        
      </Box>
    </Box>
      </CustomBox>
    )
}

export default HomePage