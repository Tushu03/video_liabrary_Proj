import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { VideosContract } from "../contracts/videos";
import { motion } from "framer-motion";
import {toast} from "react-toastify"

export function Delete() {
    const [video, setVideo] = useState<VideosContract>();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:5050/videos/${params.id}`)
            .then(response => setVideo(response.data));
    }, []);

    function handleDelete() {
        axios.delete(`http://127.0.0.1:5050/delete-video/${params.id}`)
            .then(() => {
                toast.error("Video Deleted")
                navigate("/admindash");
            });
    }

    return (
        <motion.div
            className="container mx-auto w-50 bg-light text-black"
            style={{ padding: '20px', boxShadow: "4px 4px 4px 4px gray", borderRadius: '10px', marginTop: '100px' }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="alert alert-danger alert-dismissible text-center">
                <h1>Delete Record</h1>
                <p>
                    Are you sure you want to delete this record?<br />
                    <strong>{video?.title}</strong><br />
                    {video?.description}
                </p>
                <button className="btn btn-danger mx-2" onClick={handleDelete}>Yes</button>
                <Link to='/admindash' className="btn btn-warning">Cancel</Link>
            </div>
        </motion.div>
    );
}
