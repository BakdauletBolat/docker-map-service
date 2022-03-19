import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, Popup, TileLayer, FeatureGroup, LayersControl, Marker,
        Polyline, Tooltip,MapConsumer } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import RectangleCard from './card/rectangle';
import { useSelector, useDispatch } from 'react-redux';
import {setPolylines} from '../features/city/citySlice';
import { useParams } from 'react-router-dom';
import L, { map } from "leaflet";
import RoadIcon from '../static/icons/road.svg';
import WaterTap from '../static/icons/water-tap.svg';
import GasIcon from '../static/icons/valve.png';
import ElectrIcon from '../static/icons/electric-meter.png';
import CityService from '../network/city-service';

function Map({ setEditRef,savePoints,setMapRef,editRef,mapRef }) {

  const polylines = useSelector(state => state.city.polylines);
  const polyLineForm = useSelector(state => state.city.polyLineForm);

  const dispatch = useDispatch();

  const localty = useSelector(state => state.city.localty);

  const [isSaved, setIsSaved] = useState(false);

  const activeEl = useSelector(state => state.app.activeEl);
  const { localtiesId } = useParams();

  const [multilines, setMultilines] = useState([]);


  useEffect(() => {
    console.log(localty);
    if (mapRef.current != null) {
      mapRef.current.setView([localty.lat,localty.lng],13);
    }
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
        id: polyline.id,
        color: polyline.color,
        pos: posG
      });
    });

    setMultilines(multilinePositions);

  }, [polylines,localty]);

  const clearColors = (array) => {

    if (activeEl == 1) {
      array.map(item => {
        item.color = '#303030';
      });
      return array;
    }

    if (activeEl == 2) {
      array.map(item => {
        item.color = '#4aabff';
      });
      return array;
    }

    if (activeEl == 3) {
      array.map(item => {
        item.color = '#00396b';
      });
      return array;
    }

    if (activeEl == 4) {
      array.map(item => {
        item.color = '#db8b00';
      });
      return array;
    }
  
    
  }

  const createPositions = () => {
    savePoints();
    setIsSaved(false);
  }


  let customMarker = new L.divIcon({
    html: `<img src = "${RoadIcon}" />`,
    className: 'marker-item',
    iconSize: [30, 30],
  });

  if (activeEl == 1) {
    customMarker = new L.divIcon({
      html: `<img src = "${RoadIcon}" />`,
      className: 'marker-item',
      iconSize: [30, 30],
    });
  }

  if (activeEl == 2) {
    customMarker = new L.divIcon({
      html: `<img src = "${WaterTap}" />`,
      className: 'marker-item',
      iconSize: [30, 30],
    });
  }

  if (activeEl == 3) {
    customMarker = new L.divIcon({
      html: `<img src = "${ElectrIcon}" />`,
      className: 'marker-item',
      iconSize: [30, 30],
    });
  }

  if (activeEl == 4) {
    customMarker = new L.divIcon({
      html: `<img src = "${GasIcon}" />`,
      className: 'marker-item',
      iconSize: [30, 30],
    });
  }



  

  const renderSaveButton = () => {

    const className = isSaved ? 'save-button' : 'save-button disabled'
    return <button className={className} onClick={createPositions}>
      Сохранить точки
    </button>
  }

  const renderUpdateButton = () => {
    const className = isSaved ? 'update-button' : 'update-button'
    return <button className={className} onClick={updatePositions}>
      Обновить точки
    </button>
  }

  const renderMarkers = () => {
    return polylines.map((polyline, index) => (
        <Marker key={polyline.id} icon={customMarker} position={polyline.positionGroup[0].positions[0]} eventHandlers={
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
    ));
  }



  const clearCurrentEditRefs = () => {
    const layers = editRef.current._layers;
    Object.entries(layers).forEach(([key, element]) => {
      editRef.current.removeLayer(element);
      console.log('cleared');
    });
  }

  const [activeRoad, setActiveRoad] = useState(null);

  const renderPolyLines = () => {
    return multilines.map((positions, index) => (
        <Polyline key={positions.id} pathOptions={{ color: positions.color }} eventHandlers={
          {
            click: (e) => {
              let newMp = [...multilines];
              let cleared = clearColors(newMp);
              cleared[index].color = 'blue';
              setMultilines(cleared);
             
            },
            dblclick: (e)=> {
              clearCurrentEditRefs();
              const latlngs = e.target._latlngs;
              setActiveRoad(positions.id);
              latlngs.forEach((latlng)=>{
                let polyline = L.polyline(latlng, {color: 'red'});
                editRef.current.addLayer(polyline);
              });
              
            }
          }
        } positions={positions.pos}></Polyline>
    ));

  }


  const updatePositions = () => {

    const cityService = new CityService();
    if (editRef.current && activeRoad !== null) {
      const layers = editRef.current._layers;

      let positionGroup = [];

      Object.entries(layers).forEach(([key, element]) => {

        const paths = element._latlngs;

        console.log(paths);

        let positions = paths.map(path => ({
          lat: path.lat,
          lng: path.lng
        }))

        positionGroup.push(positions);
      });

      cityService.updatePos(positionGroup, activeRoad).then(()=>{
        cityService.getPolyLinesByTypeAndLocalty(activeEl, localtiesId)
        .then(data => dispatch(setPolylines(data)));
        clearCurrentEditRefs();
      }).catch((e)=>{
        console.log(e);
      })
    }

    
  }

  return (
    <>
      {renderSaveButton()}
      {renderUpdateButton()}
      <MapContainer center={[localty.lat, localty.lng]} zoom={13}>
         
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