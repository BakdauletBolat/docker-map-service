import React, { useEffect } from 'react';
import Table from 'react-bootstrap/esm/Table';
import ReleventItem from './releventItem';


export default function Relevant({ relevants }) {
    useEffect(() => {
        console.log(relevants)
    }, [])

    return (
        <div>
            {relevants ? (
                <div>
                    <h2 className="inf-title">Өзекті мәселелер</h2>
                    <div class="relevant-container">

                        <Table bordered hover>
                            <thead className='header-table'>
                                <tr>
                                    <th style={{textAlign:'center'}}>№</th>
                                    <th style={{textAlign:'center'}}>Өзекті мәселенің атауы</th>
                                    <th style={{textAlign:'center'}}>Шешу жолдары</th>
                                    <th style={{textAlign:'center'}}>Күтілетін нәтиже</th>
                                </tr>
                            </thead>
                            <tbody>
                                {relevants.map((item, index) => (
                                    <tr>
                                        <td style={{textAlign:'center'}}>{index+1}</td>
                                        <td style={{textAlign:'center'}}>{item.question}</td>
                                        <td style={{textAlign:'center'}}>{item.solution}</td>
                                        <td style={{textAlign:'center'}}>{item.waiting_result}</td>
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