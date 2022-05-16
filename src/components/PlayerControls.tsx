import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import SongsData from '../Data';

interface Props {
  currentSong: Song;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  autoPlay: boolean;
}

interface Song {
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: string[];
}

const PlayerControls: React.FC<Props> = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  autoPlay,
}) => {
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  return (
    <div className="player-controls">
      <Timeline
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        duration={duration}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
      />
      <PlayerButtons
        audio={currentSong.audio}
        audioRef={audioRef}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentTime={setCurrentTime}
        duration={duration}
        setDuration={setDuration}
        autoPlay={autoPlay}
      />
    </div>
  );
};

export default PlayerControls;

interface TimelineProps {
  currentTime: number | null;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  duration: number | null;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const Timeline: React.FC<TimelineProps> = ({
  currentTime,
  setCurrentTime,
  duration,
  setIsPlaying,
  audioRef,
}) => {
  const handleSeeking: React.ReactEventHandler<HTMLInputElement> = (e) => {
    setCurrentTime(e.currentTarget.valueAsNumber);

    if (audioRef !== null && audioRef.current !== null) {
      audioRef.current.currentTime = e.currentTarget.valueAsNumber;
    }
  };

  const timeFormatter = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="timeline">
      <p>{timeFormatter(currentTime || 0)}</p>
      <input
        type="range"
        value={currentTime || 0}
        min={0}
        max={duration || 0}
        step={1}
        onChange={handleSeeking}
      />
      <p>{timeFormatter(duration || 0)}</p>
    </div>
  );
};

interface PlayerButtonsProps {
  audio: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  autoPlay: boolean;
}

const PlayerButtons: React.FC<PlayerButtonsProps> = ({
  audio,
  audioRef,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  setCurrentTime,
  duration,
  setDuration,
  autoPlay,
}) => {
  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioRef?.current?.pause();
    } else {
      setIsPlaying(true);
      audioRef?.current?.play();
    }
  };

  const handlePrevious = async () => {
    const songs = SongsData();
    const index = songs.findIndex((song) => song.audio === audio);
    setCurrentSong(songs[index < songs.length - 1 ? index + 1 : 0]);
    setIsPlaying(true);
  };

  const handleForward = async () => {
    const songs = SongsData();
    const index = songs.findIndex((song) => song.audio === audio);
    setCurrentSong(songs[index < songs.length - 1 ? index + 1 : 0]);
    setIsPlaying(true);
  };

  const autoPlayHandler = async () => {
    const songs = SongsData();
    const index = songs.findIndex((song) => song.audio === audio);
    setCurrentSong(songs[index < songs.length - 1 ? index + 1 : 0]);
  };

  const handleAfterLoading: React.ReactEventHandler<HTMLAudioElement> = (e) => {
    setDuration(e.currentTarget.duration);
    if (isPlaying) {
      audioRef?.current?.play();
    }
  };

  const updateTimeHandler: React.ReactEventHandler<HTMLAudioElement> = (e) => {
    setCurrentTime(e.currentTarget.currentTime);
    if (duration === null) {
      setDuration(e.currentTarget.duration);
    }
  };

  return (
    <div className="player-buttons">
      <FontAwesomeIcon
        className="skip-back"
        icon={faAngleLeft}
        size="2x"
        onClick={handlePrevious}
      />
      <FontAwesomeIcon
        className="play"
        onClick={handlePlay}
        icon={isPlaying ? faPause : faPlay}
        size="2x"
      />
      <FontAwesomeIcon
        className="skip-forward"
        icon={faAngleRight}
        size="2x"
        onClick={handleForward}
      />
      <audio
        src={audio}
        ref={audioRef}
        onTimeUpdate={updateTimeHandler}
        onLoadedMetadata={handleAfterLoading}
        onEnded={autoPlay ? autoPlayHandler : undefined}
      />
    </div>
  );
};
