import { Box, Typography, InputBase, ButtonBase, Button, useMediaQuery} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { setPosts } from "../state";
import { setUser } from "../state";
//import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import FlexBetween from "./FlexBetween";
import { useSelector,useDispatch } from "react-redux";


const CreatePost = () => {
  const [isDp,setIsDp] = useState(false)
  const isMobileScreen = useMediaQuery("(max-width:800px)");
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState();
  const [location, setLocation] = useState();
  const [fileUrl, setFileUrl] = useState();
  const [isDP, setIsDP] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    {
      file && setFileUrl(URL.createObjectURL(file));
    }
  }, [file]);
  const { user,token } = useSelector((state) => state.authReducer);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("userId", user._id);
    formdata.append("picture", file);
    formdata.append("picturePath", file.name);
    formdata.append("caption", caption);
    formdata.append("location", location);

    const postUpload = await fetch(`http://localhost:3001/post?isDp=${isDp}`, {
      method: "POST",
      body: formdata,
    });
    
    setFile(null);
    setCaption("");
    setLocation("");
    const posts = await fetch("http://localhost:3001/post/get")
    const postJson = await posts.json()
   
    dispatch(setPosts(postJson.reverse()))
    const userDetails = await fetch(`http://localhost:3001/user/get/${user._id}`)
    const userDetailsJson = await userDetails.json()
   console.log("userDetailsJson",userDetailsJson)
    dispatch(setUser(userDetailsJson))
  };
  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleDpClick = ()=>{
    setIsDp(!isDp)
  }
  return (
    <Box>
      <Box id="createPost" margin={isMobileScreen?"auto":"0px 20px 20px 0px"}
        sx={{
          display: "flex",
          maxWidth: "100%",
          height: "auto",
          padding:"8px",
          borderRadius:"10px",
          border:"4px solid #ffc30f"
        }}
      >
        <form style={{width:"100%"}}
          action="/upload_files"
          enctype="multipart/form-data"
          onSubmit={handleSubmit}
        >
          {file && <img style={{ width: "100%" }} src={fileUrl} />}
          <FlexBetween>
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <FlexBetween {...getRootProps()}>
                <input {...getInputProps()} />
                {!file && "Upload picture here!"}
                
              </FlexBetween>
            )}
          </Dropzone>
          <Button sx={{color:(isDp?"green":"red")}} onClick={handleDpClick}>Set as Profile pic</Button>
          </FlexBetween>
          <Box sx={{ display: "flex" }}>
            <InputBase
              id="caption"
              name="caption"
              type="text"
              placeholder={caption ? caption : "caption"}
              onChange={handleCaptionChange}
              value={caption}
              sx={{
                width: "70%",
                paddingLeft: "5px",
                
              }}
            ></InputBase>
            <InputBase
              id="location"
              name="location"
              type="text"
              placeholder={location ? location : "location"}
              onChange={handleLocationChange}
              value={location}
              sx={{
                width: "30%",
                paddingLeft: "5px",
              }}
            ></InputBase>
            <ButtonBase>
              <Button type="submit">Post</Button>
            </ButtonBase>
            
          </Box>
        </form>
      </Box>
    </Box>
  );
};
export default CreatePost;
