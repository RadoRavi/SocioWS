import React from "react";
import { useFormik } from "formik";
import { loginSchema ,registerSchema} from "../schema";
import { Box, InputBase, Typography, Button , Link, useMediaQuery} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogin } from "../state";
import {useNavigate}  from "react-router-dom";
import { useEffect } from "react";


const SignupForm = () => {
  const isMobileScreen = useMediaQuery("(max-width:800px)");
  const { mode, user,token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const loginInitial={
    email: "",
    password: "",
  }
  const registrationInitial={
    firstName:"",
    lastName:"",
    password:"",
    location:"",
    occupation:"",
    email:""
  }
  

  const [loginStatus,setLoginStatus] = useState({
    status:true,
    message:""
  })
  const [isLoginForm,toggleLogin] = useState(true)
  



    
   
  const onSubmit = async(values,onSubmitProps) => {
    
      const login = await fetch(`http://localhost:3001/auth/${isLoginForm?'login':'register'}`,
      {
  
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(values)
      })
      const res = await login.json()
      if(login.status>200){
        
        setLoginStatus(res)
      }else if(login.status==200 && isLoginForm){
        
          dispatch(setLogin(res))
          sessionStorage.setItem("res",JSON.stringify(res))
          navigate('/home')
          //Navigate('/home')
          //window.location = "/home";
          
      } else if(login.status==200 && !isLoginForm){
        toggleLogin(true)
      }
     
  };
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: isLoginForm?loginInitial:registrationInitial,
    validationSchema: isLoginForm?loginSchema:registerSchema,
    onSubmit,
  });
  console.log(errors);
  const { email, password, firstName, lastName,occupation,location } = errors;
  return (
    <Box 
    padding={isMobileScreen?"0rem":"2rem"}
      sx={{
        
        width: "80%"
      }}
    >
      {isLoginForm?
      <form onSubmit={handleSubmit}>
        <Box>
          {!loginStatus.status?<Typography sx={{
              color: "rgb(177,78,27)",
              fontWeight: "bold",
              paddingBottom: "8px",
              minWidth: "70%",
            }} >
            {loginStatus.message}</Typography>:<></>}
          <Typography
            sx={{
              color: "wheat",
              fontWeight: "bold",
              paddingBottom: "10px",
              minWidth: "70%",
            }}
          >
            {email && touched.email ? [email] : "Please enter your email"}
          </Typography>

          <InputBase
            id="email"
            name="email"
            type="email"
            placeholder={values.email ? values.email : "email"}
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            sx={{
              width: "100%",
              paddingLeft: "5px",
              backgroundColor: "rgb(245,232,205)",
            }}
          ></InputBase>
          <Typography
            sx={{
              color: "wheat",
              fontWeight: "bold",
              padding: "10px 0px",
            }}
          >
            {password && touched.password
              ? [password]
              : "Please enter your password"}
          </Typography>

          <InputBase
            id="password"
            name="password"
            type="password"
            placeholder={values.password ? values.password : "password"}
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            sx={{
              width: "100%",
              paddingLeft: "5px",
              backgroundColor: "rgb(245,232,205)",
            }}
          ></InputBase>
        </Box>

        <Button
          sx={{
            marginTop: "10px",
            backgroundColor: "rgb(245,232,205)"
          }}
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
        <Typography
          sx={{
            color: "wheat",
            fontWeight: "bold",
            padding: "10px 0px",
          }}
        >
          Don't have account let <Link sx={{color:"rgb(193,227,228)"}} onClick={()=>toggleLogin(false)}>create one account</Link>
        </Typography>
      </form>:
      <form onSubmit={handleSubmit}>
      <Box>
        {!loginStatus.status?<Typography sx={{
            color: "rgb(177,78,27)",
            fontWeight: "bold",
            paddingBottom: "8px",
            minWidth: "70%",
          }} >
          {loginStatus.message}</Typography>:<></>}
        <Typography
          sx={{
            color: "wheat",
            fontWeight: "bold",
            padding: "6px 0px 4px 0px",
            minWidth: "70%",
          }}
        >
          {firstName && touched.firstName ? [firstName] : "Your first name"}
        </Typography>

        <InputBase
          id="firstName"
          name="firstName"
          type="text"
          placeholder={values.firstName ? values.firstName : "first name"}
          onChange={handleChange}
          value={values.firstNmae}
          onBlur={handleBlur}
          sx={{
            width: "100%",
            paddingLeft: "5px",
            backgroundColor: "rgb(245,232,205)",
          }}
        ></InputBase>
        <Typography
          sx={{
            color: "wheat",
            fontWeight: "bold",
            padding: "6px 0px 4px 0px",
            minWidth: "70%",
          }}
        >
          {lastName && touched.lastName ? [lastName] : "Your last name"}
        </Typography>

        <InputBase
          id="lastName"
          name="lastName"
          type="text"
          placeholder={values.lastName ? values.lastName : "first name"}
          onChange={handleChange}
          value={values.lastName}
          onBlur={handleBlur}
          sx={{
            width: "100%",
            paddingLeft: "5px",
            backgroundColor: "rgb(245,232,205)",
          }}
        ></InputBase>
        <Typography
            sx={{
              color: "wheat",
              fontWeight: "bold",
              padding: "6px 0px 4px 0px",
              minWidth: "70%",
            }}
          >
            {email && touched.email ? [email] : "Enter your email"}
          </Typography>

          <InputBase
            id="email"
            name="email"
            type="email"
            placeholder={values.email ? values.email : "email"}
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            sx={{
              width: "100%",
              paddingLeft: "5px",
              backgroundColor: "rgb(245,232,205)",
            }}
          ></InputBase>
        <Typography
          sx={{
            color: "wheat",
            fontWeight: "bold",
            padding: "6px 0px 4px 0px",
          }}
        >
          {password && touched.password
            ? [password]
            : "Create a password"}
        </Typography>

        <InputBase
          id="password"
          name="password"
          type="password"
          placeholder={values.password ? values.password : "password"}
          onChange={handleChange}
          value={values.password}
          onBlur={handleBlur}
          sx={{
            width: "100%",
            paddingLeft: "5px",
            backgroundColor: "rgb(245,232,205)",
          }}
        ></InputBase>
         
        <Typography
          sx={{
            color: "wheat",
            fontWeight: "bold",
            padding: "6px 0px 4px 0px",
            minWidth: "70%",
          }}
        >
          {location && touched.location ? [location] : "Your location"}
        </Typography>

        <InputBase
          id="location"
          name="location"
          type="text"
          placeholder={values.location ? values.location : "location"}
          onChange={handleChange}
          value={values.location}
          onBlur={handleBlur}
          sx={{
            width: "100%",
            paddingLeft: "5px",
            backgroundColor: "rgb(245,232,205)",
          }}
        ></InputBase>
        <Typography
          sx={{
            color: "wheat",
            fontWeight: "bold",
            padding: "6px 0px 4px 0px",
            minWidth: "70%",
          }}
        >
          {occupation && touched.occupation ? [occupation] : "Your job"}
        </Typography>

        <InputBase
          id="occupation"
          name="occupation"
          type="text"
          placeholder={values.occupation ? values.occupation : "job"}
          onChange={handleChange}
          value={values.occupation}
          onBlur={handleBlur}
          sx={{
            width: "100%",
            paddingLeft: "5px",
            backgroundColor: "rgb(245,232,205)",
          }}
        ></InputBase>
      </Box>

      <Button
        sx={{
          marginTop: "10px",
          backgroundColor: "rgb(245,232,205)"
        }}
        variant="contained"
        type="submit"
      >
        Submit
      </Button>
      <Typography
        sx={{
          color: "wheat",
          fontWeight: "bold",
          padding: "10px 0px",
        }}
      >
        Already have an account let, <Link onClick={()=>toggleLogin(true)} sx={{color:"rgb(193,227,228)"}}>Login</Link>
      </Typography>
    </form>
}

    </Box>
  );
};

export default SignupForm;
