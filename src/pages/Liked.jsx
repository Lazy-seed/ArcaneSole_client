import React from 'react'
import {  Col, Container, Row } from 'reactstrap'
import ProductCard from '../components/ProductCard'

export default function Liked() {
  return (
    <Container>
      


<h3 className='mt-5 fw-bold'>Your Liked Shoes</h3>


      <Row className='mt-3 g-4'>
            {
                [1,2,3,4,5,6].map((data,index) => (
                    <Col md='6' lg='4'>
                        <ProductCard data={data}  key={index} />
                    </Col>
                ))
            }
        </Row>
    </Container>
  )
}
