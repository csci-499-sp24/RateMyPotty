import { useState } from 'react';
import HomePage from '@/components/HomePage';
import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "App dark-mode" : "App"}>
      <HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}

export default App;