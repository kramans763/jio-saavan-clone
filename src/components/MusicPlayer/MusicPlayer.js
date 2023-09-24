import React, { useEffect, useState } from 'react'
import "./MusicPlayer.css";
import LiveMusic from '../LiveMusic/LiveMusic';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import LeftSideNavbar from '../LeftSideNavbar/LeftSideNavbar';

const MusicPlayer = () => {

  const location = useLocation();
  const { activeSong } = location.state || {};
  console.log("activeee song", activeSong);
  const id=activeSong._id
  const title=activeSong.title
  const artistName=activeSong.artist[0].name;
  const relatedSongsId=activeSong.artist[0].songs
  const image=activeSong.artist[0].image
  const audioPath=activeSong.audio_url;

  // const { audioPath ,image,title,artistName, relatedSongsId} = activeSong;
  const[currentImg,setImage]=useState(image);
  const[CurrentsongTittle,setCurrentSongTitle]=useState(title);
  const[currentSongArtistName,setCurrentSongArtistName]=useState(artistName);
  console.log(activeSong);
  const [audio,setAudio] = useState(new Audio(audioPath));
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLiveSong, setShowLiveSong] = useState(false);
  const [relatedSongsDetails, setRelatedSongDetails] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);



  // Play audio function
  const togglePlayback = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
    setShowLiveSong(true); // Show the LiveSongPlay component when playing.
  };

  const handleRelatedSongClick = (relatedSongDetail) => {
    console.log("audiiiiooo",relatedSongDetail);
    audio.pause();
    const newAudio = new Audio(relatedSongDetail.audio_url);
    newAudio.play();
    setAudio(newAudio);
    setIsPlaying(true);
    setShowLiveSong(true);
    setImage(relatedSongDetail.artist[0].image)
    setCurrentSongTitle(relatedSongDetail.title);
    setCurrentSongArtistName(relatedSongDetail.artist[0].name);
  };


  useEffect(() => {
    audio.src = audioPath;
  }, [audioPath]);


  useEffect(() => {
    
    const songDetailsJSON = localStorage.getItem('songDetails');
    if (songDetailsJSON) {
      const songDetailsData = JSON.parse(songDetailsJSON);
      if (Array.isArray(songDetailsData)) {
        const relatedSongsDetails = relatedSongsId.map(relatedSongId => {
          const relatedSong = songDetailsData.find(song => song._id === relatedSongId);
          if (relatedSong) {
            return relatedSong;
          }
          return null;
        }).filter(relatedSong => relatedSong !== null);;
        setRelatedSongDetails(relatedSongsDetails);
      }
    }
  }, [relatedSongsId]);

  useEffect(() => {
    // Get the current list of favorites from local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the activeSong is in the favorites list
    const isCurrentlyFavorite = favorites.some(fav => fav._id === activeSong._id);

    // Set the initial favorite state
    setIsFavorite(isCurrentlyFavorite);
  }, [activeSong]);
  const toggleFavorite = async() => {
       const response=fetch(`https://academics.newtonschool.co/api/v1/music/favorites/like`,{
       Method: 'PATCH',
       headers: {
           'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGU4ZWY3ODFhY2I2ZDJmMGQxYTdmMSIsImlhdCI6MTY5NTQ1MjkyNywiZXhwIjoxNzI2OTg4OTI3fQ.riNZEylklkCG3Nvs5DAHlEJ5SGEqXqSmSxl3Qp7-i_o',
            'projectId': 'f104bi07c490'
       },
       Body: { "songId" : activeSong._id },
      }
       )

    // setIsFavorite(!isFavorite);
    // const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // const isCurrentlyFavorite = favorites.some(fav => fav._id === activeSong._id);
  
    // if (isCurrentlyFavorite) {
    //   // Remove the song from favorites
    //   const updatedFavorites = favorites.filter(fav => fav._id !== activeSong._id);
    //   localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    // } else {
    //   // Add the song to favorites
      // favorites.push(activeSong);
    //   localStorage.setItem('favorites', JSON.stringify(favorites));
    // }
  
    
  };
  // console.log("matccchhhhhhhee",matchedSongs);


return (
  <div className='home-page'>
      <Navbar />
      <div className='hero'>
        <div className='left-sideNavbar'>
            <LeftSideNavbar />
        </div>
      <div className='main'> 
      <div className='music-player'>
        <div className='play-song-container'>
          <img className='image-details' src={image} alt='img'/>
        
          <div className='song-detail'>
            <h2>{title}</h2>
            <p>by {artistName}. <span>{relatedSongsId.length} song</span></p>
            <div className='playBtn-fvrt'>
                <button className='play-btn' onClick={togglePlayback}>{isPlaying ? 'Pause' : 'Play'}</button>
                <i onClick={toggleFavorite} className= {isFavorite? " fvrt fa-solid fa-heart": " fvrt fa-regular fa-heart"}></i>
            </div>
     
          {showLiveSong && <LiveMusic 
                                 image={currentImg} title={CurrentsongTittle} 
                                 artistName={currentSongArtistName} audio={audio} 
                                 isPlaying={isPlaying} togglePlayback={togglePlayback}
                              />
            }
           </div>      
          </div>
        <div className='related-songs'>
        <h3>Related Songs:</h3>
        <ol className='related-song-list'>
          {relatedSongsDetails.map((relatedSongDetail, index) => (
            <li className='list-of-song' key={index} onClick={() => handleRelatedSongClick(relatedSongDetail)} >
              {relatedSongDetail.title} <span></span>
              {relatedSongDetail.artist[0].name}
            </li>
        
           ))}
          </ol>
        </div>
      </div>
      </div> 
    </div>
  </div>
  )
}

export default MusicPlayer