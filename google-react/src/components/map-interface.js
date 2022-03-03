// import React, { useState, useRef, useEffect } from "react";

// import VericalButton from "./VerticalButton";
// import { FaSatellite, FaMapMarked } from 'react-icons/fa';
// import { useLoadScript, GoogleMap, DrawingManager, Polyline } from "@react-google-maps/api";
// // import ReactangleCard from "./card/rectangle";
// import PolyLineItem from "./PolylineItem";
// import { useSelector, useDispatch } from "react-redux";

// import { setIsActiveModal } from '../features/app/appSlice';
// import { setActivePolyLine, setPolyLineForm } from '../features/city/citySlice';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// const libraries = ['drawing',];

// const exampleMapStyles = [
//   {
//     featureType: "administrative",
//     elementType: "labels",
//     stylers: [
//       {
//         visibility: "off"
//       },
//     ],
//   },
//   {
//     featureType: "landscape",
//     elementType: "labels",
//     stylers: [
//       {
//         visibility: "off"
//       },
//     ],
//   },
//   {
//     featureType: "poi",
//     elementType: "labels",
//     stylers: [
//       {
//         visibility: "off"
//       },
//     ],
//   },
//   {
//     featureType: "transit",
//     elementType: "labels",
//     stylers: [
//       {
//         visibility: "off"
//       },
//     ],
//   },
//   {
//     featureType: "water",
//     elementType: "labels",
//     stylers: [
//       {
//         visibility: "off"
//       },
//     ],
//   },
// ];

// function Map({ isPolyLineCreate, localty }) {

//   const [p, setP] = useState(null);


//   const polylines = useSelector(state => state.city.polylines);
//   const activeEl = useSelector(state => state.app.activeEl);

//   const [map, setMap] = useState(null);
//   const [drawerManager, setDrawerManager] = useState();
//   const polyLinesRef = useRef([]);
//   const dispatch = useDispatch();

//   const changeMapStyle = (type) => {
//     map.setOptions({
//       mapTypeId: type,
//     });
//   }

//   useEffect(() => {
//     polyLinesRef.current = [];
//     if (drawerManager) {
//       drawerManager.setOptions({
//         drawingMode: isPolyLineCreate ? window.google.maps.drawing.OverlayType.POLYLINE : window.google.maps.drawing.OverlayType.CONTROL
//       })
//     }


//   }, [activeEl, isPolyLineCreate, localty]);


//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyBUVRGCl79p01aB2YhioP6s3bURSLV0qDE",
//     libraries: libraries
//   })

//   const clearAllMarkers = () => {
//     console.log('clear all markers')
//     dispatch(setActivePolyLine(null));
//     polyLinesRef.current.map(({ polyline, color }) => {
//       polyline.setOptions({
//         strokeWeight: 3,
//         strokeColor: color
//       })
//     })
//   }

//   const pushPolylines = (polyline) => {
//     polyLinesRef.current.push(polyline);
//   }

//   const onClick = (event) => {
//     console.log("lat", event.latLng.lat(), "lng", event.latLng.lng());
//     dispatch(setIsActiveModal(false))
//     clearAllMarkers();
//   }


//   const onLoadDrawerManager = drawingManager => {
//     setDrawerManager(drawingManager)
//   }


//   const polyLineForm = useSelector(state => state.city.polyLineForm);

//   const onPolyLineComplete = polyline => {
//     const paths = polyline.getPath().getArray();

//     let positionGroup = {
//       positions: paths.map(path => ({
//         lat: path.lat(),
//         lng: path.lng()
//       }))
//     }

//     setP(polyline);
//     dispatch(setPolyLineForm({
//       ...polyLineForm,
//       positionGroup: [...polyLineForm.positionGroup, positionGroup]
//     }))
//   }

//   function deleteRemove() {
//     p.setMap(null);
//     setP(null);
//     dispatch(setPolyLineForm({
//       ...polyLineForm,
//       positionGroup: [...polyLineForm.positionGroup.slice(0, -1)]
//     }))
//   }


//   const renderMap = () => {
//     const onLoadMap = (mapInstanse) => {
//       console.log(localty.lat);
//       mapInstanse.setCenter({ lat: localty.lat, lng: localty.lng });
//       setMap(mapInstanse);
//     }

//     const onUnmountMap = (mapInstanse) => {
//       console.log(mapInstanse)
//       setMap(null);

