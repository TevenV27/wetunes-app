import { useState } from 'react';
import Songs from './components/Songs';
import Artist from './components/Artist';
import './App.css';
import Reproductor from './components/Reproductor';

function App() {

    // 1. Estado inicial para la canción seleccionada será null.
    const [selectedSong, setSelectedSong] = useState(true);

    return (
        <main className='main-container'>
            <section className='navigation-box'>
                <div className='logo-box'>
                    <h1 className='name-app'> <span style={{ color: "#00C2FF" }}>We</span>Tunes</h1>
                    <hr className='line-split' />
                </div>
                <button className='b-close-session'> Cerrar Sesión</button>
            </section>


            <section className='section-section-artist'>
                <section className='navigation-box-mobile'>
                    <div>
                        <h1 className='name-app'><span style={{ color: "#00C2FF" }}>We</span>Tunes</h1>
                    </div>
                    <button className='b-menu'>
                        <span class="material-symbols-outlined menu-icon">
                            menu
                        </span>
                    </button>
                </section>
                <div className='container-song-artist'>

                    <div className='songs-box'>
                        {/* Pasamos la función setSelectedSong como prop */}
                        <Songs onSongClick={song => setSelectedSong({
                            songName: song.nombre,
                            songArtist: song.cantante,
                            songImage: song.imagen,
                            audioPath: song.cancion,
                        })} />
                    </div>

                    <div className='rigth-panel-box'>
                        <div className='user-info-box'>
                            <span><span style={{ color: "#00C2FF" }}>Steven</span> Victoria</span>
                            <img className='avatar-user' src="https://pbs.twimg.com/profile_images/1471595683660587010/p-wPFxIp_400x400.jpg" alt="" />
                        </div>
                        <div className='artist-box'>
                            <h2 className='title-artist'>ARTISTAS</h2>
                            <Artist />
                        </div>
                    </div>





                </div>

                <div className='song-control'>
                    {/* Renderizamos Reproductor solo si hay una canción seleccionada */}
                    {selectedSong && (
                        <Reproductor
                            songName={selectedSong.songName}

                            songArtist={selectedSong.songArtist}
                            songImage={selectedSong.songImage}
                            audioPath={selectedSong.audioPath}

                        />

                    )}
                </div>

            </section>
        </main>
    )
}

export default App;
