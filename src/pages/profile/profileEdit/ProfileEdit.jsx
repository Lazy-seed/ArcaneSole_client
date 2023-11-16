import React, { useEffect, useState } from 'react'
import './profileEdit.scss'; import axios from 'axios';
import profile from './profie.jpg';



export default function ProfileEdit() {

  useEffect(() => {

    axios.get('http://localhost:8000/api/userInfo', { withCredentials: true }).then((response) => {
      console.log(response.data);
      setUserInfo(response.data.userInfo)
    })
  }, [])

  const [UserInfo, setUserInfo] = useState('')


  if (UserInfo === '') {
    return null;
  }
  return (
    <div className='profileEdit'>
      <h2>Edit Profile</h2>


      <form>
        <div className="img_containr">
          <img src={profile} alt="" />
        </div>

        <div className="name_box">
          <div className="textbox">
            <div className="label">First Name</div>
            <input type="text" defaultValue={UserInfo.fname} id='fname' />
          </div>
          <div className="textbox">
            <div className="label">Last Name</div>
            <input type="text" defaultValue={UserInfo.lname} id='lname' />
          </div>
        </div>

        <div className="email_box">
          <div className="textbox">
            <div className="label">E-mail</div>
            <input type="text" defaultValue={UserInfo.email} id='email' />
          </div>
          <div className="textbox">
            <div className="label">Phone</div>
            <input type="text" defaultValue={UserInfo.mobile} id='mobile' />
          </div>
        </div>

        <button className='save_btn' onClick={save_btn}>Save</button>
      </form>


    </div >
  );


  function save_btn() {

    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var mobile = document.getElementById("mobile").value;

    axios.post('http://localhost:8000/api/updateUser', { fname, lname, email, mobile }, { withCredentials: true }).then((res) => {
      console.log(res.data);
      window.location.reload()
    }).catch((err) => console.log(err))

  }
}
