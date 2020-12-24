export const activeSongFN = (songs, currentSong, setSongs) => {
  const activeSong = songs.map((song) => {
    if (currentSong.id === song.id) {
      return { ...song, active: true }
    } else {
      return { ...song, active: false }
    }
  })
  setSongs(activeSong)
}
