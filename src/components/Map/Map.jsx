
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

 function Map() {
  const defaultProps = {
    center: {
      lat: 24.241493,
      lng: 89.913199,
    },
    zoom: 14,
  };

  return (
    // Important! Always set the container height explicitly
    <div  style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={24.241493} lng={89.913199} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
export default Map;