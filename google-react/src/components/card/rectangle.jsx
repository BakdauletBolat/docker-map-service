import axios from 'axios';
import React from 'react';
function Reactangle({ item }) {
    const deleteItem = () => {
        axios.delete(`http://127.0.0.1:8000/api/polyline/${item.id}`)
        .then(res=>console.log(res));
    }
    return (
        <div>
            <div className="rectangle-card">
                <div className="rectangle-card__header">
                    <div className="rectangle-card__title">{item.name}</div>
                    <div className="rectangle-card__year">Пайдалануға берілген жылы {item.road?.yearConstruction}</div>
                    {/* <div className="rectangle-card__button"><button onClick={deleteItem}>x</button></div> */}
                </div>
                <div className="rectangle-card__body">
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Ұзындығы</div>
                        <div className="rectangle-card__item-title">{item.road?.beton} метр</div>
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
                        <div className="rectangle-card__item-title">0</div>
                    </div>
                    <div className="rectangle-card__item">
                        <div className="rectangle-card__item-pre">Санаты</div>
                        <div className="rectangle-card__item-title">V</div>
                    </div>
                </div>
                <div className="rectangle-card__footer">
                    <div className="rectangle-card__btn">
                        <img height="50px" src={require('../../images/icons/growth.png')} alt="" />
                        <div>Жақсы жағдайда 100%</div>
                    </div>
                    <div className="rectangle-card__btn rectangle-card__btn--red">
                        <img height="50px" src={require('../../images/icons/loss.png')} alt="" />
                        <div>Қанағатсыз жағдайда 0%</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reactangle;