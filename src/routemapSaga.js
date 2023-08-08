import { call, put, takeEvery, select } from "redux-saga/effects";
import { getRouteMapSuccess } from "./routeMapState"

function* workGetRouteMapFetch() {
  const currentRoute = yield select((state=>state.routeMap.currentRoute));
  const test = currentRoute.map(el=>el.geocode).join(";");
  
  const routeMaps = yield call(() => fetch(`http://router.project-osrm.org/route/v1/driving/${test}?overview=full`));
  const formattedRouteMaps = yield routeMaps.json();
  yield put(getRouteMapSuccess(formattedRouteMaps.waypoints.map(el=>el.location)))
}

function* routeMapSaga() {
  yield takeEvery('routeMaps/getRouteMapFetch', workGetRouteMapFetch)
};
 
export default routeMapSaga;