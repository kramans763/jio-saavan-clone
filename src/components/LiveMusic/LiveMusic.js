import React,{useState,useEffect, useRef} from 'react'
import "./LiveMusic.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faBackward, faForward,faVolumeUp } from '@fortawesome/free-solid-svg-icons';
const LiveMusic = (props) => {
  const
    {audio,
     isPlaying,
     togglePlayback,
     title,
     image,
     artistName,
     relatedSongs,
     updateCurrentSong,
    }=props;

  

  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const progressBarRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);


// Update the currentTime and totalTime when the audio is loaded....

  useEffect(() => {
    const updateTimes = () => {
      setCurrentTime(audio.currentTime);
      setTotalTime(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTimes);

    // Cleanup the event listener on unmount
    return () => audio.removeEventListener('timeupdate', updateTimes);
  }, [audio]);
 

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };
  const adjustVolume = (event) => {
    const newVolume = event.target.value;
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  const formattedTime = formatTime(currentTime);
  const formattedTotalTime = formatTime(totalTime);

  
    const playCurrentSong = (index) => {
      const song = relatedSongs[index];
      audio.src = song.audio_url;
      audio.play();
      setCurrentSongIndex(index);
      updateCurrentSong(index); 
    };

    
    const goBackward = () => {
      if (currentSongIndex > 0) {
        playCurrentSong(currentSongIndex - 1);
      }
    };

    // Implement the "go forward" logic
    const goForward = () => {
      if (currentSongIndex < relatedSongs.length - 1) {
        playCurrentSong(currentSongIndex + 1);
      }
    };

    // ...



  const handleProgressBarChange = (event) => {
    const newCurrentTime = (event.target.value / 100) * audio.duration;
    audio.currentTime = newCurrentTime;
  };

  return (
     <div className='live-music'>
       <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={(audio.currentTime / audio.duration) * 100}
        onChange={handleProgressBarChange}
        className="progress-bar-top"
        ref={progressBarRef}
      />
  
      {/* <div id="progress-bar-top">
         <div id="progress-bar" onClick={handleProgressBarClick} style={{ width: `${(currentTime / totalTime) * 100}%` }}></div>
      </div> */}
        <div className='left-live-music'>
           <img src={image} alt='img' />
           <p>{title} <br/>{artistName}</p>
           
        </div>

        <div className='center-live-music'>
            <button onClick={goBackward}>
               <FontAwesomeIcon icon={faBackward} />
            </button>
            <button onClick={togglePlayback}>
               {isPlaying ? (
                 <FontAwesomeIcon icon={faPause} />
               ) : (
                 <FontAwesomeIcon icon={faPlay} />
               )}
            </button>
           <button onClick={goForward}>
              <FontAwesomeIcon icon={faForward} />
           </button>

        </div>

        <div className='right-live-music'>
             {formattedTime} / {formattedTotalTime}
             <div className="volume-icon" onClick={toggleVolumeSlider}>
                 <FontAwesomeIcon icon={faVolumeUp} />
                 {showVolumeSlider && (
                   <input
                     type="range"
                     min="0"
                     max="1"
                    step="0.01"
                    value={volume}
                    onChange={adjustVolume}
                    className="volume-slider-custom"
                   />
                  )}
               </div>
              </div>
    </div>
    
  )
}

export default LiveMusic