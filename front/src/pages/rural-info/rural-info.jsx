import {
  Link, useParams, useHistory
} from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Map from '../../components/map-simple';
import SwiperCore, {
  Navigation, Scrollbar,
  EffectCoverflow, Pagination,Keyboard
} from 'swiper';

import { IoArrowBack } from 'react-icons/io5';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLocaltiesRow } from '../../features/city/citySlice';
import CityService from "../../network/city-service";
import VericalButton from "../../components/VerticalButton";
import { FaList } from 'react-icons/fa';
import NotFoundScreen from "../NotFoundScreen";
import LoadingScreen from "../LoadingScreen";

import ModalFullScreen from './ModalScreen/index';

SwiperCore.use([EffectCoverflow, Pagination, Navigation, Scrollbar,Keyboard]);

function RuralInfo() {

  let { ruralId } = useParams();


  const [isLoading, setIsLoading] = useState(false);
  const localties = useSelector((state) => state.city.localtiesRaw);
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
    cityService.getLocaltiesByRuralRawId(ruralId)
      .then(data => {
        console.log(data);
        dispatch(setLocaltiesRow(data));
        if (data.length > 0) {
          setMapCenter({
            lat: data[0].lat,
            lng: data[0].lng
          })
          console.log(data);
          setActiveLocalties(data[0]);
          setIsLoading(false);
        }
      })

  }, [ruralId])

  const [status, setStatus] = useState(false);

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  function displayRural() {

    if (isLoading) {
      return <LoadingScreen />
    }

    if (localties?.length <= 0) {
      return <NotFoundScreen></NotFoundScreen>
    }

    return (
      <>
      <Swiper
        className="swiper-cards"
        style={{
          margin: '0px 15px',
          paddingTop: '100px'
        }}
        keyboard={{ enabled: true }}
        breakpoints={{
          500: {
            slidesPerView: 4
          }
        }}

        effect={'coverflow'}
        centeredSlides={true}
        coverflowEffect={{
          "rotate": 10,
          "stretch": 1,
          "depth": 0,
          "modifier": 5,
          "slideShadows": false
        }} pagination={true}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        grabCursor={true}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;

        }}
        slidesPerView={2}
        onSlideChange={(e) => {
          setMapCenter({
            lat: localties[e.activeIndex].lat,
            lng: localties[e.activeIndex].lng
          })
          setActiveLocalties(localties[e.activeIndex])
        }}

      >
        {localties?.map(item => (
          <SwiperSlide key={item.id}>
            <Link to={`/localties/${item.id}`} className='rectangle-grid__item'>
              <img src={item.image} className="rectangle-grid__icon" />
              <div className="black"></div>
              <p className="rectangle-grid__text">{item.name} {item.name == 'Ленгер' ? 'қаласы' : 'елді мекені' }</p>
            </Link>
          </SwiperSlide>
        ))}
        
      </Swiper>
     
      </>
      
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
            <div className="navigation-container__left" ref={navigationPrevRef}><FaArrowLeft size={35} color="white"></FaArrowLeft></div>
          <div className="navigation-container__right" ref={navigationNextRef}><FaArrowRight size={35} color="white"></FaArrowRight></div>
          </div>
        </div>
      </div>
      <ModalFullScreen status={status} setStatus={setStatus}></ModalFullScreen>
    </div >
  );
}

export default RuralInfo;



