import React ,{useState,useEffect}from 'react'
import { Col, Container, Row } from 'reactstrap'
import axios from 'axios'

// componenst
import ProductCard from '../components/ProductCard';


// imgs
import shoe1 from '../assets/img/shoe1.png'
import bg from '../assets/img/bg.png'
import s2 from '../assets/img/s2.png'
import { toast } from 'react-hot-toast';




export default function Home({IsLogin}) {
    
useEffect(() => {
    setData(false)
    axios.get(`https://arcanesole-backend.onrender.com/api/allProducts/all`, { withCredentials: true })
        .then((res) => {
            setData(res.data.products);
        });

}, [])
const [Data, setData] = useState('')
    return (
        <div>

            <div className=' bg-black'>
                <Container className='d-flex align-items-center overflow-hidden '>
                    <Row className=' align-items-center '>
                        <Col md="4" style={{ zIndex: "99" }}>
                            <div className='bg-black text-white   text-center text-lg-end ' >
                                <h1 className='display-2 fw-bolder   '>Find Your<br />
                                    Best Pair<br />
                                    Now !</h1>

                                <button className='btn btn-primary fw-bold fs-6 px-3' >Buy Now</button>
                            </div>
                        </Col>
                        <Col md="8">
                            <img src={shoe1} alt="" className='  w-100' style={{ objectFit: "cover", transform: "scale(1.5)" }} />
                        </Col>
                    </Row>
                </Container>

            </div>


            <Container className=' mt-5'>

                <div className='d-flex gap-2 mb-4'>
                    <h6 className='btn2  px-4 py-2 active-btn2' >Popular</h6>
                    <h6 className='btn2 px-4 py-2 ' >Most viewed</h6>
                    <h6 className='btn2 px-4 py-2 ' >Trending</h6>
                </div>
                <div>
                    <Row>
                        {
                            Data && Data.slice(0,3).map((data,index) => (
                                <Col md='6' lg='4'>
                                    <ProductCard data={data} key={index} IsLogin={IsLogin} />
                                </Col>
                            ))
                        }
                    </Row>
                </div>

            </Container>


            <div className=' mt-5' style={{ backgroundImage: `url(${bg})`, backgroundPosition: "center", backgroundRepeat: "repeat", backgroundSize: "400px" }}>

                <Container className=' py-5  '>
                    <Row className=' '>

                        <Col md="7" className='t'>
                            <h1 className='display-3 fw-bolder text-white '>
                                Pick the <br />
                                Perfect Pair
                            </h1>
                            <h1 className='display-3 fw-bolder text-white'>
                                Get upto 30% off
                            </h1>

                            <h2 className='display-6 fw-bolder text-white'>usecode : <span className='btn btn-primary fs-2 py-0 fw-bold'>FIRST30</span></h2>
                        </Col>
                        <Col md="5">

                            <img src={s2} alt="" className='w-100' style={{ transform: "rotate(24deg)" }} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    )
}
