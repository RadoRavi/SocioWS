import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import Image from '../components/Image'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import Interactions from './Interactions';
import {Box,Grid, Typography, Avatar, Card, CardActionArea, IconButton,CardMedia, CardContent,CardActions, Button, useMediaQuery, ButtonBase } from "@mui/material";
import { useEffect } from 'react';
import FlexBetween from './FlexBetween';
import DeleteIcon from '@mui/icons-material/Delete';

const Post=({post})=>{
  const dispatch = useDispatch()
  const [name,setName] = useState("")
  const [sPost,setPost] = useState(post)
  const [picturePath,setPicturePath] = useState("")
  const {user} = useSelector(state=>state.authReducer)
  const isMobileScreen = useMediaQuery("(max-width:800px)");
  const view = isMobileScreen?false:true
  const [viewComment, setViewComment] = useState(view)
  
  
  const handleViewComments =()=>{
    setViewComment(!viewComment)
  }

  const deletePost = async()=>{
    const deletedPost = await fetch(`http://localhost:3001/post/delete/${user._id}/${post._id}`,{
      method:"DELETE",
      headers:{"Content-Type":"application/json"},
    })
    if(deletedPost.status===200){
      const posts = await fetch("http://localhost:3001/post/get")
const postJson = await posts.json()
      dispatch(setPosts(postJson))
    }
    
    
  } 

  const handleLike = async()=>{
    const liked = await fetch(`http://localhost:3001/post/like/${post._id}/${user._id}`,
    {
             method:"PATCH",
             headers:{"Content-Type":"application/json"},
         }) 
         if(liked.status===200){
          const resPost = await liked.json()
            setPost(resPost)
         }
    //   {
    //       method:"GET",
    //       headers:{"Content-Type":"application/json"},
    //   })
  }
    // const dispatch = useDispatch()

    // const fetchPost=async()=>{
    //     console.log("adjbjhdjhsdhjshui")
    //     const post = await fetch(`http://localhost:3001/post/get`,
    //   {
    //       method:"GET",
    //       headers:{"Content-Type":"application/json"},
    //   })

    //   dispatch(setPosts(await post.json()))
      
    // }
    useEffect(()=>{fetchAvatar()
        },[])
    const fetchAvatar = async () => {
      const avatarData = await fetch(
        `http://localhost:3001/user/useravatar/${sPost.userId}`
      );
      const { firstName, lastName, picturePath } = await avatarData.json();
      setName(firstName + " " + lastName);
      setPicturePath(picturePath);
      console.log("name", name);
      console.log("picturePath", picturePath);
    };
    return (
      <Grid container 
      
      sx={{
        margin:'20px auto',
        borderRadius:"10px"
      }} spacing={2}>
        <Grid xs={12} md={8}>
        <Box key={post._id} id={post._id} my={4} margin={isMobileScreen?"auto":"20px 20px 20px 0px"} sx={{

border:"4px solid #ffc30f",
          borderRadius:"10px"
        
        }}><FlexBetween  sx={{justifyContent:"left",
        paddingBottom:"10px",
        padding:"5px"}}>
<Avatar 
          src={`http://localhost:3001/assets/${picturePath}`}
          alt={name + " display picture"}
        />
        <Typography fontWeight="bold"
          fontSize="16px" paddingLeft="20px">{name}</Typography>
        
        </FlexBetween >
          
          
          <Image sx={{borderRadius:"10px"}} picturePath={`${sPost&&sPost.picturePath}`}></Image>{
          sPost.caption&& 
          
          <Box>
          <Typography paddingLeft="10px" fontSize="16px" variant="body1" color="textSecondary" component="p">
                {sPost?sPost.caption:"hi"}
              </Typography>
          </Box>
}
         <Box><IconButton >
              <FavoriteIcon sx={{color:`${(user._id in sPost.likes)?"red":"grey"}`}} onClick={handleLike}/>
            </IconButton>
            <IconButton onClick={handleViewComments}>
              <CommentIcon />
             
            </IconButton>
            {(post.userId===user._id)&&
            <IconButton onClick={deletePost}>
         <DeleteIcon/>
        </IconButton>
}
            </Box>
          </Box>
          </Grid>
          <Grid xs={12} md={4}>
          {viewComment&&
          <Box classNmae="hereme"key={sPost._id} id={sPost._id} my={4} margin={isMobileScreen?"auto":"20px 20px 20px 0px"} sx={{

backgroundColor:"white",
padding:"4px",
borderRadius:"10px",
border:"4px solid #ffc30f"
}}>
  
        <Card>
          <CardActionArea>
            
            <CardContent>
              
              <Interactions postId={sPost._id}/>
            </CardContent>
          </CardActionArea>
        </Card>

        </Box>
}
        </Grid>
        </Grid>
    )
}
export default Post