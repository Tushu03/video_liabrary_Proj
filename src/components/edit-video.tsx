import { useNavigate, useParams } from "react-router-dom";
//import { useCookies } from "react-cookie";
import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button,FormControl,InputLabel,Select,MenuItem } from "@mui/material";
import { motion } from "framer-motion";
//import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CategoriesContract } from "../contracts/categories";
import { VideosContract } from "../contracts/videos";
import {toast} from "react-toastify"
export function EditVideo() {

    const [videos, setVideos] = useState<VideosContract>();

    let params = useParams();



    const [categories, setCategories] = useState<CategoriesContract[]>();

    let navigate = useNavigate();



    useEffect(() => {
        axios.get('http://127.0.0.1:5050/categories').then(response => {
            response.data.unshift({ category_id: -1, category_name: "Select Category..." });
            setCategories(response.data);
        });

        axios.get(`http://127.0.0.1:5050/videos/${params.id}`).then(response => {
            setVideos(response.data);
        });
    }, []);

    let formik = useFormik({
        initialValues: {
            video_id: videos?.video_id,
            title: videos?.title,
            description: videos?.description,
            url: videos?.url,
            likes: videos?.likes,
            dislikes: videos?.dislikes,
            views: videos?.views,
            category_id: videos?.category_id,


        },
        onSubmit: (video) => {
            axios.put(`http://127.0.0.1:5050/edit-video/${params.id}`, video)
            toast.success("Video Updated")
            navigate("/admindash")

        },
        enableReinitialize: true

    })



    return (
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit}>
                <motion.div
                    className="container mx-auto w-50 bg-light text-dark"
                    style={{ height: "630px", boxShadow: "4px 4px 4px 4px gray", borderRadius: '10px' }}
                    initial={{ opacity: 0, y: -50 }}  // Start position
                    animate={{ opacity: 1, y: 0 }}    // End position
                    transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
                >

                    <h1 className="text-center bi bi-camera-fill"> Edit Video</h1>
                    <TextField label="Enter Video Id" value={formik.values.video_id} onChange={formik.handleChange} className="ms-2 my-1" name="video_id" variant="outlined" required autoFocus  InputLabelProps={{ shrink: true }} InputProps={{readOnly:true}} /><br></br>
                    <TextField label="Enter Video Title" value={formik.values.title} onChange={formik.handleChange} className="ms-2 my-1" name="title" variant="outlined" required autoFocus InputLabelProps={{ shrink: true }} /><br></br>
                    <TextField label="Enter Video Description" value={formik.values.description} onChange={formik.handleChange} className="ms-2 my-1" name="description" variant="outlined" required InputLabelProps={{ shrink: true }} /><br></br>
                    <TextField label="Enter Video Link" type="url" value={formik.values.url} onChange={formik.handleChange} className="ms-2 my-1" name="url" variant="outlined" required InputLabelProps={{ shrink: true }} /><br></br>
                    <TextField label="Enter Likes" type="number" value={formik.values.likes} onChange={formik.handleChange} className="ms-2 my-1" name="likes" variant="outlined" required InputLabelProps={{ shrink: true }} /><br></br>
                    <TextField label="Enter Dislikes" type="number" value={formik.values.dislikes} onChange={formik.handleChange} className="ms-2 my-1" name="dislikes" variant="outlined" required InputLabelProps={{ shrink: true }} /><br></br>
                    <TextField label="Enter Views" type="number" value={formik.values.views} onChange={formik.handleChange} className="ms-2 my-1" name="views" variant="outlined" required InputLabelProps={{ shrink: true }} /><br></br>

                    <FormControl className="ms-1 my-1" style={{width:"217px"}}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            name="category_id"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.category_id}
                            label="Select Category"
                            onChange={formik.handleChange}
                        >
                            {
                                categories?.map(category =>
                                    <MenuItem key={category.category_id} value={category.category_id}>{category.category_name}</MenuItem>
                                )
                            }
                           
                        </Select>
                    </FormControl>

                    
                    <div className="mx-auto text-center">
                        <Button variant="contained" className="mx-2" color="primary" type="submit">Save</Button>
                        <Button variant="contained" color="error" onClick={()=>navigate("/admindash")} >Cancel</Button>



                    </div>







                </motion.div>


            </form>


        </div>
    )
}