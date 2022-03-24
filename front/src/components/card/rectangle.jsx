import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';

function RectangleCard({ item }) {

    const localty = useSelector(state => state.city.localty);

    const calculateJ = () => {
        return parseInt(item?.road?.goodSituation) * 100 / item?.km ?? 0;
    }

    const calculateK = () => {
        return parseInt(item?.road?.badSituation) * 100 / item?.km ?? 0;
    }

    const calculateWaterPercentage = () => {

        const waterLength = parseFloat(localty.localitiesWater?.waterLength);
        const zaramdyQ = parseFloat(localty.localitiesWater?.zaramdyQ);
        const bad = (zaramdyQ * 100) / waterLength;
    
        const percent = {
            bad: 100-bad,
            good: bad
        }

        return percent
    }

    useEffect(()=>{
        console.log(localty);
    },[item,localty]);

    const buildRoad = () => {
        return (
            <div>
            <div className="rectangle-card">
                <div className="rectangle-card__header">
                    <div className="rectangle-card__title">{item.name}</div>
                    <div className="rectangle-card__year">Пайдалануға берілген жылы {item.road?.yearConstruction}</div>
                </div>
                <div className="rectangle-card__body">
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Ұзындығы</div>
                        <div className="rectangle-card__item-title">{item.km} метр</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Алаңы</div>
                        <div className="rectangle-card__item-title">{item.road?.hectar} га</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Ені</div>
                        <div className="rectangle-card__item-title">{item.road?.width} метр</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Асфальт жабындысы</div>
                        <div className="rectangle-card__item-title">{item.road?.beton} метр</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Топырақ, шқ.</div>
                        <div className="rectangle-card__item-title">{item.road?.topirak}</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Шағалтас, шқ.</div>
                        <div className="rectangle-card__item-title">{item.road?.shagal_tas}</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Санаты</div>
                        <div className="rectangle-card__item-title">V</div>
                    </div>
                </div>
                <div className="rectangle-card__footer">
                    <div className="rectangle-card__btn">
                        <img height="50px" src={require('../../static/images/icons/growth.png')} alt="" />
                        <div>Жақсы жағдайда {calculateJ()} %</div>
                    </div>
                    <div className="rectangle-card__btn rectangle-card__btn--red">
                        <img height="50px" src={require('../../static/images/icons/loss.png')} alt="" />
                        <div>Қанағатсыз жағдайда {calculateK()} %</div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    

 
    const buildWater = () => {
        return (
            <div>
            <div className="rectangle-card">
                <div className="rectangle-card__header">
                    <div className="rectangle-card__title">{item.name}</div>
                    <div className="rectangle-card__year">Пайдалануға берілген жылы {localty.localitiesWater?.yearConstruction}</div>
                </div>
                <div className="rectangle-card__body">
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Халық саны</div>
                        <div className="rectangle-card__item-title">{localty.localitiesWater?.populationCount}</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Абонент саны</div>
                        <div className="rectangle-card__item-title">{localty.localitiesWater?.subscribersCount}</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Судың дебеті</div>
                        <div className="rectangle-card__item-title">{localty.localitiesWater?.waterDebit}</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Су құбырының ұзындығы</div>
                        <div className="rectangle-card__item-title">{localty.localitiesWater?.waterLength} ш.қ</div>
                    </div>
                  
                   
                </div>
                <div className="rectangle-card__footer">
                    <div className="rectangle-card__btn">
                        <img height="50px" src={require('../../static/images/icons/growth.png')} alt="" />
                        <div>Жақсы жағдайда {calculateWaterPercentage().good.toFixed(1)} %</div>
                    </div>
                    <div className="rectangle-card__btn rectangle-card__btn--red">
                        <img height="50px" src={require('../../static/images/icons/loss.png')} alt="" />
                        <div>Қанағатсыз жағдайда {calculateWaterPercentage().bad.toFixed(1)} %</div>
                    </div>
                </div>
            </div>
        </div>
        )
    }

    const buildElectr = () => {
        return (
            <div>
            <div className="rectangle-card">
                <div className="rectangle-card__header">
                    <div className="rectangle-card__title">{item.name}</div>
                    <div className="rectangle-card__year">Пайдалануға берілген жылы 2014</div>
                </div>
                <div className="rectangle-card__body">
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Электр жүйесінің ұзындығы</div>
                        <div className="rectangle-card__item-title">{localty.localitiesElectr?.length} метр</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">СИП кабель жалпы ұзындығы</div>
                        <div className="rectangle-card__item-title">{localty.localitiesElectr?.cipLength} метр</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Бағаналардың жалпы саны (дана)</div>
                        <div className="rectangle-card__item-title">{localty.localitiesElectr?.baganaNumber}</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Трансформатордағы бағаналардың жалпы саны (дана)</div>
                        <div className="rectangle-card__item-title">{localty.localitiesElectr?.trbaganaNumber}</div>
                    </div>
                
                </div>
                {/* <div className="rectangle-card__footer">
                    <div className="rectangle-card__btn">
                        <img height="50px" src={require('../../static/images/icons/growth.png')} alt="" />
                        <div>Жақсы жағдайда {calculateJ()} %</div>
                    </div>
                    <div className="rectangle-card__btn rectangle-card__btn--red">
                        <img height="50px" src={require('../../static/images/icons/loss.png')} alt="" />
                        <div>Қанағатсыз жағдайда {calculateK()} %</div>
                    </div>
                </div> */}
            </div>
        </div>
        )
    }


    

    const buildGas = () => {
        return (
            <div>
            <div className="rectangle-card">
                <div className="rectangle-card__header">
                    <div className="rectangle-card__title">{item.name}</div>
                    <div className="rectangle-card__year">Пайдалануға берілген жылы {localty.localitiesGas?.yearConstruction}</div>
                </div>
                <div className="rectangle-card__body">
                  
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Абонент саны</div>
                        <div className="rectangle-card__item-title">{localty.localitiesGas?.subscribersCount}</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Газ құбыры жүйесінің ұзындығы</div>
                        <div className="rectangle-card__item-title">{localty.localitiesGas?.gasLength}</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Жоғары қысымды газ құбырлары (ш.қ (км))</div>
                        <div className="rectangle-card__item-title">{localty.localitiesGas?.jGasLength} ш.қ</div>
                    </div>

                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Орта қысымды газ құбырлары (ш.қ (км))</div>
                        <div className="rectangle-card__item-title">{localty.localitiesGas?.oGasLength} ш.қ</div>
                    </div>

                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Төмен қысымды құбырлар</div>
                        <div className="rectangle-card__item-title">{localty.localitiesGas?.tomenKysym} ш.қ</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Газ тұтыну көлемі</div>
                        <div className="rectangle-card__item-title">{localty.localitiesGas?.volumeGas} ш.қ</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Құбырлардың құрылымы</div>
                        <div className="rectangle-card__item-title">{localty.localitiesGas?.typeGas} ш.қ</div>
                    </div> 
                </div>
                {/* <div className="rectangle-card__footer">
                    <div className="rectangle-card__btn">
                        <img height="50px" src={require('../../static/images/icons/growth.png')} alt="" />
                        <div>Жақсы жағдайда {calculateWaterPercentage().good.toFixed(1)} %</div>
                    </div>
                    <div className="rectangle-card__btn rectangle-card__btn--red">
                        <img height="50px" src={require('../../static/images/icons/loss.png')} alt="" />
                        <div>Қанағатсыз жағдайда {calculateWaterPercentage().bad.toFixed(1)} %</div>
                    </div>
                </div> */}
            </div>
        </div>
        )
    }

    if (item.typeMarker === 1) {
        return buildRoad();
    }
    
    if (item.typeMarker === 2) {
        return buildWater();
    }

    if (item.typeMarker === 3) {
        return buildElectr();
    }

    if (item.typeMarker === 4) {
        return buildGas();
    }

    return (
        <>
        </>
    )
}

export default RectangleCard;