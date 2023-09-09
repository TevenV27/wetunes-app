import React, { useState, useRef, useEffect } from 'react';
import '../stylesheet/reproductor.css';

const Reproductor = ({ songName, songArtist, songImage, audioPath }) => {
  const lastPlayedSong = localStorage.getItem('lastPlayedSong');
  const initialIsPlaying = lastPlayedSong === audioPath ? (localStorage.getItem('isPlaying') === 'true' || false) : false;
  const initialCurrentTime = lastPlayedSong === audioPath ? parseFloat(localStorage.getItem('currentTime')) || 0 : 0;

  const [isPlaying, setIsPlaying] = useState(initialIsPlaying);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(initialCurrentTime);
  const [volume, setVolume] = useState(1.0);

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (isPlaying && audioElement.paused) {
      audioElement.play();
    }

    if (initialCurrentTime) {
      audioElement.currentTime = initialCurrentTime;
    }

    const handleTimeUpdate = () => {
      if (audioElement.paused || audioElement.ended) {
        return;
      }

      const current = audioElement.currentTime;
      const prog = (current / duration) * 100;
      setCurrentTime(current);
      if (progressRef.current) {
        progressRef.current.style.width = `${prog}%`;
      }
    };

    const handleAudioEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (progressRef.current) {
        progressRef.current.style.width = `0%`;
      }
    };

    const savedVolume = localStorage.getItem('volume');
    if (savedVolume && audioElement) {
      audioElement.volume = parseFloat(savedVolume);
      setVolume(parseFloat(savedVolume));
    } else {
      audioElement.volume = 1.0;
    }

    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('loadedmetadata', () => {
      setDuration(audioElement.duration);
    });
    audioElement.addEventListener('error', (e) => {
      console.error("Error al cargar el audio:", e);
    });
    audioElement.addEventListener('ended', handleAudioEnd);

    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('ended', handleAudioEnd);
    };
  }, [audioPath, duration]);

  useEffect(() => {
    if (isPlaying && audioRef.current.paused) {
      audioRef.current.play();
    } else if (!isPlaying && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    localStorage.setItem('isPlaying', isPlaying);
    localStorage.setItem('currentTime', currentTime);
    localStorage.setItem('lastPlayedSong', audioPath);
  }, [isPlaying, currentTime, audioPath]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressBarClick = (e) => {
    const progressBarWidth = e.currentTarget.offsetWidth;
    const clickPositionInBar = e.clientX - e.currentTarget.offsetLeft;
    const newProgress = (clickPositionInBar / progressBarWidth) * 100;
    const newTime = (newProgress / 100) * duration;
    audioRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    localStorage.setItem('volume', newVolume.toString());
  };

  return (
    <div className="reproductor">
      <div className='information-song'>
        <div className='reproductor-imagen-box'>
          <img className="reproductor-imagen" src={songImage} alt={songName} />
        </div>
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
            ? <span className="material-symbols-outlined pause-icon">pause_circle</span>
            : <span className="material-symbols-outlined play-icon">play_circle</span>
        }</button>
      </div>
      <div className='volume-box'>
        <span className="material-symbols-outlined">volume_up</span>
        <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="reproductor-volumen"
        />
        <audio ref={audioRef} src={audioPath}></audio>
      </div>
    </div>
  );
};

export default Reproductor;
