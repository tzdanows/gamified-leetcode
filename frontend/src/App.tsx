import React from 'react';
import './App.css';
import Auth from './Auth';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>LeetCode Gamified</h1>
        <Auth />
      </header>
    </div>
  );
};

export default App;
