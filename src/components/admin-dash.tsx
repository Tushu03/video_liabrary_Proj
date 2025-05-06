
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import axios from "axios";
//import { TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { VideosContract } from "../contracts/videos";

export function AdminDash() {
    const [cokkies, setCookies, removeCookies] = useCookies(['admin_id'])
    const[videos,setVideos]=useState<VideosContract[]>();

    useEffect(()=>{
        axios.get('http://127.0.0.1:5050/videos')
        .then(response=>{
            setVideos(response.data);
        })
    })

    let navigate = useNavigate();

   

    




    return (
        <div className="container-fluid">
            <motion.div
                className="container mx-auto w-75 bg-light text-black border border-2 border-primary"
                style={{ maxHeight: "80vh", overflowY: "auto", boxShadow: "4px 4px 4px 4px gray", borderRadius: '10px' }}
                initial={{ opacity: 0, y: -50 }}  // Start position (faded out & above)
                animate={{ opacity: 1, y: 0 }}    // End position (fades in & moves down)
                transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
            >
                <div className="d-flex justify-content-between">
                    <h2>Welcome {cokkies.admin_id}</h2>
                    <div className="mt-2">
                        <Link to='/addvideo' className="btn btn-primary mt-1 mx-2 bi bi-camera-fill"> Add Video </Link>
                        <button onClick={() => {
                            removeCookies('admin_id');
                            
                            navigate('/');


                        }} className="btn btn-danger bi bi-person"> Logout</button>
                    </div>

                </div>
                <h4 className='text-center mt-3'>Uploded Videos</h4>
                <div>
                    <table className={`table caption-top table-hover`}>
                        <caption>Your Videos</caption>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th className="bi bi-eye-fill">Preview</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                videos?.map(video=>
                                    <tr key={video.video_id}>
                                        <td>{video.title}</td>
                                        <td><iframe src={video.url} width={300} height={170}></iframe></td>
                                        <td>
                                            <Link to={`/edit-video/${video.video_id}`} className="btn btn-warning bi bi-pen-fill mx-2"></Link>
                                            <Link to={`/delete-video/${video.video_id}`} className="btn btn-danger bi bi-trash-fill"></Link>
                                        </td>

                                    </tr>
                                    
                                )
                            }


                        </tbody>
                    </table>


                </div>


            </motion.div>




        </div>)
}