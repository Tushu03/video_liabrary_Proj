import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CategoriesContract } from "../contracts/categories";
import {toast} from "react-toastify"
export function AddVideo() {
    const [categories, setCategories] = useState<CategoriesContract[]>();

    let navigate=useNavigate();

    function LoadCategories() {
        axios.get('http://127.0.0.1:5050/categories')
            .then(response => {
                response.data.unshift({ category_id: -1, category_name: "Select Category..." })
                setCategories(response.data);
            })
    }

    useEffect(() => {
        LoadCategories();
    })

    let formik=useFormik({
        initialValues: {
            video_id:0,
            title: "",
            description: "",
            url:"",        
            likes:0,
            dislikes:0,
            views:0,
            category_id:0,           


        },
        onSubmit :(video)=>{
            axios.post('http://127.0.0.1:5050/add-video',video)
            toast.success("Video Added")
            navigate("/admindash")
            
        }
    })



    return (
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit}>
                <motion.div
                    className="container mx-auto w-50 bg-light text-dark"
                    style={{ height: "500px", boxShadow: "4px 4px 4px 4px gray", borderRadius: '10px' }}
                    initial={{ opacity: 0, y: -50 }}  // Start position
                    animate={{ opacity: 1, y: 0 }}    // End position
                    transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
                >

                    <h1 className="text-center bi bi-camera-fill"> Add Video</h1>
                    <TextField label="Enter Video Id" onChange={formik.handleChange} className="ms-2" name="video_id" variant="standard" required autoFocus /><br></br>
                    <TextField label="Enter Video Title"  onChange={formik.handleChange} className="ms-2" name="title" variant="standard" required autoFocus /><br></br>
                    <TextField label="Enter Video Description" onChange={formik.handleChange} className="ms-2" name="description" variant="standard" required /><br></br>
                    <TextField label="Enter Video Link" type="url" onChange={formik.handleChange} className="ms-2" name="url" variant="standard" required /><br></br>
                    <TextField label="Enter Likes" type="number" onChange={formik.handleChange} className="ms-2" name="likes" variant="standard" required /><br></br>
                    <TextField label="Enter Dislikes" type="number" onChange={formik.handleChange} className="ms-2" name="dislikes" variant="standard" required /><br></br>
                    <TextField label="Enter Views" type="number" onChange={formik.handleChange} className="ms-2" name="views" variant="standard" required /><br></br>
                    <select name="category_id" className="form-control w-25"  onChange={formik.handleChange}>

                        {
                            categories?.map(category =>
                                <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                            )
                        }


                    </select>
                    <div className="mx-auto text-center">
                        <Button variant="contained" className="mx-2" color="primary" type="submit"> Add Video</Button>
                        <Button variant="contained" color="error" ><Link to="/admindash" className="btn">Cancel</Link></Button>



                    </div>







                </motion.div>


            </form>


        </div>
    )
}