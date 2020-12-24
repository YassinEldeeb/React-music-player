import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
  faRandom,
  faInfinity,
  faVolumeDown,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons"
import { activeSongFN } from "../utils"

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  setCurrentSong,
  songs,
  setSongs,
  setRepeat,
  repeat,
  setVolume,
  volume,
  setSongVolume,
}) => {
  //Handlers
  const shuffleHandler = async () => {
    let songsref = [...songs]
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    songsref.splice(currentIndex, 1)
    let random = Math.floor(Math.random() * songsref.length)
    let randomSong = songsref[random]
    setIsPlaying(true)
    await setCurrentSong(randomSong)
    activeSongFN(songs, currentSong, setSongs)
    audioRef.current.play()
    const activeSong = songs.map((song) => {
      if (song === randomSong) {
        return { ...randomSong, active: true }
      } else {
        return { ...song, active: false }
      }
    })
    setSongs(activeSong)
  }
  const playSongHandler = () => {
    if (isPlaying === false) {
      setIsPlaying(!isPlaying)
      audioRef.current.play()
    } else {
      setIsPlaying(!isPlaying)
      audioRef.current.pause()
    }
  }
  const dragHandler = (e) => {
    setSongInfo({ ...songInfo, currentTime: e.target.value })
    audioRef.current.currentTime = e.target.value
  }
  const repeatHandler = () => {
    setRepeat(!repeat)
  }
  const changeVolumeHandler = (e) => {
    const value = e.target.value / 100
    localStorage.setItem("volume", value)
    setVolume(value)
    audioRef.current.volume = volume
    if (value === 0) audioRef.current.volume = 0
  }
  const getTime = (time) => {
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
  }
  const skipSong = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    if (direction === "back") {
      await setCurrentSong(
        songs[currentIndex === 0 ? songs.length - 1 : currentIndex - 1]
      )
      activeSongFN(
        songs,
        songs[currentIndex === 0 ? songs.length - 1 : currentIndex - 1],
        setSongs
      )
    } else {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length])
      activeSongFN(songs, songs[(currentIndex + 1) % songs.length], setSongs)
    }
    if (isPlaying) audioRef.current.play()
  }
  const volumeIcon = () => {
    if (volume >= 0.5) {
      return faVolumeUp
    } else if (volume === 0) {
      return faVolumeMute
    } else if (volume < 0.5) {
      return faVolumeDown
    }
  }
  const [activeVolume, setActiveVolume] = useState(false)
  const muteVolume = () => {
    if (volume === 0) {
      setVolume(JSON.parse(localStorage.getItem("volume")))
      audioRef.current.volume = JSON.parse(localStorage.getItem("volume"))
      return
    }
    setVolume(0)
    audioRef.current.volume = 0
  }

  return (
    <div className='player'>
      <div className='time-control'>
        <div
          className='cont'
          onMouseOver={() => {
            setActiveVolume(true)
          }}
          onMouseLeave={() => {
            setActiveVolume(false)
          }}
        >
          <FontAwesomeIcon
            onClick={muteVolume}
            className='audioSVG'
            size='2x'
            icon={volumeIcon()}
          />
          <div
            className='track2'
            style={{
              opacity: `${activeVolume ? "1" : "0"}`,
              pointerEvents: `${activeVolume ? "all" : "none"}`,
            }}
          >
            <input
              onChange={changeVolumeHandler}
              type='range'
              max='100'
              min='0'
            />
            <div
              style={{
                transform: `translateX(${volume * 100}%)`,
              }}
              className='passedVolume'
            ></div>
          </div>
        </div>
        <span className='time'>{getTime(songInfo.currentTime)}</span>
        <div
          className='track'
          style={{
            background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
          }}
        >
          <input
            className='timeInput'
            onChange={dragHandler}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type='range'
          />
          <div
            style={{
              transform: `translateX(${songInfo.animationPercentage}%)`,
            }}
            className='passedTime'
          ></div>
        </div>
        <span className='time'>
          {songInfo.duration ? getTime(songInfo.duration) : "0:00"}
        </span>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon
          onClick={shuffleHandler}
          className='shuffle'
          size='2x'
          icon={faRandom}
        />
        <FontAwesomeIcon
          onClick={() => skipSong("back")}
          className='skip-back'
          size='2x'
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className='play'
          size='2x'
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipSong("forward")}
          className='skip-next'
          size='2x'
          icon={faAngleRight}
        />
        <div className='repeatDiv'>
          <FontAwesomeIcon
            onClick={repeatHandler}
            className='repeat'
            size='2x'
            icon={faInfinity}
          />
          <div
            className={`${repeat ? "active-repeat" : ""}`}
            style={{
              background: currentSong.color[0],
              filter: `drop-shadow(0px 0px 3px ${currentSong.color[0]})`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
export default Player
