import {useEffect, useRef, useState} from 'react';

import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
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
                "visibility": "off"
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



export default function NYCMap() {
    const position = { lat: 40.712775, lng: -74.005973 };
    const [bathrooms, setBathrooms] = useState([]);
    // Make a request to the server inorder to grab bathroom data
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/bathrooms')
            .then((res) => res.json())
            .then(data => setBathrooms(data.data));
    }, [])

    console.log('bathrooms', bathrooms);    
    return(
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <div style={{ height: "100vh" }}>
            <Map 
            streetViewControl={true}  
            zoomControl ={true} 
            mapTypeControl = {false} 
            gestureHandling = {true}
            defaultCenter = {position}
            defaultZoom={13} 
            styles ={mapStyles}>
                {bathrooms.map(bathroom => (
                        <Marker key = {bathroom.BathroomID}
                        position={{lat: bathroom.Latitude, lng: bathroom.Longitude}}
                        clickable={true}
                        onClick={() => alert('marker was clicked!')}
                        title={bathroom.Name}
                      />
                ))}
            </Map>
            </div>
        </APIProvider>
    )
}
