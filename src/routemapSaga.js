import { call, put, takeEvery, select } from "redux-saga/effects";
import { getRouteMapSuccess } from "./routeMapState"

function* workGetRouteMapFetch() {
  const currentRoute = yield select((state=>state.routeMap.currentRoute));
  const test = currentRoute.map(el=>el.geocode).join(";");
  
  const routeMaps = yield call(() => fetch(`https://router.project-osrm.org/trip/v1/car/${test}?geometries=geojson&source=first&destination=last`));
  const formattedRouteMaps = yield routeMaps.json();
  yield put(getRouteMapSuccess(formattedRouteMaps.trips[0].geometry.coordinates.map(el=>el)));
}

function* routeMapSaga() {
  yield takeEvery('routeMaps/getRouteMapFetch', workGetRouteMapFetch)
};
 
export default routeMapSaga;