import React, { useEffect, useState } from 'react'
import axios from 'axios';
import profile from '../imgs/profie.jpg';
import { Col, Row } from 'reactstrap';



export default function ProfileEdit() {

  useEffect(() => {

    axios.get('https://arcanesole-backend.onrender.com/api/userInfo', { withCredentials: true }).then((response) => {
      console.log(response.data);
      setUserInfo(response.data.userInfo)
    })
  }, [])

  const [UserInfo, setUserInfo] = useState('')


  if (UserInfo === '') {
    return null;
  }
  return (
    <div className='px-5'>
      <h2>Edit Profile</h2>


      <form >
        <div className='px-lg-5'>
          <img src={profile} alt="" width={150}/>
        </div>

        <hr />
        <Row className='px-lg-5'>
          <Col lg="6">
            <div className="form-floating mb-3">
              <input type="text" id='fname'  defaultValue={UserInfo.fname} className="form-control rounded-3"  placeholder="lisa" />
              <label htmlFor="floatingInput2">First Name</label>
            </div>
          </Col>
          <Col lg="6">
            <div className="form-floating mb-3">
              <input type="text" id='lname'  defaultValue={UserInfo.lname ? UserInfo.lname : " "} className="form-control rounded-3"  placeholder="lisa" />
              <label htmlFor="floatingInput2">Last Name</label>
            </div>
          </Col>
          <Col lg="12">
            <div className="form-floating mb-3">
              <input type="text" id='email' defaultValue={UserInfo.email ? UserInfo.email : " "} className="form-control rounded-3"  placeholder="lisa" />
              <label htmlFor="floatingInput2">E-mail</label>
            </div>
          </Col>
          <Col lg="12">
            <div className="form-floating mb-3">
              <input type="text" id='mobile' defaultValue={UserInfo.mobile ? UserInfo.mobile : " "} className="form-control rounded-3"  placeholder="lisa" />
              <label htmlFor="floatingInput2">Phone</label>
            </div>
          </Col>
        </Row>

      <div className='px-5'>
        <button className='btn btn-lg btn-primary w-100' onClick={save_btn}>Save</button>
      </div>
      </form>


    </div >
  );


  function save_btn() {

    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var mobile = document.getElementById("mobile").value;

    axios.post('https://arcanesole-backend.onrender.com/api/updateUser', { fname, lname, email, mobile }, { withCredentials: true }).then((res) => {
      console.log(res.data);
      window.location.reload()
    }).catch((err) => console.log(err))

  }
}
