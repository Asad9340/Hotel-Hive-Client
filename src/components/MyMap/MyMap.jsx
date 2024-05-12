import{ useState } from "react"
import { Map, Marker } from 'pigeon-maps';
 function MyMap() {
  const [hue, setHue] = useState(0);
   const color = `hsl(${hue % 360}deg 39% 70%)`;

  return (
       <Map height={500} defaultCenter={[23.8159, 90.4089]} defaultZoom={14}>
      <Marker
        width={50}
        anchor={[23.8159, 90.4089]}
        color={color}
        onClick={() => setHue(hue + 20)}
      />
      <Marker
        width={50}
        anchor={[23.8159, 90.4089]}
        color={color}
        onClick={() => setHue(hue + 20)}
      >
      </Marker>
    </Map>
  );
}
export default MyMap;