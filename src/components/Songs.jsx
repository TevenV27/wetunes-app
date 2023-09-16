import React, { useEffect, useState } from 'react';
import songs from '../data/Canciones.json';
import '../stylesheet/songs-style.css';

export default function Songs(props) {

    const [songsData, setSongsData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const { songArtist } = props;
    console.log(songArtist);
    const [togleRender, setTogleRender] = useState(songArtist);
    const { artistName } = songArtist;
    console.log(togleRender);

    useEffect(() => {
        setSongsData(songs);
    }, []);

    useEffect(() => {
        // Actualiza el valor de togleRender cuando songArtist cambie
        setTogleRender(songArtist);
        console.log(songArtist);
    }, [songArtist]);

    // Función para truncar el nombre de la canción o el cantante
    function truncateString(str, num) {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '...';
    }

    // Función que se llamará al hacer clic en una canción
    function handleSongClick(song) {
        props.onSongClick(song); // Estamos llamando a una función que se pasó como prop desde el componente App
    }
    function handleTogle(render) {
        console.log(render);
        setTogleRender({ artistName: 'default-song' }); // Estamos llamando a una función que se pasó como prop desde el componente App
        console.log(togleRender);
    }

    // Filtrar la lista de canciones en función del valor de búsqueda
    const filteredSongs = searchText
        ? songsData.filter((song) =>
            song.nombre.toLowerCase().includes(searchText.toLowerCase())
        )
        : songsData;

    // Extraer una lista única de géneros basada en las canciones filtradas
    const filteredGenres = [...new Set(filteredSongs.map((song) => song.genero))];

    return (
        togleRender.artistName === 'default-song'
            ?
            (
                <div className='songs-container'>
                    <div className='box-input-song-name'>

                        <input
                            className='input-song-name'
                            type="text"
                            placeholder='Nombre de la Canción...'
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    {filteredGenres.map((genre, genreIndex) => (
                        <article className='song-box' key={genreIndex}>
                            <div className='genre-box'>
                                <h2 className='genre-name'>{genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
                            </div>
                            <div className='section-song'>
                                {filteredSongs
                                    .filter((song) => song.genero === genre)
                                    .map((song, songIndex) => (
                                        <div className='card-song' key={songIndex}>
                                            <div className='img-song-box'>
                                                <img className='img-song' src={song.imagen} alt="song-image" />
                                                <span onClick={() => handleSongClick(song)} className="material-icons play-song-icon">
                                                    play_circle
                                                </span>
                                            </div>
                                            <div className='description-song'>
                                                <div className='song-info'>
                                                    <p className='song-name'>{truncateString(song.nombre, 15)}</p>
                                                    <p className='artist-name'>
                                                        {truncateString(
                                                            Array.isArray(song.cantante) ? song.cantante.join(', ') : song.cantante,
                                                            20
                                                        )}
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
            :
            (
                <div className='songs-container'>
                    <article className='song-box'>
                        <div className='songs-artist-and-return'>
                            <button onClick={() => handleTogle('default-song')} className='b-return'>
                                <span class="material-symbols-outlined icon-return">
                                    keyboard_return
                                </span>
                            </button>
                            <h2 style={{ color: '#00C2FF' }}><span>Canciones de </span> {artistName}</h2>

                        </div>

                        <div className='section-song'>
                            {songsData
                                .filter((song) => {
                                    if (Array.isArray(song.cantante)) {
                                        // Si song.cantante es un array, verifica si artistName está en él
                                        return song.cantante.some((name) => name === artistName);
                                    } else {
                                        // Si song.cantante no es un array, simplemente compara con artistName
                                        return song.cantante === artistName;
                                    }
                                })
                                .map((song, songIndex) => (
                                    <div className='card-song' key={songIndex}>
                                        <div className='img-song-box'>
                                            <img className='img-song' src={song.imagen} alt="song-image" />
                                            <span onClick={() => handleSongClick(song)} className="material-icons play-song-icon">
                                                play_circle
                                            </span>
                                        </div>
                                        <div className='description-song'>
                                            <div className='song-info'>
                                                <p className='song-name'>{truncateString(song.nombre, 15)}</p>
                                                <p className='artist-name'>
                                                    {truncateString(
                                                        Array.isArray(song.cantante) ? song.cantante.join(', ') : song.cantante,
                                                        20
                                                    )}
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
                </div>
            )
    );
}
