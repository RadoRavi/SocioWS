import { useEffect } from "react"
import {CardMedia} from "@mui/material";
import { useState } from "react";

const Image = ({picturePath})=>{

    // const [image,setImage] = useState(null)
    // const fetchImage=async()=>{
    //     const imageFile = await fetch(`http://localhost:3001/assets/${picturePath}`)
    //     const imageBlob = await imageFile.blob();
    //     setImage(imageBlob)
    //     console.log(imageFile)
    //     console.log(imageBlob)
    // }

    // useEffect(()=>fetchImage(picturePath),[picturePath])


    return(
        <img
            style={{objectFit:"cover",
          overflow:"hidden"}}
            width="100%"
              src={`http://localhost:3001/assets/${picturePath}`}
              alt="Contemplative Reptile"
            />
    )
}
export default Image