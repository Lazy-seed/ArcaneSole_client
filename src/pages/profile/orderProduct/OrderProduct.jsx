import React, { useEffect, useState } from 'react'
import axios from "axios";
import './orderProduct.scss'

export default function OrderProduct() {

    const BASE_URL = 'http://localhost:8000';

    useEffect(() => {
        axios.get(`${BASE_URL}/api/getOrders`, { withCredentials: true })
            .then((res) => {
                setData(res.data.order);
                console.log(res.data);
            });

            window.scrollTo(0,0)

    }, [])

    const [Data, setData] = useState('')
    return (
        <div className='orderProduct'>
            <h2>Orders</h2>
            <div className="content">

                <ul>

                    {Data && Data.map((order, index) => {
                        const items = order.items
                        return (

                            items && items.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <div id="img"><img src={item.img1} alt="" /></div>
                                        <div id="info">
                                            <h1>{item.name}</h1>
                                            <h3>Women's Shoes</h3>
                                            <h3>White</h3>

                                            <div id="drop-d">
                                                <label htmlFor="size" id='size'>Size: {item.size}</label>
                                                <label htmlFor="qty" id='qty'>Quantity: {item.qty}</label>
                                            </div>
                                        </div>
                                        <div id="del">
                                            <h2 id='status'>{item.status}</h2>
                                            <h3>MRP: ₹ {item.price}</h3>
                                        </div>
                                    </li>
                                )
                            })
                        )

                    })

                    }


                </ul>
            </div>
        </div>
    )
}
