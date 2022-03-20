import React from "react";
import { useEffect } from "react";
import {IoCloseSharp} from 'react-icons/io5';

function Modailize({refProp,points,children}) {

    const className = 'sidebar__modal sidebar__modal--active';
    let drag;
    let clY;
    let modalHeight;
    let diff;

    const onMouseDown = (e) => {
        clY = e.clientY;
        console.log(document);
        drag = true;
        modalHeight = refProp.current.clientHeight;
    } 

    const onMouseMove = (e) => {
        const currentY = e.clientY - clY;
        if (drag) {
            refProp.current.style.height = `${modalHeight-currentY}px`
        }
    }

    let position = points[1];

    const onMouseLeave = () => {
        drag = false;
        refProp.current.style.height = `${points[position]}`
    }

    const onMouseUp = (e) => {

        diff = e.clientY - clY;

        console.log(diff);

        if (diff > 100 && diff > 0) {

            if (position <= 0) {
                drag = false
            }
            else{
                position--;
            }
            
            console.log(points[position],'minus')
            refProp.current.style.height = `${points[position]}`
        }
        else if (diff < 200 && diff < 0){
            position++;
            console.log(points[position],'plus')
            refProp.current.style.height = `${points[position]}`
        }
        
        else{
            console.log(points[position], 'stay')
            refProp.current.style.height = `${points[position]}`
        }
        drag = false;
        console.log('touchend')
    }

    const closeModalize = () => {
        refProp.current.close();
    }


    useEffect(() => {
        refProp.current.style.height = points[1]
        refProp.current.open = () => {
            refProp.current.classList.toggle('sidebar__modal--active');
        }

        refProp.current.close = () => {
            refProp.current.classList.add('sidebar__modal--active');
        }
    }, [refProp,points]);
    return (
        <div ref={refProp} onMouseDown={onMouseDown} 
                            onMouseMove={onMouseMove}
                            onMouseLeave={onMouseLeave}
                            onMouseUp={onMouseUp} className={className}>
            <div style={{
                position:'fixed',
                top:30,
                left: '50%',
                borderRadius:'5px',
                transform:'translateX(-50%)',
                width:'50px',
                height:'5px',
                background:'#f2f2f2'
            }}></div>
            <div onClick={closeModalize} style={{
            position:'fixed',
            top:20,
            right:20,
            cursor:'pointer'
        }} ><IoCloseSharp size={30}/></div>
            {children}
        </div>
    );
}

export default Modailize;