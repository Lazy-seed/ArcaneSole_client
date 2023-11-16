import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import ProductCard from '../components/ProductCard'
import { BASE_URL } from '../links'
import { Link } from 'react-router-dom';
import axios from "axios";
import Loader from '../components/loader/Loader';

export default function Search() {

    useEffect(() => {
        setisLoading(true)
        axios.get(`${BASE_URL}/api/SearchShoe/jordan`, { withCredentials: true })
            .then((res) => {
                setData(res.data.result);
                setisLoading(false)
            });
    }, [])
    const [Data, setData] = useState('')
    const [Srch, setSrch] = useState('')
    const [isLoading, setisLoading] = useState(false);

    return (
        <Container className='mt-5'>


            <div className="mb-3 d-flex gap-2  justify-content-center  align-items-baseline  ">
                <input type="text" onChange={(e) => { setSrch(e.target.value) }} placeholder='jordan' className="form-control fs-5  fw-bold text-secondary " style={{ width: "500px" }} />
                <h4 className='btn1' onClick={srch_btn}>search</h4>
            </div>

            <h5 className='text-secondary mt-5'>show reasults for - jordan</h5>


            {Data === '' && <>No Data found</>}
            {isLoading && <Loader />}
            <Row className='mt-3 g-4'>

                {Data && Data.map((data, index) => (
                    <Col md='6' lg='4'>
                        <ProductCard data={data} />
                    </Col>
                ))
                }
            </Row>


        </Container>
    );
    function srch_btn() {
        setisLoading(true)
        axios.get(`${BASE_URL}/api/SearchShoe/${Srch}`, { withCredentials: true })
            .then((res) => {
                setData(res.data.result);
                setisLoading(false)
            });
    }
}
