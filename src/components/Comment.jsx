import { FullscreenExit } from "@mui/icons-material";
import { Paper, Grid, Avatar, Typography, Box, InputBase , ButtonBase, Button} from "@mui/material";
import { useEffect, useState } from "react";
import FlexBetween from "./FlexBetween";
import {useSelector} from "react-redux"



const Comment = ({ comment,comments, postId,replies, setComments }) => {
  const [name, setName] = useState("");
  const [picturePath, setpicturePath] = useState("");
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [reply, setReply] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [viewReplies, setViewReplies] = useState(true)


  const {user} = useSelector((state)=>state.authReducer)
  
  const fetchAvatar = async () => {
    const avatarData = await fetch(
      `http://localhost:3001/user/useravatar/${comment.userId}`
    );
    const { firstName, lastName, picturePath } = await avatarData.json();
    setName(firstName + " " + lastName);
    setpicturePath(picturePath);
    console.log("name", name);
    console.log("picturePath", picturePath);
  };

  useEffect(() => {
    fetchAvatar();
  },[comment.userId]);
  const voteLogic = (upOrdown) => {
    if (upOrdown) {
      if (!up) {
        return "upvote";
      } else {
        return "downvote";
      }
    } else {
      if (!down) {
        return "downvote";
      } else {
        return "upvote";
      }
    }
  };
  const jumpClick = (upOrdown) => {
    if (upOrdown) {
      if (up === down) {
        return 0;
      } else if (up === true && down === false) {
        return 0;
      } else {
        return 1;
      }
    } else {
      if (up === down) {
        return 0;
      } else if (down === true && up === false) {
        return 0;
      } else {
        return 1;
      }
    }
  };
  const showInputBlock = ()=>{
    setReply(!reply)
  }
async function showRepliesByDefault(id){
  const replies = await fetch(
    `http://localhost:3001/comment/get/ref/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const commentsListJson = await replies.json();
  return commentsListJson
}
  const showReplies = async(event)=>{
    if(!viewReplies){
    console.log("replies",comments)
    console.log("viewReplies",viewReplies)
    // const id = event.target.parentElement.id;
    // const replies = await fetch(
    //   `http://localhost:3001/comment/get/ref/${id}`,
    //   {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
    // const commentsListJson = await replies.json();
    // setreplies(commentsListJson)
    setViewReplies(true)
    }else{
      setViewReplies(false)
    }
    
  }

  const handleReplySubmit=async(event)=>{
    const commentReference = event.target.parentElement.parentElement.previousSibling.id
    
    const body = {
      postId,
      userId:user._id,
      commentReference,
      comment:replyText
    }
    console.log("body",body)
    const replyRes = await fetch("http://localhost:3001/comment/add",{
      method:"POST",  
    body:JSON.stringify(body),
      headers:{"Content-Type":"application/json"},
    
    })
  
     
      if (replyRes.status === 200) {
        setReply(false)
        setReplyText("")
        const commentsList = await fetch(
          `http://localhost:3001/comment/get/all/${postId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const commentsListJson = await commentsList.json();
        setViewReplies(true)
        setComments(commentsListJson);
    }
  }
  const handleReplyChange = (event)=>{
    setReplyText(event.target.value)
  }

  const updateVote = async (event) => {
    const id = event.target.parentElement.id;
    const upOrdown = event.target.className === "up";
    //const jumpClick = !(up===down)
    console.log("jumpClick",jumpClick(upOrdown))
    const votedComment = await fetch(
      `http://localhost:3001/comment/vote/${voteLogic(
        upOrdown
      )}/${id}/${jumpClick(upOrdown)}`,
      { method: "PATCH" }
    );
    console.log("voted", await votedComment.json())
    if (votedComment.status === 200) {
      console.log("gggggggggggg")
      const commentsList = await fetch(
        `http://localhost:3001/comment/get/all/${postId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const commentsListJson = await commentsList.json();
console.log("commentsListJson",commentsListJson)
      setComments(commentsListJson);
      console.log("before", up + " " + down);
      upOrdown ? setUp(!up) : setDown(!down);
      if (upOrdown && down) {
        setDown(false);
      } else if (!upOrdown && up) {
        setUp(false);
      }
      console.log("after", up + " " + down);
    } else {
      console.log("failed");
    }
  };

  return (
    <Paper key={comment._id} style={{ padding: "8px 1px 3px 5px", marginLeft: "5px" }}>
      <FlexBetween
        sx={{
          justifyContent: "flex-start",
        }}
      >{picturePath&&
        
        <Avatar
          src={`http://localhost:3001/assets/${picturePath}`}
          alt={name + " display picture"}
        />
      }
        <FlexBetween sx={{ width: "70%" }}>
          <Box sx={{ paddingLeft: "20px", paddingTop: "unset" }}>
            <Box>
              <Typography style={{ margin: 0, textAlign: "left" }}>
                {name}
              </Typography>
              <Typography style={{ textAlign: "left" }}>
                {comment.comment}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ marginLeft: "auto" }}>
            <Typography>{comment.votes}</Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>
      <FlexBetween sx={{ padding: "5px 0px" }} id={comment._id}>
        <a
          className={`up`}
          onClick={updateVote}
          style={{ textAlign: "left", color: `${up ? "green" : "gray"}` }}
        >
          Upvote
        </a>
        <a
          className={`down`}
          onClick={updateVote}
          style={{ textAlign: "left", color: `${down ? "red" : "gray"}` }}
        >
          Downvote
        </a>
        <a style={{ textAlign: "left", color: "gray" }} onClick={showInputBlock}>Reply</a>
        
        <a style={{ textAlign: "left", color: "gray" }} onClick={showReplies} >View replies</a>
        
      </FlexBetween>
      {reply&&
      <FlexBetween sx={{backgroundColor:"#CDCDCD",
      borderRadius:"2px"}}>
        <InputBase  id={comment._id}
              name="reply"
              type="text"
              placeholder={replyText ? replyText : "reply"}
              onChange={handleReplyChange}
              value={replyText}></InputBase>
        <ButtonBase>
              <Button  type="submit" onClick={handleReplySubmit}>Reply</Button>
            </ButtonBase>
      </FlexBetween>
}
{viewReplies&&
comments && comments.filter(reply=>(reply.commentReference===comment._id)).map((reply, index) => (
  <div key={index}>
    <Comment comment={reply} comments={comments} postId={postId} setComments={setComments} />
  </div>
))
}
    </Paper>
  );
};

export default Comment;
