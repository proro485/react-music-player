import React from 'react';
import SongsData from '../Data';

interface Props {
  currentSong: Song;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song>>;
  isLibraryVisible: boolean;
}

interface Song {
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: string[];
}

const LibrarySidebar: React.FC<Props> = ({
  currentSong,
  setCurrentSong,
  isLibraryVisible,
}) => {
  return (
    <div
      style={{ backgroundColor: `${currentSong.color[1]}` }}
      className={`library-sidebar ${isLibraryVisible ? 'library-active' : ''}`}
    >
      <div className="title">Library</div>
      {SongsData().map((song, index) => {
        return (
          <div
            className={`song-tile ${
              currentSong.audio === song.audio ? 'active' : ''
            }`}
            key={index}
            onClick={() => setCurrentSong(song)}
          >
            <img src={song.cover} alt={song.name} />
            <div className="song-info">
              <h3>{song.name}</h3>
              <h5>{song.artist}</h5>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LibrarySidebar;
