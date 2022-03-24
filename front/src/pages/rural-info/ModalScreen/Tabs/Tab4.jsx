import Tab from 'react-bootstrap/esm/Tab';
import React, { useEffect } from 'react';
import Table from 'react-bootstrap/esm/Table';
import { useSelector } from 'react-redux';

function Tab4({ getAllInf }) {

    const localties = useSelector((state) => state.city.localties);

    useEffect(() => {

    }, [localties])

    return (<>
        <h2 className='inf-title'>{localties[0]?.rural?.name} ауылдық округі байынша</h2>
          <Table className="rwd-table" responsive>
                  <thead>
                    <tr>
                      <th rowSpan={2}>Абонент саны</th>
                      <th rowSpan={2}>Газ құбыры жүйесінің ұзындығы (ш.қ)</th>
                      <th colSpan={6}>Оның ішінде:</th>
                      <th rowSpan={2}>Салынған жылы</th>
                    </tr>
                    <tr>
                      <th>Жоғары қысымды газ құбырлары (ш.қ (ш. қ)</th>
                      <th>Орта қысымды газ құбырлары (ш.қ)</th>
                      <th>Төмен қысымды құбырлар</th>
                      <th>Газ тұтыну көлемі (м3сағат)</th>
                      <th>ГРПШ саны</th>
                      <th>Құрылымы</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* <td>{localty.localitiesGas?.populationCount ? localty.localitiesGas?.populationCount : '-'}</td> */}
                      <td>{getAllInf().localitiesGas.subscribersCount}</td>
                      <td>{getAllInf().localitiesGas.gasLength}</td>
                      <td>{(getAllInf().localitiesGas.jGasLength).toFixed(2)}</td>
                      <td>{(getAllInf().localitiesGas.oGasLength).toFixed(2)}</td>
                      <td>{(getAllInf().localitiesGas.tomenKysym).toFixed(2)}</td>
                      <td>{getAllInf().localitiesGas.volumeGas}</td>
                      <td>{getAllInf().localitiesGas.grpsh}</td>
                      <td>Темір және полиэтиленді құбырлар</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </Table>
            {localties.map(localty => (
              
              <div key={localty.id+"4"}>
                <h2 className='inf-title'>{localty.name} елді мекені бойынша</h2>
                <Table className="rwd-table" responsive>
                  <thead>
                    <tr>

                      <th rowSpan={2}>Абонент саны</th>
                      <th rowSpan={2}>Газ құбыры жүйесінің ұзындығы (ш.қ)</th>
                      <th colSpan={6}>Оның ішінде:</th>
                      <th rowSpan={2}>Салынған жылы</th>
                    </tr>
                    <tr>
                      <th>Жоғары қысымды газ құбырлары (ш.қ (ш. қ)</th>
                      <th>Орта қысымды газ құбырлары (ш.қ)</th>
                      <th>Төмен қысымды құбырлар</th>
                      <th>Газ тұтыну көлемі (м3сағат)</th>
                      <th>ГРПШ саны</th>
                      <th>Құрылымы</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* <td>{localty.localitiesGas?.populationCount ? localty.localitiesGas?.populationCount : '-'}</td> */}
                      <td>{localty.localitiesGas?.subscribersCount ? localty.localitiesGas?.subscribersCount : '-'}</td>
                      <td>{localty.localitiesGas?.gasLength ? localty.localitiesGas?.gasLength : '-'}</td>
                      <td>{localty.localitiesGas?.jGasLength ? localty.localitiesGas?.jGasLength : '-'}</td>
                      <td>{localty.localitiesGas?.oGasLength ? localty.localitiesGas?.oGasLength : '-'}</td>
                      <td>{localty.localitiesGas?.tomenKysym ? localty.localitiesGas?.tomenKysym : '-'}</td>
                      <td>{localty.localitiesGas?.volumeGas ? localty.localitiesGas?.volumeGas : '-'}</td>
                      <td>{localty.localitiesGas?.grpsh ? localty.localitiesGas?.grpsh : '-'}</td>
                      <td>{localty.localitiesGas?.typeGas ? localty.localitiesGas?.typeGas : '-'}</td>
                      <td>{localty.localitiesGas?.yearConstruction ? localty.localitiesGas?.yearConstruction : '-'}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            ))}
    </>);
}

export default Tab4;

