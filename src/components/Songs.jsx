import React, { useEffect, useState } from 'react'
import songs from '../data/Canciones.json'
import '../stylesheet/songs-style.css'

export default function Songs() {
    const [songsData, setSongsData] = useState([]);

    useEffect(() => {
        setSongsData(songs);
    }, []);

    // Extraer una lista única de géneros
    const genres = [...new Set(songsData.map(song => song.genero))];

    return (
        <div className='songs-container'>
            
            {genres.map((genre, genreIndex) => (
                <article className='song-box' key={genreIndex}>

                    <div className='genre-box'>
                        <h2 className='genre-name'>{genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
                    </div>
                    
                    <div className='card-song'>
                        {songsData.filter(song => song.genero === genre).map((song, songIndex) => (
                            <div key={songIndex}>
                                <img className='img-song' src={song.imagen} alt="song-image" />
                                <div>
                                    <p>{song.nombre}</p>
                                    <p>
                                        {Array.isArray(song.cantante) ? song.cantante.join(', ') : song.cantante}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            ))}
        </div>
    )
}
