import React from 'react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import NYCMap from '../components/NYCMap';
import Navbar from '../components/Navbar';
import Testimonials from '../components/testimonials';
import Faq from '../components/faq';


function Index({ darkMode, toggleDarkMode }) {
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

export default Index;
