import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import SongPage from '../components/SongPage/SongPage'
import LeftSideNavbar from '../components/LeftSideNavbar/LeftSideNavbar'
import "./MyProfile.css";
import { Link, useNavigate } from 'react-router-dom'
import UserDetails from '../components/UserDetails/UserDetails';
import NavbarForMobile from '../components/Navbar/NavbarForMobile';
import Footer from '../components/Footer/Footer';
import loaderGif from "../Assets/loader.gif";
// import LibraryLink from '../components/LibraryLinks/LibraryLink';



const MyProfile = () => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [songData, setSongData] = useState([]);
  const navigate = useNavigate();
  const[isLoading, setIsLoading]=useState(true);

  
  function fetchFavSongDetails(favSongList){
    const favIdList=favSongList.map(song=>song._id);
    console.log("fvtId",favIdList)
    const songDetailsFromLocal=JSON.parse(localStorage.getItem("songDetails"));
    const filteredFavSongs=songDetailsFromLocal.filter(song => favIdList.includes(song._id));
    setFavoriteSongs(filteredFavSongs);

  }
  useEffect(() => {
    const jwtToken =localStorage.getItem("authToken");
    const projectID = 'f104bi07c490';
     
    fetch('https://academics.newtonschool.co/api/v1/music/favorites/like', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'projectID': projectID
      }
    })
      .then(response => response.json())
      .then(data => {
        data=data.data;
        let favoriteList = data.songs;
        console.log("hhshsh",favoriteList);
        fetchFavSongDetails(favoriteList);
        // setFavoriteSongs(favoriteList); // Set the favorite songs in your state
      })
      .catch(error => {
        console.error('Error fetching favorite songs:', error);
      });
      setIsLoading(false);
  }, []);

  console.log("fvrt",favoriteSongs)
 

    
    
  // },[])
  
  
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
           <h3>Favourite Songs</h3>

          {isLoading?
            <div className="loading">
              <img  src={loaderGif}/>
            </div> 
            :
          
          <div className='song-list'>
          {favoriteSongs && favoriteSongs.length
            && favoriteSongs.map((item)=>{
             const activeSong=item;
            return(
            <div className='card' onClick={() => handleSongPlay(activeSong)}>
            <img className="card-image" src={activeSong?.thumbnail} alt='song'/>
            <p className="title">{activeSong?.title}</p>
            <p className="artists">{activeSong?.artist[0].name}</p>
            {/* <i className=" make-fvrt fa-solid fa-play"></i> */}
            </div> 
            ) 
          })
          }
            </div>
          }  
            <Footer/>
          </div> 
    
        </div>
        <div className='navbarForMobile'>
         <NavbarForMobile/>
      </div>
    </div>
  )
}

export default MyProfile