import React, { useEffect, useState } from 'react';
import songs from '../data/Canciones.json';
import '../stylesheet/songs-style.css';

export default function Songs(props) {
    const [songsData, setSongsData] = useState([]);

    useEffect(() => {
        setSongsData(songs);
    }, []);

    // Función para truncar el nombre de la canción o el cantante
    function truncateString(str, num) {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '...';
    }

    // Función que se llamará al hacer click en una canción
    function handleSongClick(song) {
        props.onSongClick(song); // Estamos llamando a una función que se pasó como prop desde el componente App
    }

    // Extraer una lista única de géneros
    const genres = [...new Set(songsData.map(song => song.genero))];

    return (
        <div className='songs-container'>
            {genres.map((genre, genreIndex) => (
                <article className='song-box' key={genreIndex}>
                    <div className='genre-box'>
                        <h2 className='genre-name'>{genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
                    </div>
                    <div className='section-song'>
                        {songsData.filter(song => song.genero === genre).map((song, songIndex) => (
                            <div className='card-song' key={songIndex}>
                                <div className='img-song-box'>
                                    <img className='img-song' src={song.imagen} alt="song-image" />
                                    <span onClick={() => handleSongClick(song)} className="material-symbols-outlined play-song-icon">
                                        play_circle
                                    </span>
                                </div>
                                <div className='description-song'>
                                    <div className='song-info'>
                                        <p className='song-name'>{truncateString(song.nombre, 15)}</p>
                                        <p className='artist-name'>
                                            {truncateString(Array.isArray(song.cantante) ? song.cantante.join(', ') : song.cantante, 20)}
                                        </p>
                                    </div>
                                    <span className="material-symbols-outlined">
                                        favorite
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            ))}
        </div>
    )
}
