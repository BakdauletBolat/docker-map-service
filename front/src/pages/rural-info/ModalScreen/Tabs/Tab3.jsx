import Tab from 'react-bootstrap/esm/Tab';
import Table from 'react-bootstrap/esm/Table';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';

function Tab3({ getAllInf }) {

    const localties = useSelector((state) => state.city.localties);

    useEffect(() => {

    }, [localties])

    return (<>
        <h2 className='inf-title'>{localties[0]?.rural?.name} ауылдық округі байынша</h2>
        <Table className='rwd-table' responsive
        >
            <thead>
                <tr>
                    <th rowSpan={3}>Ауылдық округ атауы</th>
                    <th rowSpan={3}>Электр жүйесінің ұзындығы (ш. қ)</th>
                    <th colSpan={8}>Электр бағанасы. Оның ішінде:</th>
                </tr>
                <tr>
                    <th rowSpan={2}>Бағаналарды ң жалпы саны (дана)</th>
                    <th rowSpan={2}>Тозуы(%)</th>
                    <th colSpan={3}>Бетонды бағаналар</th>
                    <th colSpan={3}>Ағаш бағаналардың саны</th>
                   
                </tr>
                <tr>
                    <th>ОЖТ меншігінде</th>
                    <th>Коммуналдық меншікте</th>
                    <th>Өздері орнатқан (само строй)</th>
                    <th>ОЖТ меншігінде</th>
                    <th>Коммуналдық меншікте</th>
                    <th>Өздері орнатқан (само строй)</th>
                </tr>

            </thead>
            <tbody>
                <tr>
                    <td>{localties[0]?.rural?.name}</td>
                    <td>{getAllInf().localtiesElectr.length}</td>
                    <td>{getAllInf().localtiesElectr.baganaNumber}</td>
                    <td>{getAllInf().localtiesElectr.tozu - 0.1}</td>
                    <td>{getAllInf().localtiesElectr.bOJT}</td>
                    <td>{getAllInf().localtiesElectr.bCOM}</td>
                    <td>{getAllInf().localtiesElectr.bOZ}</td>
                    <td>{getAllInf().localtiesElectr.aOJT}</td>
                    <td>{getAllInf().localtiesElectr.aCOM}</td>
                    <td>{getAllInf().localtiesElectr.aOZ}</td>
                </tr>
            </tbody>
        </Table>
        <Table className='rwd-table' responsive>
            <thead>
                <tr>
                    <th colSpan={8}>Электр желілерінің ұзындығы</th>
                    <th colSpan={4}>Трансформатордың саны</th>
                </tr>
                <tr>
                    <th rowSpan={2}>СИП кабель жалпы ұзындығы</th>
                    <th rowSpan={2}>Тозуы(%)</th>
                    <th colSpan={3}>СИП кабель</th>
                    <th colSpan={3}>Темір электр сымдары</th>
                    <th rowSpan={2}>Жалпы саны</th>
                    <th rowSpan={2}>Тозуы(%)</th>
                    <th colSpan={2}>Оның ішінде</th>
                </tr>
                <tr>
                    <th>ОЖТ меншігінде</th>
                    <th>Коммуналдық меншікте</th>
                    <th>Өздері тартқан</th>
                    <th>ОЖТ меншігінде</th>
                    <th>Коммуналдық меншікте</th>
                    <th>Өздері тартқан</th>
                    <th>ОЖТ меншігінде</th>
                    <th>Коммуналдық меншікте</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{getAllInf().localtiesElectr.cipLength}</td>
                    <td>{getAllInf().localtiesElectr.tozu}</td>
                    <td>{getAllInf().localtiesElectr.cipOJT}</td>
                    <td>{getAllInf().localtiesElectr.cipCOM}</td>
                    <td>{getAllInf().localtiesElectr.cipOZ}</td>
                    <td>{getAllInf().localtiesElectr.tmOJT}</td>
                    <td>{getAllInf().localtiesElectr.tmOCOM}</td>
                    <td>{getAllInf().localtiesElectr.tmOOZ}</td>
                    <td>{getAllInf().localtiesElectr.trbaganaNumber}</td>
                    <td>{getAllInf().localtiesElectr.tozu - 0.3}</td>
                    <td>{getAllInf().localtiesElectr.trOJT}</td>
                    <td>{getAllInf().localtiesElectr.trCOM}</td>
                </tr>
            </tbody>
        </Table>
        {localties.map(localty => (
            <div key={localty.id + "3"}>
                <h2 className='inf-title'>{localty.name} елді мекені бойынша</h2>
                <Table className='rwd-table' responsive
                >
                    <thead>
                        <tr>
                            <th rowSpan={3}>Елді мекен атауы</th>
                            <th rowSpan={3}>Электр жүйесінің ұзындығы (ш. қ)</th>
                            <th colSpan={7}>Электр бағанасы. Оның ішінде:</th>
                        </tr>
                        <tr>
                            <th rowSpan={2}>Бағаналарды ң жалпы саны (дана)</th>
                            <th colSpan={3}>Бетонды бағаналар</th>
                            <th colSpan={3}>Ағаш бағаналардың саны</th>
                        </tr>
                        <tr>
                            <th>ОЖТ меншігінде</th>
                            <th>Коммуналдық меншікте</th>
                            <th>Өздері орнатқан (само строй)</th>
                            <th>ОЖТ меншігінде</th>
                            <th>Коммуналдық меншікте</th>
                            <th>Өздері орнатқан (само строй)</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <td>{localty.name}</td>
                            <td>{localty.localitiesElectr?.length ? localty.localitiesElectr?.length / 1000 : '-'}</td>
                            <td>{localty.localitiesElectr?.baganaNumber ? localty.localitiesElectr?.baganaNumber : '-'}</td>
                            <td>{localty.localitiesElectr?.bOJT ? localty.localitiesElectr?.bOJT : '-'}</td>
                            <td>{localty.localitiesElectr?.bCOM ? localty.localitiesElectr?.bCOM : '-'}</td>
                            <td>{localty.localitiesElectr?.bOZ ? localty.localitiesElectr?.bOZ : '-'}</td>
                            <td>{localty.localitiesElectr?.aOJT ? localty.localitiesElectr?.aOJT : '-'}</td>
                            <td>{localty.localitiesElectr?.aCOM ? localty.localitiesElectr?.aCOM : '-'}</td>
                            <td>{localty.localitiesElectr?.aOZ ? localty.localitiesElectr?.aOZ : '-'}</td>
                        </tr>
                    </tbody>
                </Table>
                <Table className='rwd-table' responsive>
                    <thead>
                        <tr>
                            <th colSpan={7}>Электр желілерінің ұзындығы</th>
                            <th colSpan={3}>Трансформатордың саны</th>
                        </tr>
                        <tr>
                            <th rowSpan={2}>СИП кабель жалпы ұзындығы</th>
                            <th colSpan={3}>СИП кабель</th>
                            <th colSpan={3}>Темір электр сымдары</th>
                            <th rowSpan={2}>Жалпы саны</th>
                            <th colSpan={2}>Оның ішінде</th>
                        </tr>
                        <tr>
                            <th>ОЖТ меншігінде</th>
                            <th>Коммуналдық меншікте</th>
                            <th>Өздері тартқан</th>
                            <th>ОЖТ меншігінде</th>
                            <th>Коммуналдық меншікте</th>
                            <th>Өздері тартқан</th>
                            <th>ОЖТ меншігінде</th>
                            <th>Коммуналдық меншікте</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{localty.localitiesElectr?.cipLength ? localty.localitiesElectr?.cipLength : '-'}</td>
                            <td>{localty.localitiesElectr?.cipOJT ? localty.localitiesElectr?.cipOJT : '-'}</td>
                            <td>{localty.localitiesElectr?.cipCOM ? localty.localitiesElectr?.cipCOM : '-'}</td>
                            <td>{localty.localitiesElectr?.cipOZ ? localty.localitiesElectr?.cipOZ : '-'}</td>
                            <td>{localty.localitiesElectr?.tmOJT ? localty.localitiesElectr?.tmOJT : '-'}</td>
                            <td>{localty.localitiesElectr?.tmCOM ? localty.localitiesElectr?.tmCOM : '-'}</td>
                            <td>{localty.localitiesElectr?.tmOOZ ? localty.localitiesElectr?.tmOOZ : '-'}</td>
                            <td>{localty.localitiesElectr?.trbaganaNumber ? localty.localitiesElectr?.trbaganaNumber : '-'}</td>
                            <td>{localty.localitiesElectr?.trOJT ? localty.localitiesElectr?.trOJT : '-'}</td>
                            <td>{localty.localitiesElectr?.trCOM ? localty.localitiesElectr?.trCOM : '-'}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>)
        )}
    </>)
}

export default Tab3;

