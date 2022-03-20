import React, { useEffect } from 'react';
import Table from 'react-bootstrap/esm/Table';
// import BasicCard from './card/basic';

export default function WaterInf({ item }) {
  useEffect(() => {
    console.log(item)
  }, [item])

  return (
    <div>
      {item ? (
            <>
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
                   <td style={{ textAlign: 'center' }}>{item.localitiesWater?.populationCount}</td>
                   <td style={{ textAlign: 'center' }}>{item.localitiesWater?.subscribersCount}</td>
                   <td style={{ textAlign: 'center' }}>{item.localitiesWater?.springSource}</td>
                   <td style={{ textAlign: 'center' }}>{item.localitiesWater?.waterDebit}</td>
                   <td style={{ textAlign: 'center' }}>{item.localitiesWater?.waterReserves}</td>
                   <td style={{ textAlign: 'center' }}>{item.localitiesWater?.waterLength}</td>
                   <td style={{ textAlign: 'center' }}>{item.localitiesWater?.yearConstruction}</td>
                   <td style={{ textAlign: 'center' }}>{item.localitiesWater?.zaramdyQ}</td>
                   <td style={{ textAlign: 'center' }}>{item.localitiesWater?.currentQ}</td>
                   <td style={{ textAlign: 'center' }}>{item.localitiesWater?.waterStructure}</td>
                   <td style={{ textAlign: 'center' }}>{item.localitiesWater?.nysan}</td>
                   <td style={{ textAlign: 'center' }}>{item.localitiesWater?.wateMetersCount}</td>
                   <td style={{ textAlign: 'center' }}>{item.localitiesWater?.waterMatersDontCount}</td>
                 </tr>
               </tbody>
             </Table>
             </>
        // <div>
        //   <h2 className='inf-title'>Аққұм а/о, Аққұм е/м ауыз су құбыры бойынша мәлімет</h2>
        //   <div className='card-container'>
        //     <BasicCard img={require('../static/images/icons/rural.png')} title={item.name} preTitle="Елді мекен атауы"></BasicCard>
        //     <BasicCard img={require('../static/images/icons/road.png')} title={item.localitiesWater?.streetCount} preTitle="Көше саны"></BasicCard> 
        //     <BasicCard img={require('../static/images/icons/people-together.png')} title={item.localitiesWater?.populationCount} preTitle="Халық саны"></BasicCard>
            
        //     <BasicCard img={require('../static/images/icons/sea.png')} title={item.localitiesWater?.springSource} preTitle="Бұлақ көзі"></BasicCard>
        //     <BasicCard img={require('../static/images/icons/subscription.png')} title={item.localitiesWater?.subscribersCount} preTitle="Абонент саны"></BasicCard>
        //     <BasicCard img={require('../static/images/icons/water.png')} title={item.localitiesWater?.waterDebit} preTitle="Судың дебеті"></BasicCard>
        //     <BasicCard img={require('../static/images/icons/tubes.png')}
        //       title={item.localitiesWater?.waterLength}
        //       preTitle="Су құбырының ұзындығы (км) "></BasicCard>
        //     <BasicCard
        //       title={item.localitiesWater?.needToUpdate}
        //       preTitle="Жаңартуды қажет ететіні (км)"></BasicCard>
        //         <BasicCard 
        //       title={item.localitiesWater?.yearConstruction}
        //       preTitle="Пайдалануға берілген жылы"></BasicCard>
        //       <BasicCard img={require('../static/images/icons/farming.png')}
        //       title={item.localitiesWater?.waterReserves}
        //       preTitle="Жер асты су қоры"></BasicCard>
        //        <BasicCard 
        //       title={item.localitiesWater?.waterStructure}
        //       preTitle="Су құбырының құрылымы"></BasicCard>      
        //     <BasicCard img={require('../static/images/icons/water-meter.png')}
        //       title={item.localitiesWater?.wateMetersCount}
        //       preTitle="Су есептегіш құралдары  (саны) "></BasicCard>
        //        <BasicCard
        //       title={item.localitiesWater?.newPipes}
        //       preTitle="Жаңартылған құбырлар (км)"></BasicCard>
            
        //     <BasicCard
        //       title={item.localitiesWater?.newYearConstruction}
        //       preTitle="Жаңартылған жылы "></BasicCard>
        //   </div>
        // </div>
      ) : '' }
    </div>
  )
}