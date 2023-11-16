import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import ProductCard from '../components/ProductCard'
import axios from "axios";
import { useParams } from 'react-router-dom';
import Loader from '../components/loader/Loader';

export default function Browse({ IsLogin }) {
  const { ctg } = useParams();

  const BASE_URL = 'https://arcanesole-backend.onrender.com';
  const [catg, setcatg] = useState(ctg);
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true)
    setData(false)
    axios.get(`${BASE_URL}/api/allProducts/${catg}`, { withCredentials: true })
      .then((res) => {
        setData(res.data.products);
        console.log(res.data);
        setIsLoading(false)
      });

  }, [catg])
  const [Data, setData] = useState('')
  return (
    <Container className=' mt-5 pt-5'>

      <div className='d-flex  gap-3 mb-4'>
        <h6 onClick={() => { setcatg('all') }} className={`btn2 py-2 px-4 ${catg === 'all' ? 'active-btn2' : ""}`} >All</h6>
        <h6 onClick={() => { setcatg('men') }} className={`btn2 py-2 px-4 ${catg === 'men' ? 'active-btn2' : ""}`} >Mens</h6>
        <h6 onClick={() => { setcatg('women') }} className={`btn2 py-2 px-4 ${catg === 'women' ? 'active-btn2' : ""}`} >Womens</h6>
        <h6 onClick={() => { setcatg('girl') }} className={`btn2 py-2 px-4 ${catg === 'girl' ? 'active-btn2' : ""}`} >Girls</h6>
        <h6 onClick={() => { setcatg('boy') }} className={`btn2 py-2 px-4 ${catg === 'boy' ? 'active-btn2' : ""}`} >Boys</h6>
      </div>
      <div>

        {IsLoading && <Loader />}



        <Row className='mt-3 g-4'>
          {
            Data && Data.map((data, index) => (
              <Col md='6' lg='4'>
                <ProductCard data={data} key={index} IsLogin={IsLogin}/>
              </Col>
            ))
          }
        </Row>
      </div>

    </Container>
  );

 
}
