import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import ProductCard from '../components/ProductCard'
import axios from "axios";
import { useParams } from 'react-router-dom';
import Loader from '../components/loader/Loader';

export default function Browse({ IsLogin }) {
  const { ctg } = useParams();

  const BASE_URL = 'https://arcanesole-backend.onrender.com';
  const [catg, setCatg] = useState(ctg);
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
  const categoryButtons = ['all', 'men', 'women', 'girl', 'boy'];
  return (
    <Container className=' mt-5 pt-5'>

<div className='d-flex gap-3 mb-4'>
        {categoryButtons.map((category) => (
          <h6
            key={category}
            onClick={() => setCatg(category)}
            className={`btn2 py-2 px-4 ${catg === category ? 'active-btn2' : ''}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h6>
        ))}
      </div>
      <div>

        {IsLoading && <Loader />}



        <Row className='mt-4 g-4'>
          {
            Data && Data.map((data, index) => (
              <Col md='6' lg='4'>
                <ProductCard data={data} key={index} IsLogin={IsLogin} />
              </Col>
            ))
          }
        </Row>
      </div>

      <nav aria-label="Page navigation example " style={{marginTop:"20px"}}>
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link">Previous</a>
          </li>
          <li className="page-item active text-white"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>


    </Container>
  );


}
