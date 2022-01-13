import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setIsActiveModal } from '../features/app/appSlice';
import {IoCloseSharp} from 'react-icons/io5'

function SidebarModal() {

    const dispatch = useDispatch();

    const isActiveModal = useSelector(state => state.app.isActiveModal);
    const activePolyline = useSelector(state => state.city.activePolyline);

    const calculateJ = () => {
        return activePolyline?.road?.goodSituation * 100 / activePolyline?.km 
    }

    const calculateK = () => {
        return parseInt(activePolyline?.road?.badSituation) * 100 / activePolyline?.km 
    }


    const className = isActiveModal ? 'sidebar__modal' : 'sidebar__modal sidebar__modal--active';

    useEffect(() => {
        console.log(activePolyline,'avtive')
    }, [activePolyline]);
    return (
        <div className={className}>
            <div className="modal__item">
                <div className="modal__placeholder">Көше атауы</div>
                <div className="modal__title">{activePolyline?.name}</div>
            </div>
            <div className="modal__item margin-top">
                <div className="modal__placeholder">Ұзындығы /км/</div>
                <div className="modal__title">{activePolyline?.km / 1000}</div>
            </div>
            <div className="modal__item margin-top">
                <div className="modal__placeholder">Ені /метр/</div>
                <div className="modal__title">{activePolyline?.road?.width}</div>
            </div>
            <div className="modal__item margin-top">
                <div className="modal__placeholder">Cанаты</div>
                <div className="modal__title">V</div>
            </div>
            <div className="modal__item margin-top">
                <div className="modal__placeholder">Жабындысы</div>
                <div className="modal__item-children margin-top">
                    <div className="modal__item">
                        <div className="modal__placeholder">Асфальт /км/</div>
                        <div className="modal__title">{activePolyline?.road?.beton/1000}</div>
                    </div>
                    <div className="modal__item">
                        <div className="modal__placeholder">Шағал тас /км/	</div>
                        <div className="modal__title">-</div>
                    </div>
                    <div className="modal__item">
                        <div className="modal__placeholder">Топырақ /км/</div>
                        <div className="modal__title">-</div>
                    </div>
                </div>
            </div>
            <div className="modal__item margin-top">
                <div className="modal__placeholder">Жағдайы</div>
                <div className="modal__item-children margin-top">
                    <div className="modal__item">
                        <div className="modal__placeholder">Қанағатты</div>
                        <div className="modal__title">{parseInt(calculateJ())} %</div>
                    </div>
                    <div className="modal__item">
                        <div className="modal__placeholder">Қанағатcыз</div>
                        <div className="modal__title">{parseInt(calculateK())} %</div>
                    </div>
                </div>
            </div>

            <div style={{
                position:'absolute',
                top:20,
                right:20,
                cursor:'pointer'
            }} onClick={() => dispatch(setIsActiveModal(false))}><IoCloseSharp size={30}/></div>
        </div>
    );
}

export default SidebarModal;