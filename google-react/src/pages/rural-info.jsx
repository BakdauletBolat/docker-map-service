import {
  Link, useParams, useHistory
} from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import Table from 'react-bootstrap/esm/Table';
import Tabs from 'react-bootstrap/esm/Tabs';
import Tab from 'react-bootstrap/esm/Tab';
import Map from '../components/map-simple';
import SwiperCore, {
  Navigation, Scrollbar,
  EffectCoverflow, Pagination
} from 'swiper';

import { IoArrowBack, IoCloseCircle } from 'react-icons/io5';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLocalties } from '../features/city/citySlice';
import CityService from "../network/city-service";
import VericalButton from "../components/VerticalButton";
import { FaList } from 'react-icons/fa';


function RuralInfo(props) {

  let { ruralId } = useParams();
  SwiperCore.use([EffectCoverflow, Pagination, Navigation, Scrollbar]);

  const localties = useSelector((state) => state.city.localties);
  const dispatch = useDispatch();
  const cityService = new CityService();

  const [mapCenter, setMapCenter] = useState({
    lat: 43.1,
    lng: 43.1
  })

  const [activeLocalties, setActiveLocalties] = useState({});
  const history = useHistory();

  const kilemetres = () => {

    let allKm = 0, goodKm = 0, badKm = 0, col = 0;
    console.log(localties)
    localties.map(localty => {
      localty.polylines.filter(item => item.typeMarker == activeEl).map(polyline => {

        allKm += polyline.km;
        col += 1;
        goodKm += parseInt(polyline.road.goodSituation);
        badKm += parseInt(polyline.road.badSitiation);
      })
    });



    let goodPercent = goodKm * 100 / allKm;

    goodPercent = parseInt(goodPercent);

    let badPercent = 100 - goodPercent;

    return { allKm, goodKm, badKm, goodPercent, badPercent, col }

  }

  useEffect(() => {
    cityService.getLocaltiesByRuralId(ruralId)
      .then(data => {
        dispatch(setLocalties(data.localities));
        console.log(data.localities)
        if (data.localities.length > 0) {
          setMapCenter({
            lat: data.localities[0].lat,
            lng: data.localities[0].lng
          })
          setActiveLocalties(data.localities[0])
        }
      })

  }, [ruralId])

  const [status, setStatus] = useState(false);

  const activeEl = 1;


  const kilemetresObject = kilemetres();

  function ModalFullScreen() {

    const className = status ? 'fullScreenModal fullScreenModal--active' : 'fullScreenModal'

    return (
      <div className={className}>
        <div onClick={() => setStatus(!status)} className="fullScreenModal__close">
          <IoCloseCircle color='white' size={30}></IoCloseCircle>
        </div>
        <div>
          <h2 className='inf-title'>{localties[0]?.rural?.name} ауылдық округі</h2>
          <Tabs defaultActiveKey="1" id="uncontrolled-tab-example">
            <Tab eventKey="1" title="Жол бойынша" className="tabs">
              {localties.map(localty => (
                <div>
                  <h2 className='inf-title'>{localty.name} елді мекені бойынша</h2>
                  <Table className='rwd-table' key={localty.id}
                  >
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'center' }} rowSpan="2">№</th>
                        <th rowSpan="2" style={{ textAlign: 'center' }}>Атауы</th>
                        <th rowSpan="2" style={{ textAlign: 'center' }}>Ұзындығы <br /> /км/</th>
                        <th rowSpan="2" style={{ textAlign: 'center' }}>Ені<br />/метр/</th>
                        <th rowSpan="2" style={{ textAlign: 'center' }}>Санаты</th>
                        <th colSpan="3" rowSpan="1" style={{ textAlign: 'center' }}>Жабындысы</th>
                        <th rowSpan="2" style={{ textAlign: 'center' }}>Пайдалануға берілген жылы</th>
                      </tr>
                      <tr>
                        <th style={{ textAlign: 'center' }}>Асфальт <br /> /км/</th>
                        <th style={{ textAlign: 'center' }}>Шағал тас <br /> /км/</th>
                        <th style={{ textAlign: 'center' }}>Топырақ <br /> /км/</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='header_table'>
                        <td style={{ textAlign: 'center' }}>{localty.polylines.filter(item => item.typeMarker == activeEl).length}</td>
                        <td style={{ textAlign: 'center' }} headers="length en">Барлығы</td>
                        <td style={{ textAlign: 'center' }}>12.12</td>
                        <td style={{ textAlign: 'center' }}>6</td>
                        <td style={{ textAlign: 'center' }}>V</td>
                        <td style={{ textAlign: 'center' }}>12.12</td>
                        <td style={{ textAlign: 'center' }}>-</td>
                        <td style={{ textAlign: 'center' }}>-</td>
                        <td style={{ textAlign: 'center' }}></td>
                      </tr>
                      {localty.polylines.filter(item => item.typeMarker == activeEl).map((item, index) => (
                        <tr key={item.id + index}>
                          <td style={{ textAlign: 'center' }}>{index + 1}</td>
                          <td style={{ textAlign: 'center' }} headers="length en">{item.name}</td>
                          <td style={{ textAlign: 'center' }}>{item.road?.beton / 1000}</td>
                          <td style={{ textAlign: 'center' }}>{item.road?.width}</td>
                          <td style={{ textAlign: 'center' }}>V</td>
                          <td style={{ textAlign: 'center' }}>{item.road?.beton / 1000} </td>
                          <td style={{ textAlign: 'center' }}>-</td>
                          <td style={{ textAlign: 'center' }}>-</td>
                          <td style={{ textAlign: 'center' }}>{item.road?.yearConstruction}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ))}
            </Tab>
            <Tab eventKey="2" title="Ауыз су бойынша" className="tabs">
              {localties.map(localty => (
                <div>
                  <h2 className='inf-title'>{localty.name} елді мекені бойынша</h2>
                  <Table className='rwd-table' key={localty.id}
                  >
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'center' }}>№</th>
                        <th style={{ textAlign: 'center' }}>Халық саны </th>
                        <th style={{ textAlign: 'center' }}>Абонент саны </th>
                        <th style={{ textAlign: 'center' }}>Су көзі </th>
                        <th style={{ textAlign: 'center' }}>Судың дебеті тәулік/м3 </th>
                        <th style={{ textAlign: 'center' }}>Жер асты су қоры хаттамасы </th>
                        <th style={{ textAlign: 'center' }}>Су құбырының ұзындығы (ш.қ) </th>
                        <th style={{ textAlign: 'center' }}>Салынған жылы </th>
                        <th style={{ textAlign: 'center' }}>Жарамды құбырлар  (ш.қ)</th>
                        <th style={{ textAlign: 'center' }}>Жаңартылып жатқаны (2021-2022ж) </th>
                        <th style={{ textAlign: 'center' }}>Су құбырының құрылымы</th>
                        <th style={{ textAlign: 'center' }}>2022ж ағымдағы жөндеуден ...</th>
                        <th style={{ textAlign: 'center' }}>Орнатылғаны </th>
                        <th style={{ textAlign: 'center' }}>Орнатылмағаны</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.populationCount}</td>
                        <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.subscribersCount}</td>
                        <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.springSource}</td>
                        <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.waterDebit}</td>
                        <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.waterReserves}</td>
                        <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.waterLength}</td>
                        <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.yearConstruction}</td>
                        <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.zaramdyQ}</td>
                        <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.currentQ}</td>
                        <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.waterStructure}</td>
                        <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.nysan}</td>
                        <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.wateMetersCount}</td>
                        <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.waterMatersDontCount}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              ))}
            </Tab>
            <Tab eventKey="3" title="Электр бойынша" className="tabs">
              3
            </Tab>
            <Tab eventKey="4" title="Газ бойынша" className="tabs">
              4
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }



  function displayRural() {
    return (
      localties?.map(item => (
        <SwiperSlide key={item.id}>
          <Link to={`/localties/${item.id}`} className='rectangle-grid__item'>
            <img src={item.image} className="rectangle-grid__icon" />
            <div className="black"></div>
            <p className="rectangle-grid__text">{item.name} елді мекені</p>
          </Link>
        </SwiperSlide>
      ))
    )

  }

  return (

    <div className="body">
      {localties?.length > 0 ? (
        <div className="container">
          <div className="body__main-content">
            <div className="body__back">
              <div onClick={history.goBack} className="back-icon">
                <IoArrowBack className="icon" size={40} />
              </div>
              <div className="body__main-title">Артқа</div>
            </div>
            <div className="body__main-text">{activeLocalties?.name} елді мекені</div>
            <div className="body__buttons-group">
              <VericalButton title={'Түйіндеме'} onClick={() => { setStatus(!status) }} icon={<FaList size={30}></FaList>}></VericalButton>
            </div>
          </div>
          <div>
            <div className="map">
              <Map mapCenter={mapCenter}></Map>
            </div>
            <div className="rural-cards">
              <Swiper
                className="swiper-cards"
                observer={true}
                observeParents={true}
                effect={'coverflow'} grabCursor={true}
                centeredSlides={true} slidesPerView={'auto'}
                coverflowEffect={{
                  "rotate": 50,
                  "stretch": 1,
                  "depth": 150,
                  "modifier": 1,
                  "slideShadows": false
                }} pagination={true}
                navigation
                slidesPerView={3}
                onSlideChange={(e) => {
                  setMapCenter({
                    lat: localties[e.activeIndex].lat,
                    lng: localties[e.activeIndex].lng
                  })
                  setActiveLocalties(localties[e.activeIndex])
                }}
                onSwiper={(swiper) => console.log(swiper)}
              >

                {localties !== undefined ? displayRural() : ''}
              </Swiper>
            </div>
          </div>
        </div>
      ) : (
        <div>
          Нет
        </div>
      )}
      <ModalFullScreen ></ModalFullScreen>
    </div>
  );
}

export default RuralInfo;