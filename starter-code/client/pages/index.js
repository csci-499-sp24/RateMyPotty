import React, {useState, useEffect} from 'react';
import {
  useMapsLibrary,
  useMap
} from "@vis.gl/react-google-maps";
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import NYCMap from '../components/NYCMap';
import Navbar from '../components/Navbar';
import Testimonials from '../components/testimonials';
import Faq from '../components/faq';


function Index({ darkMode, toggleDarkMode }) {

  const defaultPosition = { lat: 40.712775, lng: -74.005973 };
  const geometryLibrary = useMapsLibrary('geometry');
  const map = useMap();
  const [userPosition, setUserPosition] = useState({});
  const [bathrooms, setBathrooms] = useState([]);
  const [popupWindow, setPopupWindow] = useState(null);

  // Get user's position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      // Store' user's position in state
      // Updating state tells react to update the map and set the center to the user's location
      setUserPosition({ lat: lat, lng: lng })
    }, (err) => {
      console.log('user did not allow us to access location')
    })
  }, [])

  // Once we have the user's location, set the map's center to it
  useEffect(() => {
    if (userPosition.lng && userPosition.lat) {
      map.setCenter(userPosition)
    }

  }, [userPosition])

  // Moved the bathrooms state and api call to homepage because we need that data here to find the nearest bathroom
  useEffect(() => {
    // Make a request to the server inorder to grab bathroom data
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'api/bathrooms')
      .then((res) => res.json())
      .then(data => setBathrooms(data.data));

  }, [])

  // Function to handle emergency button click
  const handleEmergencyButtonClick = () => {
    // Do nothing if we do not have the user's location
    if (!userPosition.lng && !userPosition.lat) {
      return;
    }

    let nearestBathroom = null;
    let distanceToNearestBathroom = 100000000000;
    // Find the nearest bathroom
    for (let i = 0; i < bathrooms.length; i++) {
      // compute the distance between each bathroom and the user's location

      const distance = geometryLibrary.spherical.computeDistanceBetween(userPosition, { lat: bathrooms[i].Latitude, lng: bathrooms[i].Longitude })
      if (distance < distanceToNearestBathroom) {
        distanceToNearestBathroom = distance;
        nearestBathroom = bathrooms[i];
      }
    }
    console.log('this is the nearest bathroom', nearestBathroom)

    // Tell the map to zoom into this bathroom
    map.setZoom(15);
    map.panTo({ lat: nearestBathroom.Latitude, lng: nearestBathroom.Longitude });

    // Open the popup for this bathroom
    setPopupWindow(nearestBathroom)
  };

  return (
    <div className="container-fluid">
      <Navbar />

      <div className="row">
        <div className="col-md-3">

        </div>
        <div className="col-md-9">
          <div className="main-content">
          <Hero handleEmergencyButtonClick={handleEmergencyButtonClick} />
            <div id="map" className="map-container">
            <NYCMap className="my-map" userPosition={userPosition} bathrooms={bathrooms} popupWindow={popupWindow} setPopupWindow={setPopupWindow}/>
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
