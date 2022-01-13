import React from "react";

function VericalButton({title,icon,onClick,activeItem}) {

    let className = activeItem ? 'verticalButton verticalButton-active' : 'verticalButton';
    return ( 
        <div onClick={onClick} className={className}>
            {icon}
            <div className="verticalButton__title">{title}</div>
        </div>
     );
}

export default VericalButton;