import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import SongPage from '../components/SongPage/SongPage'
import LeftSideNavbar from '../components/LeftSideNavbar/LeftSideNavbar'
import "./MyProfile.css";
import { Link, useNavigate } from 'react-router-dom'
import UserDetails from '../components/UserDetails/UserDetails';
import LibraryLink from '../components/LibraryLinks/LibraryLink';



const MyProfile = () => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [songData, setSongData] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {

    const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
    
    console.log(favoritesList);
    
    setFavoriteSongs(prevFavoriteSongs => [...prevFavoriteSongs, ...favoritesList]);

    
    
  },[])
  
  
  console.log("fvvvvvvvvttt",favoriteSongs);

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
           <UserDetails/>
           <LibraryLink/>
           <div className='song-list'>
          {favoriteSongs && favoriteSongs.length
            && favoriteSongs.map((item)=>{
             const activeSong=item;
            return(
            <div className='card' onClick={() => handleSongPlay(activeSong)}>
            <img className="card-image" src={activeSong?.artist[0].image} alt='song'/>
            <p className="title">{activeSong?.title}</p>
            <p className="artists">{activeSong?.artist[0].name}</p>
            {/* <i className=" make-fvrt fa-solid fa-play"></i> */}
            </div> 
            ) 
          })
          }
      </div>
           </div> 
    
        </div>
       
    </div>
  )
}

export default MyProfile