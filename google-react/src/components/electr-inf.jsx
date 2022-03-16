import React, { useEffect } from 'react';
import BasicCard from './card/basic';

export default function ElectrInf({ item }) {
  useEffect(() => {
    console.log(item)
  }, [item])

  return (
    <div>
      {item ? (
        <div>

      

          <div className='card-container'>
            <BasicCard preTitle='Елді мекен атауы' title={item.name} img={require('../static/images/icons/rural.png')} />
            <BasicCard preTitle='Электр жүйесінің ұзындығы (метр)' title={item.localitiesElectr?.length} img={require('../static/images/icons/tower.png')} />
            <BasicCard preTitle='Бағаналардың жалпы саны (дана)' title={item.localitiesElectr?.baganaNumber} img={require('../static/images/icons/electric-meter.png')} />
            <BasicCard preTitle='СИП кабель жалпы ұзындығы' title={item.localitiesElectr?.cipLength} img={require('../static/images/icons/socket.png')} />
          </div>
          <h2 className='inf-pre-title'>Бетонды бағаналар</h2>
          <div className='card-container'>
            <BasicCard preTitle='ОЖТ меншігінде' title={item.localitiesElectr?.bOJT} img={require('../static/images/icons/electricity.png')} />
            <BasicCard preTitle='Комуналдық меншік' title={item.localitiesElectr?.bCOM} img={require('../static/images/icons/government-building.png')} />
            <BasicCard preTitle='Өздері орнатқан (само строй)' title={item.localitiesElectr?.bOZ} img={require('../static/images/icons/construction-worker.png')} />
          </div>
          <h2 className='inf-pre-title'>Ағаш бағаналар саны</h2>
          <div className='card-container'>
            <BasicCard preTitle='ОЖТ меншігінде' title={item.localitiesElectr?.aOJT} img={require('../static/images/icons/electricity.png')} />
            <BasicCard preTitle='Комуналдық меншік' title={item.localitiesElectr?.aCOM} img={require('../static/images/icons/government-building.png')} />
            <BasicCard preTitle='Өздері орнатқан (само строй)' title={item.localitiesElectr?.aOZ} img={require('../static/images/icons/construction-worker.png')} />
          </div>
          <h2 className='inf-pre-title'>СИП кабель</h2>
          <div className='card-container'>
            <BasicCard preTitle='ОЖТ меншігінде' title={item.localitiesElectr?.cipOJT} img={require('../static/images/icons/electricity.png')} />
            <BasicCard preTitle='Комуналдық меншік' title={item.localitiesElectr?.cipCOM} img={require('../static/images/icons/government-building.png')} />
            <BasicCard preTitle='Өздері орнатқан (само строй)' title={item.localitiesElectr?.cipOZ} img={require('../static/images/icons/construction-worker.png')} />
          </div>
          <h2 className='inf-pre-title'>Темір электр сымдары</h2>
          <div className='card-container'>
            <BasicCard preTitle='ОЖТ меншігінде' title={item.localitiesElectr?.tmOJT} img={require('../static/images/icons/rural.png')} />
            <BasicCard preTitle='Комуналдық меншік' title={item.localitiesElectr?.tmCOM} img={require('../static/images/icons/rural.png')} />
            <BasicCard preTitle='Өздері орнатқан (само строй)' title={item.localitiesElectr?.tmOZ} img={require('../static/images/icons/construction-worker.png')} />
          </div>

          <h2 className='inf-pre-title'>2021 жылы жаңартылған бағаналар, электр желілері, трансформаторлар саны </h2>
          <div className='card-container'>
            <BasicCard preTitle='Бағаналар саны (2021ж)' title={item.localitiesElectr?.trbaganaNumber}/>
            <BasicCard preTitle='Трансформатор (КТПН)  саны' title={item.localitiesElectr?.trNumber}  />
            <BasicCard preTitle='СИП кабель ВЛ-06 кВт (метр)' title={item.localitiesElectr?.trCip}  />
            <BasicCard preTitle='ВЛ-04 кВт (метр)' title={item.localitiesElectr?.trVl} />
          </div>
        </div>
      ) : ''}

    </div>
  )
}