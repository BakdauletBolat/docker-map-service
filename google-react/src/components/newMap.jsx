import { Map, GoogleApiWrapper } from 'google-maps-react';
import React from 'react'
const exampleMapStyles = [
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      },
    ],
  },
];

const containerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100vh',
  width: '100%',
  zIndex: 0
}
export class MapContainer extends React.Component {

  setRef = (ref) => {
    this.ref = ref;
  };

  componentDidMount() {
    this.ref.map.setCenter(this.props.mapCenter)
  }

  changeMapStyle = (styleId) => {
    this.ref.map.setOptions({
      mapTypeId: styleId,
    })
  }

  componentDidUpdate() {
    this.ref.map.setZoom(12);
    setTimeout(() => {
      this.ref.map.panTo(this.props.mapCenter);
      this.ref.map.setZoom(14);
    }, 1000)

  }



  _mapLoaded(mapProps, map) {
    map.setOptions({
      styles: exampleMapStyles,
      disableDefaultUI: true,
    })
  }
  render() {
    return (
      <div>
        <div className='toggleMapStyle'>
          <div className='toggleMapStyle__item' onClick={() => this.changeMapStyle('roadmap')}>Карта</div>
          <div className='toggleMapStyle__item' onClick={() => this.changeMapStyle('satellite')}>Спутник</div>
        </div>
        <Map
          ref={this.setRef}
          containerStyle={containerStyle}
          onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
          google={this.props.google} zoom={14}>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBUVRGCl79p01aB2YhioP6s3bURSLV0qDE')
})(MapContainer)
