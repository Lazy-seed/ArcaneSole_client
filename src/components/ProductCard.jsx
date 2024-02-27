
import React from 'react'
import { GoHeart } from "react-icons/go";
// import { GoHeartFill } from "react-icons/go";
import { Card, CardBody } from 'reactstrap';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from "axios";
import { BaseURL } from '../urls';

export const formattedNumber = (num) => {
  try {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  } catch (error) {
    console.error('Error formatting number:', error);
    
    return num
  }
};
export default function ProductCard({ data,IsLogin }) {
  AOS.init({ duration: 500 })


  if (data) {
    return (
      <Card className='position-relative  overflow-hidden ' data-aos="zoom-in">
        <GoHeart color='red' className='fs-4 position-absolute end-0 mt-3 me-3' />
        {/* <GoHeartFill color='red' className='fs-4 position-absolute end-0 mt-3 me-3' /> */}
        <div className=' overflow-hidden ' style={{ height: "230px ", }}>
          <img src={data.img1} className="  w-100  h-100 " style={{ objectFit: "cover" }} alt="..." />
        </div>
        <CardBody className='d-flex flex-column '>
          <h4>{data.name}</h4>
          <h5>₹ {formattedNumber(data.price)}</h5>
          <h6  className=" btn1 active-btn" onClick={addBag}>Add to Cart</h6>
          <Link to={`/ProductDetail/${data._id}`} className="btn2 fw-bold" >View</Link>

        </CardBody>
      </Card>)
  } else {

    return (
      <Card className='position-relative  overflow-hidden ' data-aos="zoom-in">
        <GoHeart color='red' className='fs-4 position-absolute end-0 mt-3 me-3' />
        {/* <GoHeartFill color='red' className='fs-4 position-absolute end-0 mt-3 me-3' /> */}
        <div className=' overflow-hidden ' style={{ height: "250px ", }}>
          <img src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png" className="  w-100  h-100 " style={{ objectFit: "cover" }} alt="..." />
        </div>
        <CardBody className='d-flex flex-column'>

          <h4>Nike Air Force</h4>
          <h5>₹ 7,495</h5>
          <h6 href="#" className=" btn1 active-btn">Add to Cart</h6>
          <h5 href="#" className="btn btn-outline-dark fw-bold" >View </h5>
        </CardBody>
      </Card>
    )
  }

  function addBag() {

    if (!IsLogin) {
      toast.error("Please login to add shoe in cart")
      return
    }


    const data2 = {
      shoe_id: data._id,
      name: data.name,
      img1: data.img1,
      qty: 1,
      size: 8,
      price: data.price
    }

    axios.post(`${BaseURL}/api/addBag`, data2, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      });
    toast.success("Shoe is Added in BAG")
  }
}
