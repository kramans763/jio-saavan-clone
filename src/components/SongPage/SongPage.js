import { useState,useEffect } from "react";
import React from 'react'
import "./SongPage.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import loaderGif from "../../Assets/loader.gif";

const SongPage = (props) => {
  const [songDetails, setSongDetails] = useState([]);
  const currentPage=props.currentPage;

  let pageType=props.pageType;
  
  const navigate = useNavigate();
 const[isArtist,setIsArtist]=useState(false);
 const[isLoading, setIsLoading]=useState(true);


  async function fetchSongs(){
    try {
      const jwtToken =localStorage.getItem("authToken");
      let queryParam= (props.pageType==="Top Artists"? "" : `?page=1&limit=50`);
    
     const response=await fetch(`https://academics.newtonschool.co/api/v1/music/song${queryParam}`,{ headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'projectId': 'f104bi07c490'
     }});
    let data=await response.json();
    data=data.data;
    localStorage.setItem('songDetails', JSON.stringify(data));
    if(props.pageType==='Top Artists'){
      const uniqueArr=[];
      const arrToReturn=[];
      const unique = (data.map((item) => {
          if(!uniqueArr.includes(item.artist[0].name)){
            uniqueArr.push(item.artist[0].name);
            arrToReturn.push(item);
          }
       
      }));
      data=arrToReturn;
      setIsArtist(true)
      console.log("uniqeArr",arrToReturn);
      console.log("uniqe",uniqueArr);
    }
    console.log("dataaaa",data);
    
    await renderSongs(data,currentPage,14);
  
  } catch (error) {
    console.error('Error fetching songs:', error);
    }
    // setIsLoading(false);
  }
  async function renderSongs(data,page, limit) {

    // Calculate the start and end index for rendering based on the current page
    const startIndex = (page-1) * limit;
    const endIndex = startIndex + limit;
    const toRenderData= await data.slice(startIndex, endIndex)
    // Render the items for the current page
     setSongDetails(toRenderData);
    setIsLoading(false);
  }
  
  useEffect(()=>{
    
     fetchSongs();    
     
  },[currentPage])

 

  const handleSongPlay = (activeSong) => {
    navigate(`/songplay`, { state: { activeSong } });
  }

  
  return (
    <>
    {
      isLoading?
      <div className="loading">
        <img  src={loaderGif}/>
      </div> :
   
     <div className={pageType==="Trending Now"? "song-page" :"links-song-page" }>  
       <h1 className='trending'>{pageType}</h1>
       <div className='song-list'>
        {songDetails && songDetails.length
          && songDetails.map((item)=>{
            const activeSong=item;
            return(
            <div className='card' onClick={() => handleSongPlay(activeSong)}>
            {isArtist?<img className="radio-image" src={activeSong.artist[0].image}/>
              :  
              <img className={ (pageType==="Radio Stations" || pageType==="Top Artists")? "radio-image":"card-image"} src={activeSong.thumbnail} alt='song'/>
            }
            <p className={pageType==="Top Artists"? "artist-page-title" :"title"}>{activeSong.title}</p>
            <p className="artists">{activeSong.artist[0].name}</p>
           
            </div> 
            ) 
          })
          }
      </div>
    
    </div>
    }
    </>
  )
}

export default SongPage