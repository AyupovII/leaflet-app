import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import style from "./mapArea.module.scss";
import "leaflet/dist/leaflet.css";
import L, { Icon, LatLngExpression } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRouteMapFetch } from "../../routeMapState";
// response.matchings.map((m) => L.polyline(polyline.decode(m.geometry)).addTo(map));
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("../../img/icons/locationIcon.png"),
  iconSize: [38, 38] // size of the icon
});
function MyComponent() {
  const map = useMap();
  const currentRoute = useSelector((state: any) => state.routeMap.currentRoute as { geocode: [], popUp: string }[]);
  map.fitBounds([currentRoute.map(el => el.geocode)] as unknown as L.LatLngBoundsExpression);
  return null
}
const MapArea = () => {
  const routeMap = useSelector((state: any) => state.routeMap.routeMap);
  const currentRoute = useSelector((state: any) => state.routeMap.currentRoute as { geocode: [], popUp: string }[]);
  const allMarkers = useSelector((state: any) => state.routeMap.allMarkers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRouteMapFetch())
  }, [dispatch, currentRoute]);
  console.log(routeMap);
  return (
    <div className={style.container}>
      <MapContainer center={[59.84660399, 30.29496392]} zoom={12} className={style["leaflet-container"]}>
        <MyComponent />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          <Polyline positions={[
  routeMap
]} />
          {currentRoute.map((marker) => (
            <Marker autoPan={true} position={marker.geocode as unknown as LatLngExpression} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}

export default MapArea;