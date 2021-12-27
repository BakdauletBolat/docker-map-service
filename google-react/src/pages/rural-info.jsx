import {
    Link,useParams
  } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Map from '../components/newMap2';
import SwiperCore, {
  Navigation, Scrollbar,
  EffectCoverflow, Pagination
} from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import React,{useEffect,useState} from 'react';
import axios from 'axios'


function RuralInfo(props) {
    const [dataRural,setDataRural] = useState({});
    
    const [mapCenter, setMapCenter] = useState({
        lat: null,
        lng: null
      })
    
      const [activeRural, setActiveRural] = useState({});

    let { ruralId } = useParams();

    useEffect(()=>{
        SwiperCore.use([EffectCoverflow, Pagination, Navigation, Scrollbar]);
        axios.get('http://127.0.0.1:8000/api/cities/rural/'+ruralId)
        .then(res => {
            console.log(res.data)
            setDataRural(res.data);
            console.log(res.data.localities)
            if (res.data.localities.length > 0) {
              setMapCenter({
                lat: res.data.localities[0].lat,
                lng: res.data.localities[0].lng
              })
              setActiveRural(res.data.localities[0])
            }
            
            
        })
       console.log(ruralId) 
    },[ruralId])

    

    function displayRural() {
        return (
        dataRural?.localities?.map(item => (
            <SwiperSlide key={item.id}>
                  <Link  to={`/localties/${item.id}`} className='rectangle-grid__item'>
                    <img src={item.image} className="rectangle-grid__icon" />
                    <div class="black"></div>
                    <p className="rectangle-grid__text">{item.name} елді мекені</p>
                  </Link>
            </SwiperSlide>
          ))
        )
    
      }


      return (
        
        <div className="body">
          {dataRural.localities?.length > 0 ? (
            <div className="container">
            <div className="body__main-content">
              <Link to='/' className="body__main-title">Артқа</Link>
              <div className="body__main-text">{dataRural.name} ауылдық округі</div>
              <div className="body__main-text">{activeRural?.name} елді мекені</div>
              {/* <div className="body__main-text">Құрамында {activeRural?.localities.length} елді мекен</div> */}
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
                      lat: dataRural.localities[e.activeIndex].lat,
                      lng: dataRural.localities[e.activeIndex].lng
                    })
                    setActiveRural(dataRural.localities[e.activeIndex])
                  }}
                  onSwiper={(swiper) => console.log(swiper)}
                >
    
                  {dataRural !== undefined ? displayRural() : ''}
                </Swiper>
              </div>
            </div>
          </div>
          ): (
            <div>
              Нет
            </div>
          )}
          
        </div>
      );
    }

export default RuralInfo;