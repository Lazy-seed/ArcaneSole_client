import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { CgTrash } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { formattedNumber } from '../../components/ProductCard'
import { BaseURL } from '../../urls'


export default function Bag() {
    useEffect(() => {
        axios.get(`${BaseURL}/api/getBag`, { withCredentials: true })
            .then((res) => {
                setData(res.data.bagItems);
                console.log(res.data);
            });
        axios.get(`${BaseURL}/api/getBagPrice`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
            });

    }, [])
    const [Data, setData] = useState('')
    let TotalPrice = 0;
    let DeliveryPrice = 495;
    return (
        <Container className='mt-5'>
            <Row className='gy-5'>
                <Col lg="8">
                    <h2 className='fw-bold'>Bag</h2>
                    <div className='d-flex flex-column  gap-3'>
                        {
                            Data && Data.map((data, index) => {
                                TotalPrice += data.price * data.qty;

                                return (
                                    <Card >
                                        <CardBody className='py-0'>

                                        <Row >
                                            <Col md="4" className=' overflow-hidden ' style={{ height: "180px ", }} >
                                                <img className="w-100 h-100 " style={{ objectFit: "cover" }} src={data.img1} alt="" />
                                            </Col>
                                            <Col md="8" className=' position-relative py-2 overflow-hidden  '>
                                                <CgTrash onClick={() => { delBag(data._id) }} className='fs-3 position-absolute  end-0  me-3 mt-2' />
                                                <h3>{data.name}</h3>
                                                <h5>Women's Shoes</h5>
                                                <h6>Color : Black</h6>

                                                <div className='d-flex justify-content-between align-items-end '>

                                                    <div className='d-flex gap-3'>
                                                        <label htmlFor=""> Size
                                                            <select className="form-select form-select-sm " aria-label=" select example" defaultValue={data.size} onChange={(e) => { updBagSize(data._id, e.target.value); }}>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                                <option value="11">11</option>
                                                            </select> </label>
                                                        <label htmlFor=""> Qty
                                                            <select className="form-select form-select-sm " aria-label=" select example" defaultValue={data.qty} onChange={(e) => updBagQty(data._id, e.target.value)}>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                            </select> </label>
                                                    </div>

                                                    <h4 className='me-3'>MRP: ₹ {formattedNumber(data.price * data.qty)}</h4>
                                                </div>
                                            </Col>
                                        </Row>
                                        </CardBody>

                                    </Card>
                                )
                            })
                        }
                    </div>
                </Col>
                <Col lg="4">
                    <h2 className='fw-bold'>Summary</h2>
                    <Card className='border-0'>
                        <CardBody className='d-flex flex-column  gap-2'>
                            <div className='d-flex align-items-center  justify-content-between '>
                                <h5>Subtotal</h5>
                                <h5>₹ {formattedNumber(TotalPrice)}</h5>
                            </div>
                            <div className='d-flex align-items-center  justify-content-between '>
                                <h5>Delivery & Handling</h5>
                                <h5>₹ {DeliveryPrice}</h5>
                            </div>

                            <hr />
                            <div className='d-flex align-items-center  justify-content-between '>
                                <h5>Total</h5>
                                <h5>₹ {formattedNumber(TotalPrice + DeliveryPrice)}</h5>
                            </div>
                            <hr />
                            <Link to='/address' className='btn1 fs-5 rounded-5 text-white '> Checkout</Link>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Container>
    )

    function uptData() {
        axios.get(`${BaseURL}/api/getBag`, { withCredentials: true })
            .then((res) => {
                setData(res.data.bagItems);
            });
    }

    function delBag(id) {
        axios.get(`${BaseURL}/api/delBag/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                toast.success("Item has been deleted")
                uptData()
            });
    }


    function updBagSize(id, size) {
        const data = {
            pID: id,
            size: size
        }
        axios.post(`${BaseURL}/api/uptBag/`, data, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                toast.success("Size has been updated")
                uptData()
            });

    }
    function updBagQty(id, qty) {
        const data = {
            pID: id,
            qty: qty
        }
        // return null
        axios.post(`${BaseURL}/api/uptBag/`, data, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                toast.success("Qty has been updated")
                uptData()
            });

    }
}
