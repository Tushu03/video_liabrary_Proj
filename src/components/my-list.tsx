//import store from "../store/store";
import{motion} from"framer-motion";

import Card from '@mui/material/Card';
import { Button, IconButton } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
//import { video } from "framer-motion/client";
//import axios from "axios";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useCookies } from "react-cookie";
import { useState,useEffect } from "react";
import { VideosContract } from "../contracts/videos";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
export function MyList()
{
    //const videos=store.getState().videos;
    //const totalCount=store.getState().videosCount;

    const[cookies]=useCookies(['username'])

    const [videos, setVideos] = useState<VideosContract[]>();

    useEffect(() => {
        axios.get(`http://127.0.0.1:5050/watch-later/${cookies['username']}`).then(response => {
            setVideos(response.data);
        });
    }, [videos]);

    function handleRemove(video_id:number)
    {
        axios.delete(`http://127.0.0.1:5050/remove-video`,{data:{username:cookies['username'],video_id:video_id}})
        .then(()=>
            {
                setVideos(prev =>
                    prev?.filter( (video) => video.video_id!==video_id)

                )
                toast.error("Video Removed")

            }
        )
       
    }


    return(
        <div className="container-fluid">
            <motion.div
                className="container mx-auto w-75 bg-light text-black border border-2 border-primary"
                style={{ maxHeight: "80vh", overflowY: "auto", boxShadow: "4px 4px 4px 4px gray", borderRadius: '10px' }}
                initial={{ opacity: 0, y: -50 }}  // Start position (faded out & above)
                animate={{ opacity: 1, y: 0 }}    // End position (fades in & moves down)
                transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
            >
                <div className="d-flex justify-content-between">
                <h2 className="text-center my-2">Welcome {cookies['username']} Your List </h2>
                <Button className="my-2" variant="contained" color="error"><Link to="/userdash" className="btn">Back To Home</Link></Button>

                </div>
               
            <div className="d-flex flex-wrap px-2">
                {
                    

                    videos?.map(
                        (video:any)=>
                            <Card sx={{ maxWidth: 350 }} key={video.video_id} className="mx-2 my-1 rounded rounded-2 mt-4" style={{ boxShadow: "1px 2px 1px 3px gray solid" }}>
                                <iframe src={video.url} width="100%" height="200">



                                </iframe>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {video.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {video.description}
                                    </Typography>
                                </CardContent>
                                <CardActions className="d-flex justify-content-between">
                                    <div>
                                        <IconButton aria-label="like" color="primary">
                                            <ThumbUpIcon />
                                        </IconButton>
                                        {
                                            video.likes
                                        }
                                        <IconButton aria-label="dislike" color="secondary">
                                            <ThumbDownIcon />
                                        </IconButton>
                                        {
                                            video.dislikes
                                        }
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <VisibilityIcon fontSize="small" />
                                        <Typography variant="body2" className="ms-1" >
                                            {video.views || 0}
                                        </Typography>
                                    </div>
                                </CardActions>
                                <CardActions>
                                    <Button color="error" variant="contained" className="bi bi-trash-fill" onClick={()=>handleRemove(video.video_id)}> Remove</Button>

                                    

                                </CardActions>
                            </Card>


                        
                    )
                    
                }
            </div>
            </motion.div>
        </div>
    )


}
