import React, { useState, useRef,useEffect } from "react";
import IconRoad from '../icons/road.svg';
import IconWater from '../icons/water-tap.svg';
import IconElectr from '../icons/electric-meter.png';
import IconGas from '../icons/valve.png';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const containerStyle = {
    position: 'absolute',
    top:0,
    left:0,
    height: '100vh',
    width: '100%',
    zIndex: 0
}

function MapContainer(props) {
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
  const { path, setPath, setpolyLengthInMeters, polyLengthInMeters, activeEl } = props;
  const [closeBtn, setCloseBtn] = useState(false)
  const [currentPolyline, setCurrentPolyline] = useState({
    name: '',
    km: '',
    description: ''
  })

  const infoboxEl = useRef(null);
  const mapEl = useRef(null);
  const [curPosition, setcurPosition] = useState({ lat: 42.19705782897213, lng: 69.95598711561539 })
  const [mapCenter, setmapCenter] = useState({})


  useEffect(()=>{
    console.log(props.polylines);
    props.polyLinesEl.current = [];
    setmapCenter({ lat: 42.19911137426314, lng: 69.95388661187184})
  },[activeEl])


  const _mapLoaded = (mapProps, map) => {
    map.setOptions({
        styles: exampleMapStyles,
    disableDefaultUI: true,
    })
 }

  const onLoad = (polyline) => {
    props.polyLineEl.current = polyline
  }
  const onLoadPolylines = (polyline, id) => {
    polyline.id = id
    props.polyLinesEl.current.push(polyline)
  }

  const onLoadInfoBox = (infobox) => {
    infoboxEl.current = infobox
  }
  const onEdit = () => {
    let newPath = [];
    props.polyLineEl.current.getPath().getArray().map(pos => {
      console.log(pos)
      newPath.push({
        lat: pos.lat(),
        lng: pos.lng()
      })
      console.log(newPath)
    })
    setPath(newPath)
  }


  const getWithId = (id, array) => {
    let item = array.find(item => item.id === id);
    return item
  };

  const onDblClickPolyline = (event, id) => {
    const polyline = getWithId(id, props.polyLinesEl.current)
    polyline.setEditable(true)
  }
  const onClickInfoMarker = (event, id) => {
    props.polylines.map((polyline, id) => {
      props.polyLinesEl.current[id].setOptions({
        strokeColor: polyline.color,
        strokeWeight: 2
      })
      props.polyLinesEl.current[id].setEditable(false)
    })


    setCloseBtn(true)

    const polyline = getWithId(id, props.polyLinesEl.current)
    const polylinearray = polyline.getPath().getArray()
    console.log(polylinearray)
    const curPoly = getWithId(id, props.polylines)
    setcurPosition({
      lat: polylinearray[0].lat(),
      lng: polylinearray[0].lng()
    })
    setCurrentPolyline(curPoly)



    polyline.setOptions({
      strokeColor: '#FF0000',
      strokeWeight: 4
    })
  }

  const onClick = (event) => {
    console.log("lat", event.latLng.lat(), "lng", event.latLng.lng());
    setCloseBtn(false)
    if (props.isPolyLineCreate) {
      const obj = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      setmapCenter(obj)
      let polyLengthInMeters = window.google.maps.geometry.spherical.computeLength(props.polyLineEl.current.getPath());

      setPath([...path, obj]);
      setpolyLengthInMeters(parseInt(polyLengthInMeters))
    }

  }
  return (
    <div className="App">
      <Map 
      ref={mapEl}
      containerStyle={containerStyle}
      onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
       google={props.google} zoom={14}>
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyBUVRGCl79p01aB2YhioP6s3bURSLV0qDE')
  })(MapContainer)


// return (
//     {props.polylines.map(poly => (
//         <div key={poly.id}>
//           <InfoBox
//             options={{ closeBoxURL: '', enableEventPropagation: true }}
//             position={poly.positions[0]}

//           >
//             <div style={{ opacity: 1, padding: 5 }}>
//               <div style={{ width: '200px', fontSize: 14, fontColor: `#08233B` }}>
//                 {poly.name}
//               </div>
//             </div>
//           </InfoBox>

//           <Marker
//             position={poly.positions[0]}
//             icon={activeEl == 1 ? IconRoad : activeEl == 2 ? IconWater : activeEl == 3 ? IconElectr : activeEl == 4 ? IconGas : ""}
//             onClick={(e) => onClickInfoMarker(e, poly.id)}
//           >
//           </Marker>
//           <Polyline
//             options={
//               {
//                 strokeColor: poly.color,
//                 strokeWeight: 2
//               }
//             }
//             key={poly.id}
//             onLoad={(polyline) => onLoadPolylines(polyline, poly.id)}
//             onDblClick={(e) => onDblClickPolyline(e, poly.id)}
//             path={poly.positions}
//           />
//         </div>
//       ))}
//       <Polyline
//         onDragEnd={onEdit}
//         onMouseUp={onEdit}
//         // Make the Polygon editable / draggable
//         editable
//         onLoad={onLoad}
//         path={path}
//       />
//       {closeBtn ? <InfoBox
//         onLoad={onLoadInfoBox}
//         options={{ closeBoxURL: '', enableEventPropagation: true }}
//         position={curPosition}
//       >
//         <div className="infoBoxT">
//           <div className="infoBox__name">
//             Имя: {currentPolyline.name}
//           </div>
//           <div className="infoBox__km">
//             Общая площадь:{currentPolyline.km} м
//           </div>
//           <div className="infoBox__description">
//             Описания: {currentPolyline.description}
//           </div>
//         </div>
//       </InfoBox> : ""}
// )