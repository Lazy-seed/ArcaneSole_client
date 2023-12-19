import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { formattedNumber } from '../../../components/ProductCard';

export default function OrderProduct() {

    const BASE_URL = 'http://localhost:8000';

    useEffect(() => {
        axios.get(`${BASE_URL}/api/getOrders`, { withCredentials: true })
            .then((res) => {
                setData(res.data.order);
                console.log(res.data);
            });

        window.scrollTo(0, 0)

    }, [])

    const [Data, setData] = useState('')
    return (
        <div className='orderProduct'>
            <h2>Orders</h2>
            <div className="content">

                <div className='flex flex-column gap-2'>

                    {Data && Data.map((order, index) => {
                        const items = order.items
                        return (

                            items && items.map((item, index) => {
                                return (
                                    <Card >
                                        <CardBody className='py-0 position-relative'>
                                                    <h3 className='fs-3 position-absolute  end-0  me-3 mt-2' >{item.status}</h3>

                                            <Row >
                                                <Col md="4" className=' overflow-hidden ' style={{ height: "180px ", }} >
                                                    <img className="w-100 h-100 " style={{ objectFit: "cover" }} src={item.img1} alt="" />
                                                </Col>
                                                <Col md="8" className='  py-2 overflow-hidden  '>
                                                    <h3>{item.name}</h3>
                                                    <h5>Women's Shoes</h5>
                                                    <h6>Color : Black</h6>

                                                    <div id="d-flex gap-2">
                                                        <h6 >Size: {item.size}</h6>
                                                        <h6 >Quantity: {item.qty}</h6>
                                                    </div>

                                                    <div className='d-flex justify-content-between align-items-end '>
                                                        <h4 className='me-3'>MRP: ₹ {formattedNumber(item.price * item.qty)}</h4>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>

                                    </Card>
                                )
                            })
                        )

                    })

                    }


                </div>
            </div>
        </div>
    )
}
