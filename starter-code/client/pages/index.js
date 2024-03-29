import React, { useState, useEffect, useRef } from 'react'; //added useRef for scroll
import {
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";


import Hero from '../components/Hero';
import Footer from '../components/Footer';
import NYCMap from '../components/NYCMap';
import Navbar from '../components/Navbar';
import LoggedInNavbar from '@/components/LoggedInNavbar';
import Testimonials from '../components/testimonials';
import Faq from '../components/faq';


function Index({ darkMode, toggleDarkMode }) {
  const mapRef = useRef(null); //for scrolling reference in hero and NYCMap
  //const defaultPosition = { lat: null, lng: null };
  const geometryLibrary = useMapsLibrary('geometry');
  const placesLibrary = useMapsLibrary('places');


  const map = useMap();
  const [userPosition, setUserPosition] = useState({});
  const [bathrooms, setBathrooms] = useState([]);
  const [popupWindow, setPopupWindow] = useState(null);
  const inputRef = useRef(null);
  const autoCompleteRef = useRef();

  // Get user's position
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        // Store' user's position in state
        // Updating state tells react to update the map and set the center to the user's location
        setUserPosition({ lat: lat, lng: lng })
        //Hunter coords as location for testing
        //setUserPosition({ lat: 40.7678, lng: -73.9645 })
      }, (err) => {
        console.log('user did not allow us to access location')
      })
    }
  }, [])

  useEffect(() => {
    if (placesLibrary) {
      console.log('places', placesLibrary)
      autoCompleteRef.current = new placesLibrary.Autocomplete(inputRef.current)
      autoCompleteRef.current.addListener("place_changed", async function () {
        const place = await autoCompleteRef.current.getPlace();
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        // Updating state tells react to update the map and set the center to the user's location
        setPopupWindow(null)
        setUserPosition({ lat: lat, lng: lng })

        // Scrolls to the map but with a 50px gap at the top to give it some space 
        const y = mapRef.current.getBoundingClientRect().top
        window.scrollTo({ top: y - 50 + window.document.documentElement.scrollTop, behavior: 'smooth' })
      });
    }


  }, [placesLibrary])

  // Once we have the user's location, set the map's center to it
  //added a null check 
  useEffect(() => {
    if (userPosition.lng && userPosition.lat && map) {
      map.setCenter(userPosition)
    }
  }, [userPosition, map])

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
      <label></label>
      {/* <input ref={inputRef} /> */}


      <div className="row">
        <div className="col-md-3">

        </div>
        <div className="col-md-9">
          <div className="main-content">
            <Hero handleEmergencyButtonClick={handleEmergencyButtonClick} mapRef={mapRef}
              inputRef={inputRef}
            />
            <div id="map" className="map-container" ref={mapRef}>
              <NYCMap className="my-map" userPosition={userPosition} bathrooms={bathrooms} popupWindow={popupWindow} setPopupWindow={setPopupWindow} />
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