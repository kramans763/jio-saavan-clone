import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import LeftSideNavbar from '../components/LeftSideNavbar/LeftSideNavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarForMobile from '../components/Navbar/NavbarForMobile';
import Footer from '../components/Footer/Footer';

const Mood = (props) => {
    const location = useLocation();
    const navigate=useNavigate();
  const { filterdSong } = location.state || {};
  console.log("ffffff",filterdSong)
  const handleSongPlay = (activeSong) => {
    navigate(`/songplay`, { state: { activeSong } });
  }
  return (
    <div>
        <Navbar/>
        <div className='hero'>
            <div className='left-sideNavbar'>
               <LeftSideNavbar/>
            </div>
        <div className='main'> 
          <div className= "song-page" >  
            <h1 className='trending'>Music You Choose</h1> 
            <div className='song-list'>
             {filterdSong && filterdSong.length
               && filterdSong.map((item)=>{
                const activeSong=item;
                return(
                <div className='card' onClick={() => handleSongPlay(activeSong)}>
                  <img className="card-image" src={activeSong.thumbnail} alt='song'/>
                  <p className="title">{activeSong.title}</p>
                  {/* <p className="artists">{activeSong.artist[0].name}</p> */}
              {/* <i className=" make-fvrt fa-solid fa-play"></i> */}
                </div> 
               ) 
             })
             }
            </div>
          </div>
          <Footer/>
        </div>
        
        </div>
        <div className='navbarForMobile'>
         <NavbarForMobile/>
      </div>
    </div>
  )
}

export default Mood