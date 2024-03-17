import { useState } from 'react';
import HomePage from '@/components/HomePage';
import './HomePage.css';
import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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