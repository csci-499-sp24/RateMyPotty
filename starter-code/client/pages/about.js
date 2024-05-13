// pages/about.js
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '@/components/Navbar';
import LoggedInNavbar from '@/components/LoggedInNavbar';
import Hero from '@/components/Hero';
import AboutHero from '@/components/aboutHero';

function About({ darkMode, toggleDarkMode, isLoggedIn }) {
  return (
    <div className="container-fluid">
      {isLoggedIn ? <LoggedInNavbar /> : <Navbar />}
      <AboutHero />

      <div className="row">
        <div className="col-md-3">
          {/* You can add additional content or features here if needed */}
        </div>
        <div className="col-md-9">
          <div className="main-content">
        
          <div className="section bg-indigo-100 p-5 rounded-lg shadow-lg">
  <h2 className="text-3xl font-bold text-indigo-700">Get in Touch 🚀</h2>
  <p className="text-lg text-gray-700 mt-4">
    Have questions, suggestions, or feedback? We'd love to hear from you! Feel free to reach out to us through our GitHub profiles or send us an email at  
    <a href="mailto:2bitcapstone@gmail.com" className="text-indigo-500 underline hover:text-indigo-800">  2bitcapstone@gmail.com</a>.
  </p>
</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
