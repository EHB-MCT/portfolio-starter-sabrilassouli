// src/App.js
import React from 'react';
import Courses from './home';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Courses App</h1>
      </header>
      <main>
        <Courses />
      </main>
    </div>
  );
}

export default App;
