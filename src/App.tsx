import React, { useState, useRef, useEffect } from 'react';
import LibrarySidebar from './components/LibrarySidebar';
import MusicDetails from './components/MusicDetails';
import Navbar from './components/Navbar';
import PlayerControls from './components/PlayerControls';
import SongsData from './Data';
import './styles/app.scss';

interface Song {
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: string[];
}

function App() {
  const songs = SongsData();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentSong, setCurrentSong] = useState<Song>(songs[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLibraryVisible, setIsLibraryVisible] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.background = `linear-gradient(180deg, ${currentSong.color[0]}, ${currentSong.color[1]}) center center fixed`;
  }, [currentSong]);

  return (
    <div className="App">
      <LibrarySidebar
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        isLibraryVisible={isLibraryVisible}
      />
      <div
        className={`music-player ${isLibraryVisible ? 'library-shown' : ''}`}
      >
        <Navbar setIsLibraryVisible={setIsLibraryVisible} />
        <MusicDetails
          currentSong={currentSong}
          setIsLibraryVisible={setIsLibraryVisible}
        />
        <PlayerControls
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
          autoPlay={autoPlay}
        />
      </div>
    </div>
  );
}

export default App;
