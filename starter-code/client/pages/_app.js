import {useState} from 'react';
import NYCMap from '../components/NYCMap.js'; 
import Signup from './signup.js';


function App() {
  return (
    <div className="App">
      <Signup/>
      <NYCMap />
    </div>
  );
}

export default App;