// import React, { useState, useRef, useEffect } from "react";

// import VericalButton from "./VerticalButton";
import { FaSatellite, FaMapMarked } from 'react-icons/fa';

// import { useLoadScript, GoogleMap, DrawingManager, Polyline } from "@react-google-maps/api";
// // import ReactangleCard from "./card/rectangle";
// import PolyLineItem from "./PolylineItem";
// import { useSelector, useDispatch } from "react-redux";

// import { setIsActiveModal } from '../features/app/appSlice';

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



import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, Popup, TileLayer, FeatureGroup, LayersControl, Marker, Polyline, Tooltip } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import RectangleCard from './card/rectangle';
import { useSelector, useDispatch } from 'react-redux';
import L from "leaflet";
import RoadIcon from '../static/icons/road.svg';
import { setPolyLineForm } from '../features/city/citySlice';

function Map({ localty }) {

  const polylines = useSelector(state => state.city.polylines);
  const polyLineForm = useSelector(state => state.city.polyLineForm);
  const dispatch = useDispatch();

  const [isSaved, setIsSaved] = useState(false);

  const [multilines, setMultilines] = useState([]);
  

  const ref = useRef(null);


  useEffect(() => {
    let multilinePositions = [];
    polylines.map(polyline => {
      let posG = [];
      polyline.positionGroup.map(pos => {
        let posItem = []
        pos.positions.map(position => {
          posItem.push([position.lat, position.lng]);
        });
        posG.push(posItem);
      })

      multilinePositions.push({
        color: polyline.color,
        pos: posG
      });
    });

    setMultilines(multilinePositions);

  }, [polylines]);

  const clearColors = (array) => {
    array.map(item => {
      item.color = '#303030';
    });

    return array;
  }

  const createPositions = () => {

    const layers = ref.current._layers;

    let positionGroup = [];

    Object.entries(layers).forEach(([key, element]) => {

      const paths = element._latlngs;

      console.log(paths);

      let positions = {
        positions: paths.map(path => ({
          lat: path.lat,
          lng: path.lng
        }))
      }
      positionGroup.push(positions);
    });

    dispatch(setPolyLineForm({
      ...polyLineForm,
      positionGroup: positionGroup
    }))

    setIsSaved(false);
  }

  const customMarker = new L.divIcon({
    html: `<img src = "${RoadIcon}" />`,
    className: 'marker-item',
    iconSize: [30, 30],
  });

  const renderSaveButton = () => {

    const className = isSaved ? 'save-button' : 'save-button disabled'
    return <button className={className} onClick={createPositions}>
      Сохранить точки
    </button>
  }

  const renderMarkers = () => {
    return polylines.map((polyline, index) => (
      <>
        <Marker icon={customMarker} position={polyline.positionGroup[0].positions[0]} eventHandlers={
          {
            click: (e) => {
              let newMp = [...multilines];
              let cleared = clearColors(newMp);
              cleared[index].color = 'blue';
              setMultilines(cleared);
            }
          }
        } >
          <Tooltip>{polyline.name}</Tooltip>
          <Popup><RectangleCard item={polyline}></RectangleCard></Popup>
        </Marker>
      </>
    ));
  }

  const renderPolyLines = () => {
    return multilines.map((positions, index) => (
      <>
        <Polyline key={index} pathOptions={{ color: positions.color }} eventHandlers={
          {
            click: (e) => {
              let newMp = [...multilines];
              let cleared = clearColors(newMp);
              cleared[index].color = 'blue';
              setMultilines(cleared);
            }
          }
        } positions={positions.pos}></Polyline>
      </>
    ));

  }
  return (
    <>
      {renderSaveButton()}
      <MapContainer eventHandlers={{
        click: (e) => {
          console.log(e.latlng);
        }
      }} center={[localty.lat, localty.lng]} zoom={13}>
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
              url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}

            />
          </LayersControl.BaseLayer>

        </LayersControl>
        {renderPolyLines()}
        {renderMarkers()}
        <FeatureGroup ref={ref}>
          <EditControl
            position='topright'
            onEdited={(e) => { setIsSaved(true) }}
            onCreated={(e) => { setIsSaved(true) }}
            onDeleted={() => { setIsSaved(true) }}
            draw={{
              polyline: {
                shapeOptions: {
                  color:'red',
                  weight: 1
                }
              },
              rectangle: false,
              polygon:false,
              circle:false,
              marker:false,
              circlemarker: false
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </>

  )
}
export default Map;