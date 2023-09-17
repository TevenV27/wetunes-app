import React, { useState, useEffect, useMemo } from 'react';
import artist from '../data/artistas.json';
import '../stylesheet/artist-style.css';

export default function Artist(props) {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Precarga las imágenes de los artistas
    preloadImages(artist);
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleArtistClick = (artist) => {
    props.onArtistClick(artist);
  };

  // Filtrar la lista de artistas en función del valor de búsqueda (memoizado)
  const filteredArtists = useMemo(() => {
    return artist.filter((artist) =>
      artist.nombre.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  // Función para precargar imágenes
  function preloadImages(artistsToPreload) {
    artistsToPreload.forEach((artist) => {
      const img = new Image();
      img.src = artist.imagen;
    });
  }

  return (
    <>
      <input
        className='input-name-artist'
        type="text"
        placeholder='Nombre del Artista...'
        value={searchText}
        onChange={handleSearchInputChange}
      />

      <div className='artist-container'>

        {filteredArtists.map((artist, artistIndex) => (
          <div className='artist-card' onClick={() => handleArtistClick(artist)} key={artistIndex}>
            <img className='img-artist' src={artist.imagen} alt="artist-image" />
            <p className='name-artist'> {artist.nombre}</p>
          </div>
        ))}
      </div>
    </>

  );
}
