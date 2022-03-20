import React from "react";
import {setPolyLineForm,setPolylines} from '../../features/city/citySlice';
import {useDispatch,useSelector} from 'react-redux';
import { useAlert } from 'react-alert'
import CityService from "../../network/city-service";
import { useState } from "react";
// import { useAlert } from 'react-alert'

function PolyLineForm({saveAndClear}) {

    const cityService = new CityService();
    const alert = useAlert();

    const dispatch = useDispatch();

    const polyLineForm = useSelector(state=>state.city.polyLineForm);
    const activeEl = useSelector(state => state.app.activeEl);
    const localty = useSelector(state => state.city.localty);
    const polylines = useSelector(state=>state.city.polylines);

    // const alert = useAlert()

    const [isLoading,setIsLoading] = useState();


    const onChange = (e) => {
        dispatch(setPolyLineForm({
            ...polyLineForm,
            [e.target.name]: e.target.value
        }));
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
        setIsLoading(true);

        if (polyLineForm.positionGroup.length <= 0) {
            console.log('Позиционная группа обязатк');
            alert.error('Позиционная группа обязательно или вы не сохранили точки');
            setIsLoading(false);
            return
           
        } 
        cityService.createPolyLines({...polyLineForm,localities:localty.id,typeMarker: activeEl})
        .then(data=>{
            setIsLoading(false);

            alert.success('Успешно создано');
            saveAndClear();
            dispatch(setPolylines([...polylines,data]))
            dispatch(setPolyLineForm({
                name: "",
          km: "",
          color: "#303030",
          positionGroup: [],
          road: {
              beton:0,
              yearConstruction:0,
              width:0,
              hectar: 0,
              goodSituation:0,
              badSituation: 0

          }
            }))
        })
        .catch(e=>{
            alert.error('Что то пошло не так ошибка убедитесь что сохранили все данные');
            setIsLoading(false);
        })
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
                    <input type="number" name="km" onChange={onChange} value={km} className="form-control" id="exampleFormControlInput1" placeholder="Километр" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Асфальт шақырым</label>
                    <input type="number" name="beton" onChange={onChangeRoad} value={beton} className="form-control" id="exampleFormControlInput1" placeholder="Километр" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ені</label>
                    <input type="number" name="width" onChange={onChangeRoad} value={width} className="form-control" id="exampleFormControlInput1" placeholder="Километр" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Гектар</label>
                    <input type="number" name="hectar" onChange={onChangeRoad} value={hectar} className="form-control" id="exampleFormControlInput1" placeholder="Километр" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Жақсы жағдайда км</label>
                    <input type="number" name="goodSituation" onChange={onChangeRoad} value={goodSituation} className="form-control" id="exampleFormControlInput1" placeholder="Имя обьекта" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Қанағатсыз жағдайда жағдайда км</label>
                    <input type="number" name="badSituation" onChange={onChangeRoad} value={badSituation} className="form-control" id="exampleFormControlInput1" placeholder="Имя обьекта" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Пайдалануға берілген жылы км</label>
                    <input type="number" name="yearConstruction" onChange={onChangeRoad} value={yearConstruction} className="form-control" id="exampleFormControlInput1" placeholder="Имя обьекта" />
                </div>

               

                

                <div className="mb-3">
                    <div className="col-4"><button type="button" disabled={isLoading ? true : false} onClick={onSubmit} className="btn btn-success">Сохранить</button></div>
                </div>
            </div>
        </>
    );
}

export default PolyLineForm;