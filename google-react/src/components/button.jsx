import React from 'react';

function Button({onClick,title,icon}) {
    return ( 
        <div onClick={onClick} className="button">
            <img src={icon} alt={title} />
            <div className='button__text'>{title}</div>
        </div>
     );
}

export default Button;