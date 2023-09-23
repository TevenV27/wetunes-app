import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Songs from './components/Songs';
import Artist from './components/Artist';
import Reproductor from './components/Reproductor';
import Cookies from 'js-cookie';

import 'animate.css';
import './App.css';

function App() {
    const [selectedSong, setSelectedSong] = useState(null);
    const [selectedArtist, setSelectedArtist] = useState({
        artistName: 'default-song',
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [whatPanelIs, setWhatPanelIs] = useState("panel-song");
    const [panelArtistDesktop, setPanelArtistDesktop] = useState("panel-artist");
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('authToken');
        localStorage.removeItem('authToken');
        navigate('/login');
        
    }

    const handleSongClick = (song) => {
        setSelectedSong({
            songName: song.nombre,
            songArtist: song.cantante,
            songImage: song.imagen,
            audioPath: song.cancion,
        });
    };

    const handleArtistClick = (artist) => {
        setSelectedArtist({
            artistName: artist.nombre,
        });

        setWhatPanelIs("panel-song");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);


    };

    const togglePanel = (option) => {
        
        switch (option) {
          case "song-panel":
            setWhatPanelIs("panel-song");
            setSelectedArtist({ artistName: 'default-song' });
            break;
          case "artist-panel":
            setWhatPanelIs("panel-artist");
            break;
          case "library-panel":
            setWhatPanelIs("panel-library");
            break;
          default:
            break;
        }
      };
      



    return (
        <main className='main-container'>
            <section className='navigation-box'>
                <div>
                    <div className='logo-box'>
                        <svg className='logo-app' xmlns="http://www.w3.org/2000/svg" id="Capa_2" data-name="Capa 2" viewBox="0 0 330.01 302">
                            <path className="cls-2" fill='#00C2FF' d="m240.77,0l-106.83,26.71S39.5,1.95,8.23,39.73c0,0-31.92,48.85,29.96,168.06,0,0-16.28,53.41,20.19,59.93,0,0-45.53-41.79,31.33-79.57,0,0,11.01-5.76,22.08-3.8l-12.38-110.73L240.77,0Z" />
                            <path className="cls-1" fill='#ffffff' d="m204.29,66.44l-83.91,33.87,11.19,114.01s2.01,41.9-45.83,56.65c0,0,41.69,49.5,118.55,23.45,0,0,125.72-46.94,125.72-132.23,0,0-2.8-43.11-89.24-91.84v88.59s21.6,34.09-11.07,61.88c-33.33,28.35-58.29,9.94-58.29,9.94,0,0-17.9-17.4-1.43-51.63,0,0,9.56-23.45,42.13-28.66l-7.82-84.03Z" />
                        </svg>
                        <h1 className='name-app'>
                            <span style={{ color: "#00C2FF" }}>We</span>Tunes
                        </h1>
                    </div>
                    <hr className='line-split' />
                </div>
                {localStorage.getItem('authToken') && (<button onClick={handleLogout} className='b-close-session'>Cerrar Sesión</button>)}
            </section>

            <section className='section-section-artist'>
                <section className='navigation-box-mobile'>
                    <div className='container-logo-app'>
                        <svg className='logo-app' xmlns="http://www.w3.org/2000/svg" id="Capa_2" data-name="Capa 2" viewBox="0 0 330.01 302">
                            <path className="cls-2" fill='#00C2FF' d="m240.77,0l-106.83,26.71S39.5,1.95,8.23,39.73c0,0-31.92,48.85,29.96,168.06,0,0-16.28,53.41,20.19,59.93,0,0-45.53-41.79,31.33-79.57,0,0,11.01-5.76,22.08-3.8l-12.38-110.73L240.77,0Z" />
                            <path className="cls-1" fill='#ffffff' d="m204.29,66.44l-83.91,33.87,11.19,114.01s2.01,41.9-45.83,56.65c0,0,41.69,49.5,118.55,23.45,0,0,125.72-46.94,125.72-132.23,0,0-2.8-43.11-89.24-91.84v88.59s21.6,34.09-11.07,61.88c-33.33,28.35-58.29,9.94-58.29,9.94,0,0-17.9-17.4-1.43-51.63,0,0,9.56-23.45,42.13-28.66l-7.82-84.03Z" />
                        </svg>
                        <h1 className='name-app '>
                            <span style={{ color: "#00C2FF" }}>We</span>Tunes
                        </h1>
                    </div>
                    <img
                        className='avatar-user'
                        src="https://static.vecteezy.com/system/resources/previews/009/267/561/original/user-icon-design-free-png.png"
                        alt=""
                        onClick={toggleMenu} // Agrega el evento onClick para abrir/cerrar el menú
                    />
                    {isMenuOpen && (
                        <div className='user-menu'>
                            <button className='edit-profile-button'>
                                <span className="material-symbols-outlined">
                                    settings
                                </span>Editar Perfil</button>
                            <button onClick={handleLogout} className='logout-button'>

                                Cerrar Sesión</button>
                        </div>
                    )}
                </section>
                <div className='container-song-artist'>

                    <div className='songs-box'>
                        <Songs
                            songArtist={selectedArtist}
                            onSongClick={handleSongClick}
                        />
                    </div>


                    <div className='rigth-panel-box'>
                        <div className='user-info-box'>

                            <span
                                className='name-user'

                            >
                                <span style={{ color: "#00C2FF" }}>Steven</span> Victoria
                            </span>
                            <img
                                className='avatar-user'
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyz-77X11MoGE22xVjjPhbpW6lPj6I0SkcTQ&usqp=CAU"
                                alt=""
                                onClick={toggleMenu} // Agrega el evento onClick para abrir/cerrar el menú
                            />
                            {isMenuOpen && (
                                <div className='user-menu'>
                                    <button className='edit-profile-button'>
                                        <span class="material-symbols-outlined">
                                            settings
                                        </span>Editar Perfil</button>
                                    <button onClick={handleLogout} className='logout-button'>

                                        Cerrar Sesión</button>
                                </div>
                            )}

                        </div>

                        <div className='artist-box'>
                            <h2 className='title-artist'>ARTISTAS</h2>
                            <Artist onArtistClick={handleArtistClick} />
                        </div>

                    </div>


                    {/* Mobile Version */}
                    {whatPanelIs == "panel-song" && (
                        <div className='songs-box-mobile'>
                            <Songs
                                songArtist={selectedArtist}
                                onSongClick={handleSongClick}
                            />
                        </div>
                    )
                    }
                    {
                        whatPanelIs == "panel-artist" && (
                            <div className='panel-artist-mobile '>
                                <div className='artist-box-mobile'>
                                    <Artist onArtistClick={handleArtistClick} />
                                </div>
                            </div>
                        )
                    }



                </div>
                <div className='song-control'>
                    {selectedSong && (
                        <Reproductor
                            songName={selectedSong.songName}
                            songArtist={selectedSong.songArtist}
                            songImage={selectedSong.songImage}
                            audioPath={selectedSong.audioPath}
                        />
                    )}
                </div>
                <div className='navigation-mobile-controls'>
                    <div className='navigation-mobile-controls-box'>

                        <span
                            onClick={() => togglePanel("song-panel")}
                            className="material-symbols-rounded b-option"
                        >
                            home
                            <p className='text-option'>
                                Inicio
                            </p>
                        </span>

                        <span
                            onClick={() => togglePanel("artist-panel")}
                            className="material-symbols-rounded b-option"
                        >
                            star
                            <p className='text-option'>
                                Artistas
                            </p>
                        </span>

                        <span
                            onClick={() => togglePanel("library-panel")}
                            className= "material-symbols-rounded b-option"
                        >
                            grading
                            <p className='text-option'>
                                Biblioteca
                            </p>
                        </span>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default App;
