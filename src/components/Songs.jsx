import React, { useEffect, useState, useMemo } from 'react';
import songs from '../data/Canciones.json';
import '../stylesheet/songs-style.css';

export default function Songs(props) {
    const { songArtist } = props;
    const { artistName } = songArtist;

    const [songsData, setSongsData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [togleRender, setTogleRender] = useState(songArtist);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        setSongsData(songs);
        preloadImages(songs);
    }, []);

    useEffect(() => {
        setTogleRender(songArtist);
    }, [songArtist]);

    const memoizedFilteredSongs = useMemo(() => {
        return filteredSongs();
    }, [searchText, songsData]);

    const memoizedFilteredGenres = useMemo(() => {
        return [...new Set(memoizedFilteredSongs.map((song) => song.genero))];
    }, [memoizedFilteredSongs]);

    function filteredSongs() {
        return searchText
            ? songsData.filter((song) =>
                song.nombre.toLowerCase().includes(searchText.toLowerCase())
            )
            : songsData;
    }

    function preloadImages(songsToPreload) {
        const imagesToPreload = songsToPreload.map((song) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = song.imagen;
                img.onload = resolve;
                img.onerror = resolve;
            });
        });

        Promise.all(imagesToPreload)
            .then(() => {
                setImagesLoaded(true);
            })
            .catch(() => {
                console.error('Error al precargar imágenes');
                setImagesLoaded(true);
            });
    }

    function truncateString(str, num) {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '...';
    }

    function handleSongClick(song) {
        props.onSongClick(song);
    }

    function handleToggle() {
        setTogleRender({ artistName: 'default-song' });
    }

    return (
        (togleRender.artistName === 'default-song')
            ? (
                <div className='songs-container'>
                    {imagesLoaded ? (
                        <>
                            <div className='box-input-song-name'>
                                <input
                                    className='input-song-name'
                                    type="text"
                                    placeholder='Nombre de la Canción...'
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </div>
                            {memoizedFilteredGenres.map((genre, genreIndex) => (
                                <article className='song-box' key={genreIndex}>
                                    <div className='genre-box'>
                                        <h2 className='genre-name'>{genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
                                    </div>
                                    <div className='section-song'>
                                        {memoizedFilteredSongs
                                            .filter((song) => song.genero === genre)
                                            .map((song, songIndex) => (
                                                <div className='card-song' key={songIndex}>
                                                    <div className='img-song-box'>
                                                        <img className='img-song' src={song.imagen} alt="song-image" loading="lazy" />
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
                        </>
                    ) : (
                        <div className="loading-indicator">
                            <p>Cargando imágenes...</p>
                        </div>
                    )}
                </div>
            )
            : (
                <div className='songs-container'>
                    <article className='song-box'>
                        <div className='songs-artist-and-return'>
                            <button onClick={handleToggle} className='b-return'>
                                <span className="material-symbols-outlined icon-return">
                                    keyboard_return
                                </span>
                            </button>
                            <h2 style={{ color: '#00C2FF' }}><span>Canciones de </span> {artistName}</h2>
                        </div>
                        <div className='section-song'>
                            {songsData
                                .filter((song) => {
                                    if (Array.isArray(song.cantante)) {
                                        return song.cantante.some((name) => name === artistName);
                                    } else {
                                        return song.cantante === artistName;
                                    }
                                })
                                .map((song, songIndex) => (
                                    <div className='card-song' key={songIndex}>
                                        <div className='img-song-box'>
                                            <img className='img-song' src={song.imagen} alt="song-image" loading="lazy" />
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
