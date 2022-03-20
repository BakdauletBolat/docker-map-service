import React from 'react';

function BasicCard({img,title,preTitle}) {
    return ( 
        <div>
            <div className="basic-card">
                {img && <img className="basic-card__img" src={img} alt="" />}   
                <div className="basic-card__container">
                    <h3 className="basic-card__pretitle">{preTitle}</h3>
                    <h3 className="basic-card__title">{title}</h3>
                </div>
            </div>
        </div>
     );
}

export default BasicCard;