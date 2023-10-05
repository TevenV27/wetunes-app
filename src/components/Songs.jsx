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
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setSongsData(songs);
        preloadImages(songs);
    }, []);

    useEffect(() => {
        setTogleRender(songArtist);
    }, [songArtist]);

    useEffect(() => {
        // Simula una carga ficticia con un retardo de 2 segundos (puedes ajustar esto)
        setTimeout(() => {
            setIsLoaded(true); // Cuando la carga está completa, actualiza isLoaded a true
        }, 500); // 2 segundos de retardo (ajusta según tus necesidades)
    }, []);

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
        (togleRender.artistName === 'default-song') ? (
            <div className='songs-container'>
                {imagesLoaded ? (
                    <>
                        <div className='box-input-song-name'>
                            <input
                                className='input-song-name'
                                type="text"
                                placeholder='Nombre de la canción...'
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
                                                    <span
                                                        style={{ color: song.isLike ? '#00C2FF' : '#ffffff' }}
                                                        onClick={() => {
                                                            song.isLike = !song.isLike;
                                                            setSongsData([...songsData]);
                                                        }}
                                                        className="material-symbols-rounded like-button"
                                                    >
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
                    !isLoaded ? (
                        <div className="loading-indicator">
                            <svg className='logo-app' xmlns="http://www.w3.org/2000/svg" id="Capa_2" data-name="Capa 2" viewBox="0 0 330.01 302">
                                <path className="cls-2" fill='#00C2FF' d="m240.77,0l-106.83,26.71S39.5,1.95,8.23,39.73c0,0-31.92,48.85,29.96,168.06,0,0-16.28,53.41,20.19,59.93,0,0-45.53-41.79,31.33-79.57,0,0,11.01-5.76,22.08-3.8l-12.38-110.73L240.77,0Z" />
                                <path className="cls-1" fill='#ffffff' d="m204.29,66.44l-83.91,33.87,11.19,114.01s2.01,41.9-45.83,56.65c0,0,41.69,49.50,118.55,23.45,0,0,125.72-46.94,125.72-132.23,0,0-2.8-43.11-89.24-91.84v88.59s21.6,34.09-11.07,61.88c-33.33,28.35-58.29,9.94-58.29,9.94,0,0-17.90-17.4-1.43-51.63,0,0,9.56-23.45,42.13-28.66l-7.82-84.03Z" />
                            </svg>
                            <span className="loader"></span>
                        </div>
                    ) : null
                )}
            </div>
        ) : (
            <div className='songs-container'>
                <button onClick={handleToggle} className='b-return'>
                    <span className="material-symbols-outlined icon-return">
                        keyboard_return
                    </span>
                </button>
                <article className='song-box'>
                    <div className='songs-artist-and-return'>
                        <h2 style={{ color: '#00C2FF' }}>
                            <span>Canciones de </span> {artistName}
                        </h2>
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
                                        <img className='img-song' src={song.imagen} alt="song-image" loading="lazy" draggable="false" />
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
                                        <span
                                            style={{ color: song.isLike ? '#00C2FF' : '#ffffff' }}
                                            onClick={() => {
                                                song.isLike = !song.isLike;
                                                setSongsData([...songsData]);
                                            }}
                                            className="material-symbols-rounded">
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
