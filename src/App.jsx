import React from 'react';
import MusicPlayer from './About';
import './App.css';

const Title = () => {
  return (
    <h1 className='title'>
      
    </h1>
  )
}

function App() {
  return (
    <div className="App">
      <Title />
      <header className="App-header">
        <MusicPlayer />
      </header>
    </div>
  );
}

export default App;
