import React, { useState, useRef, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './App.css';
/* MP3 Songs(Imported) */
import graveyardMp3 from './assets/Mp3/Cleffy -  Meet you at the Graveyard (Official Lyric Video).mp3';
import rotatedEarthMp3 from './assets/Mp3/PETROS - Rotated Earth ( Official Video ) Dir.by @nashbrowin.mp3';
import novocaineMp3 from './assets/Mp3/Too Close To Touch & Bad Omens - _Novocaine_.mp3';
import razorbackMp3 from './assets/Mp3/Resentvul - Razorback (Lyrics).mp3';
import scarsMp3 from './assets/Mp3/scars - Novulent [Official Music Video].mp3';





/* Albun Cover Images(Imported) */
import graveyardImg from './assets/Img/Graveyard.jpeg';
import rotatedEarthImg from './assets/Img/Rotated Earth.jpeg';
import novocaineImg from './assets/Img/Novocaine.jpeg';
import razorbackImg from './assets/Img/Razorback.jpeg';
import scarsImg from './assets/Img/Scars.jpeg';






const tracks = [
  {
    name: 'Graveyard',
    url: graveyardMp3,
    image: graveyardImg,
  },
  {
    name: 'Rotated Earth',
    url: rotatedEarthMp3,
    image: rotatedEarthImg,
  },
  {
    name: 'Novocaine',
    url: novocaineMp3,
    image: novocaineImg,
  },
  {
    name: 'Razorback',
    url: razorbackMp3,
    image: razorbackImg,
  },
  {
    name: 'Scars',
    url: scarsMp3,
    image: scarsImg,
  },
];

const useAudioPlayer = (tracks) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playPause = () => {
    const audioElement = audioRef.current.audioEl.current;
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => setCurrentTrack((currentTrack + 1) % tracks.length);
  const prevTrack = () => setCurrentTrack((currentTrack - 1 + tracks.length) % tracks.length);

  useEffect(() => {
    const handleEnded = () => {
      nextTrack();
      setIsPlaying(true);
    };
    const audioElement = audioRef.current.audioEl.current;
    audioElement.addEventListener('ended', handleEnded);
    return () => {
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  return {
    currentTrack: tracks[currentTrack],
    isPlaying,
    playPause,
    nextTrack,
    prevTrack,
    audioRef,
  };
};

const TrackInfo = ({ track }) => (
  <div className='track-info'>
    <img src={track.image} alt={track.name} className='track-image' />
    <p>Now playing: {track.name}</p>
  </div>
);

const Controls = ({ onPrev, onPlayPause, onNext, isPlaying }) => (
  <div className='controls'>
    <button className='control-button' onClick={onPrev} aria-label="Previous Track">Previous</button>
    <button className='control-button' onClick={onPlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
      {isPlaying ? 'Pause' : 'Play'}
    </button>
    <button className='control-button' onClick={onNext} aria-label="Next Track">Next</button>
  </div>
);

const MusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    playPause,
    nextTrack,
    prevTrack,
    audioRef,
  } = useAudioPlayer(tracks);

  return (
    <div className='music-player'>
      <h1>Music Player</h1>
      <TrackInfo track={currentTrack} />
      <ReactAudioPlayer
        src={currentTrack.url}
        ref={audioRef}
        autoPlay={isPlaying}
        controls
      />
      <Controls
        onPrev={prevTrack}
        onPlayPause={playPause}
        onNext={nextTrack}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default MusicPlayer;
