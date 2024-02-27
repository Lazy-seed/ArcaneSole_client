import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaBagShopping } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { IoBagOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import profile from '../assets/img/profie.jpg';
import shoe from './shoe.png';
import { BaseURL } from '../urls';


export default function Navbar ({ IsLogin }) {


    const [LoginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const [SignupData, setSignupData] = useState({
        fname: '',
        email: '',
        password: ''
    })

    return (

        <div className=' d-flex justify-content-center justify-content-lg-between   align-items-center px-5 position-relative bg-black text-white' style={{ height: '80px' }} >
            <Link to='/' className='d-flex align-items-center '>
                <img src={logo} alt="" width={100} />
                <h1 className='fs-1 fw-bolder'>ArcaneSole</h1>
            </Link>




            {/* logins button */}
            {
                IsLogin ?
                    <div className='d-none d-lg-flex gap-3 align-items-center '>
                        <Link to='/liked' > <GoHeartFill className='fs-3 ' /></Link>
                        <Link to='/bag' > <FaBagShopping className='fs-3 ' /></Link>
                        <Link to='/Profile/edit' > <img src={profile} alt="" width={50} /></Link>
                    </div>
                    :
                    <div className='d-none d-lg-flex'>
                        <span className=' fw-bold me-5' data-bs-toggle="modal" data-bs-target="#loginModel" style={{ cursor: "pointer" }}>Login</span>
                        <span className='btn btn-light fw-bold' data-bs-toggle="modal" data-bs-target="#signupModel" style={{ cursor: "pointer" }}>Signup</span>
                    </div>
            }


            {/* top menu  */}
            <div className=' d-none d-lg-flex gap-5 position-absolute  start-50 translate-middle-x glass text-white px-5 py-2 rounded-5' style={{ zIndex: "99" }} >
                <Link to='/' className='m-0'>Home</Link>
                <Link to='/browse/all/1' className='m-0'>Browse</Link>
                <Link to='/search' className='m-0'>Search</Link>
            </div>




            {/* login form */}
            <div className="modal  fade text-black" id="loginModel" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            <h1 className="fw-bold mb-0 fs-2">Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-5 pt-0">
                            <form className="">
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control rounded-3" id="floatingInput1" placeholder="name@example.com" onChange={(e) => { setLoginData({ ...LoginData, email: e.target.value }) }} />
                                    <label htmlFor="floatingInput1">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control rounded-3" id="floatingPassword1" placeholder="Password" onChange={(e) => { setLoginData({ ...LoginData, password: e.target.value }) }} />
                                    <label htmlFor="floatingPassword1">Password</label>
                                </div>
                                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" onClick={login_fun}>Login</button>
                                <small className="text-body-secondary" data-bs-toggle="modal" data-bs-target="#signupModel" style={{ cursor: "pointer" }}>Don't have an account? Signup</small>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade text-black" id="signupModel" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            <h1 className="fw-bold mb-0 fs-2">Sign up for free</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-5 pt-0">
                            <form className="">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control rounded-3" id="" placeholder="lisa" onChange={(e) => { setSignupData({ ...SignupData, fname: e.target.value }) }} />
                                    <label htmlFor="floatingInput2">First Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control rounded-3" id="floatingInput2" placeholder="name@example.com" onChange={(e) => { setSignupData({ ...SignupData, email: e.target.value }) }} />
                                    <label htmlFor="floatingInput2">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control rounded-3" id="floatingPassword2" placeholder="Password" onChange={(e) => { setSignupData({ ...SignupData, password: e.target.value }) }} />
                                    <label htmlFor="floatingPassword2">Password</label>
                                </div>
                            </form>
                            <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" onClick={register}>Sign up</button>
                            <small className="text-body-secondary" data-bs-toggle="modal" data-bs-target="#loginModel" style={{ cursor: "pointer" }}>Already have an account? Login</small>
                        </div>
                    </div>
                </div>
            </div>


            {/* bottom nav */}
            <div className='border bg-white border-top fixed-bottom py-2 text-black d-block d-lg-none' >


                {
                    IsLogin ?
                        <div className='d-flex  justify-content-around  '>
                            <Link to="/browse/all/1" className='d-flex flex-column  justify-content-end align-items-center '>
                                <img src={shoe} alt="" width={32} />
                                <h6 className='m-0 p-0 ' style={{ fontSize: "12px" }}>Borwse</h6>
                            </Link>

                            <Link to="/bag" className='d-flex flex-column  justify-content-end align-items-center '>
                                <IoBagOutline size={22} />
                                <h6 className='m-0 p-0 ' style={{ fontSize: "12px" }}>Cart</h6>
                            </Link>
                            <Link to="/search" className='d-flex flex-column  justify-content-end align-items-center '>
                                <CiSearch size={22} />
                                <h6 className='m-0 p-0 ' style={{ fontSize: "12px" }}>Search</h6>
                            </Link>
                            <Link to="/liked" className='d-flex flex-column  justify-content-end align-items-center '>
                                <GoHeartFill size={22} />
                                <h6 className='m-0 p-0 ' style={{ fontSize: "12px" }}>Liked</h6>
                            </Link>
                            <Link to="/Profile/edit" className='d-flex flex-column  justify-content-end align-items-center '>
                                <CgProfile size={22} />
                                <h6 className='m-0 p-0 ' style={{ fontSize: "12px" }}>Account</h6>
                            </Link>
                        </div>
                        :
                        <div className='d-flex  justify-content-around  '>
                            <Link to="/" className='d-flex flex-column  justify-content-end align-items-center '>
                                <img src={shoe} alt="" width={32} />
                                <h6 className='m-0 p-0 ' style={{ fontSize: "12px" }}>Borwse</h6>
                            </Link>
                            <div className='d-flex flex-column  justify-content-end align-items-center ' data-bs-toggle="modal" data-bs-target="#loginModel">
                                <IoBagOutline size={22} />
                                <h6 className='m-0 p-0 ' style={{ fontSize: "12px" }}>Cart</h6>
                            </div>
                            <div className='d-flex flex-column  justify-content-end align-items-center ' data-bs-toggle="modal" data-bs-target="#loginModel">
                                <CiSearch size={22} />
                                <h6 className='m-0 p-0 ' style={{ fontSize: "12px" }}>Search</h6>
                            </div>
                            <div to="/" className='d-flex flex-column  justify-content-end align-items-center ' data-bs-toggle="modal" data-bs-target="#loginModel">
                                <GoHeartFill size={22} />
                                <h6 className='m-0 p-0 ' style={{ fontSize: "12px" }}>Liked</h6>
                            </div>
                            <div to="/" className='d-flex flex-column  justify-content-end align-items-center ' data-bs-toggle="modal" data-bs-target="#loginModel">
                                <CgProfile size={22} />
                                <h6 className='m-0 p-0 ' style={{ fontSize: "12px" }}>Account</h6>
                            </div>
                        </div>
                }


            </div>
        </div>
    )


    // login
    function login_fun(e) {
        e.preventDefault()

        const email = LoginData.email
        const password = LoginData.password
        if (email.trim() === '' || password.trim() === '') {
            toast.error("All fileds required", {
                style: {
                    color: '#fff',
                    background: "red"
                },
            })
            return null;
        }
        const data = { email, password }

        axios.post(`${BaseURL}/api/login`, data, { withCredentials: true }).then((response) => {
            console.log(response.data.success);
            console.log(response.data);

            if (response.data.success === false) {
                toast.error("Invalid Credentials")

            } else {
                toast.success("Login success")
                window.location.reload()
            }
        }).catch((err) => {
            console.log(err);
            toast.error(err)

        })

    }


    function register(params) {
        const fname = SignupData.fname
        const email = SignupData.email
        const password = SignupData.password

        if (fname.trim() === '' || email.trim() === '' || password.trim() === '') {
            toast.error("All Fields Required")

            return null;
        }


        const data = { fname, email, password }


        axios.post(`${BaseURL}/api/newUser`, data, { withCredentials: true }).then((response) => {
            console.log(response);
            toast.success("Account has created , now you can login")

        }).catch((err) => {
            console.log(err);
            toast.error(err.response.data.msg)
        })



    }
}
