import React , {useState, useEffect}from 'react'
import artist from '../data/artistas.json'
import '../stylesheet/artist-style.css'
export default function Artist() {
    const [artistData, setArtistData] = useState([]);

    useEffect(() => {
        setArtistData(artist);
    }, []);

    return (
        <div className='artist-container' >

            {artistData.map((artist, artistIndex) => (
                <div className='artist-card' key={artistIndex}>
                    <img className='img-artist' src={artist.imagen} alt="artist-image" />
                    <p className='name-artist'> {artist.nombre}</p>
                </div>
            ))}

        </div>
    )
}
