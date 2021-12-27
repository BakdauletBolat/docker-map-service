import React, { useEffect } from 'react';

function ReleventItem({ item,index }) {
    return (
        <div>
            <div className="relevant">                
                <div><span className="relevant-number">{index+1} </span><span className="relevant-title">Өзекті мәселенің атауы:</span> {item.question}</div>
                <div><span className="relevant-title">Шешу жолдары:</span> {item.solution}</div>
                <div><span className="relevant-title">Күтілетін нәтиже:</span> {item.waiting_result}</div>
                <div className="divider"></div>
            </div>
        </div>
    );
}

export default ReleventItem;