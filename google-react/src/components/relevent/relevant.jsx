import React, { useEffect } from 'react';
import Table from 'react-bootstrap/esm/Table';

export default function Relevant({ relevants }) {
    useEffect(() => {
        console.log(relevants)
    }, [relevants])

    return (
        <div>
            {relevants ? (
                <div>
                    <h2 className="inf-title">Өзекті мәселелер</h2>
                    <div class="relevant-container">

                        <Table className='rwd-table'>
                            <thead >
                                <tr>
                                    <th style={{textAlign:'center', verticleAlign:'center'}}>№</th>
                                    <th style={{textAlign:'center', verticleAlign:'center'}}>Өзекті мәселенің атауы</th>
                                    <th style={{textAlign:'center', verticleAlign:'center'}}>Шешу жолдары</th>
                                    <th style={{textAlign:'center', verticleAlign:'center'}}>Күтілетін нәтиже</th>
                                </tr>
                            </thead>
                            <tbody>
                                {relevants.map((item, index) => (
                                    <tr>
                                        <td style={{textAlign:'center', verticleAlign:'center'}}>{index+1}</td>
                                        <td style={{textAlign:'center', verticleAlign:'center'}}>{item.question}</td>
                                        <td style={{textAlign:'center', verticleAlign:'center'}}>{item.solution}</td>
                                        <td style={{textAlign:'center', verticleAlign:'center'}}>{item.waiting_result}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>


                    </div>
                </div>
            ) : ''}

        </div>
    )
}