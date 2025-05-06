import { Button } from "@mui/material"
import { Link } from "react-router-dom"
export function Home()
{
    return(
        <div className="container-fluid">
        <div className="card w-50 align-items-center justify-content-center mx-auto bg-light text-dark" style={{boxShadow:'5px 5px 5px gray',height:'100px'}}>
            <div className="card-body">
                <h5 className="card-title text-center">Welcome to VideosTv Liabrary</h5>
                
                <Button variant="contained" color="warning"  className="mx-3 ms-3 mt-2"><Link to='/userlogin' className="btn"> User Login</Link></Button>

                <Button variant="contained" color="success" className=" mt-2 " ><Link to='/login' className="btn">Admin LOGIN</Link></Button>
                
            </div>


        </div>
        

    </div>
    )
}