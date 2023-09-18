import { Box ,Avatar, Typography} from "@mui/material"
import FlexBetween from "./FlexBetween"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const UserSnapShot = ({user})=>{

    console.log("snapshot _____________")
    console.log(user&&user.picturePath)
    return (
        <Box  sx={{
            
            maxWidth: "100%",
            height: "auto",
            padding:"8px",
            margin:"20px 0px 20px 0px",
            borderRadius:"10px",
            border:"4px solid #ffc30f"
          }}>
            <FlexBetween>
            <div>
            <Avatar sx={{margin:"auto"}}alt="profile pic" src={`http://localhost:3001/assets/${user&&user.picturePath}`} />
            </div>
            <div>
            <Typography> {user&&(user.firstName+" "+user.lastName)}</Typography>
            <Typography>{user&&user.location}</Typography>
           
            </div>
            <div>
            <Typography>{user&&user.viewedProfile+" "+"profile views"}</Typography>
            <Typography>{user&&user.impressions+" "+"impressions"}</Typography>
            </div>
            </FlexBetween>
        </Box>
    )
}
export default UserSnapShot