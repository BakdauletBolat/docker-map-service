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
import { IoArrowBack, IoCloseCircle } from 'react-icons/io5';
import VericalButton from "../components/VerticalButton";
import { FaList } from 'react-icons/fa';
import Table from 'react-bootstrap/esm/Table';
import Tabs from 'react-bootstrap/esm/Tabs';
import Tab from 'react-bootstrap/esm/Tab';
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
  const [status, setStatus] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  function ModalFullScreen() {

    const className = status ? 'fullScreenModal fullScreenModal--active' : 'fullScreenModal'

    return (
      <div className={className}>
        <div onClick={() => setStatus(!status)} className="fullScreenModal__close">
          <IoCloseCircle color='white' size={30}></IoCloseCircle>
        </div>
        <div>
        <h2 className='inf-title'>Төлеби ауданы</h2>
          <Tabs defaultActiveKey="1" id="uncontrolled-tab-example">
            <Tab eventKey="1" title="Жол саласы бойынша" className="tabs">
              <Table className="rwd-table" responsiv>
                <thead>
                  <tr>
                    <th rowSpan={2}>р/с</th>
                    <th rowSpan={2}>Жолдардың саны</th>
                    <th rowSpan={2}>Жалпы ұзындығы (ш. қ)</th>
                    <th colSpan={3}>Оның ішінде</th>
                  </tr>
                  <tr>
                    <th>Қанағатты жағдайда (ш. қ)</th>
                    <th>Қанағатсыз жағдайда (ш. қ)</th>
                    <th>Пайызы (%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Облыстық маңызы бар жолдар</td>
                    <td>15</td>
                    <td>259.88</td>
                    <td>230.51</td>
                    <td>29.37</td>
                    <td>88.7 %</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Аудандық маңызы бар жолдар</td>
                    <td>34</td>
                    <td>144.88</td>
                    <td>125.8</td>
                    <td>18.25</td>
                    <td>87.4 %</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Елді мекеннің ішкі көшелері</td>
                    <td>477</td>
                    <td>680</td>
                    <td>496</td>
                    <td>183</td>
                    <td>73.0 %</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Барлығы</td>
                    <td>526</td>
                    <td>1084</td>
                    <td>852</td>
                    <td>231</td>
                    <td>78.6 %</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="2" title="Ауыз су бойынша" className="tabs">
              <Table className="rwd-table" responsive>
                <thead>
                  <tr>
                    <th rowSpan={2}>Барлық елді мекендер (саны)</th>
                    <th colSpan={3}>Оның ішінде:</th>
                    <th rowSpan={2}>Су құбырының жалпы ұзындығы (ш.қ, (км)</th>
                    <th colSpan={3}>Пайдаланудағы құбырлардың тозуы</th>
                  </tr>
                  <tr>
                    <th>Су құбырымен қамтылғаны</th>
                    <th>Қалған елді мекен</th>
                    <th>Қамтылу пайызы (%)</th>
                    <th>Жарамды құбырлар</th>
                    <th>Жөндеуді қажет ететін құбырлар (ш.қ)</th>
                    <th>Тозу пайызы (%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>55</td>
                    <td>54</td>
                    <td>1</td>
                    <td>98,2%</td>
                    <td>1226</td>
                    <td>1032</td>
                    <td>194</td>
                    <td>16%</td>
                  </tr>
                </tbody>
              </Table>
              <Table className="rwd-table" responsive>
                <thead>
                  <tr>
                    <th rowSpan={2}>Халық саны</th>
                    <th rowSpan={2}>Абонент саны</th>
                    <th rowSpan={2}>Су көзі</th>
                    <th rowSpan={2}>Судың дебеті тәулік/м3</th>
                    <th rowSpan={2}>Жер асты су қоры хаттамасы</th>
                    <th rowSpan={2}>Су құбырының ұзындығы (ш.қ)</th>
                    <th colSpan={4}>Оның ішінде</th>
                    <th rowSpan={2}>2022ж ағымдағы жөндеуден өтетін су құбырлары мен нысандары (ш.қ)</th>
                    <th colSpan={2}>Су есептегіш құралдары</th>
                  </tr>
                  <tr>
                    <th>Салынған жылы</th>
                    <th>Жарамды құбырлар (ш.қ)</th>
                    <th>Жаңартылып жатқаны (2021-2022ж)</th>
                    <th>Су құбырының құрылымы</th>
                    <th>Орнатылғаны</th>
                    <th>Орнатылмағаны</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>125 493</td>
                    <td>22368</td>
                    <td>Ұңғыма бұлақ</td>
                    <td>12113,1</td>
                    <td>28-бар 12-жоқ 15 – жасалуда</td>
                    <td>1417,5</td>
                    <td>-</td>
                    <td>1273,4</td>
                    <td>144,1</td>
                    <td>Темір және полиэтиленді (ПЭ) құбырлар</td>
                    <td>24,62 ш.қ су құбыры №1,4,5 ұңғымаларды №1,2 кәріз тазалау имаратын, 7-каптажды жөндеу,</td>
                    <td>20856</td>
                    <td>1512</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="3" title="Электр бойынша" className="tabs">
              <Table className="rwd-table" responsive>
                <thead>
                  <tr>
                    <th colSpan={3}>Электр желілері</th>
                    <th rowSpan={2}> Тозу пайызы (% )</th>
                    <th rowSpan={2}>Электр бағанасының саны (дана)</th>
                    <th rowSpan={2}>Трансформатор саны (дана)</th>
                  </tr>
                  <tr>
                    <th colSpan={1}>Электр желілерінің жалпы ұзындығы. (шқ)</th>
                    <th colSpan={1}>Қанағаттанарлық жағдайдағы (шқ)</th>
                    <th colSpan={1}>Тозығы жеткені (шқ)</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>876,667</td>
                      <td>685,625</td>
                      <td>191,042</td>
                      <td>21,7 %</td>
                      <td>23 007</td>
                      <td>382</td>
                    </tr>
                  </tbody>
              </Table>
            </Tab>
            <Tab eventKey="4" title="Газ бойынша" className="tabs">
              <Table className="rwd-table" responsive>
                <thead>
                  <tr>
                    <th rowSpan={2}></th>
                    <th rowSpan={2}>Нысан атауы </th>
                    <th rowSpan={2}>Бірлігі шақырымы (км)</th>
                    <th rowSpan={2}>БАРЛЫҒЫ</th>
                    <th colSpan={3}>Газ құбырлары меншігі. Оның ішінде: </th>
                  </tr>
                  <tr>
                    <th>«ҚазТрансГазАймақ» АҚ» меншігінде</th>
                    <th>Аудандық меншіг (ТҮКШЖКжАЖ» бөлімі)</th>
                    <th>Жеке меншікте</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Таратушы газ құбырлары. Оның ішінде: </td>
                    <td>ш.қ </td>
                    <td>1 201,044</td>
                    <td>242,033</td>
                    <td>926,986</td>
                    <td>31,985</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Орта қысымды газ құбырлары</td>
                    <td>ш.қ </td>
                    <td>127,002</td>
                    <td>21,461</td>
                    <td>105,541</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Орта қысымды газ құбырлары</td>
                    <td>ш.қ </td>
                    <td>790,102</td>
                    <td>50,527</td>
                    <td>739,575</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Төмен қысымды газ құбырлары </td>
                    <td>ш.қ </td>
                    <td>234,38</td>
                    <td>150,625</td>
                    <td>83,755</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Қорғалған жер асты темір құбырлары </td>
                    <td>ш.қ </td>
                    <td>49,520</td>
                    <td>35,300</td>
                    <td>14,220</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td colSpan={7}>Газ реттеу құрылғылары</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Газ реттеу пукттері (ГРП, (ГШРП) саны </td>
                    <td>дана</td>
                    <td>16 917</td>
                    <td>142</td>
                    <td>16679</td>
                    <td>96</td>
                  </tr>
                </tbody>
              </Table>

              <Table className="rwd-table" responsive>
                <thead>
                  <tr>
                    <th rowSpan={2}>Барлық елді мекендер (саны)</th>
                    <th colSpan={3}>Оның ішінде:</th>
                    <th rowSpan={2}>Газ құбырларының жалпы ұзындығы (ш.қ, (км)</th>
                    <th colSpan={3}>Пайдаланудағы құбырлардың тозуы </th>
                  </tr>
                  <tr>
                    <th>Газ құбырымен қамтылғаны</th>
                    <th>2022 ж құрылысы жүргізіліп жатқаны</th>
                    <th>Пайызы (%) </th>
                    <th>Жарамды құбырлар</th>
                    <th>Ауыстыруды қажет газ құбырлары (ш.қ) </th>
                    <th>Тозу пайызы (%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>55</td>
                    <td>48</td>
                    <td>7</td>
                    <td>87,2%</td>
                    <td>1 201,044</td>
                    <td>1199,994</td>
                    <td>1,050ш.қ</td>
                    <td>1,1 (%)</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }

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
          <div className="body__buttons-group">
              <VericalButton title={'Түйіндеме'} onClick={() => { setStatus(!status) }} icon={<FaList size={30}></FaList>}></VericalButton>
            </div>
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
      <ModalFullScreen ></ModalFullScreen>
    </div>
  );
}

export default MainPage;