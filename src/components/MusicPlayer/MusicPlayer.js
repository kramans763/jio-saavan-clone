import React, { useEffect, useState } from "react";
import "./MusicPlayer.css";
import LiveMusic from "../LiveMusic/LiveMusic";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import LeftSideNavbar from "../LeftSideNavbar/LeftSideNavbar";
import NavbarForMobile from "../Navbar/NavbarForMobile";

const MusicPlayer = () => {
  const location = useLocation();
  const { activeSong } = location.state || {};
  console.log("activeee song", activeSong);
  const id = activeSong._id;

  const title = activeSong.title;
  const artistName = activeSong.artist[0].name;
  const relatedSongsId = activeSong.artist[0].songs;
  const image = activeSong.thumbnail;
  const audioPath = activeSong.audio_url;

  // const { audioPath ,image,title,artistName, relatedSongsId} = activeSong;
  const [currentImg, setImage] = useState(image);
  const [CurrentsongTittle, setCurrentSongTitle] = useState(title);
  const [currentSongArtistName, setCurrentSongArtistName] =
    useState(artistName);
  console.log(activeSong);
  const [audio, setAudio] = useState(new Audio(audioPath));
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLiveSong, setShowLiveSong] = useState(false);
  const [relatedSongsDetails, setRelatedSongDetails] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favSongList, setFavSongList] = useState([]);
  const jwtToken =localStorage.getItem("authToken");


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
    console.log("audiiiiooo", relatedSongDetail);
    audio.pause();
    const newAudio = new Audio(relatedSongDetail.audio_url);
    newAudio.play();
    setAudio(newAudio);
    setIsPlaying(true);
    setShowLiveSong(true);
    setImage(relatedSongDetail.thumbnail);
    setCurrentSongTitle(relatedSongDetail.title);
    setCurrentSongArtistName(relatedSongDetail.artist[0].name);
  };

  useEffect(() => {
    audio.src = audioPath;
  }, [audioPath]);

  useEffect(() => {
    const songDetailsJSON = localStorage.getItem("songDetails");
    if (songDetailsJSON) {
      const songDetailsData = JSON.parse(songDetailsJSON);
      if (Array.isArray(songDetailsData)) {
        const relatedSongsDetails = relatedSongsId
          .map((relatedSongId) => {
            const relatedSong = songDetailsData.find(
              (song) => song._id === relatedSongId
            );
            if (relatedSong) {
              return relatedSong;
            }
            return null;
          })
          .filter((relatedSong) => relatedSong !== null);
        setRelatedSongDetails(relatedSongsDetails);
      }
    }
    
  }, [relatedSongsId]);
  

  async function fetchFavSongs(){
    console.log("jwt",jwtToken)
    const response= await fetch("https://academics.newtonschool.co/api/v1/music/favorites/like", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${jwtToken} `,
        'projectId': 'f104bi07c490',
        'Content-Type': "application/json"
      },
    })
    const data = await response.json();

    let listOfFavSongs = data.data.songs;
    listOfFavSongs=listOfFavSongs.map((d)=>d._id);
    console.log("list",listOfFavSongs);
    setFavSongList(listOfFavSongs);

  }
  
  const toggleFavorite = async () => {
    
    const response= await fetch("https://academics.newtonschool.co/api/v1/music/favorites/like", {
      method: "PATCH",

      body: JSON.stringify({
         "songId" : `${activeSong._id}`
      }),

      headers: {
               'Authorization': `Bearer ${jwtToken} `,
               'projectId': 'f104bi07c490',
               'Content-Type': "application/json"
      },
    })
    const data = await response.json();
     console.log("sssss",data);
      const listOfFavSongs = data.data.songs;
      setIsFavorite(!isFavorite);
      // if(listOfFavSongs.some((e)=>e._id===id)){
      //    setIsFavorite(true);
      // }else{
      //   setIsFavorite(false);
      // }
      
    
  }

  useEffect(() => {
    fetchFavSongs();
  }, [isFavorite]);
    

  return (
    <div className="home-page">
      <Navbar />
      <div className="hero">
        <div className="left-sideNavbar">
          <LeftSideNavbar />
        </div>
        <div className="main">
          <div className="music-player">
            <div className="play-song-container">
              <img className="image-details" src={currentImg} alt="img" />

              <div className="song-detail">
                <h2>{CurrentsongTittle}</h2>
                <p>
                  by {currentSongArtistName}. <span>{relatedSongsId.length} song</span>
                </p>
                <div className="playBtn-fvrt">
                  <button className="play-btn" onClick={togglePlayback}>
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                  <i
                    onClick={toggleFavorite}
                    className={
                      favSongList.includes(id)
                        ? " fvrt fa-solid fa-heart"
                        : " fvrt fa-regular fa-heart"
                    }
                  ></i>
                </div>

                {showLiveSong && (
                  <LiveMusic
                    image={image}
                    title={CurrentsongTittle}
                    artistName={currentSongArtistName}
                    audio={audio}
                    isPlaying={isPlaying}
                    togglePlayback={togglePlayback}
                    relatedSongs={relatedSongsDetails}
                    
                    updateCurrentSong={(index) => {
                      const song = relatedSongsDetails[index];
                      setImage(song.thumbnail);
                      setCurrentSongTitle(song.title);
                      setCurrentSongArtistName(song.artist[0].name);
  }}
                  />
                )}
              </div>
            </div>
            <div className="related-songs">
              <h3>Related Songs:</h3>
              <ol className="related-song-list">
                {relatedSongsDetails.map((relatedSongDetail, index) => (
                  <li
                    className="list-of-song"
                    key={index}
                    onClick={() => handleRelatedSongClick(relatedSongDetail)}
                  >
                    {relatedSongDetail.title} <span></span>
                    {relatedSongDetail.artist[0].name}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className='navbarForMobile'>
         <NavbarForMobile/>
      </div>
    </div>
  );
};

export default MusicPlayer;
