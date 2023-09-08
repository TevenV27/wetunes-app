import React, { useState, useRef, useEffect } from 'react';
import '../stylesheet/reproductor.css';

const Reproductor = ({ songName, songArtist, songImage, audioPath, }) => {
  console.log(songName)
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef(null);
  const progressRef = useRef(null); // Referencia para el div de progreso

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('loadedmetadata', () => {
      setDuration(audioElement.duration);
    });
    audioElement.addEventListener('error', (e) => {
      console.error("Error al cargar el audio:", e);
    });

    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const prog = (current / duration) * 100;
    setCurrentTime(current);
    if (progressRef.current) {
      progressRef.current.style.width = `${prog}%`;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressBarClick = (e) => {
    const progressBarWidth = e.currentTarget.offsetWidth;
    const clickPositionInBar = e.clientX - e.currentTarget.offsetLeft;
    const newProgress = (clickPositionInBar / progressBarWidth) * 100;
    const newTime = (newProgress / 100) * duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="reproductor">
      <div className='information-song'>
        <img className="reproductor-imagen" src={songImage} alt={songName} />
        <div className='box-name-artist'>
          <p className="reproductor-nombre">{songName}</p>
          <p className='reproductor-cantante'>
            {Array.isArray(songArtist) ? songArtist.join(', ') : songArtist}
          </p>
        </div>


      </div>

      <div className='reproductor-controls'>
        <span className="reproductor-tiempo">{Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)}</span>
        <div className="reproductor-barra" onClick={handleProgressBarClick}>
          <div ref={progressRef} className="reproductor-progreso"></div>
        </div>
        <span className="reproductor-duracion">{Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}</span>
        <button onClick={togglePlay} className="reproductor-boton">{
          isPlaying
            ?
            <span className="material-symbols-outlined pause-icon">
              pause_circle
            </span>
            : <span className="material-symbols-outlined play-icon">
              play_circle
            </span>}
        </button>
      </div>
      <div className='volume-box'>
        <span class="material-symbols-outlined">
          volume_up
        </span>
        <input type="range" min="0" max="1" step="0.01" defaultValue="1" onChange={e => audioRef.current.volume = e.target.value} className="reproductor-volumen" />
        <audio ref={audioRef} src={audioPath}></audio>
        {
          console.log(songArtist)


        }
      </div>

    </div>
  );
};

export default Reproductor;