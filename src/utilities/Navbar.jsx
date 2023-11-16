import React, { useEffect, useState } from 'react'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'
import { GoHeartFill } from "react-icons/go";
import { FaBagShopping } from "react-icons/fa6";
import profile from '../assets/img/profie.jpg'
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function ({ IsLogin }) {



    const [LoginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    return (

        <div className=' d-flex justify-content-between  align-items-center px-5 position-relative bg-black text-white' style={{ height: '80px' }} >
            <Link to='/' className='d-flex align-items-center '>
                <img src={logo} alt="" width={100} />
                <h1 className='fw-bolder'>ArcaneSole</h1>
            </Link>





            {
                IsLogin ?
                    <div className='d-flex gap-3 align-items-center '>
                        <Link to='/liked' > <GoHeartFill className='fs-3 ' /></Link>
                        <Link to='/bag' > <FaBagShopping className='fs-3 ' /></Link>
                        <Link to='/Profile/edit' > <img src={profile} alt="" width={50} /></Link>
                    </div>
                    :
                    <div>
                        <span className=' cursor-pointer fw-bold me-5' data-bs-toggle="modal" data-bs-target="#loginModel">Login</span>
                        <span className='btn btn-light fw-bold' data-bs-toggle="modal" data-bs-target="#signupModel">Signup</span>
                    </div>
            }



            <div className='d-flex gap-5 position-absolute  start-50 translate-middle-x glass text-white px-5 py-2 rounded-5' style={{ zIndex: "99" }} >
                <Link to='/' className='m-0'>Home</Link>
                <Link to='/browse/all' className='m-0'>Browse</Link>
                <Link to='/search' className='m-0'>Search</Link>
            </div>





            <div class="modal  fade text-black" id="loginModel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content rounded-4 shadow">
                        <div class="modal-header p-5 pb-4 border-bottom-0">
                            <h1 class="fw-bold mb-0 fs-2">Login</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-5 pt-0">
                            <form class="">
                                <div class="form-floating mb-3">
                                    <input type="email" class="form-control rounded-3" id="floatingInput" placeholder="name@example.com" onChange={(e) => { setLoginData({ ...LoginData, email: e.target.value }) }} />
                                    <label for="floatingInput">Email address</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Password" onChange={(e) => { setLoginData({ ...LoginData, password: e.target.value }) }} />
                                    <label for="floatingPassword">Password</label>
                                </div>
                                <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" onClick={login_fun}>Login</button>
                                <small class="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade text-black" id="signupModel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content rounded-4 shadow">
                        <div class="modal-header p-5 pb-4 border-bottom-0">
                            <h1 class="fw-bold mb-0 fs-2">Sign up for free</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-5 pt-0">
                            <form class="">
                                <div class="form-floating mb-3">
                                    <input type="email" class="form-control rounded-3" id="floatingInput" placeholder="lisa" />
                                    <label for="floatingInput">First Name</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="email" class="form-control rounded-3" id="floatingInput" placeholder="name@example.com" />
                                    <label for="floatingInput">Email address</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Password" />
                                    <label for="floatingPassword">Password</label>
                                </div>
                                <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Sign up</button>
                                <small class="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
                            </form>
                        </div>
                    </div>
                </div>
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

        axios.post('http://localhost:8000/api/login', data, { withCredentials: true }).then((response) => {
            console.log(response.data.success);

            if (response.data.success === false) {
                toast.error("Invalid Credentials")

            } else {
                toast.success("Login success")

                window.location.reload();

            }
        }).catch((err) => {
            console.log(err);
            toast.error(err)

        })

    }
}
