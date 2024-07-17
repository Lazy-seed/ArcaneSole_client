import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { formattedNumber } from '../../../components/ProductCard';
import { BaseURL } from '../../../urls';
import { getReq } from '../../../jwt/jwtServices';
import moment from 'moment'
export default function OrderProduct() {


    useEffect(() => {
        getReq('getOrders')
            .then((res) => {
                setData(res.order);
                console.log(res);
            }).catch((err) => console.log(err))
        window.scrollTo(0, 0)

    }, [])

    const [Data, setData] = useState('')
    return (
        <div className='orderProduct'>
            <h2>Orders</h2>
            <div className="content">

                <div className='d-flex flex-column gap-3' >

                    {Data && Data.map((order, index) => {
                        const items = order.items
                        return (
                            <div className='border-bottom border-4'>
                                <div className='d-flex justify-content-between'>
                                <div >
                                    <h6>Date : {moment(order.orderDate).format("DD-MM-YYYY")}</h6>
                                    <h6>status : {order.orderStatus}</h6>
                                </div>
                                <div >
                                    <h6>OrderID : #{order._id}</h6>
                                    <h6>Total price :{formattedNumber(order.total)}</h6>
                                </div>
                                </div>
                                {items && items.map((item, index) => {
                                    return (
                                        <Card className='mb-2' >
                                            <CardBody className='py-0 position-relative '>
                                                <h3 className='fs-3 position-absolute  end-0  me-3 mt-2' >{item.status}</h3>

                                                <div className='d-flex gap-2 '>
                                                    <div className=' overflow-hidden p-0 ' style={{ height: "90px ", width: "200px" }} >
                                                        <img className="w-100 h-100 " style={{ objectFit: "cover" }} src={item?.product?.img1} alt="" />
                                                    </div>
                                                    <div className='w-100  py-1 overflow-hidden  '>
                                                        <div className='d-flex justify-content-between'>
                                                            <h5>{item?.product?.name}</h5>
                                                            <div className='d-flex justify-content-between align-items-end '>
                                                                <h6 className='m'>MRP: ₹ {formattedNumber(item?.product?.price * item.qty)}</h6>
                                                            </div>
                                                        </div>
                                                        {/* <h6>Women's Shoes</h6>
                                                    <h6>Color : Black</h6> */}

                                                        <div className="d-flex gap-2">
                                                            <h6 >Size: {item.size}</h6>
                                                            <h6 className='mb-0'>Quantity: {item.qty}</h6>
                                                        </div>


                                                    </div>
                                                </div>
                                            </CardBody>

                                        </Card>
                                    )
                                })}
                            </div>
                        )

                    })

                    }


                </div>
            </div>
        </div>
    )
}
