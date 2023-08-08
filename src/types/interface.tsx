import { TypeRoute } from "./types";

export interface IinitialState{
  routeMap: [],
  currentRoute: TypeRoute[],
  allMarkers: Array<TypeRoute[]>,
  isLoading: boolean
}