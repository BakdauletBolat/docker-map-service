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
import NotFoundScreen from "./NotFoundScreen";
import LoadingScreen from "./LoadingScreen";

function RuralInfo(props) {

  let { ruralId } = useParams();
  SwiperCore.use([EffectCoverflow, Pagination, Navigation, Scrollbar]);

  const [isLoading, setIsLoading] = useState(false);
  const localties = useSelector((state) => state.city.localties);
  const dispatch = useDispatch();
  const cityService = new CityService();

  const [mapCenter, setMapCenter] = useState({
    lat: 43.1,
    lng: 43.1
  })

  const [activeLocalties, setActiveLocalties] = useState({});
  const history = useHistory();


  useEffect(() => {
    setIsLoading(true);
    cityService.getLocaltiesByRuralId(ruralId)
      .then(data => {
        dispatch(setLocalties(data.localities));
        console.log(data.localities)
        if (data.localities.length > 0) {
          setMapCenter({
            lat: data.localities[0].lat,
            lng: data.localities[0].lng
          })
          setActiveLocalties(data.localities[0]);
          setIsLoading(false);
        }
      })

  }, [ruralId])

  const [status, setStatus] = useState(false);

  const activeEl = 1;


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
                <div key={localty.id}>
                  <h2 className='inf-title'>{localty.name} елді мекені бойынша</h2>
                  <Table responsive className='rwd-table'
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
                <div key={localty.id}>
                  <h2 className='inf-title'>{localty.name} елді мекені бойынша</h2>
                  <Table responsive className='rwd-table'
                  >
                    <thead>
                      <tr>
                        <th rowSpan={2}>Халық саны </th>
                        <th rowSpan={2}>Абонент саны </th>
                        <th rowSpan={2}>Су көзі </th>
                        <th rowSpan={2}>Судың дебеті тәулік/м3 </th>
                        <th rowSpan={2}>Жер асты су қоры хаттамасы </th>
                        <th rowSpan={2}>Су құбырының ұзындығы (ш.қ) </th>
                        <th colSpan={4}>Оның ішінде</th>
                        <th rowSpan={2}>2022ж ағымдағы жөндеуден өтетін су құбырлары мен нысандары (ш.қ)</th>
                        <th colSpan={2}>Су есептегіш құралдары</th>
                      </tr>
                      <tr>
                        <th>Салынған жылы </th>
                        <th>Жарамды құбырлар  (ш.қ)</th>
                        <th>Жаңартылып жатқаны (2021-2022ж) </th>
                        <th>Су құбырының құрылымы</th>
                        <th>Орнатылғаны </th>
                        <th>Орнатылмағаны</th>
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
              {localties.map(localty => (
                <div key={localty.id}>
                  <h2 className='inf-title'>{localty.name} елді мекені бойынша</h2>
                  <Table className='rwd-table' responsive
                  >
                    <thead>
                      <tr>
                        <th rowSpan={3}>Елді мекен атауы</th>
                        <th rowSpan={3}>Электр жүйесінің ұзындығы (км)</th>
                        <th colSpan={7}>Электр бағанасы. Оның ішінде:</th>
                      </tr>
                      <tr>
                        <th rowSpan={2}>Бағаналарды ң жалпы саны (дана)</th>
                        <th colSpan={3}>Бетонды бағаналар</th>
                        <th colSpan={3}>Ағаш бағаналардың саны</th>
                      </tr>
                      <tr>
                        <th>ОЖТ меншігінде</th>
                        <th>Коммуналдық меншікте</th>
                        <th>Өздері орнатқан (само строй)</th>
                        <th>ОЖТ меншігінде</th>
                        <th>Коммуналдық меншікте</th>
                        <th>Өздері орнатқан (само строй)</th>
                      </tr>

                    </thead>
                    <tbody>
                      <tr>
                        <td>{localty.name}</td>
                        <td>{localty.localitiesElectr?.length ? localty.localitiesElectr?.length / 1000 : '-'}</td>
                        <td>{localty.localitiesElectr?.baganaNumber ? localty.localitiesElectr?.baganaNumber : '-'}</td>
                        <td>{localty.localitiesElectr?.bOJT ? localty.localitiesElectr?.bOJT : '-'}</td>
                        <td>{localty.localitiesElectr?.bCOM ? localty.localitiesElectr?.bCOM : '-'}</td>
                        <td>{localty.localitiesElectr?.bOZ ? localty.localitiesElectr?.bOZ : '-'}</td>
                        <td>{localty.localitiesElectr?.aOJT ? localty.localitiesElectr?.aOJT : '-'}</td>
                        <td>{localty.localitiesElectr?.aCOM ? localty.localitiesElectr?.aCOM : '-'}</td>
                        <td>{localty.localitiesElectr?.aOZ ? localty.localitiesElectr?.aOZ : '-'}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table className='rwd-table' responsive>
                    <thead>
                      <tr>
                        <th colSpan={7}>Электр желілерінің ұзындығы</th>
                        <th colSpan={3}>Трансформатордың саны</th>
                      </tr>
                      <tr>
                        <th rowSpan={2}>СИП кабель жалпы ұзындығы</th>
                        <th colSpan={3}>СИП кабель</th>
                        <th colSpan={3}>Темір электр сымдары</th>
                        <th rowSpan={2}>Жалпы саны</th>
                        <th colSpan={2}>Оның ішінде</th>
                      </tr>
                      <tr>
                        <th>ОЖТ меншігінде</th>
                        <th>Коммуналдық меншікте</th>
                        <th>Өздері тартқан</th>
                        <th>ОЖТ меншігінде</th>
                        <th>Коммуналдық меншікте</th>
                        <th>Өздері тартқан</th>
                        <th>ОЖТ меншігінде</th>
                        <th>Коммуналдық меншікте</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{localty.localitiesElectr?.cipLength ? localty.localitiesElectr?.cipLength : '-'}</td>
                        <td>{localty.localitiesElectr?.cipOJT ? localty.localitiesElectr?.cipOJT : '-'}</td>
                        <td>{localty.localitiesElectr?.cipCOM ? localty.localitiesElectr?.cipCOM : '-'}</td>
                        <td>{localty.localitiesElectr?.cipOZ ? localty.localitiesElectr?.cipOZ : '-'}</td>
                        <td>{localty.localitiesElectr?.tmOJT ? localty.localitiesElectr?.tmOJT : '-'}</td>
                        <td>{localty.localitiesElectr?.tmCOM ? localty.localitiesElectr?.tmCOM : '-'}</td>
                        <td>{localty.localitiesElectr?.tmOOZ ? localty.localitiesElectr?.tmOOZ : '-'}</td>
                        <td>{localty.localitiesElectr?.trbaganaNumber ? localty.localitiesElectr?.trbaganaNumber : '-'}</td>
                        <td>{localty.localitiesElectr?.trOJT ? localty.localitiesElectr?.trOJT : '-'}</td>
                        <td>{localty.localitiesElectr?.trCOM ? localty.localitiesElectr?.trCOM : '-'}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>)
              )}
            </Tab>
            <Tab eventKey="4" title="Газ бойынша" className="tabs">
              {localties.map(localty => (
                <div>
                  <h2 className='inf-title'>{localty.name} елді мекені бойынша</h2>
                  <Table className="rwd-table" responsive>
                    <thead>
                      <tr>

                        <th rowSpan={2}>Абонент саны</th>
                        <th rowSpan={2}>Газ құбыры жүйесінің ұзындығы (ш.қ км)</th>
                        <th colSpan={6}>Оның ішінде:</th>
                        <th rowSpan={2}>Салынған жылы</th>
                      </tr>
                      <tr>
                        <th>Жоғары қысымды газ құбырлары (ш.қ (км)</th>
                        <th>Орта қысымды газ құбырлары (ш.қ)</th>
                        <th>Төмен қысымды құбырлар</th>
                        <th>Газ тұтыну көлемі (м3сағат)</th>
                        <th>ГРПШ саны</th>
                        <th>Құрылымы</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* <td>{localty.localitiesGas?.populationCount ? localty.localitiesGas?.populationCount : '-'}</td> */}
                        <td>{localty.localitiesGas?.subscribersCount ? localty.localitiesGas?.subscribersCount : '-'}</td>
                        <td>{localty.localitiesGas?.gasLength ? localty.localitiesGas?.gasLength : '-'}</td>
                        <td>{localty.localitiesGas?.jGasLength ? localty.localitiesGas?.jGasLength : '-'}</td>
                        <td>{localty.localitiesGas?.oGasLength ? localty.localitiesGas?.oGasLength : '-'}</td>
                        <td>{localty.localitiesGas?.tomenKysym ? localty.localitiesGas?.tomenKysym : '-'}</td>
                        <td>{localty.localitiesGas?.volumeGas ? localty.localitiesGas?.volumeGas : '-'}</td>
                        <td>{localty.localitiesGas?.grpsh ? localty.localitiesGas?.grpsh : '-'}</td>
                        <td>{localty.localitiesGas?.typeGas ? localty.localitiesGas?.typeGas : '-'}</td>
                        <td>{localty.localitiesGas?.yearConstruction ? localty.localitiesGas?.yearConstruction : '-'}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              ))}
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }



  function displayRural() {

    if (isLoading) {
      return <LoadingScreen />
    }

    if (localties?.length <= 0) {
      return <NotFoundScreen></NotFoundScreen>
    }

    return (
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
        {localties?.map(item => (
          <SwiperSlide key={item.id}>
            <Link to={`/localties/${item.id}`} className='rectangle-grid__item'>
              <img src={item.image} className="rectangle-grid__icon" />
              <div className="black"></div>
              <p className="rectangle-grid__text">{item.name} елді мекені</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    )


  }

  return (

    <div className="body">
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
            {displayRural()}
          </div>
        </div>
      </div>
      <ModalFullScreen ></ModalFullScreen>
    </div >
  );
}

export default RuralInfo;