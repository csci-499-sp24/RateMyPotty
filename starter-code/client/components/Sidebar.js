import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaMap, FaPlus, FaHeart, FaCog, FaSignInAlt } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        {/* Add your logo here */}
      </div>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home"><FaHome /> Home</Nav.Link>
        <Nav.Link href="/bathroom-map"><FaMap /> Bathroom Map</Nav.Link>
        <Nav.Link href="/add-bathroom"><FaPlus /> Add Bathroom</Nav.Link>
        <Nav.Link href="/favorites"><FaHeart /> Favorites</Nav.Link>
        <Nav.Link href="/settings"><FaCog /> Settings</Nav.Link>
        <Nav.Link href="/login"><FaSignInAlt /> Login</Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;
