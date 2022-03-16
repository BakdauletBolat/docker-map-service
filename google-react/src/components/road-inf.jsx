import React, { useEffect } from 'react';
import Table from 'react-bootstrap/esm/Table';

export default function RoadInf({ item }) {
  useEffect(() => {
    console.log(item)
  }, [])

  return (
    <div>
      {item ? (
        <div>
         
          <Table className='rwd-table'
          >
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }} rowspan="2">№</th>
                <th rowspan="2" style={{ textAlign: 'center' }}>Атауы</th>
                <th rowspan="2" style={{ textAlign: 'center' }}>Ұзындығы <br /> /км/</th>
                <th rowspan="2" style={{ textAlign: 'center' }}>Ені<br />/метр/</th>
                <th rowspan="2" style={{ textAlign: 'center' }}>Санаты</th>
                <th colspan="3" rowspan="1" style={{ textAlign: 'center' }}>Жабындысы</th>
                <th rowspan="2" style={{ textAlign: 'center' }}>Пайдалануға берілген жылы</th>
              </tr>
              <tr>
                <th style={{ textAlign: 'center' }}>Асфальт <br /> /км/</th>
                <th style={{ textAlign: 'center' }}>Шағал тас <br /> /км/</th>
                <th style={{ textAlign: 'center' }}>Топырақ <br /> /км/</th>
              </tr>
            </thead>
            <tbody>
              <tr className='header_table'>
                <td style={{ textAlign: 'center' }}>8</td>
                <td style={{ textAlign: 'center' }} headers="length en">Барлығы</td>
                <td style={{ textAlign: 'center' }}>12.12</td>
                <td style={{ textAlign: 'center' }}>6</td>
                <td style={{ textAlign: 'center' }}>V</td>
                <td style={{ textAlign: 'center' }}>12.12</td>
                <td style={{ textAlign: 'center' }}>-</td>
                <td style={{ textAlign: 'center' }}>-</td>
                <td style={{ textAlign: 'center' }}></td>
              </tr>
              {item.map((item, index) => (
                <tr key={item.id + index}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ textAlign: 'center' }} headers="length en">{item.name}</td>
                  <td style={{ textAlign: 'center' }}>{item.road?.beton / 1000}</td>
                  <td style={{ textAlign: 'center' }}>{item.road?.width}</td>
                  <td style={{ textAlign: 'center' }}>V</td>
                  <td style={{ textAlign: 'center' }}>{item.road?.beton / 1000} </td>
                  <td style={{ textAlign: 'center' }}>-</td>
                  <td style={{ textAlign: 'center' }}>-</td>
                  <td style={{ textAlign: 'center' }}>{item.road?.yearConstruction}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <div class="card-container card-container--fulled">
            {item.map((it, index) => (
              <ReactangleCard item={it}></ReactangleCard>
            ))}
          </div> */}

        </div>
      ) : ''}

    </div>
  )
}