import './App.scss';
import './assets/custome.scss'
import '../node_modules/aos/dist/aos.css'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
// components
import Navbar from './utilities/Navbar';

// pages
import Home from './pages/Home';
import Bag from './pages/bag/Bag';
import Address from './pages/bag/Address';
import Search from './pages/Search';
import Browse from './pages/Browse';
import Liked from './pages/Liked';
import ProductDetail from './pages/productDetail/ProductDetail';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Profile from './pages/profile/Profile';
import ProfileEdit from './pages/profile/profileEdit/ProfileEdit';
import OrderProduct from './pages/profile/orderProduct/OrderProduct';


function App() {
  useEffect(() => {

    axios.get('https://arcanesole-backend.onrender.com/api/userInfo', { withCredentials: true }).then((response) => {
      setIsLogin(response.data.success);
    })
  }, [])
  const [IsLogin, setIsLogin] = useState(false);

  return (
    <div className=' pb-5' >
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Navbar IsLogin={IsLogin} />
      <Routes>
        <Route path='/' exact={true} element={<Home />} />
        <Route path='/browse/:ctg' exact={true} element={<Browse  IsLogin={IsLogin}/>} />
        <Route path='/ProductDetail/:id' exact={true} element={<ProductDetail />} />
        <Route path='/bag' exact={true} element={<Bag />} />
        <Route path='/liked' exact={true} element={<Liked />} />
        <Route path='/address' exact={true} element={<Address />} />
        <Route path='/search' exact={true} element={<Search />} />



        <Route path='/Profile' exact={true} element={<Profile />} >
          <Route path='/Profile/edit' exact={true} element={<ProfileEdit />} />
          <Route path='/Profile/order' exact={true} element={<OrderProduct />} />
        </Route>
      </Routes>




      {/* <Footer/> */}


    </div>
  );
}

export default App;
