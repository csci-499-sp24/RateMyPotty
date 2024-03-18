import React, {useState} from 'react';
import Navbar from "../components/Navbar/Navbar";
import NYCMap from '../components/NYCMap.js'; 
import '../styles/globals.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <NYCMap />
    </div>
  );
}

export default App;