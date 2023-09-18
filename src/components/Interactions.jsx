import { Box ,Typography,InputBase,ButtonBase,Button} from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import Comment from "./Comment"
import FlexBetween from "./FlexBetween"
import {useSelector} from "react-redux"




//import comments from "./comments.json"

const Interactions=({postId})=>{
  
    const [comments, setComments] =  useState()
    const [replyText, setReplyText] = useState("")
    const {user} = useSelector((state)=>state.authReducer)
    const handleReplySubmit = async()=>{
      const body = {
        postId,
        userId:user._id,
        comment:replyText
      }
      console.log("body",body)
      const replyRes = await fetch("http://localhost:3001/comment/add",{
        method:"POST",  
      body:JSON.stringify(body),
        headers:{"Content-Type":"application/json"},
      
      })
    
       
        if (replyRes.status === 200) {
          
          setReplyText("")
          const commentsList = await fetch(
            `http://localhost:3001/comment/get/all/${postId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          const commentsListJson = await commentsList.json();
          setComments(commentsListJson);
      }
    }

    const handleReplyChange = (event)=>{
      const value = event.target.value
      setReplyText(value)
    }

    const handleEnter = (event) =>{
      const key = event.key
      console.log(key)
      if(key==='Enter'){
        
        handleReplySubmit()
      }
    }
    const fetchComment=async(postId)=>{
            
            const commentsList = await fetch(`http://localhost:3001/comment/get/all/${postId}`,
          {
              method:"GET",
              headers:{"Content-Type":"application/json"},
          })
          const commentsListJson = await commentsList.json()
          setComments(commentsListJson)
        }

        

        useEffect(()=>{
            fetchComment(postId)}, []
        ) 

        return (
            <div>
              <FlexBetween sx={{backgroundColor:"#ADD8E6",
      borderRadius:"2px"}}>
        <InputBase
              name="reply"
              type="text"
              placeholder={replyText ? replyText : "Add your thoughts"}
              onChange={handleReplyChange}
              onKeyDownCapture={handleEnter}
              value={replyText}></InputBase>
        <ButtonBase>
              <Button  type="submit" onClick={handleReplySubmit}>Comment</Button>
            </ButtonBase>
      </FlexBetween>
                <Typography>Comments</Typography>
              {comments && comments.filter(comment=>(!comment.commentReference)).map((comment, index) => (
                <div key={index}>
                  <Comment comment={comment}  comments={comments} postId={postId} setComments={setComments} />
                </div>
              ))}
            </div>
          );
          //In this code, I've wrapped each pair of <Typography> and <Comment> elements in a <div> container to satisfy the requirement of having a single parent element. The key attribute is added to the wrapping <div> to help React efficiently update the component when the array of comments changes.
          
          
          
          
          
}
export default Interactions