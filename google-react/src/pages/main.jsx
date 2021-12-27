import { Link, useRouteMatch } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Map from '../components/newMap2';
import SwiperCore, {
  Navigation, Scrollbar,
  EffectCoverflow, Pagination
} from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import axios from "axios";



SwiperCore.use([EffectCoverflow, Pagination, Navigation, Scrollbar]);

function MainPage() {
  const [dataRurals, setDataRurals] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: null,
    lng: null
  })

  const [activeRural, setActiveRural] = useState();
  const [disabledT,setDisabledT] = useState(false);

  useEffect(() => {

    axios.get('http://0.0.0.0:8000/api/cities/rural-list')
      .then(res => {
        setDataRurals(res.data);
        setMapCenter({
          lat: parseFloat(res.data[0].lat),
          lng: parseFloat(res.data[0].lng)
        })
        setActiveRural(res.data[0])
      })


  }, [])

  function displayRural() {
    return (
      dataRurals.map(item => (
        <SwiperSlide key={item.id}>
              <Link to={`/rural/${item.id}`} className={disabledT ? '': 'rectangle-grid__item'}>              
                <img src={item.image} className="rectangle-grid__icon" />
                <div class="black"></div>
                <p className="rectangle-grid__text">{item.name} ауылдық округі</p> 
              </Link>
        </SwiperSlide>
      ))
    )

  }
  return (
    <div className="body">
      <div className="container">
        <div className="body__main-content">
          <div className="body__main-title">Төлеби ауданының гео картасы</div>
          <div className="body__main-text">Ауылдық округтер саны 12</div>
          <div className="body__main-text">{activeRural?.name} ауылдық округі</div>
          <div className="body__main-text">Құрамында {activeRural?.localities.length} елді мекен</div>
        </div>
        <div>
          <div className="map">
            {mapCenter.lat !== null ? <Map mapCenter={mapCenter}></Map> : ""} 
            
          </div>
          <div className="rural-cards">
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
                  lat: dataRurals[e.activeIndex].lat,
                  lng: dataRurals[e.activeIndex].lng
                })
                setActiveRural(dataRurals[e.activeIndex])
    
              }}
              onSwiper={(swiper) => console.log(swiper)}
            >

              {dataRurals.length > 1 ? displayRural() : ''}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;