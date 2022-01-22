import React from "react";
import Spinner from 'react-bootstrap/Spinner';

function LoadingScreen() {
    return ( 
        <>
        <div className="spinner-container">
        <Spinner animation="grow" style={{
            zIndex: 1000
        }} />
        <div className="spinner-container__text">Жүктелуде</div>
        </div>
        </>
     );
}

export default LoadingScreen;