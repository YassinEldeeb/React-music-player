import React, { useRef, useEffect } from "react"
import LibrarySong from "./LibrarySong"
import SwitchTheme from "./SwitchTheme"
const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  theme,
  setTheme,
  libraryStatus,
  currentSong,
}) => {
  const songsLibrary = useRef(null)
  useEffect(() => {
    //Scroll to selected
    const index = songs.findIndex((e) => e.id === currentSong.id)
    const children = [...songsLibrary.current.children]
    let scrolledLength = 0
    children.forEach((e, i) =>
      i < index ? (scrolledLength += e.offsetHeight) : ""
    )
    songsLibrary.current.scrollTop = scrolledLength
  }, [currentSong])
  return (
    <div className={`Library ${libraryStatus ? "Library-active" : ""}`}>
      <h1 className='Library-label'>Library</h1>
      <div ref={songsLibrary} className='songsLib'>
        {songs.map((song) => (
          <LibrarySong
            currentSong={currentSong}
            setSongs={setSongs}
            isPlaying={isPlaying}
            setCurrentSong={setCurrentSong}
            key={song.id}
            song={song}
            songsLibrary={songsLibrary}
            songs={songs}
            audioRef={audioRef}
            id={song.id}
          />
        ))}
      </div>
      <div className='switchSection'>
        <SwitchTheme theme={theme} setTheme={setTheme} />
      </div>
    </div>
  )
}

export default Library
