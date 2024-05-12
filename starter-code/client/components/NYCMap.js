import React, { useEffect, useRef, useState } from 'react';
import styles from './Popup.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faHeart, } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { useTheme } from 'next-themes';
import StarRating from './StarRating.js';
import Modal from './Modal';

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

export default function NYCMap({ userId, loggedInOrNot, ...props }) {
    //places the user's location on the map
    const [showTextbox, setShowTextbox] = useState(false);

    /* Modal Implementation State*/
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);

    /*Reviews*/
    const [reviews, setReviews] = useState(null);
    /*Temporary Reviews, until able to fetch written reviews*/
    const [selectedReview, setSelectedReview] = useState([]);
    const [selectedReview1, setSelectedReview1] = useState(null);
    const [selectedReview2, setSelectedReview2] = useState(null);
    /*When pop_up name is clicked, define const of Modal, 
    remove setSelectedReview1 and 2 once able to fetch reviews*/
    const handleNameClick = (name, bathroomid) => {
        setSelectedName(name);
        setSelectedAddress(props.popupWindow.Address);
        setIsModalOpen(true);
        getBathroomReviews(bathroomid);
        //setSelectedReview("AnonymousUser42: This bathroom is amazing. Always clean and orderly. I think this bathroom is my favorite. 5/5");
        setSelectedReview1("AnonymousUser66: I dislike this bathroom. It's always dirty and it seems like it gets even crustier by the second. 2/5");
    };

    const handleCloseBathroomReview = () => {
        setIsModalOpen(false)
        setSelectedReview([])
    }
    /*Modal Implementation State Ends */

    const [showReviewSubmit, setShowReviewSubmit] = useState(false);
    const [reviewText, setReviewText] = useState();
    // Zooms into current location and if not defaults to NYC
    const centerPosition = props.userPosition.lat ? props.userPosition : { lat: 40.712775, lng: -74.005973 };
    const reviewTextAreaRef = useRef();


    const favoriteBathroom = async (BathroomID) => {
        console.log('is this the bathroom id?', BathroomID)
        console.log('The UserID:', userId)
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserID: userId,
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

    };

    const deleteFavoriteBathroom = async (BathroomID) => {
        console.log('is this the bathroom id?', BathroomID)
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'api/favorites', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserID: userId, // Replace with the actual user ID
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

    };

    const reviewBathroom = async (BathroomID, ReviewText) => {
        console.log('Review bathroom id:', BathroomID)
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserID: userId, // Replace with the actual user ID
                    BathroomID: BathroomID,  // Replace with the actual bathroom ID
                    ReviewText: ReviewText,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setReviewText('');
            } else {
                console.error('Unable to add review');
            }
        } catch (error) {
            console.error('Review error:', error);
        }
    };

    const getBathroomReviews = async (BathroomID) => {
        console.log('Review bathroom id:', BathroomID)
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `api/reviews?BathroomID=${BathroomID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                setSelectedReview(data);
                console.log('Bathroom reviews:', data);
            } else {
                console.error('Unable to get reviews', error);
            }
        } catch (error) {
            console.error('Get reviews error:', error);
        }
    };

    const resetMarker = () => {
        setReviewText('');
        setShowTextbox(false);
        setShowReviewSubmit(false);
    }

    /*displays navigation line on our map from the user's current position to any bathroom specified by the
     lat and long coordinates when user clicks on the directions button in popup window*/
     //adds a check so that if user denies location access, they are prompted to allow it
    const showDirections = () => {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'denied') {
                window.alert('Please allow access to your location for this feature to work.');
            } else {
                props.directionsService.route({
                    origin: props.userPosition,
                    destination: { lat: props.popupWindow.Latitude, lng: props.popupWindow.Longitude },
                    travelMode: google.maps.TravelMode.WALKING,
                })
                .then(response => {
                    console.log('here', response)
                    props.setPopupWindow(null)
                    props.directionsRenderer.setDirections(response)
                    props.setDirectionsResponse(response);
                })
            }
        });
    }
    
    // State variable for toggling between showing all bathrooms and only favorites. Initially set to false, meaning all bathrooms are shown.
    const [showFavorites, setShowFavorites] = useState(false);

    const renderSteps = () => {
        return (
            <div className="steps">
                {
                    props.directionsResponse.routes[0].legs[0].steps.map((step, index) => (
                        <div className="step" key ={index}>
                            <p dangerouslySetInnerHTML={{__html: step.instructions}}></p>
                            <div className="step-distance-container">
                                {step.distance.text} <div className="horizontal-line"></div>                        
                            </div>
                        </div>
                    ))
                }
            </div>

        )

    }


    return (
        <div>
            <div className="flex justify-center py-3">
                <button 
                    onClick={() => setShowFavorites(!showFavorites)}
                    className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5"
                >
                    {showFavorites ? 'Show All Bathrooms' : 'Show Only Favorites'}
                </button>
            </div>
        
        <div style={{ height: "70vh", width: "100vw" }}>
            <Map
                streetViewControl={true}
                zoomControl={true}
                mapTypeControl={false}
                gestureHandling={true}
                defaultCenter={centerPosition}
                defaultZoom={16}
                className={styles.map}
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
   
                {props.bathrooms
                    /*
                    Filters the bathrooms to be displayed on the map. If 'showFavorites' is true, only bathrooms that are in the 'favorites' list (based on BathroomID) are included. 
                    If 'showFavorites' is false, all bathrooms are included.
                    */
                    .filter(bathroom => showFavorites ? props.favorites.some(favorite => favorite.BathroomID === bathroom.BathroomID) : true)
                    .map(bathroom => (
                        <Marker key={bathroom.BathroomID}
                            position={{ lat: bathroom.Latitude, lng: bathroom.Longitude }}
                            clickable={true}
                            onClick={() => {
                                props.setPopupWindow(bathroom);
                                resetMarker();
                            }}
                        title={bathroom.Name}
                        icon={{
                            url: "/toilet.png",
                            scaledSize: { width: 40, height: 40 }, // size of the icon
                        }}
                    />
                ))}

                {/*Modal Implementation when styles.name is clicked,
                passes in selectedName prop into Modal.js component, take out selectedReview1 and 2 once able
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
                            setShowReviewSubmit(false);
                        }}
                        position={{ lat: props.popupWindow.Latitude, lng: props.popupWindow.Longitude }}
                    >
                        <div className={styles.popup}>
                            <div id={styles.name}>
                                {/*Modal component appears when onClick is handled */}
                                <h1 id={styles.hoverLocation} onClick={() =>
                                    handleNameClick(props.popupWindow.Name, props.popupWindow.BathroomID)}>{props.popupWindow.Name}</h1>
                            </div>
                            <div className={styles.paragraph}>
                                <p className>{props.popupWindow.Address}</p>
                            </div>
                            <div className={styles.paragraph}>
                                {loggedInOrNot && (<StarRating
                                    Bathroom = {props.popupWindow}
                                />)}
                            </div>
                            <div id={styles.buttons}>
                                {loggedInOrNot && (<FontAwesomeIcon icon={faPencil} className="fa-2x" id={styles.reviewButton}
                                    onClick={() => {
                                        setShowTextbox(prevShowTextbox => !prevShowTextbox)
                                        setShowReviewSubmit(prevShowReviewSubmit => !prevShowReviewSubmit)
                                    }}
                                />)}
                                {loggedInOrNot && (props.favorites.findIndex(favorite => favorite.BathroomID === props.popupWindow.BathroomID) > -1 ?
                                    (
                                        <FontAwesomeIcon icon={faHeart} className="fa-2x" id={styles.favoriteButton}
                                            onClick={() => deleteFavoriteBathroom(props.popupWindow.BathroomID)}
                                        />
                                    ) : (
                                        <FontAwesomeIcon icon={faHeartRegular} className="fa-2x" id={styles.notFavoriteButton}
                                            onClick={() => favoriteBathroom(props.popupWindow.BathroomID)}
                                        />
                                    ))}
                                <button
                                    style={{
                                        fontSize: '1.6em', 
                                        fontWeight: 'bold', 
                                        /* marginLeft: '35px' */ // Add left margin for space
                                        marginLeft: loggedInOrNot ? '35px' : '87.5px',
                                        outline: 'none',
                                    }}
                                    onClick={() => showDirections()} className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Directions
                                </button>

                            </div>
                            <div>

                                {showTextbox && (
                                <textarea 
                                    style={{
                                        border: '2px solid #000',
                                        borderRadius: '5px',
                                        margin: 'auto',
                                        display: 'block',
                                        width: '100%',
                                        outline: 'none',
                                        padding: '5px',
                                    }} ref={reviewTextAreaRef}/>)}
                            </div>
                            {showReviewSubmit && (
                            <button 
                                id={styles.submitButton} 
                                onClick={() => reviewBathroom(props.popupWindow.BathroomID, reviewTextAreaRef.current.value)} 
                                type="submit" 
                                value="Submit"
                                style={{
                                    display: 'block',
                                    margin: 'auto',
                                    marginTop: '10px',
                                }}
                            >
                                Submit</button>)}
                        </div>
                    </InfoWindow>
                }
                {
                    props.directionsResponse ?
                        (
                            <div className="overlay">
                                <p className="start">{props.directionsResponse.routes[0].legs[0].start_address}</p>
                                <div class="subinfo_container">
                                    <p class="duration">Duration: <b>{props.directionsResponse.routes[0].legs[0].duration.text}</b></p>
                                    <p class="distance">Distance: <b>{props.directionsResponse.routes[0].legs[0].distance.text}</b></p>
                                </div>
                                {renderSteps()}
                                <p className="end">{props.directionsResponse.routes[0].legs[0].end_address}</p>

                            </div>
                        ) : null
                }

            </Map>
        </div>
    </div>          
    )
}

