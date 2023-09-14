import React, { useState, useEffect } from 'react';
import artist from '../data/artistas.json';
import '../stylesheet/artist-style.css';

export default function Artist() {
  const [artistData, setArtistData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setArtistData(artist);
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  // Filtrar la lista de artistas en función del valor de búsqueda
  const filteredArtists = artistData.filter((artist) =>
    artist.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className='artist-container'>
      <input
        className='input-name-artist'
        type="text"
        placeholder='Nombre'
        value={searchText}
        onChange={handleSearchInputChange}
      />
      {filteredArtists.map((artist, artistIndex) => (
        <div className='artist-card' key={artistIndex}>
          <img className='img-artist' src={artist.imagen} alt="artist-image" />
          <p className='name-artist'> {artist.nombre}</p>
        </div>
      ))}
    </div>
  );
}
