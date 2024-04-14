import React, { useEffect, useRef, useState } from 'react';
import styles from './Popup.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faHeart } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from 'next-themes';
import StarRating from './StarRating.js';
import Modal from './Modal'; // Assuming you have a Modal component

import {
    Map,
    InfoWindow,
    Marker
} from "@vis.gl/react-google-maps";


const mapStyles =
    [
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f7f1df"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#d0e3b4"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#fbd3da"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#bde6ab"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffe15f"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#efd151"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "black"
                }
            ]
        },
        {
            "featureType": "transit.station.airport",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#cfb2db"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#a2daf2"
                }
            ]
        }
    ]

export default function NYCMap(props) {
    //places the user's location on the map
    const [showTextbox, setShowTextbox] = useState(false);
    const defaultPosition = { lat: 40.712775, lng: -74.005973 };

    /* Modal Implementation State*/
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    /*Temporary Reviews, until able to fetch written reviews*/
    const [selectedReview, setSelectedReview] = useState(null);
    const [selectedReview1, setSelectedReview1] = useState(null);
    const [selectedReview2, setSelectedReview2] = useState(null);
    /*When pop_up name is clicked, define const of Modal*/
    const handleNameClick = (name) => {
        setSelectedName(name);
        setSelectedAddress(props.popupWindow.Address); 
        setIsModalOpen(true);
        setSelectedReview("AnonymousUser42: This bathroom is amazing. Always clean and orderly. I think this bathroom is my favorite. 5/5");
        setSelectedReview1("AnonymousUser66: I dislike this bathroom. It's always dirty and it seems like it gets even crustier by the second. 2/5");
        setSelectedReview2("Bob: This bathroom's alright. 3/5");
    };

    /*Modal Implementation State End*/

    return (
        //Markers for the user's location and the bathrooms
        <div style={{ height: "70vh", width: "70vw" }}>
            <Map
                streetViewControl={true}
                zoomControl={true}
                mapTypeControl={false}
                gestureHandling={true}
                defaultCenter={defaultPosition}
                defaultZoom={15}
                styles={mapStyles}>
                {props.userPosition.lat ?
                    <Marker
                        key="userLocation"
                        position={props.userPosition}
                        icon={{
                            path: typeof window !== 'undefined' && window.google && window.google.maps && window.google.maps.SymbolPath ? window.google.maps.SymbolPath.CIRCLE : '',
                            fillColor: '#4285F4',
                            fillOpacity: 1,
                            scale: 8,
                            strokeColor: 'rgb(255,255,255)',
                            strokeWeight: 2,
                        }}
                    />
                    : null
                }

                {props.bathrooms.map(bathroom => (
                    <Marker key={bathroom.BathroomID}
                        position={{ lat: bathroom.Latitude, lng: bathroom.Longitude }}
                        clickable={true}
                        onClick={() => {
                            props.setPopupWindow(bathroom);
                        }}
                        title={bathroom.Name}
                        icon={{
                            url: "/toilet.png",
                            scaledSize: { width: 50, height: 50 }, // size of the icon
                        }}
                    />
                ))}
                {/*Modal Implementation when styles.name is clicked,
                passes in selectedName prop into Modal.js component, take out selectedReview1 once able
                to get reviews properly */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} 
                selectedName={selectedName} selectedAddress={selectedAddress} 
                selectedReview={selectedReview} selectedReview1={selectedReview1}
                selectedReview2={selectedReview2}>
                </Modal>
                {props.popupWindow &&
                    <InfoWindow
                        onCloseClick={() => {
                            props.setPopupWindow(null);
                            setShowTextbox(false); // Hide the textbox when the InfoWindow is closed
                        }}
                        position={{ lat: props.popupWindow.Latitude, lng: props.popupWindow.Longitude }}
                    >
                        <div className={styles.popup}>
                            <div id={styles.name}>
                                {/*Modal component appears when onClick is handled */}
                                <h1 id={styles.hoverLocation} onClick={() => handleNameClick(props.popupWindow.Name)}>{props.popupWindow.Name}</h1>
                            </div>
                            <div id={styles.buttons}>
                                <FontAwesomeIcon icon={faPencil} className="fa-2x" id={styles.reviewButton}
                                    onClick={() => setShowTextbox(true)}
                                />
                                <FontAwesomeIcon icon={faHeart} className="fa-2x" id={styles.favoriteButton} />
                            </div>
                            {showTextbox && <textarea />}
                            <div className={styles.paragraph}>
                                <StarRating /> 
                            </div>
                            <div className={styles.paragraph}>
                                <p className>{props.popupWindow.Address}</p>
                            </div>
                        </div>
                    </InfoWindow>
                }
            </Map>
        </div>

    )
}

/*
<MarkerClusterer>
  {(clusterer) =>
    bathrooms.map((bathroom) => (
      <Marker 
        key={bathroom.BathroomID}
        position={{ lat: bathroom.Latitude, lng: bathroom.Longitude }}
        clickable={true}
        onClick={() => {
          setPopupWindow(bathroom);
        }}
        title={bathroom.Name}
        icon={{
                url: "/toilet.png",
                 scaledSize: { width: 50, height: 50 }, // size of the icon
        }}
      />
    ))
  }
</MarkerClusterer>
*/