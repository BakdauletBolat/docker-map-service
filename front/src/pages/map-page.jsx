import React, { useState, useRef, useEffect } from "react";
import Map from '../components/map-interface.js';
import RoadInf from '../components/road-inf';
import GasInf from '../components/gas-inf';
import { useParams,useHistory } from 'react-router-dom';
import WaterInf from "../components/water-inf";
import ElectrInf from "../components/electr-inf";
import btns from "../staticData/btns.js";
import Relevant from "../components/relevent/relevant";
import { useSelector, useDispatch } from 'react-redux';
import { setLocalty, setPolylines, setRelevants,setPolyLineForm } from '../features/city/citySlice';
import { setActiveEl } from "../features/app/appSlice.js";
import CityService from "../network/city-service";
import CreateIcon from '../static/icons/createIcon.png';
import Button from "../components/button.jsx";
import VericalButton from "../components/VerticalButton.jsx";
import { IoArrowBack } from 'react-icons/io5';
import SidebarModal from "../components/SidebarModal.jsx";
import Modalize from './Modalize';
// import ModalBody from "../components/modal/ModalBody.jsx";
import PolyLineForm from "../components/form/PolylineForm.jsx";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


function MapPage() {

  const [isPolyLineCreate, setPolyLineCreate] = useState(false);

  const cityService = new CityService();
  const dispatch = useDispatch();
  let history = useHistory();

  const localty = useSelector(state => state.city.localty);
  const polylines = useSelector(state => state.city.polylines);
  const polyLineForm = useSelector(state => state.city.polyLineForm);
  const relevants = useSelector(state => state.city.relevants);

  const [isActiveAllInf, setIsActiveAllInf] = useState(false);
  const [isActiveRelevant, setIsActiveRelevant] = useState(false);

  const activeEl = useSelector(state => state.app.activeEl);
  const activePolyline = useSelector(state => state.city.activePolyline);

  const { localtiesId } = useParams();

  const modRef = useRef(null);

  const ref = useRef(null);


  const mapRef = useRef(null);

  const setMapRef = (refValue) => {
    mapRef.current = refValue;
  }

  const setEditRef = (refValue) => {
    ref.current = refValue;
  }

  const openModalize = () => {
    setPolyLineCreate(!isPolyLineCreate)
    modRef.current.open();
  }

  const saveAndClear = () => {
    if (ref.current) {
      const layersF = ref.current._layers;
    let positionGroup = [];
    Object.entries(layersF).forEach(([key, element]) => {

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
    }));
    }

    const layers = ref.current._layers;

    Object.entries(layers).forEach(([key, element]) => {
      ref.current.removeLayer(element);
      console.log('cleared');
    });

  
  }

  const savePoints = () => {
    if (ref.current) {
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
      }));
    }

  }

  

  useEffect(() => {
    console.log(localtiesId,'updated');
    cityService.getLocaltyById(localtiesId)
      .then(data => { dispatch(setLocalty(data)) });

    cityService.getPolyLinesByTypeAndLocalty(activeEl, localtiesId)
      .then(data => dispatch(setPolylines(data)));

    cityService.getRelevantsByTypeAndLocalty(activeEl, localtiesId)
      .then(data => dispatch(setRelevants(data)));

  }, [activeEl,localtiesId])


  const displayAllInf = () => {
    if (activeEl === 1) {
      return <RoadInf item={polylines} ></RoadInf>
    }
    if (activeEl === 2) {
      return <WaterInf item={localty} ></WaterInf>
    }
    if (activeEl === 3) {
      return <ElectrInf item={localty} ></ElectrInf>
    }
    if (activeEl === 4) {
      return <GasInf item={localty} ></GasInf>
    }
  }

  const points = ['50%', '100%'];

  return (
    <div>
      <div className="sidebar">
        <div className="sidebar__header">
          <div className="sidebar__header-left">
            <div onClick={history.goBack} className="back-icon">
              <IoArrowBack className="icon" size={40} />
            </div>
            <h1 className="sidebar__header-title">
              {localty.name}
            </h1>
          </div>
          <div className="sidebar__header-right">
            <div>
              <Button onClick={openModalize} title="Жасау" icon={CreateIcon}></Button>
            </div>
          </div>
        </div>
        <div className="sidebar__body">
          <div className="sidebar__body-row">
            {
              btns.map(btn => (
                <VericalButton key={btn.id} onClick={() => dispatch(setActiveEl(btn.id))}
                  activeItem={btn.id === activeEl}
                  icon={btn.icon}
                  title={btn.title}></VericalButton>
              ))
            }
          </div>
          <div className="sidebar__body-row margin-top">
            <VericalButton onClick={() => setIsActiveAllInf(!isActiveAllInf)}
              activeItem={isActiveAllInf}
              title="Жалпы ақпарат"></VericalButton>
            <VericalButton onClick={() => setIsActiveRelevant(!isActiveRelevant)}
              activeItem={isActiveRelevant}
              title="Өзекті мәселелер"></VericalButton>
          </div>
        </div>
        <Modalize points={points} refProp={modRef}>
          <PolyLineForm  saveAndClear={saveAndClear}></PolyLineForm>
        </Modalize>
        {activePolyline && <SidebarModal></SidebarModal>}
      </div>

      <div className="container-fluid" style="margin-left: 450px;height: 100vh;width: calc(100% - 450px);padding: 0px;">
        {isActiveAllInf ? (
          <div className="all-inf">
            {displayAllInf()}
          </div>
        ) : ''}
        {isActiveRelevant && (<div className="all-inf"><Relevant relevants={relevants}></Relevant></div>)}
        <div style={{ padding: 0 + 'px' }}>
          {localty.lat ? (
            <Map
            editRef={ref}
            localtiesId={localtiesId}
            setEditRef={setEditRef}
            setMapRef={setMapRef}
            mapRef={mapRef}
            isPolyLineCreate={isPolyLineCreate}
            savePoints={savePoints}
            setPolyLineCreate={setPolyLineCreate}></Map>
          ): ''}
        </div>
      </div>
    </div>
  )

}

export default MapPage