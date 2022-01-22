import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Map from '../components/map-simple';
import SwiperCore, {
  Navigation, Scrollbar,
  EffectCoverflow, Pagination
} from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import CityService from "../network/city-service";
import { useSelector, useDispatch } from 'react-redux';
import { setRurals } from '../features/city/citySlice';
import LoadingScreen from "./LoadingScreen";
import NotFoundScreen from './NotFoundScreen';

SwiperCore.use([EffectCoverflow, Pagination, Navigation, Scrollbar]);

function MainPage() {

  const cityService = new CityService();

  const rurals = useSelector((state) => state.city.rurals);
  const dispatch = useDispatch();

  const [mapCenter, setMapCenter] = useState({
    lat: 43.1,
    lng: 43.1
  });

  const [activeRural, setActiveRural] = useState();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    cityService.getRurals()
      .then(res => {
        dispatch(setRurals(res));
        setMapCenter({
          lat: parseFloat(res[0].lat),
          lng: parseFloat(res[0].lng)
        })
        setActiveRural(res[0]);
        setIsLoading(false);
      })

  }, [])

  function displayRural() {

    if (isLoading) {
      return <LoadingScreen />
    }

    if (rurals.length <= 0) {
      return <NotFoundScreen></NotFoundScreen>
    }

    return (
      <Swiper
        observer={true}
        observeParents={true}
        className="swiper-cards"
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
        slidesPerView={4}
        onSlideChange={(e) => {
          setMapCenter({
            lat: rurals[e.activeIndex].lat,
            lng: rurals[e.activeIndex].lng
          })
          setActiveRural(rurals[e.activeIndex])
        }}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {rurals.map(item => (
          <SwiperSlide key={item.id}>
            <Link to={`/rural/${item.id}`} className='rectangle-grid__item'>
              <img src={item.image} className="rectangle-grid__icon" />
              <div className="black"></div>
              <p className="rectangle-grid__text">{item.name} ауылдық округі</p>
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
          <div className="body__main-title">Төлеби ауданының ахуалдық орталығы</div>
          <div className="body__main-text">Ауылдық округтер саны 12</div>
          <div className="body__main-text">{activeRural?.name} ауылдық округі</div>
          <div className="body__main-text">Құрамында {activeRural?.localities.length} елді мекен</div>
        </div>
        <div>
          <div className="map">
            {mapCenter.lat !== null ? <Map mapCenter={mapCenter}></Map> : ""}
          </div>
          <div className="rural-cards">           
              {displayRural()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;