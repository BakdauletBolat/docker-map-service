import Table from 'react-bootstrap/esm/Table';
import Tabs from 'react-bootstrap/esm/Tabs';
import Tab from 'react-bootstrap/esm/Tab';
import React, { useEffect, useState } from 'react';
import CityService from "../../../network/city-service";
import { useSelector, useDispatch } from 'react-redux';
import {
  useParams
} from "react-router-dom";


import { IoCloseCircle } from 'react-icons/io5';

import { setLocalties } from '../../../features/city/citySlice';
import Tab1 from './Tabs/Tab1';
import Tab2 from './Tabs/Tab2';
import Tab3 from './Tabs/Tab3';
import Tab4 from './Tabs/Tab4';

function ModalFullScreen({ status, setStatus }) {

  const className = status ? 'fullScreenModal fullScreenModal--active' : 'fullScreenModal';

  let { ruralId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const localties = useSelector((state) => state.city.localties);
  const dispatch = useDispatch();
  const cityService = new CityService();

  useEffect(() => {
    setIsLoading(true);
    cityService.getLocaltiesByRuralId(ruralId)
      .then(data => {
        dispatch(setLocalties(data.localities));
        if (data.localities.length > 0) {
          setIsLoading(false);
        }
      })

  }, [ruralId]);

  const getValueOrZero = (value) => {
    if (value !== null && value !== undefined && value !== '') {
      const value2 = parseFloat(value);
      if (isNaN(value2)) {

        return 0;
      }
      else {

        return value2;

      }
    }
    else {
      return 0;
    }
  }

  function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const getAllInf = () => {
    let obj = {
      count: 0,
      km: 0,
      beton: 0,
      width: 0,
      topirak: 0,
      shagal_tas: 0,
      localitiesGas: {
        subscribersCount: 0,
        gasLength: 0,
        bottomGasLength: 0,
        topGasLength: 0,
        typeGas: 0,
        volumeGas: 0,
        grpsh: 0,
        jGasLength: 0,
        oGasLength: 0,
        tomenKysym: 0,
      },
      localtiesWater: {
        streetCount: 0,
        populationCount: 0,
        subscribersCount: 0,
        springSource: 0,
        waterDebit: 0,
        waterReserves: 0,
        waterLength: 0,
        yearConstruction: 0,
        zaramdyQ: 0,
        currentQ: 0,
        nysan: 0,
        waterStructure: 0,
        newPipes: 0,
        newYearConstruction: 0,
        needToUpdate: 0,
        wateMetersCount: 0,
        waterMatersDontCount: 0,
      },
      localtiesElectr: {
        tozuPercent: getRandomNumberBetween(1.1, 1.9),
        length: 0,
        cipLength: 0,
        baganaNumber: 0,
        bOJT: 0,
        aOJT: 0,
        cipOJT: 0,
        tmOJT: 0,
        trOJT: 0,
        bCOM: 0,
        aCOM: 0,
        cipCOM: 0,
        tmOCOM: 0,
        trCOM: 0,
        bOZ: 0, aOZ: 0,
        cipOZ: 0, tmOOZ: 0,
        trbaganaNumber: 0,
        trNumber: 0,
        trCip: 0,
        trVl: 0,
      }
    };


    localties.map(localty => {

      // for (const [key, value] of Object.entries(obj.localtiesElectr)) {
      //   obj.localtiesElectr[key] += obj.localtiesElectr[key] += getValueOrZero(localty.localitiesElectr?.[key])
      // }

      obj.localitiesGas.gasLength += getValueOrZero(localty.localitiesGas?.gasLength);
      obj.localitiesGas.subscribersCount += getValueOrZero(localty.localitiesGas?.subscribersCount);
      obj.localitiesGas.bottomGasLength += getValueOrZero(localty.localitiesGas?.bottomGasLength);
      obj.localitiesGas.topGasLength += getValueOrZero(localty.localitiesGas?.topGasLength);
      obj.localitiesGas.typeGas += getValueOrZero(localty.localitiesGas?.typeGas);
      obj.localitiesGas.volumeGas += getValueOrZero(localty.localitiesGas?.volumeGas);
      obj.localitiesGas.grpsh += getValueOrZero(localty.localitiesGas?.grpsh);
      obj.localitiesGas.jGasLength += getValueOrZero(localty.localitiesGas?.jGasLength);
      obj.localitiesGas.oGasLength += getValueOrZero(localty.localitiesGas?.oGasLength);
      obj.localitiesGas.tomenKysym += getValueOrZero(localty.localitiesGas?.tomenKysym);


      obj.localtiesElectr.length += getValueOrZero(localty.localitiesElectr?.length);
      obj.localtiesElectr.cipLength += getValueOrZero(localty.localitiesElectr?.cipLength);
      obj.localtiesElectr.baganaNumber += getValueOrZero(localty.localitiesElectr?.baganaNumber);
      obj.localtiesElectr.bOJT += getValueOrZero(localty.localitiesElectr?.bOJT);
      obj.localtiesElectr.aOJT += getValueOrZero(localty.localitiesElectr?.aOJT);
      obj.localtiesElectr.cipOJT += getValueOrZero(localty.localitiesElectr?.cipOJT);
      obj.localtiesElectr.tmOJT += getValueOrZero(localty.localitiesElectr?.tmOJT);
      obj.localtiesElectr.trOJT += getValueOrZero(localty.localitiesElectr?.trOJT);
      obj.localtiesElectr.bCOM += getValueOrZero(localty.localitiesElectr?.bCOM);
      obj.localtiesElectr.aCOM += getValueOrZero(localty.localitiesElectr?.aCOM);
      obj.localtiesElectr.cipCOM += getValueOrZero(localty.localitiesElectr?.cipCOM);
      obj.localtiesElectr.tmOCOM += getValueOrZero(localty.localitiesElectr?.tmOCOM);
      obj.localtiesElectr.trCOM += getValueOrZero(localty.localitiesElectr?.trCOM);
      obj.localtiesElectr.bOZ += getValueOrZero(localty.localitiesElectr?.bOZ);
      obj.localtiesElectr.cipOZ += getValueOrZero(localty.localitiesElectr?.cipOZ);
      obj.localtiesElectr.trbaganaNumber += getValueOrZero(localty.localitiesElectr?.trbaganaNumber);
      obj.localtiesElectr.trNumber += getValueOrZero(localty.localitiesElectr?.trNumber);
      obj.localtiesElectr.trCip += getValueOrZero(localty.localitiesElectr?.trCip);
      obj.localtiesElectr.trVl += getValueOrZero(localty.localitiesElectr?.trVl);


      obj.localtiesWater.streetCount += getValueOrZero(localty.localitiesWater?.streetCount);
      obj.localtiesWater.populationCount += getValueOrZero(localty.localitiesWater?.populationCount);
      obj.localtiesWater.subscribersCount += getValueOrZero(localty.localitiesWater?.subscribersCount);
      obj.localtiesWater.springSource += getValueOrZero(localty.localitiesWater?.springSource);
      obj.localtiesWater.waterDebit += getValueOrZero(localty.localitiesWater?.waterDebit);
      obj.localtiesWater.waterReserves += getValueOrZero(localty.localitiesWater?.waterReserves);
      obj.localtiesWater.waterLength += getValueOrZero(localty.localitiesWater?.waterLength);
      obj.localtiesWater.yearConstruction += getValueOrZero(localty.localitiesWater?.yearConstruction);
      obj.localtiesWater.zaramdyQ += getValueOrZero(localty.localitiesWater?.zaramdyQ);
      obj.localtiesWater.currentQ += getValueOrZero(localty.localitiesWater?.currentQ);
      obj.localtiesWater.nysan += getValueOrZero(localty.localitiesWater?.nysan);
      obj.localtiesWater.waterStructure += getValueOrZero(localty.localitiesWater?.waterStructure);
      obj.localtiesWater.newPipes += getValueOrZero(localty.localitiesWater?.newPipes);
      obj.localtiesWater.newYearConstruction += getValueOrZero(localty.localitiesWater?.newYearConstruction);
      obj.localtiesWater.needToUpdate += getValueOrZero(localty.localitiesWater?.needToUpdate);
      obj.localtiesWater.wateMetersCount += getValueOrZero(localty.localitiesWater?.wateMetersCount);
      obj.localtiesWater.waterMatersDontCount += getValueOrZero(localty.localitiesWater?.waterMatersDontCount);

      localty.polylines.filter(item => item.typeMarker == activeEl).map(item => {
        obj.count += 1;
        obj.km += getValueOrZero(item.km);
        obj.beton += getValueOrZero(item.road?.beton);
        obj.width += getValueOrZero(item.road?.width);
        obj.topirak += getValueOrZero(item.road?.topirak);
        obj.shagal_tas += getValueOrZero(item.road?.shagal_tas);
      })
    });

    return obj;


  }

  const activeEl = 1;


  if (isLoading) {
    return <div className={className}>Загрузка</div>
  }


  return (
    <div className={className}>
      <div onClick={() => setStatus(!status)} className="fullScreenModal__close">
        <IoCloseCircle color='white' size={30}></IoCloseCircle>
      </div>
      <div>
        <h2 className='inf-title'>Түйіндеме</h2>
        <Tabs defaultActiveKey="1" id="uncontrolled-tab-example">
          <Tab eventKey="1" title="Жол " className="tabs">
            <Tab1 getAllInf={getAllInf}></Tab1>
          </Tab>
          <Tab eventKey="2" title="Ауыз су " className="tabs">
            <Tab2 getAllInf={getAllInf}></Tab2>
          </Tab>
          <Tab eventKey="3" title="Электр " className="tabs">
            <Tab3 getAllInf={getAllInf}></Tab3>
          </Tab>
          <Tab eventKey="4" title="Газ" className="tabs">
            <Tab4 getAllInf={getAllInf}></Tab4>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}


export default ModalFullScreen;