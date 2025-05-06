
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import '../App.css';
import { Home } from './Home';
import { Login } from './admin-login';
import { UserLogin } from './user-login';
import { UserDash } from './User-dash';
import { AdminDash } from './admin-dash';
import { AddVideo } from './add-video';
import { EditVideo } from './edit-video';
import { Register } from './register-user';
import { Delete } from './delete-video';
import { MyList } from './my-list';
export function Index() {
    return (
        <BrowserRouter>
            <div className='container-fluid'>
                <div className="bg-image">



                </div>
                <div className="d-flex justify-content-center align-items-center bg-light text-dark w-25 mx-auto text-center" style={{ height: '50px' }}>
                    <Link to="/" className="btn btn-light text-dark w-100 bi bi-house bg-light border border-2 border-primary"> Home</Link>
                    


                </div> 
                <section className=' p-2'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path='/userlogin' element={<UserLogin/>}/>
                        <Route path="/userdash" element={<UserDash />} />
                        <Route path='/admindash' element={<AdminDash/>}/>
                        <Route path="/addvideo" element={<AddVideo />} />
                        <Route path='/edit-video/:id' element={<EditVideo/>}/>
                        <Route path="/register" element={<Register />} />
                        <Route path='/userlogin' element={<UserLogin/>}/>
                        <Route path='/delete-video/:id' element={<Delete/>}/>
                        <Route path='/my-list' element={<MyList/>}/>

                        

                    </Routes>

                </section>


            </div>

        </BrowserRouter>



    )
}