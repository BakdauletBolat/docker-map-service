import Table from 'react-bootstrap/Table';
import React, { useEffect } from 'react';

import BasicCard from './card/basic';

export default function WaterInf({ item, poylines }) {
  useEffect(() => {
    console.log(item)
  }, [])

  return (
    <div>
      {item ? (
        <div>
          <h2 className='inf-title'>Аққұм а/о, Аққұм е/м ауыз су құбыры бойынша мәлімет</h2>
          <div className='card-container'>
            <BasicCard img={require('../images/icons/rural.png')} title={item.name} preTitle="Елді мекен атауы"></BasicCard>
            <BasicCard img={require('../images/icons/sea.png')} title={item.localitiesWater?.springSource} preTitle="Бұлақ көзі"></BasicCard>
            <BasicCard 
              title={item.localitiesWater?.yearConstruction}
              preTitle="Пайдалануға берілген жылы"></BasicCard>
            <BasicCard img={require('../images/icons/road.png')} title={item.localitiesWater?.streetCount} preTitle="Көше саны"></BasicCard>
            <BasicCard img={require('../images/icons/water.png')} title={item.localitiesWater?.waterDebit} preTitle="Судың дебеті"></BasicCard>
            <BasicCard
              title={item.localitiesWater?.needToUpdate}
              preTitle="Жаңартуды қажет ететіні (км)"></BasicCard>
            <BasicCard img={require('../images/icons/people-together.png')} title={item.localitiesWater?.populationCount} preTitle="Халық саны"></BasicCard>
            <BasicCard img={require('../images/icons/farming.png')}
              title={item.localitiesWater?.waterReserves}
              preTitle="Жер асты су қоры"></BasicCard>
            <BasicCard
              title={item.localitiesWater?.newPipes}
              preTitle="Жаңартылған құбырлар (км)"></BasicCard>
            <BasicCard img={require('../images/icons/subscription.png')} title={item.localitiesWater?.subscribersCount} preTitle="Абонент саны"></BasicCard> 
            <BasicCard img={require('../images/icons/tubes.png')}
              title={item.localitiesWater?.waterLength}
              preTitle="Су құбырының ұзындығы (км) "></BasicCard>
            <BasicCard 
              title={item.localitiesWater?.newYearConstruction}
              preTitle="Жаңартылған жылы "></BasicCard>

            <BasicCard 
              title={item.localitiesWater?.waterStructure}
              preTitle="Су құбырының құрылымы"></BasicCard>      
            <BasicCard img={require('../images/icons/water-meter.png')}
              title={item.localitiesWater?.wateMetersCount}
              preTitle="Су есептегіш құралдары  (саны) "></BasicCard>
          </div>
        </div>
      ) : '' }
    </div>
  )
}