import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Hero from './Hero';
import Footer from './Footer';
import Button from './Button'; // Import the Button component
import NYCMap from './NYCMap';


function HomePage({ darkMode, toggleDarkMode }) {
  // Function to handle emergency button click
  const handleEmergencyButtonClick = () => {
    // Implement your logic here
    console.log('Emergency button clicked!');
  };

  return (
    <div className="container-fluid">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="main-content">
            <Hero />
            <NYCMap />
          </div>
        </div>
      </div>
      <Button onClick={handleEmergencyButtonClick}>Emergency</Button> {/* Include the Button component here */}
      <Footer />
    </div>
  );
}

export default HomePage;
