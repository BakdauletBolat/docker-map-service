import React, { useState, useRef, useCallback, useEffect } from "react";
import Map from '../components/map.js';
import axios from "axios";
import RoadInf from '../components/road-inf';
import GasInf from '../components/gas-inf';
import {useParams} from 'react-router-dom';
import WaterInf from "../components/water-inf";
import ElectrInf from "../components/electr-inf";
import {Link} from 'react-router-dom';
import Relevant from "../components/relevent/relevant";




function MapPage() {
  
  const [isPolyLineCreate, setPolyLineCreate] = useState(false)
  const [polylines, setPolylines] = useState([])
  const [localities,setLocalites] = useState({});
  const [relevants,setRelevants] = useState([]);
  const [path, setPath] = useState([]);
  const [polyLengthInMeters, setpolyLengthInMeters] = useState([])
  const [isActiveAllInf, setIsActiveAllInf] = useState(false)
  const [isActiveRelevant, setIsActiveRelevant] = useState(false)

  const [activeEl, setActiveEl] = useState(1);

  const {localtiesId} = useParams();

  const btns = [
    {
      id: 1,
      title: "Жол"
    },
    {
      id: 2,
      title: "Су"
    },
    {
      id: 3,
      title: "Электр"
    },
    {
      id: 4,
      title: "Газ"
    }
  ]
  useEffect(() => {
    console.log(localtiesId);
    // window.location.reload()
    axios.get(`http://127.0.0.1:8000/api/cities/localties/${localtiesId}`)
    .then(res=>setLocalites(res.data));
    axios.get(`http://127.0.0.1:8000/api/new-polylines?typeMarkerId=${activeEl}&localtiesId=${localtiesId}`)
      .then(res => {
        console.log(res.data)
        setPolylines(res.data)
      })
    axios.get(`http://127.0.0.1:8000/api/relevants?typeId=${activeEl}&localtiesId=${localtiesId}`)
    .then(res => {
      console.log(res.data)
      setRelevants(res.data)
    })
  }, [activeEl])

  const [form, setForm] = useState({
    name: "",
    description: "",
    diametr: "",
    sh_count: ""
  })


  const polyLineEl = useRef(null);
  const polyLinesEl = useRef([]);

  const updatePolylines = () => {
    console.log(polyLinesEl.current);
  }


  const displayAllInf = () => {
    if (activeEl == 1) {
       return <RoadInf item={polylines} ></RoadInf>
    } 
    if (activeEl == 2) {
      return <WaterInf item={localities} ></WaterInf>
   } 
   if (activeEl == 3) {
    return <ElectrInf item={localities} ></ElectrInf>
 } 
    if (activeEl == 4) {
      return <GasInf item={localities} ></GasInf>
   } 
  }

  const onChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value })
    console.log(form)
  }

  const savePolyLine = () => {
    const config = {
      'Content-type': "application/json"
    }
    const { name, description,sh_count, diametr } = form
    const newPath = [];
    polyLineEl.current.getPath().getArray().map(pos => {
      newPath.push({
        lat: pos.lat(),
        lng: pos.lng()
      })
    })
    const body = {
      name,
      description,
      sh_count,
      diametr,
      km: polyLengthInMeters,
      typeMarker: activeEl,
      positions: newPath
    }
    axios.post('http://127.0.0.1:8000/api/polyline/', body, config)
      .then(res => setPolylines([...polylines, res.data]))
    polyLineEl.current.setPath([])
    setPolyLineCreate(false)
    setPath([])
  }


  const displayInput = () => {
    const { name, description,diametr,sh_count } = form
    return (
      <div className="col-3 row mt-3 form-create">
        <div className="mb-3">
          <label className="form-label">Имя обьекта</label>
          <input type="text" name="name" onChange={onChange} value={name} className="form-control" id="exampleFormControlInput1" placeholder="Имя обьекта" />
        </div>
        <div className="mb-3">
          <label className="form-label">Шерпа саны</label>
          <input type="text" name="sh_count" onChange={onChange} value={sh_count} className="form-control" id="exampleFormControlInput1" placeholder="Шерпа саны" />
        </div>
        <div className="mb-3">
          <label className="form-label">Газ трубасының диаметірі</label>
          <input type="text" name="diametr" onChange={onChange} value={diametr} className="form-control" id="exampleFormControlInput1" placeholder="Газ трубасының диаметірі" />
        </div>
        <div className="mb-3">
          <label className="form-label">Описания обьекта</label>
          <textarea name="description" className="form-control" value={description} onChange={onChange} id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Километр обьекта</label>
          <input type="text" name="km" onChange={onChange} value={polyLengthInMeters} className="form-control" id="exampleFormControlInput1" placeholder="Километр" />
        </div>
        <div className="mb-3">
          <div className="col-4"><button type="button" onClick={savePolyLine} className="btn btn-success">Сохранить</button></div>
        </div>
      </div>
    )
  }

  return (
    <div>
        <div className="container-fluid">
        <div className="row main-all">
          <div className="col-12">
            <div className="switch-btns" >
              {
                btns.map(btn => (
                  <div key={btn.id} onClick={() => setActiveEl(btn.id)} className={btn.id == activeEl ? "switch-btns__item switch-btns__item--active" : "switch-btns__item"} >
                    {btn.title}
                  </div>
                ))
              }
              <div onClick={() => setIsActiveAllInf(!isActiveAllInf)} className={isActiveAllInf ? "switch-btns__item switch-btns__item--active" : "switch-btns__item"} >
                Толық ақпарат
              </div>
              <div onClick={() => setPolyLineCreate(!isPolyLineCreate)} className={isPolyLineCreate ? "switch-btns__item switch-btns__item--active" : "switch-btns__item"} >
                Жасау
              </div>
              <div onClick={() => setIsActiveRelevant(!isActiveRelevant)} className={isActiveRelevant ? "switch-btns__item switch-btns__item--active" : "switch-btns__item"} >
                Өзекті мәселелер
              </div>
              <Link onClick={updatePolylines} className="switch-btns__item" to={'/rural/'+localtiesId}>
                Артқа
              </Link>
              
            </div>
          </div>
          
            {isActiveAllInf ? (
              <div className="all-inf">
                {displayAllInf()}
                </div>
             ) : ''}

             {isActiveRelevant && (<div className="all-inf"><Relevant relevants={relevants}></Relevant></div>)}
         
          {isPolyLineCreate ? displayInput() : ""}
          <div className="col-12" style={{ padding: 0 + 'px' }}>
            <Map
              disableDefaultUI={true}
              polyLineEl={polyLineEl}
              activeEl={activeEl}
              setPath={setPath}
              path={path}
              polylines={polylines}
              polyLinesEl={polyLinesEl}
              polyLengthInMeters={polyLengthInMeters}
              setpolyLengthInMeters={setpolyLengthInMeters}
              isPolyLineCreate={isPolyLineCreate}
              setPolyLineCreate={setPolyLineCreate}></Map>
          </div>
        </div>
      </div>
    </div>
  )

}

export default MapPage