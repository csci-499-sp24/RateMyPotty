import React from 'react';
import Sidebar from './Sidebar';
import Hero from './Hero';
import Footer from './Footer'; // Import the Button component
import NYCMap from './NYCMap';
import Navbar from './Navbar';
import Testimonials from './testimonials';
import Faq from './faq';


function HomePage({ darkMode, toggleDarkMode }) {
  // Function to handle emergency button click
  const handleEmergencyButtonClick = () => {
    // Implement logic here
    console.log('Emergency button clicked!');
  };

  return (
    <div className="container-fluid">
  <Navbar />

  <div className="row">
    <div className="col-md-3">

    </div>
    <div className="col-md-9">
      <div className="main-content">
        <Hero />
        <div id = "map" className="map-container">
      <NYCMap className="my-map" />
      </div>
      </div>
    </div>
  </div>
  <Faq />
  <Testimonials />
  <Footer />
</div>
  );
}

export default HomePage;
