import {useEffect, useRef} from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";


export default function NYCMap() {
    const position = { lat: 40.7128, lng: -74.0060 };

    return(
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <div style={{ height: "100vh"}}>
                <Map zoom={13} center={position}></Map>
            </div>
        </APIProvider>
    )
}



/*
export default function NYCMap() {
    const position = { lat: 40.7128, lng: -74.0060 };

    return(
        <APIProvider apiKey="AIzaSyBMpZf4jDALGdvq2QYbNUl3ZuquMaK7I_k">
            <div style={{ height: "100vh"}}>
                <Map zoom={13} center={position}></Map>
            </div>
        </APIProvider>
    )
}
*/
