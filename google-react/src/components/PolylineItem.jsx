import { Polyline, InfoWindow,InfoBox, Marker } from "@react-google-maps/api";
import React, { useRef, useEffect } from "react";
import { setActivePolyLine } from '../features/city/citySlice';
import { setIsActiveModal } from "../features/app/appSlice";
import { useSelector, useDispatch } from 'react-redux';
import IconRoad from '../static/icons/road.svg';
import IconWater from '../static/icons/water-tap.svg';
import IconElectr from '../static/icons/electric-meter.png';
import IconGas from '../static/icons/valve.png';
import RectangleCard from "./card/rectangle";
import { useState } from "react";


function PolyLineItem({ poly, pushPolylines, clearAllMarkers }) {

    const polylineRef = useRef([]);

    const [active, setActive] = useState(false);

    const dispatch = useDispatch();

    const activeEl = useSelector(state => state.app.activeEl);
    // const activePolyline = useSelector(state => state.city.activePolyline);

    useEffect(() => {
        console.log(activeEl)
    }, [activeEl])

    function onLoadPolylines(polyline) {
        const color = this.color;
        polylineRef.current.push({ polyline, color });
        pushPolylines({ polyline, color });
    }

    function onDblClickPolyline(polyline) {
        console.log(polyline);
    }


    const onClickInfoMarker = (event, poly) => {

        clearAllMarkers();
        dispatch(setActivePolyLine(poly));
        setActive(true)
        dispatch(setIsActiveModal(true));
        console.log('hello wordl')
        polylineRef.current.map(({ polyline, color }) => {
            console.log('current')
            polyline.setOptions({
                strokeColor: 'red',
                strokeWeight: 4
            })
        });


    }

    return (
        <>
            {active ? (
                <InfoWindow
                zIndex={100}
                onCloseClick={()=>setActive(false)}
                style={{zIndex: 10000}}
                options={{
                    closeBoxURL: "",
                }}
                    position={poly.positionGroup[0].positions[0]}
                >
                    <RectangleCard item={poly}></RectangleCard>
                </InfoWindow>
            ) : (
                <InfoBox
                options={{
                    closeBoxURL: "",
                }}
                position={poly.positionGroup[0].positions[0]}
                >
                    <div style={{ opacity: 1,position:1, padding: 5, background: 'rgba(0,0,0,0.4)', borderRadius: 5 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: `white` }}>
                            {poly.name}
                        </div>
                    </div>
                </InfoBox>
            )}

            <Marker
                position={poly.positionGroup[0].positions[0]}
                icon={activeEl === 1 ? IconRoad : activeEl === 2 ? IconWater : activeEl === 3 ? IconElectr : activeEl === 4 ? IconGas : ""}
                onClick={(e) => onClickInfoMarker(e, poly)}
            ></Marker>
            {poly.positionGroup.map(position => (
                <Polyline
                    key={position.id}
                    color={poly.color}
                    options={
                        {
                            strokeColor: poly.color,
                            strokeWeight: 3
                        }
                    }
                    onLoad={onLoadPolylines}
                    onDblClick={(e) => onDblClickPolyline(e, poly.id)}
                    path={position.positions}
                />
            ))}

        </>
    );
}

export default PolyLineItem;