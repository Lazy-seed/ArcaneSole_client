import React, { useEffect, useState } from 'react'
import './productDetail.scss';
import axios from "axios";


import { HiHeart } from "react-icons/hi";
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { Col, Container, Row } from 'reactstrap';
import toast from 'react-hot-toast';
import { formattedNumber } from '../../components/ProductCard';
import { BaseURL } from '../../urls';
import { getReq, postReq } from '../../jwt/jwtServices';

export default function ProductDetail({ IsLogin }) {
    const { id } = useParams();
    useEffect(() => {
        getReq('singleShoe', id)
            .then((res) => {
                setData(res.data);
                console.log(res.data);
                setimg(res.data.img1)
                if (res.data.category === "girl") {
                    setSize_Len([2, 3, 4, 5]);
                    setcatg_desc("Girl`s")
                }
                if (res.data.category === "boy") {
                    setSize_Len([3, 4, 5, 6])
                    setcatg_desc("Boy`s")
                }
                if (res.data.category === "women") {
                    setSize_Len([4, 5, 6, 7, 8, 9])
                    setcatg_desc("Women`s")
                }
                if (res.data.category === "men") {
                    setSize_Len([6, 7, 8, 9, 10, 11])
                    setcatg_desc("Men`s")
                }
            });

    }, [])

    const [Size_Len, setSize_Len] = useState()
    const [catg_desc, setcatg_desc] = useState()
    const [Data, setData] = useState('')
    const [img, setimg] = useState('')
    const [Size, setSize] = useState(0)



    if (Data === '') {
        return <Loader />;
    }

    console.log(Size_Len);
    return (
        <Container fluid='sm' className='productDetail'>

            <Row className="top  justify-content-center  ">

                {/* img */}
                <Col lg="7" className="left d-flex flex-column-reverse flex-md-row border">
                    <div className="mini_Img">
                        <ul className='d-flex flex-md-column'>
                            <li><img src={Data.img1} alt="" onMouseEnter={() => setimg(Data.img1)} /></li>
                            <li><img src={Data.img2} alt="" onMouseEnter={() => setimg(Data.img2)} /></li>
                            <li><img src={Data.img3} alt="" onMouseEnter={() => setimg(Data.img3)} /></li>
                            <li><img src={Data.img4} alt="" onMouseEnter={() => setimg(Data.img4)} /></li>
                        </ul>
                    </div>
                    <div className="lar_Img">
                        <img src={img} alt="" />
                    </div>
                </Col>



                <Col lg="5" className="right">

                    <div id="info">
                        <h1>{Data.name}</h1>
                        <h3>{catg_desc} Premium Walking Shoes</h3>
                        <h2>MRP : ₹ {formattedNumber(Data.price)}</h2>
                        <p>incl. of taxes</p>
                        <p>(Also includes all applicable duties)</p>
                    </div>

                    <div id="size">
                        <h2>Select Size</h2>
                        <ul>

                            {Size_Len && Size_Len.map((size_no, index) => {
                                return (
                                    <li key={index} className={Size === size_no ? 'active' : ''} onClick={() => setSize(size_no)}>{size_no}</li>
                                )
                            })}

                        </ul>
                    </div>


                    <div id="btns">
                        <button onClick={addBag} >Add to Bag </button>
                        <button>Wistlist <HiHeart /></button>
                    </div>

                </Col>
            </Row>

        </Container>
    );




    function addBag() {
        if (!IsLogin) {
            return  toast.error("Please Login ")
        }


        if (Size === 0) {
            return  toast.error("chooese size")
        }

        const data = {
            shoe_id: Data._id,
            qty: 1,
            size: Size
        }
        postReq('addBag', data)
            .then((res) => {
                console.log(res);
            });
    }


}
