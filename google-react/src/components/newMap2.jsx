import { useLoadScript, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from 'react'
const exampleMapStyles = [
    {
        featureType: "administrative",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            },
        ],
    },
    {
        featureType: "landscape",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            },
        ],
    },
];

const containerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100%',
    zIndex: 0
}

function MapContainer(props) {

    useEffect(() => {
        if (map) {
            map.setZoom(12);
            setTimeout(() => {
                map.panTo(props.mapCenter);
                map.setZoom(14);
            }, 1000)
        }
    }, [props.mapCenter])

    const ref = useRef(null);

    const [map, setMap] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBUVRGCl79p01aB2YhioP6s3bURSLV0qDE"
    })

    const changeMapStyle = (styleId) => {
        map.setOptions({
            mapTypeId: styleId,
        })
    }

    const renderMap = () => {
        const onLoad = (mapInstanse) => {
            console.log(mapInstanse)
            mapInstanse.setCenter(props.mapCenter);
            setMap(mapInstanse);
        }

        const onUnmount = (mapInstanse) => {
            console.log(mapInstanse)
        }
        return <GoogleMap
            options={{
                styles: exampleMapStyles,
                disableDefaultUI: true,
            }}
            mapContainerStyle={containerStyle}
            //   center={props.mapCenter}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
        </GoogleMap>
    }

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    return (
        <div>
            <div className='toggleMapStyle'>
                <div className='toggleMapStyle__item' onClick={() => changeMapStyle('roadmap')}>Карта</div>
                <div className='toggleMapStyle__item' onClick={() => changeMapStyle('satellite')}>Спутник</div>
            </div>
            {isLoaded ? (
                renderMap()
            ) : <></>}
        </div>
    );
}

export default React.memo(MapContainer)

