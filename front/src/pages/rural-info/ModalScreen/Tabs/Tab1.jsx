import Tab from 'react-bootstrap/esm/Tab';
import React, { useEffect } from 'react';
import Table from 'react-bootstrap/esm/Table';
import { useSelector } from 'react-redux';

function Tab1({ getAllInf }) {

    const localties = useSelector((state) => state.city.localties);
    const activeEl = 1;

    useEffect(() => {

    }, [localties])

    const getRoadLength = (localty) => {
        let value = 0;
        localty.polylines.filter(item => item.typeMarker == activeEl).forEach((item => {
            const v = parseInt(item.road?.beton);
            if (!isNaN(v)) {
                value += v;
            }
        }));
        return value;
    }

    const getRoadShagalLength = (localty) => {
        let value = 0;
        localty.polylines.filter(item => item.typeMarker == activeEl).forEach((item => {
            const v = parseInt(item.road?.shagal_tas);
            if (!isNaN(v)) {
                value += v;
            }
        }));
        return value;
    }

    const getRoadTopairakLength = (localty) => {
        let value = 0;
        localty.polylines.filter(item => item.typeMarker == activeEl).forEach((item => {
            const v = parseInt(item.road?.topirak);
            if (!isNaN(v)) {
                value += v;
            }
        }));
        return value;
    }

    return (<>
        <h2 className='inf-title'>{localties[0]?.rural?.name} ауылдық округі байынша</h2>
        <Table responsive className='rwd-table'
        >
            <thead>
                <tr>
                    <th style={{ textAlign: 'center' }} rowSpan="2">№</th>
                    <th rowSpan="2" style={{ textAlign: 'center' }}>Атауы</th>
                    <th rowSpan="2" style={{ textAlign: 'center' }}>Ұзындығы <br /> /ш. қ/</th>
                    <th rowSpan="2" style={{ textAlign: 'center' }}>Ені<br />/метр/</th>
                    <th rowSpan="2" style={{ textAlign: 'center' }}>Санаты</th>
                    <th colSpan="3" rowSpan="1" style={{ textAlign: 'center' }}>Жабындысы</th>

                    <th rowSpan="2" style={{ textAlign: 'center' }}>Жақсы жағдайда</th>
                    <th rowSpan="2" style={{ textAlign: 'center' }}>Нашар жағдайда</th>
                </tr>
                <tr>
                    <th style={{ textAlign: 'center' }}>Асфальт <br /> /ш. қ/</th>
                    <th style={{ textAlign: 'center' }}>Шағал тас <br /> /ш. қ/</th>
                    <th style={{ textAlign: 'center' }}>Топырақ <br /> /ш. қ/</th>
                </tr>
            </thead>
            <tbody>
                <tr className='header_table'>
                    <td style={{ textAlign: 'center' }}>{getAllInf().count}</td>
                    <td style={{ textAlign: 'center' }} headers="length en">Барлығы</td>
                    <td style={{ textAlign: 'center' }}>{(getAllInf().km / 1000).toFixed(2)}</td>
                    <td style={{ textAlign: 'center' }}>6-12</td>
                    <td style={{ textAlign: 'center' }}>IV-V</td>
                    <td style={{ textAlign: 'center' }}>{(getAllInf().beton / 1000).toFixed(2)}</td>
                    <td style={{ textAlign: 'center' }}>{(getAllInf().shagal_tas / 1000).toFixed(2)}</td>
                    <td style={{ textAlign: 'center' }}>{(getAllInf().topirak / 1000).toFixed(2)}</td>
                    <td style={{ textAlign: 'center' }}>{(getAllInf().beton / 1000).toFixed(2)}</td>
                    <td style={{ textAlign: 'center' }}>{((getAllInf().topirak + getAllInf().shagal_tas) / 1000).toFixed(2)}</td>
                </tr>
            </tbody>
        </Table>
        {localties.map(localty => (
            <div key={`${localty.id}${1}`}>
                <h2 className='inf-title'>{localty.name} елді мекені бойынша</h2>
                <Table responsive className='rwd-table'
                >
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }} rowSpan="2">№</th>
                            <th rowSpan="2" style={{ textAlign: 'center' }}>Атауы</th>
                            <th rowSpan="2" style={{ textAlign: 'center' }}>Ұзындығы <br /> /ш. қ/</th>
                            <th rowSpan="2" style={{ textAlign: 'center' }}>Ені<br />/метр/</th>
                            <th rowSpan="2" style={{ textAlign: 'center' }}>Санаты</th>
                            <th colSpan="3" rowSpan="1" style={{ textAlign: 'center' }}>Жабындысы</th>
                            <th rowSpan="2" style={{ textAlign: 'center' }}>Пайдалануға берілген жылы</th>
                        </tr>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Асфальт <br /> /ш. қ/</th>
                            <th style={{ textAlign: 'center' }}>Шағал тас <br /> /ш. қ/</th>
                            <th style={{ textAlign: 'center' }}>Топырақ <br /> /ш. қ/</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='header_table'>
                            <td style={{ textAlign: 'center' }}>{localty.polylines.filter(item => item.typeMarker == activeEl).length}</td>
                            <td style={{ textAlign: 'center' }} headers="length en">Барлығы</td>
                            <td style={{ textAlign: 'center' }}>{(getRoadLength(localty) / 1000).toFixed(2)}</td>
                            <td style={{ textAlign: 'center' }}>6</td>
                            <td style={{ textAlign: 'center' }}>V</td>
                            <td style={{ textAlign: 'center' }}>{(getRoadLength(localty) / 1000).toFixed(2)}</td>
                            <td style={{ textAlign: 'center' }}>{(getRoadShagalLength(localty) / 1000).toFixed(2)}</td>
                            <td style={{ textAlign: 'center' }}>{(getRoadTopairakLength(localty) / 1000).toFixed(2)}</td>
                            <td style={{ textAlign: 'center' }}></td>
                        </tr>
                        {localty.polylines.filter(item => item.typeMarker == activeEl).map((item, index) => (
                            <tr key={`${item.id}${index}`}>
                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                <td style={{ textAlign: 'center' }} headers="length en">{item.name}</td>
                                <td style={{ textAlign: 'center' }}>{item.road?.beton / 1000}</td>
                                <td style={{ textAlign: 'center' }}>{item.road?.width}</td>
                                <td style={{ textAlign: 'center' }}>V</td>
                                <td style={{ textAlign: 'center' }}>{item.road?.beton / 1000} </td>
                                <td style={{ textAlign: 'center' }}>{item.road?.shagal_tas}</td>
                                <td style={{ textAlign: 'center' }}>{item.road?.topirak}</td>
                                <td style={{ textAlign: 'center' }}>{item.road?.yearConstruction}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        ))}
    </>)
}

export default Tab1;