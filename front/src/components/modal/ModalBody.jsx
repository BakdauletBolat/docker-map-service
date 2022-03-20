import React from "react";
import { useEffect, useState } from "react";
import CityService from "../../network/city-service";
import { setLocalty } from '../../features/city/citySlice';
import { useSelector, useDispatch } from 'react-redux';



function ModalBody({ localities, type }) {
    const cityService = new CityService();

    const [formFields, setFormFields] = useState([])
    const [form, setForm] = useState({});

    const localty = useSelector(state => state.city.localty);
    const dispatch = useDispatch();

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm(preState => ({
            ...preState,
            [name]: value
        }))
    }

    const submit = () => {
        const body = {
            localities,
            ...form
        }

        if (type == 'localtiesWater') {
            cityService.createLocaltiesWater(body)
                    .then(res => {
                        dispatch(setLocalty({
                            ...localty,
                            localitiesWater: res
                        }))
                    })
                    .catch(err => console.log(err.response.data))
        }
        else if (type == 'localtiesGas') {
            cityService.createLocaltiesGas(body)
                    .then(res => {
                        dispatch(setLocalty({
                            ...localty,
                            localitiesGas: res
                        }))
                    })
                    .catch(err => console.log(err.response.data))
        }
        else if (type == 'localtiesElectr') {
            cityService.createLocaltiesElectr(body)
                    .then(res => {
                        dispatch(setLocalty({
                            ...localty,
                            localitiesElectr: res
                        }))
                    })
                    .catch(err => console.log(err.response.data))
        }
    
    }

    useEffect(() => {
        console.log(type)

        if (type == 'localtiesWater') {
            cityService.getFieldsLocaltiesWater()
                    .then(data => { setFormFields(data); setForm({}) })
        }
        else if (type == 'localtiesGas') {
            cityService.getFieldsLocaltiesGas()
                    .then(data => { setFormFields(data); setForm({}); console.log('gg') })
        }
        else if (type == 'localtiesElectr') {
            cityService.getFieldsLocaltiesElectr()
                    .then(data => { setFormFields(data); setForm({}); console.log('ee') })
        }
    
    }, [type])
    return (
        <div>
            {formFields?.map(field => (
                <div key={field.column_name} style={{
                }}>
                    <div>{field.title}</div>
                    <input onChange={onChange} name={field.column_name}></input>
                </div>

            ))}
            <button onClick={submit}>Сохранить</button>
        </div>
    );
}


export default ModalBody;