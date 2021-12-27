import Table from 'react-bootstrap/Table';
import React,{useEffect}from 'react';
import BasicCard from './card/basic';

export default function GasInf({item, poylines}) {
    useEffect(()=>{
        console.log(item)
    },[])

    return (
        <div>
            {item ? (
                <div>
                   <h2 className="inf-title">Аққұм - Шақхта Тоғыс елді мекеніндегі ТАБИҒИ ГАЗ ЖҮЙЕЛЕРІ БОЙЫНША</h2>
                    <div className="card-container">
                    <BasicCard img={require('../images/icons/rural.png')} title={item.name} preTitle="Елді мекен атауы"></BasicCard>
                    <BasicCard img={require('../images/icons/subscription.png')} title={item.localitiesGas?.subscribersCount} preTitle="Абонент саны"></BasicCard>
                    <BasicCard img={require('../images/icons/pipeline.png')} title={item.localitiesGas?.gasLength} preTitle="Газ құбыры жүйесінің ұзындығы"></BasicCard>
                    <BasicCard img={require('../images/icons/natural-gas.png')} title={item.localitiesGas?.bottomGasLength} preTitle="Жер асты газ құбырлары (метр)"></BasicCard>
                    <BasicCard img={require('../images/icons/natural-gas.png')} title={item.localitiesGas?.topGasLength} preTitle="Жер үсті газ құбырлары (метр)"></BasicCard>
                    <BasicCard img={require('../images/icons/pipe.png')} title={item.localitiesGas?.typeGas} preTitle="Құбырлардың құрылымы"></BasicCard>
                    <BasicCard img={require('../images/icons/gas-pump.png')} title={item.localitiesGas?.volumeGas} preTitle="Газ тұтыну көлемі"></BasicCard>
                    <BasicCard img={require('../images/icons/valve.png')} title={item.localitiesGas?.grpsh} preTitle="ГРПШ-6 саны"></BasicCard>
                    <BasicCard title={item.localitiesGas?.yearConstruction} preTitle="Пайдалануға берілген жылы"></BasicCard>
                    </div>
                 </div>
            ) : ''}
     
      </div>
    )
}