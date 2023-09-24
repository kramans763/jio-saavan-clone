import { useState,useEffect } from "react";
import React from 'react'
import "./SongPage.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const SongPage = (props) => {
  const [songDetails, setSongDetails] = useState([]);
  const[currentPage,setCurrentPage]=useState(1);
  let pageType=props.pageType;
  const songsPerPage = 14;
  const navigate = useNavigate();
  let totalLength=100;


  async function fetchSongs(){
    try {
      
      let queryParam= (props.pageType==="Top Artists"? "" : `?page=${currentPage}&limit=${songsPerPage}`);
    
     const response=await fetch(`https://academics.newtonschool.co/api/v1/music/song${queryParam}`,{ headers: {
      'Authorization': 'Bearer YOUR_JWT_TOKEN',
      'projectId': 'f104bi07c490'
     }});
    let data=await response.json();
    data=data.data;
    // let atristArray=[];
    // if(props.pageType==="Top Artists"){
    //     const uniqueArtist=[];
    // }
    console.log("dataaaa",data);
    setSongDetails(data);
    localStorage.setItem('songDetails', JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
  }

  useEffect(()=>{
     fetchSongs();
  },[currentPage])

  const handleNextPage = () => {
      setCurrentPage(currentPage=> currentPage + 1);
  };

  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSongPlay = (activeSong) => {
    navigate(`/songplay`, { state: { activeSong } });
  }

  return (
    <div className={pageType==="Trending Now"? "song-page" :"links-song-page" }>
      <h1 className='trending'>{pageType}</h1>
      <div className='song-list'>
        {songDetails && songDetails.length
          && songDetails.map((item)=>{
            const activeSong=item;
            return(
            <div className='card' onClick={() => handleSongPlay(activeSong)}>
            <img className={ (pageType==="Radio Stations" || pageType==="Top Artists")? "radio-image":"card-image"} src={activeSong.artist[0].image} alt='song'/>
            <p className={pageType==="Top Artists"? "artist-page-title" :"title"}>{activeSong.title}</p>
            <p className="artists">{activeSong.artist[0].name}</p>
            {/* <i className=" make-fvrt fa-solid fa-play"></i> */}
            </div> 
            ) 
          })
          }
      </div>
      {pageType==="Trending Now"?
      <div className="pagination">
        <Link to="/"><button className="prev-btn" onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button></Link>
        <Link to="/"><button className="curr-btn">Current Page:{currentPage}</button></Link>
        <Link to="/"><button className="next-btn" onClick={handleNextPage} disabled={totalLength <=((currentPage*songsPerPage)-2)}>Next</button></Link>
      </div>
      :<div className="hidePagination"></div>
      }
    </div>
  )
}

export default SongPage