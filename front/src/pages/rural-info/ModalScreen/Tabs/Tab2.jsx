import Tab from 'react-bootstrap/esm/Tab';
import React, { useEffect } from 'react';
import Table from 'react-bootstrap/esm/Table';
import { useSelector, useDispatch } from 'react-redux';

function Tab2({ getAllInf }) {

    const localties = useSelector((state) => state.city.localties);

    useEffect(() => {

    }, [localties])

    return (<>
        <h2 className='inf-title'>{localties[0]?.rural?.name} ауылдық округі байынша</h2>
        <Table responsive className='rwd-table'
        >
            <thead>
                <tr>
                    <th rowSpan={2}>Халық саны </th>
                    <th rowSpan={2}>Абонент саны </th>
                    <th rowSpan={2}>Су көзі </th>
                    {/* <th rowSpan={2}>Судың дебеті тәулік/м3 </th> */}
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
                    <td style={{ textAlign: 'center' }}>{getAllInf().localtiesWater.populationCount}</td>
                    <td style={{ textAlign: 'center' }}>{getAllInf().localtiesWater.subscribersCount}</td>
                    <td style={{ textAlign: 'center' }}>Бұлақ / Ұңғыма</td>
                    {/* <td style={{ textAlign: 'center' }}>{getAllInf().localtiesWater.waterDebit}</td> */}
                    <td style={{ textAlign: 'center' }}>{getAllInf().localtiesWater.waterReserves}</td>
                    <td style={{ textAlign: 'center' }}>{(getAllInf().localtiesWater.waterLength).toFixed(2)}</td>
                    <td style={{ textAlign: 'center' }}>-</td>
                    <td style={{ textAlign: 'center' }}>{getAllInf().localtiesWater.zaramdyQ}</td>
                    <td style={{ textAlign: 'center' }}>{getAllInf().localtiesWater.currentQ}</td>
                    <td style={{ textAlign: 'center' }}>Темір және ПЭ құбырлар</td>
                    <td style={{ textAlign: 'center' }}>-</td>
                    <td style={{ textAlign: 'center' }}>{getAllInf().localtiesWater.wateMetersCount}</td>
                    <td style={{ textAlign: 'center' }}>{getAllInf().localtiesWater.waterMatersDontCount}</td>
                </tr>
            </tbody>
        </Table>
        {localties.map(localty => (
            <div key={localty.id + "2"}>
                <h2 className='inf-title'>{localty.name} елді мекені бойынша</h2>
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
                            <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.populationCount}</td>
                            <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.subscribersCount}</td>
                            <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.springSource}</td>
                            <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.waterDebit}</td>
                            <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.waterReserves}</td>
                            <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.waterLength}</td>
                            <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.yearConstruction}</td>
                            <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.zaramdyQ}</td>
                            <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.currentQ}</td>
                            <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.waterStructure}</td>
                            <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.nysan}</td>
                            <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.wateMetersCount}</td>
                            <td style={{ textAlign: 'center' }}>{localty.localitiesWater?.waterMatersDontCount}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        ))}
    </>);
}

export default Tab2;