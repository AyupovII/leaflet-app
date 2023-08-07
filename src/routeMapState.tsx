import { createSlice } from "@reduxjs/toolkit";
import routerArray from "./marks.json";

export const routeMapSlice = createSlice({
  name: "routeMaps",
  initialState: {
    routeMap: [],
    currentRoute: routerArray[0],
    allMarkers: routerArray,
    isLoading: false
  },
  reducers: {
    getRouteMapFetch: (state) => {
      state.isLoading = true;
    },
    getRouteMapSuccess: (state, action) => {
      state.routeMap = action.payload;
      state.isLoading = false;
    },
    getRouteMapFailure: (state) => {
      state.isLoading = false;
    }, 
    setCurrentRoute: (state, action)=>{
      state.currentRoute = routerArray[action.payload]
    },

  }
});

export const {getRouteMapSuccess, getRouteMapFailure, getRouteMapFetch, setCurrentRoute} = routeMapSlice.actions;

export default routeMapSlice.reducer;