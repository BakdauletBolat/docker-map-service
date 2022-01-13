import React from "react";
import {setPolyLineForm,setPolylines} from '../../features/city/citySlice';
import {useDispatch,useSelector} from 'react-redux';

import CityService from "../../network/city-service";


function PolyLineForm() {

    const cityService = new CityService();

    const dispatch = useDispatch();

    const polyLineForm = useSelector(state=>state.city.polyLineForm);
    const activeEl = useSelector(state => state.app.activeEl);
    const localty = useSelector(state => state.city.localty);
    const polylines = useSelector(state=>state.city.polylines)


    const onChange = (e) => {
        dispatch(setPolyLineForm({
            ...polyLineForm,
            [e.target.name]: e.target.value
        }))
        console.log(e.target.value);
    }

    const onChangeRoad = (e) => {
        dispatch(setPolyLineForm({
            ...polyLineForm,
            road: {
                ...polyLineForm.road,
                [e.target.name]: e.target.value
            }
        }))

        console.log(polyLineForm)
        console.log(e.target.value);
    }

    const onSubmit = () => {
        cityService.createPolyLines({...polyLineForm,localities:localty.id,typeMarker: activeEl})
        .then(data=>dispatch(setPolylines([...polylines,data])))
        .catch(e=>console.log(e))

        dispatch(setPolyLineForm({
            name: "",
      km: "",
      color: "",
      positionGroup: [],
      road: {}
        }))
    }

    const {name,km,road: {beton,yearConstruction,width,hectar,goodSituation,badSituation}} = polyLineForm;
    return (
        <>
            <div className="form-create">
                <div className="mb-3">
                    <label className="form-label">Имя обьекта</label>
                    <input type="text" name="name" onChange={onChange} value={name} className="form-control" id="exampleFormControlInput1" placeholder="Имя обьекта" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Жалпы шақырым</label>
                    <input type="text" name="km" onChange={onChange} value={km} className="form-control" id="exampleFormControlInput1" placeholder="Километр" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Асфальт шақырым</label>
                    <input type="text" name="beton" onChange={onChangeRoad} value={beton} className="form-control" id="exampleFormControlInput1" placeholder="Километр" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ені</label>
                    <input type="text" name="width" onChange={onChangeRoad} value={width} className="form-control" id="exampleFormControlInput1" placeholder="Километр" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Гектар</label>
                    <input type="text" name="hectar" onChange={onChangeRoad} value={hectar} className="form-control" id="exampleFormControlInput1" placeholder="Километр" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Жақсы жағдайда км</label>
                    <input type="text" name="goodSituation" onChange={onChangeRoad} value={goodSituation} className="form-control" id="exampleFormControlInput1" placeholder="Имя обьекта" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Қанағатсыз жағдайда жағдайда км</label>
                    <input type="text" name="badSituation" onChange={onChangeRoad} value={badSituation} className="form-control" id="exampleFormControlInput1" placeholder="Имя обьекта" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Пайдалануға берілген жылы км</label>
                    <input type="text" name="yearConstruction" onChange={onChangeRoad} value={yearConstruction} className="form-control" id="exampleFormControlInput1" placeholder="Имя обьекта" />
                </div>

                <div className="mb-3">
                    <div className="col-4"><button type="button" onClick={onSubmit} className="btn btn-success">Сохранить</button></div>
                </div>
            </div>
        </>
    );
}

export default PolyLineForm;