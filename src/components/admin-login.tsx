
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";
import axios from "axios";
import { TextField,Button} from "@mui/material";
import { motion } from "framer-motion";
import {toast} from "react-toastify"
//import { Link } from "react-router-dom";
export function Login()
{
    const [cokkies,setCookies,removeCookies] = useCookies(['admin_id']);
    let navigate=useNavigate();
    

    let formik=useFormik(
        {
            initialValues: {
                admin_id: '',
                password: ''
            },
            onSubmit: (values) => 
            {
                axios.get(`http://127.0.0.1:5050/admin`)
                .then(response =>
                {
                    let userDeatails=response.data.find((admin:any) => admin.admin_id===parseInt(values.admin_id))
                    if(userDeatails)
                    {
                        if(userDeatails.password===values.password)
                        {
                            
                            setCookies('admin_id', values.admin_id, { expires: new Date(Date.now() + 60 * 60 * 1000) }) // Expires after 1 hour
                            navigate('/admindash');
                           
                            
                        }
                        else
                        {
                            toast.error("Invalid Passoword")
                        }
                    }
                    else{
                        toast.error("Admin Not Found")
                        
    
                    }
                        
                    

                }
                )
                
            }
        }
    )

    return (
        <div className="container-fluid">
            <motion.div
                className="container mx-auto w-25 bg-light text-dark"
                style={{ height: "250px", boxShadow: "4px 4px 4px 4px gray", borderRadius:'10px'}}
                initial={{ opacity: 0, y: -50 }}  // Start position
                animate={{ opacity: 1, y: 0 }}    // End position
                transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
            >
                <form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center bi bi-person-fill"> Login </h1>
                    <TextField label="Enter Admin Id" fullWidth onChange={formik.handleChange} name="admin_id" variant="standard" required autoFocus />
                    <TextField label="Enter Password" fullWidth  onChange={formik.handleChange} type="password" name="password" variant="standard" required /><br />
                    <Button type="submit" variant="contained" fullWidth color="success" className="mt-4 mb-1">Login
                        
                    </Button><br/>
                    

                </form>

            </motion.div>
        </div>
    )
}