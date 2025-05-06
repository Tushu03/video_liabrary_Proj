import { useEffect, useState } from "react"
import { VideosContract } from "../contracts/videos"
import { useCookies } from "react-cookie";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";


//import { addtoSaveLater } from "../slicers/slicer";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
//import { video } from "framer-motion/client";
import axios from "axios";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Comments } from "./comments";
import { toast } from "react-toastify";
//import { useDispatch } from "react-redux";



export function UserDash() {
    const [videos, setVideos] = useState<VideosContract[]>();
    const [searchTerm, setSearchTerm] = useState<string>();
    const [search, setSearch] = useState<string>();
    const [likedVideos,setLikedVideos]=useState<number[]>([]);
    const [dislikedVideos,setDislikedVideos]=useState<number[]>([]);




    const [cookies,, removeCookies] = useCookies(['username']);



    function handlePlay(video_id:number)
    {
        console.log("fired")
       

        axios.post("http://127.0.0.1:5050/videos/views",{video_id:video_id})
        .then(()=>{
            setVideos(prev =>
                prev?.map(v => v.video_id === video_id ?{...v,views:v.views+1}:v)
            )
        })

    }

    let navigate = useNavigate();
    //let dispatch = useDispatch();


    function handleLogout() {
        removeCookies('username')
        navigate("/")

    }

    function handleLike(video_id: number) {
        const hasLiked=likedVideos?.includes(video_id);


        axios.post("http://127.0.0.1:5050/videos/likes", { video_id: video_id,username:cookies['username'],action:hasLiked ? "unliked" :"like" })
            .then(() => {
                setVideos(prev =>
                    prev?.map(v => v.video_id === video_id ? { ...v, likes: v.likes + (hasLiked?-1:1) } : v
                        //v.video_id === videoId ? { ...v, likes: v.likes + 1 } : v
                    )
                );
                setLikedVideos(prev =>
                    hasLiked
                        ? prev?.filter(id => id !== video_id)
                        : [...prev ,video_id]
                );
            })

           

    }



    function AddToWatchLater(video: VideosContract) {
        // dispatch(addtoSaveLater(video))
        // alert("added to watch later")

        axios.post("http://127.0.0.1:5050/watch-later", {
            username: cookies['username'],
            video: video
        }).then(() => {
            toast.success("Added To Watch Later")
        });



    }

    function handleDislike(video_id: number) {
        const hasDisliked = dislikedVideos?.includes(video_id);
        axios.post("http://127.0.0.1:5050/videos/dislikes", { video_id: video_id,username:cookies['username'],action: hasDisliked?"disliked":"unlike" })

            .then(() => {
                setVideos(prev =>
                    prev?.map(v => v.video_id === video_id ? { ...v, dislikes: v.dislikes + (hasDisliked? -1 : 1) } : v)

                );
                setDislikedVideos(prev =>
                    hasDisliked
                        ? prev?.filter(id => id !== video_id)
                        : [...prev ,video_id]
                );


            })
            
    }


    function handleSearch(e: any) {
        setSearchTerm(e.target.value)
        //console.log(searchTerm)

    }

    function handleClick() {
        if (searchTerm?.trim()) {
            console.log("Search Clicked "+searchTerm)
            setSearch(searchTerm.trim());
        }
    }

    function handleMyList() {
        navigate("/my-list")


    }

    useEffect(() => {
        if (search) {
            console.log(search)
            axios.get(`http://127.0.0.1:5050/videos/category/${search}`)
                .then(response => {
                    const data = response.data;
                    console.log(data)
                    if (Array.isArray(data)) {
                        setVideos(data.filter(v => v.video_id !== null));
                    }
                    else {
                        setVideos([response.data]);

                    }


                })


        }
        else {
            axios.get("http://127.0.0.1:5050/videos")
                .then(response => {
                    setVideos(response.data);
                })


        }

    }, [search])

    return (
        <div className="container-fluid  border border-2 border-primary bg-light ">
            <div className="d-flex justify-content-between mt-2">
                <div className="d-flex">
                    <h2 className="text-center mx-2">Welcome {cookies['username']}</h2>
                    <Button variant="outlined" color="success" className="bi bi-plus" onClick={handleMyList}> My List</Button>




                </div>

                <div className="input-group w-25 mt-2">
                    <input type="text" name="search" onChange={handleSearch} className="form-control" placeholder="Search Videos By Category" /><button className="btn btn-warning bi bi-search" onClick={handleClick}></button>
                </div>

                <Button variant="contained" color="error" className="bi bi-person" onClick={handleLogout}> Logout </Button>

            </div>
            <div className="d-flex flex-wrap px-2">
                {
                    videos?.map(
                        (video: any) =>
                            <Card sx={{ maxWidth: 350 }} key={video.video_id} className="mx-2 my-1 rounded rounded-2 mt-4" style={{ boxShadow: "1px  2px gray" }}>
                                <div
                                  
                                >
                                    <iframe onClick={() => handlePlay(video.video_id)} src={video.url} width="100%" height="200"   />


                                </div>
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
                                        <IconButton aria-label="like" color="primary" onClick={() => handleLike(video.video_id)}>
                                            <ThumbUpIcon />
                                        </IconButton>
                                        {
                                            video.likes
                                        }
                                        <IconButton aria-label="dislike" color="secondary" onClick={() => handleDislike(video.video_id)} >
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
                                    <Button
                                        variant="contained"
                                        color="success"

                                        onClick={() => { AddToWatchLater(video) }}

                                        startIcon={<WatchLaterIcon />}

                                    >
                                        Watch Later
                                    </Button>
                                </CardActions>
                                <CardActions>
                                <Comments video_id={video.video_id} />
                                </CardActions>
                            </Card>


                    )


                }
            </div>


        </div>
    )
}