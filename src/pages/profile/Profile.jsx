import React, { useEffect, useState } from 'react'
import profile from './imgs/profie.jpg';
import { CgProfile } from "react-icons/cg";
import { TbTruckDelivery } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap'
import axios from 'axios';
import { useLocation } from 'react-router-dom';


export default function Profile() {
   
    const location = useLocation();
     const nagivate = useNavigate()
    useEffect(() => {

        axios.get('https://arcanesole-backend.onrender.com/api/userInfo', { withCredentials: true }).then((response) => {
            setUserInfo(response.data.userInfo)
            if (!response.data.success) {
                nagivate("/")
            }
        })
        setActiveView(location.pathname.split('/').pop())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    const [UserInfo, setUserInfo] = useState('')
    const [ActiveView, setActiveView] = useState("edit")
    if (UserInfo === '') {
        return null;
    }
    return (
        <Container fluid="sm ">

            <style>
                {`
    .active{
        color:crimson !important;
      
    }
    .inactive{
        color:#424242
    }
    `}
            </style>
            <Row className='profile mt-5 gy-5'>


                {/* left------------------------------------------------------------- */}
                <Col lg="4" className=" px-5">


                    <div className="d-flex flex-column  gap-2">
                        <div className='d-flex'>
                            <img src={profile} alt="" width={80} />
                            <div id="info">
                                <h3>{UserInfo.fname} {UserInfo.lname}</h3>
                                <h4>{UserInfo.email}</h4>
                            </div>
                        </div>
                        <hr />
                        <Link to='/Profile/edit' className={`d-flex  justify-content-start  gap-2 ${ActiveView === 'edit'? 'active' : 'inactive' }`}> <CgProfile size={30} /> <h4>Edit Profile</h4></Link>
                        <Link to='/Profile/order' className={`d-flex justify-content-start  gap-2 ${ActiveView === 'order'? 'active' : 'inactive' }`}><TbTruckDelivery size={30} /> <h4>See Orders</h4></Link>
                        <hr />
                        <div onClick={Logout} className='d-flex justify-content-start  gap-2'>
                            <BiLogOut size={30} /> <h4>Logout</h4>
                        </div>
                    </div>
                </Col>

                <hr className='d-block d-lg-none' />

                {/* right ------------------------------------------------------------- */}
                <Col lg="8" className="">
                    <Outlet />

                </Col>



            </Row>
        </Container>

    );

    function Logout(params) {
        axios.get('https://arcanesole-backend.onrender.com/api/Logout', { withCredentials: true })
            .then((response) => {
                window.location.href = '/';
            })
    }
}
