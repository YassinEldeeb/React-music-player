import React from "react"
import { activeSongFN } from "../utils"
const LibrarySong = ({
  song,
  setCurrentSong,
  songsLibrary,
  songs,
  audioRef,
  isPlaying,
  setSongs,
  id,
  currentSong,
}) => {
  const selectSongHandler = async (e) => {
    await setCurrentSong(song)
    activeSongFN(songs, currentSong, setSongs)
    if (isPlaying) audioRef.current.play()

    const activeSong = songs.map((song) => {
      if (id === song.id) {
        return { ...song, active: true }
      } else {
        return { ...song, active: false }
      }
    })
    setSongs(activeSong)
  }
  return (
    <div
      className={`LibrarySong ${song.active ? "selected" : ""}`}
      onClick={selectSongHandler}
    >
      <img alt={song.name + " album image"} src={song.cover} />
      <div className='description'>
        <h2 className='songName'>{song.name}</h2>
        <h3 className='artist'>{song.artist}</h3>
      </div>
    </div>
  )
}
export default LibrarySong
