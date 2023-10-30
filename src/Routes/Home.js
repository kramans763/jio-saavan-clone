import React, { useEffect, useState } from 'react'
import "./Home.css";
import Navbar from '../components/Navbar/Navbar';
import LeftSideNavbar from '../components/LeftSideNavbar/LeftSideNavbar';
import SongPage from '../components/SongPage/SongPage';
import LiveMusic from '../components/LiveMusic/LiveMusic';
import { useNavigate } from 'react-router-dom';

import NavbarForMobile from '../components/Navbar/NavbarForMobile';
import Footer from '../components/Footer/Footer';

const Home = () => {
  const [searchResult, setSearchResult] = useState([]);
    const [searchValue,setSearchValue]=useState('');
    const [isSearched, setIsSearch]=useState(false);
    const navigate=useNavigate();

    function handleSearch(e){
      setSearchValue(e.target.value)
    } 

    const fetchSearchData = () => {

        fetch(`https://academics.newtonschool.co/api/v1/music/song?filter={"title":"${searchValue}"}`, {
          headers: {
            'projectID': 'f104bi07c490'
          }
        })
          .then(response => response.json())
          .then(data => {
            console.log("search result", data);
            setSearchResult(data.data);

            setIsSearch(true);
          
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
          });
      };
      
  useEffect(()=>{
    fetchSearchData();
  },[searchValue])

 
  const handleSongPlay = (activeSong) => {
    navigate(`/songplay`, { state: { activeSong } });
  }

  return (
    <div className='home-page'>
      <Navbar
        onChange={handleSearch} 
        searchWord={searchValue}
        />
      <div className='hero'>
        <div className='left-sideNavbar'>
            <LeftSideNavbar />
        </div>

        <div className='main'> 
         {
          searchResult?.length ?
          <div className= "song-page" >  
            <h1 className='trending'>Searched Song</h1> 
          <div className='song-list'>
          {searchResult && searchResult.length
            && searchResult.map((item)=>{
              const activeSong=item;
              return(
              <div className='card' onClick={() => handleSongPlay(activeSong)}>
              <img className="card-image" src={activeSong.thumbnail} alt='song'/>
              <p className="title">{activeSong.title}</p>
              <p className="artists">{activeSong.artist[0].name}</p>
              {/* <i className=" make-fvrt fa-solid fa-play"></i> */}
              </div> 
              ) 
            })
            }
        </div>
        </div>
          :
          <div>
              <SongPage 
              pageType="Trending Now"
              currentPage={1}
              />
              <SongPage
                pageType="New Songs"
                currentPage={2}/>
              <SongPage 
                pageType="Top Charts"
                currentPage={3}
              />
              <SongPage
               pageType="Top Artists"
               currentPage={1}
              />
              <SongPage
                pageType="Trending Podcasts"
                currentPage={2}
              />
              <SongPage
                pageType="Radio Stations"
                currentPage={3}/>  
              <SongPage
                pageType="Albums"
                currentPage={1}/> 
              <Footer/>
            </div>
                   
         }  
             
         </div>

      </div>
      <div className='navbarForMobile'>
         <NavbarForMobile/>
      </div>
      
      {/* <LiveMusic /> */}
    </div>
  )
}

export default Home