//     }
//     return <>
//       <div className="mb-3" style={{
//         position: 'absolute',
//         top: 20,
//         right: 135,
//         zIndex: 100
//       }}>
//         {p != null ? <div className="col-4"><button type="button" onClick={deleteRemove} className="btn btn-danger">Очистить последний элемент</button></div> : ''}
//       </div>
//       <div style={{
//         position: 'absolute',
//         top: 20,
//         right: 20,
//         zIndex: 100
//       }}>
//         <div className="sidebar__body-row">
//           <VericalButton onClick={() => changeMapStyle('satellite')}
//             icon={<FaSatellite size={30} />}
//             title={'Спутник'}></VericalButton>
//           <VericalButton onClick={() => changeMapStyle('roadmap')}
//             icon={<FaMapMarked size={30} />}
//             title={'Карта'}></VericalButton>
//         </div>
//       </div>
//       <MapContainer style={{
//         width:'2000px',
//         height:'100vh'
//       }} center={[51.505, -0.09]} zoom={13}>

//         <Marker position={[51.505, -0.09]}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </>
//   }

//   if (loadError) {
//     return <div>Map cannot be loaded right now, sorry.</div>
//   }
//   return (
//     <div className="App">
//       {isLoaded ? (
//         renderMap()
//       ) : ""}
//     </div>
//   );
// }

// export default Map



import React, { useCallback, useEffect, useMemo, useState,useRef } from 'react';
import { MapContainer,Popup,MapConsumer, TileLayer, FeatureGroup, Circle,LayersControl,Marker,Polyline,Tooltip} from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import RectangleCard from './card/rectangle';
import {useSelector} from 'react-redux';
import L from "leaflet";


function Map() {



  const polylines = useSelector(state => state.city.polylines);

  const [mp,setMp] = useState([]);

  const ref = useRef(null);


  useEffect(()=>{
    console.log(polylines);
    let multilinePositions = [];
    polylines.map(polyline=>{
      let posG = [];
      polyline.positionGroup.map(pos=>{
        let posItem = []
        pos.positions.map(position=>{
          posItem.push([position.lat,position.lng]);
        });
        posG.push(posItem);
      })

      multilinePositions.push({
          color: 'lime',
        pos: posG
      });
    });

    setMp(multilinePositions);

    console.log(multilinePositions);
  },[polylines]);

  

  const customMarker = (title) => {
    return new L.divIcon({
      html: `<div class='hello'>${title}</div>`,
      className: 'hello',
      iconSize: [30, 30],
      popupAnchor: [2, -40]
  });
  }

  const renderMarkers = () => {
    return polylines.map((polyline)=>(
      <>
      <Marker icon={customMarker(polyline.name)}  position={polyline.positionGroup[0].positions[0]}>
        <Tooltip>polyline.name</Tooltip>
        <Popup><RectangleCard item={polyline}></RectangleCard></Popup>
      </Marker>
      </>
    ));
  }

  const clearColors = (array) => {
    array.map(item=>{
      item.color = 'red';
    });

    return array;
  }

  const renderPolyLines = () => {
    return mp.map((positions,index)=>(
      <>
       <Polyline key={index} pathOptions={{color: positions.color}}  eventHandlers={
         {
           click: (e)=> {
            let newMp = [...mp];
            let cleared = clearColors(newMp);
            cleared[index].color = 'blue';
            setMp(cleared);
           }
         }
       }  positions={positions.pos}></Polyline>
      </>
    ));
   
  }
  return (
    <MapContainer eventHandlers={{
      click: (e)=> {
        console.log(e.latlng);
      }
    }} center={[42.1946, 70.1223]} zoom={13}>
      <LayersControl>
      <LayersControl.BaseLayer checked name="Google map">
          <TileLayer
            url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
            maxZoom={20}
            subdomains={['mt1', 'mt2', 'mt3']}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="Толеби">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>
      
      </LayersControl>
      {renderPolyLines()}
      {renderMarkers()}
      {/* <MapConsumer>
        {(map) => {
          console.log("map center:", map.getCenter());
          map.on("click", function (e) {
            const { lat, lng } = e.latlng;
            console.log(lat);

            
          });
          return null;
        }}
      </MapConsumer> */}
      <FeatureGroup ref={ref}>
        <EditControl
          position='topright'
          onEdited={(e) => { console.log('edited', e.layers._layers) }}
          onCreated={(e) => { console.log('created', e) }}
          onDeleted={() => { console.log('deleted') }}
          draw={{
            rectangle: false
          }}
        />
      </FeatureGroup>
    </MapContainer>
  )
}
export default Map;