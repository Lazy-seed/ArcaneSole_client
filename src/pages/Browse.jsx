import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import ProductCard from '../components/ProductCard'
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import { BaseURL } from '../urls';

export default function Browse({ IsLogin }) {
  const { ctg,page } = useParams();

  const [catg, setCatg] = useState(ctg);
  const [Page, setPage] = useState(page)
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true)
    setData(false)
    axios.get(`${BaseURL}/api/allProducts/${catg}/${Page}`, { withCredentials: true })
      .then((res) => {
        setData(res.data.products);
        setProLen(res.data.proLen)
        console.log(res.data);
        setIsLoading(false)
      });

  }, [catg,Page])
  const [Data, setData] = useState('')
  const [ProLen, setProLen] = useState('')
  const categoryButtons = ['all', 'men', 'women', 'girl', 'boy'];
 
  const pa = Math.ceil(ProLen/6)
  const pages = Array.from({ length: pa }, (_, index) => index + 1);

  return (
    <Container className=' mt-5 pt-5'>

      <div className='d-flex flex-wrap  gap-3 mb-4'>
        {categoryButtons.map((category) => (
          <Link to={`/browse/${category}/1`}
            key={category}
            onClick={() => setCatg(category)}
            className={`btn2 py-2 px-4 ${catg === category ? 'active-btn2 text-white' : ''}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
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



      <nav aria-label="Page navigation example " style={{ marginTop: "20px" }}>
        <ul className="pagination justify-content-center">
         
         {
         pages && pages.map((index) => {
            return (
              <li className={`page-item ${Page === (index) ? "active text-white": ""}`}><Link to={`/browse/all/${index }`} className="page-link" href="#" onClick={()=> setPage(index )}>{index }</Link></li>
            )
          })
         }

        </ul>
      </nav>


    </Container>
  );


}
