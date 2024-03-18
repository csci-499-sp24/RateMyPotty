import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Hero from './Hero';
import Footer from './Footer'; // Import the Button component
import NYCMap from './NYCMap';
import Navbar from './Navbar';


function HomePage({ darkMode, toggleDarkMode }) {
  // Function to handle emergency button click
  const handleEmergencyButtonClick = () => {
    // Implement logic here
    console.log('Emergency button clicked!');
  };

  return (
    <div className="container-fluid">
  <Navbar />
  <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
  <div className="row">
    <div className="col-md-3">

    </div>
    <div className="col-md-9">
      <div className="main-content">
        <Hero />
        <div className="map-container">
          <NYCMap />
        </div>
      </div>
    </div>
  </div>
  <Footer />
</div>
  );
}

export default HomePage;
