import React, { useEffect, useRef, useState } from 'react';
import styles from './Popup.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faHeart,  } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { useTheme } from 'next-themes';
import StarRating from './StarRating.js';

import {
    Map,
    InfoWindow,
    Marker
} from "@vis.gl/react-google-maps";

//version without user marker


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
    const favoriteBathroom = async (BathroomID) => {
        console.log('is this the bathroom id?', BathroomID)
            try {
               const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'api/favorites', {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json',
                   },
                   body: JSON.stringify({
                       UserID: 'f398c2c3-ffb0-46f5-816f-25e854d80b59', // Replace with the actual user ID
                       BathroomID: BathroomID, // Replace with the actual bathroom ID
                   }),
               });

               if (response.ok) {
                    const data = await response.json();
                   console.log('Favorite added', data);
                   // Insert this bathroom into the favorites list
                   props.setFavorites([...props.favorites, data.data])
               } else {
                   console.error('Unable to add favorite');
               }
       } catch (error) {
           console.error('Unable to add favorite', error);
       }
    
    } ;

    const deleteFavoriteBathroom = async (BathroomID) => {
        console.log('is this the bathroom id?', BathroomID)
            try {
               const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'api/favorites', {
                   method: 'DELETE',
                   headers: {
                       'Content-Type': 'application/json',
                   },
                   body: JSON.stringify({
                       UserID: 'f398c2c3-ffb0-46f5-816f-25e854d80b59', // Replace with the actual user ID
                       BathroomID: BathroomID, // Replace with the actual bathroom ID
                   }),
               });

               if (response.ok) {
                    
                  const favorites = props.favorites.filter(favorite => favorite.BathroomID !== BathroomID);
                   // Delete this bathroom in the favorites list
                   props.setFavorites(favorites)
               } else {
                   console.error('Unable to add favorite');
               }
       } catch (error) {
           console.error('Unable to add favorite', error);
       }
    
    } ;

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
                                <h1>{props.popupWindow.Name}</h1>
                            </div>
                            <div id={styles.buttons}>
                                <FontAwesomeIcon icon={faPencil} className="fa-2x" id={styles.reviewButton}
                                    onClick={() => setShowTextbox(true)}
                                    
                                />
                            {props.favorites.findIndex(favorite => favorite.BathroomID === props.popupWindow.BathroomID) > -1 ? 
                            (
                                <FontAwesomeIcon icon={faHeart} className="fa-2x" id={styles.favoriteButton} 
                                onClick={() => deleteFavoriteBathroom(props.popupWindow.BathroomID)}
                            />
                            ) :
                            <FontAwesomeIcon icon={faHeartRegular} className="fa-2x" id={styles.notFavoriteButton} 
                            onClick={() => favoriteBathroom(props.popupWindow.BathroomID)}
                        />

                            }
                               
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