import React from "react"

const Song = ({ currentSong, isPlaying }) => {
  return (
    <div className='song-container'>
      <img
        className={`${isPlaying ? "playing" : ""}`}
        alt={currentSong.name + " album image"}
        src={currentSong.cover}
      />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  )
}
export default Song
