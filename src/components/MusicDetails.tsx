import React from 'react';

interface Props {
  currentSong: Song;
  setIsLibraryVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Song {
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: string[];
}

const MusicDetails: React.FC<Props> = ({
  currentSong: { name, cover, artist },
  setIsLibraryVisible,
}) => {
  return (
    <div className="music-details">
      <img src={cover} alt={name} />
      <h1>{name}</h1>
      <h2>{artist}</h2>
    </div>
  );
};

export default MusicDetails;
