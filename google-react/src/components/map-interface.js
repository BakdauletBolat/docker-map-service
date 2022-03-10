import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, Popup, TileLayer, FeatureGroup, LayersControl, Marker, Polyline, Tooltip,MapConsumer } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import RectangleCard from './card/rectangle';
import { useSelector, useDispatch } from 'react-redux';
import L from "leaflet";
import RoadIcon from '../static/icons/road.svg';

function Map({ localty, setEditRef,savePoints,setMapRef }) {

  const polylines = useSelector(state => state.city.polylines);
  const polyLineForm = useSelector(state => state.city.polyLineForm);
  const dispatch = useDispatch();

  const [isSaved, setIsSaved] = useState(false);

  const [multilines, setMultilines] = useState([]);


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
    savePoints();
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
              cleared[index].color = '#ffac2e';
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
      <MapContainer  center={[localty.lat, localty.lng]} zoom={13}>
         
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
          <LayersControl.BaseLayer checked name="Открытая карта">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        </LayersControl>
        {renderPolyLines()}
        {renderMarkers()}
        <MapConsumer eventHandlers={{
          click: (e) => {
            console.log(e)
          }
        }}>
        {(map) => {
          setMapRef(map);
          
          return null
        }}
        </MapConsumer>
        <FeatureGroup ref={(ref)=>setEditRef(ref)}>
          <EditControl
            
            position='topright'
            onEdited={(e) => { setIsSaved(true) }}
            onCreated={(e) => { setIsSaved(true) }}
            onDeleted={() => { setIsSaved(true) }}
            draw={{
              polyline: {
                shapeOptions: {
                  color: 'red',
                  weight: 1
                }
              },
              rectangle: false,
              polygon: false,
              circle: false,
              marker: false,
              circlemarker: false
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </>

  )
}
export default Map;