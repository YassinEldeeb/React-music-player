import React, { useState, useRef } from "react"
import "./styles/app.scss"
//Components
import Song from "./components/Song"
import Player from "./components/Player"
import Library from "./components/Library"
import Nav from "./components/Nav"
import data from "./data"

function App() {
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime
    const duration = e.target.duration
    const precentage = Math.round(
      (Math.round(current) / Math.round(duration)) * 100
    )

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: precentage,
    })
  }

  //Ref
  const audioRef = useRef(null)
  //State
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  })
  const themeLocal = localStorage.getItem("theme")
  if (themeLocal === null) {
    localStorage.setItem("theme", "Light")
  }
  const [theme, setTheme] = useState(themeLocal)
  const [libraryStatus, setLibraryStatus] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const volumeStorage = () =>
    localStorage.getItem("volume") ? localStorage.getItem("volume") : 1

  const [volume, setVolume] = useState(JSON.parse(volumeStorage()))

  const songEndHandler = async () => {
    if (repeat) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
      return
    }
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    await setCurrentSong(songs[[(currentIndex + 1) % songs.length]])
    if (isPlaying) audioRef.current.play()
  }
  const setSongVolume = () => {
    audioRef.current.volume = volumeStorage()
  }
  return (
    <div
      className={`App ${theme === "Dark" ? "DarkTheme" : ""} ${
        libraryStatus ? "active-library" : ""
      }`}
    >
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        setSongVolume={setSongVolume}
        volume={volume}
        setVolume={setVolume}
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        setRepeat={setRepeat}
        repeat={repeat}
      />
      <Library
        currentSong={currentSong}
        songs={songs}
        libraryStatus={libraryStatus}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        theme={theme}
        setTheme={setTheme}
      />
      <audio
        onLoadedMetadataCapture={setSongVolume}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  )
}

export default App
