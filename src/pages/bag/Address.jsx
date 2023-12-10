import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Col, Container, Row } from 'reactstrap'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

export default function Address() {
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`https://arcanesole-backend.onrender.com/api/getBagPrice`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setTotalPrice(res.data.totalPrice)
            });

    }, [])
const [TotalPrice, setTotalPrice] = useState(0)

    // state----------------------------------------------------------
    const state_data = ["Maharashtra", "Gujrat", "Uttar Pradesh"];
    let city_data = '';
    const [State, setState] = useState('Maharashtra');
    if (State === 'Uttar Pradesh') {
        city_data = ["Lucknow", "Kanpur", "Meerut"];
    }
    else if (State === "Gujrat") {
        city_data = ["Surat", "Ahmedabad"]
    }
    else {
        city_data = ["Mumbai", "Thane", "Pune"]
    }


    // price
    let DeliveryPrice = 495;

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => { resolve(true); };
            script.onerror = () => { resolve(false); };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        document.getElementById("deliver-btn").innerText = "Loading...";
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }




        // amount upadte
        const amt = { amt: TotalPrice + DeliveryPrice }

        // creating a new order
        const result = await axios.post(`https://arcanesole-backend.onrender.com/payment/orders`, amt, { withCredentials: true });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;


        const options = {
            key: "rzp_test_VriOzbggcgpNkd", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "ArcaneSole",
            description: "Test Transaction",
            image: 'logo',
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post(`https://arcanesole-backend.onrender.com/payment/success`, data);

                // alert(result.data.msg);
                if (result.data.msg === 'success') {
                     makeOrder();

                    navigate("/orderSuccess");
                }
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        document.getElementById("deliver-btn").innerText = "Deliver here";


    }



    return (
        <Container className='mt-5'>
            <h2 className='fw-bold text-center my-5'>Delivery Address   </h2>
            <form>
                <Row className='g-3  justify-content-center '>
                    <Col lg='5'>
                        <label htmlFor="exampleInputEmail1" className="form-label">House No/Building</label>
                        <input type="text" className="form-control" id="house" aria-describedby="emailHelp" />
                    </Col>
                    <Col lg='5'>
                        <label htmlFor="exampleInputEmail1" className="form-label">Street/Area</label>
                        <input type="text" className="form-control" id="area" aria-describedby="emailHelp" />
                    </Col>
                    <Col lg='5'>
                        <label htmlFor="exampleInputEmail1" className="form-label">State</label>
                        <select className="form-select" aria-label="Default select example" id="state">
                            {state_data && state_data.map((state, index) => {
                                return (
                                    <option value={state} key={index}>{state}</option>
                                )
                            })}
                        </select>
                    </Col>
                    <Col lg='5'>
                        <label htmlFor="exampleInputEmail1" className="form-label">City</label>
                        <select className="form-select" aria-label="Default select example" id="city">
                            {city_data && city_data.map((city, index) => {
                                return (
                                    <option value={city} key={index}>{city}</option>
                                )
                            })}
                        </select>
                    </Col>
                    <Col lg='5'>
                        <label htmlFor="exampleInputEmail1" className="form-label">Zip/Pincode</label>
                        <input type="text" className="form-control" id="pincode" aria-describedby="emailHelp" />
                    </Col>
                </Row>
                <div className='text-center mt-5'>

                    <span type="submit" id='deliver-btn' onClick={valid} className="btn1 px-5" style={{ width: "400px" }}>Deliver here</span>
                </div>
            </form>
        </Container>
    )
    function valid() {
        var house = document.getElementById("house").value;
        var area = document.getElementById("area").value;
        var state = document.getElementById("state").value;
        var city = document.getElementById("city").value;
        var pincode = document.getElementById("pincode").value;

        if (house.trim() === '') {
            toast.error("all fields are required")
            return
        }
        // payment calll
        displayRazorpay()

    }
    function makeOrder() {

        var house = document.getElementById("house").value;
        var area = document.getElementById("area").value;
        var state = document.getElementById("state").value;
        var city = document.getElementById("city").value;
        var pincode = document.getElementById("pincode").value;



        const address = { house, area, state, city, pincode }

        axios.post(`https://arcanesole-backend.onrender.com/api/newOrder`, address, { withCredentials: true }).then((res) => {
            console.log(res.data);

        })

    }
}
