import Nav from "../navBar";
import { Box, Typography, Grid ,useTheme,useMediaQuery} from "@mui/material";
import { CustomBox } from "../homePage";
import { useSelector,useDispatch } from "react-redux";
import {useEffect} from "react";
import Post from "../../components/Post"
import UserSnapShot from "../../components/UserSnapShot";
import CreatePost from "../../components/CreatePost";
import { setLogin, setPosts } from "../../state";
import Interactions from "../../components/Interactions";

const GeneralPage = () => {
  const isMobileScreen = useMediaQuery("(max-width:800px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;
  const primaryLight = theme.palette.primary.light;
  const {user,posts}= useSelector((state)=>state.authReducer)
  const dispatch = useDispatch();
  useEffect(()=>{
fetchPost()
  },[])

  function GetTheDisplayedPost(event){
    console.log(event)
  }

  const postCards =document.querySelectorAll("div.postCards")
  
  postCards&&postCards.forEach(element => {
    element.addEventListener("mouseover",(event)=>{
      GetTheDisplayedPost(event)
    })
  });

const fetchPost=async()=>{
  
const posts = await fetch("http://localhost:3001/post/get")
const postJson = await posts.json()

if(postJson.length>0){
  console.log("postJson",postJson)
  dispatch(setPosts(postJson.reverse()))
}else{
  dispatch(setPosts([]))
}

}



console.log(user)
console.log("posts",posts)

  return (
    <div style={{
      height:"100%",
    }}>
      <Nav></Nav>
      
        <Grid container sx={{
        width:'95%',
        margin:'20px auto'
      }} spacing={2}>
          <Grid xs={12} md={8} sx={{
            marginTop:"90px"
          }}>
            <CreatePost></CreatePost>
          </Grid>
          {(!isMobileScreen)&&(
          <Grid sx={{
            marginTop:"70px",
            backgroundColor:'white'
          }}xs={10} md={4}>
          <UserSnapShot  user={user}></UserSnapShot>
        
          </Grid>)}
          <Grid container sx={{
        
        margin:'20px auto'
      }} spacing={2}>

        {
        posts.map((post)=>{
              return (<Post key={post._id}className={"postCards"} post={post}></Post>)
            })}
      </Grid>
          
        </Grid>
      
    </div>
  );
};
export default GeneralPage;
