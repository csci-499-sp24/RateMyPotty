import {useState} from 'react';
import React from 'react';
import NYCMap from '../components/NYCMap.js'; 

function App() {
  //Asking for user's location
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
    })
  }, [])

  return (
    <div className="App">
      <NYCMap />
    </div>
  );
}

export default App;