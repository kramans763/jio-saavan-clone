import React, { useEffect } from 'react'
import "./Home.css";
import Navbar from '../components/Navbar/Navbar';
import LeftSideNavbar from '../components/LeftSideNavbar/LeftSideNavbar';
import SongPage from '../components/SongPage/SongPage';
import LiveMusic from '../components/LiveMusic/LiveMusic';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // const navigate=useNavigate();
  // useEffect(() => {
  //   if(!localStorage.getItem('authToken')){
  //     navigate("/login");
  //   }
  //   console.log('Component is mounted in the DOM');
    
  //   });
  return (
    <div className='home-page'>
      <Navbar />
      <div className='hero'>
        <div className='left-sideNavbar'>
            <LeftSideNavbar />
        </div>

        <div className='main'>  
              <SongPage 
              pageType="Trending Now"
              />
        </div>

      </div>
      {/* <LiveMusic /> */}
    </div>
  )
}

export default Home