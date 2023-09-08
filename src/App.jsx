import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Songs from './components/Songs'
import Artist from './components/Artist'
import './App.css'
import Reproductor from './components/Reproductor'

function App() {
  const [count, setCount] = useState(0)

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
        <div className='container-song-artist'>
          <div className='songs-box'>

            <Songs />
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
          <Reproductor
            songName="Deseandote"
            songImage="https://i1.sndcdn.com/artworks-000579930905-ytj92d-t500x500.jpg"
            audioPath="https://manzdev.github.io/codevember2017/assets/eye-tiger.mp3"
          />
        </div>

      </section>


    </main>
  )
}

export default App
