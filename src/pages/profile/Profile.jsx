import React, { useEffect, useState } from 'react'
import './profile.scss';
import profile from './profie.jpg';
import { CgProfile } from "react-icons/cg";
import { TbTruckDelivery } from "react-icons/tb";
import { BiHelpCircle } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
    useEffect(() => {

        axios.get('http://localhost:8000/api/userInfo', { withCredentials: true }).then((response) => {
            console.log(response.data);
            setUserInfo(response.data.userInfo)
        })
    }, [])

    const [UserInfo, setUserInfo] = useState('')


    if (UserInfo === '') {
        return null;
    }
    return (
        <div className='profile'>


            {/* left------------------------------------------------------------- */}
            <div className="left">


                <div className="menu">
                    <ul>
                        <li>
                            <img src={profile} alt="" />
                            <div id="info">
                                <h3>{UserInfo.fname} {UserInfo.lname}</h3>
                                <h4>{UserInfo.email}</h4>
                            </div>
                        </li>
                        <hr />
                        <li>
                            <Link to='/Profile/edit'> <CgProfile id='icon' /> <h2>Edit Profile</h2></Link>
                        </li>
                        <li>
                            <Link to='/Profile/order'><TbTruckDelivery id='icon' /> <h2>Orders</h2></Link>
                        </li>
                        <li>
                            <BiHelpCircle id='icon' /> <h2>Help</h2>
                        </li>
                        <hr />
                        <li onClick={Logout} id='logout_btn'>
                            <BiLogOut id='icon' /> <h2>Logout</h2>
                        </li>
                    </ul>
                </div>
            </div>


            {/* right ------------------------------------------------------------- */}
            <div className="right">
                <Outlet />

            </div>



        </div>
    );

    function Logout(params) {
        axios.get('http://localhost:8000/api/Logout', { withCredentials: true })
        .then((response) => {
            window.location.href='/';
        })
    }
}
