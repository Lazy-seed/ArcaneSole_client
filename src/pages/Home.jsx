import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'reactstrap'
import axios from 'axios'

// componenst
import ProductCard from '../components/ProductCard';


// imgs
import shoe1 from '../assets/img/shoe1.png'
import bg from '../assets/img/bg.png'
import s2 from '../assets/img/s2.png'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import { BaseURL } from '../urls';




export default function Home({ IsLogin }) {

    useEffect(() => {
        axios.get(`${BaseURL}/api/randomProducts/9`, { withCredentials: true })
            .then((res) => {
                setData({
                     popular: res.data.products.slice(0,3),
                     most: res.data.products.slice(3,6),
                     trending: res.data.products.slice(6,9)
                 });
                 setShowData(res.data.products.slice(0,3))
                 
            });
       
    }, [])
    const [Data, setData] = useState({
        popular: null,
        most: null,
        trending: null
    })
    const [ShowData, setShowData] = useState(Data.popular)
    
    // if (!Data.popular ) {
    //     return <Loader/>
    // }
    return (
        <div>

            <div className=' bg-black'>
                <Container className='d-flex align-items-center overflow-hidden '>
                    <Row className=' align-items-center  '>
                        <Col md="4" style={{ zIndex: "99" }}>
                            <div className='bg-black text-white   text-center text-lg-end ' >
                                <h1 className='display-2 fw-bolder   '>Find Your<br />
                                    Best Pair<br />
                                    Now !</h1>

                                <Link to='/browse/all/1' className='btn btn-primary fw-bold fs-6 px-3' >Buy Now</Link>
                            </div>
                        </Col>
                        <Col md="8">
                            <img src={shoe1} alt="" className='  w-100' style={{ objectFit: "cover", transform: "scale(1.5)" }} />
                        </Col>
                    </Row>
                </Container>

            </div>


            <Container className=' mt-5'>

                <div className='d-flex gap-2 mb-4 flex-wrap  '>

                    <h6 className='btn2   ' ><Link to='/browse/all/1' className='  px-4 mt-1 ' >ALL</Link></h6>
                    <h6 className={`btn2  px-4 py-2`} onClick={()=> {setShowData(Data.popular)}} >Popular</h6>
                    <h6 className='btn2 px-4 py-2 ' onClick={()=> {setShowData(Data.most)}}>Most viewed</h6>
                    <h6 className='btn2 px-4 py-2 ' onClick={()=> {setShowData(Data.trending)}}>Trending</h6>
                </div>
                <div>
                    <Row className='gy-3'>
                        {
                            ShowData && ShowData.map((data, index) => (
                                <Col md='6' lg='4'>
                                    <ProductCard data={data} key={index} IsLogin={IsLogin} />
                                </Col>
                            ))
                        }

                        {
                            !Data.popular && <Loader/>
                        }

                    </Row>
                </div>

            </Container>


            <div className=' mt-5' style={{ backgroundImage: `url(${bg})`, backgroundPosition: "center", backgroundRepeat: "repeat", backgroundSize: "400px" }}>

                <Container className=' py-5  '>
                    <Row className=' border-danger px-2'>

                        <Col md="7" className=''>
                            <h1 className='display-3 fw-bolder text-white '>
                                Pick the <br />
                                Perfect Pair
                            </h1>
                            <h1 className='display-3 fw-bolder text-white'>
                                Get upto 30% off
                            </h1>

                            <h2 className='display-6 fw-bolder text-white'>usecode : <span className='btn btn-primary fs-2 py-0 fw-bold'>FIRST30</span></h2>
                        </Col>
                        <Col md="5" style={{overflow:"hidden"}}>
                            <img src={s2} alt="" className='w-100' style={{ transform: "rotate(24deg)" }} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    )
}
