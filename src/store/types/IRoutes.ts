export interface IRoutes {
  routeData: IRouteUnit[];
}

export interface IRouteUnit {
  units: IRoute[];
}

export interface IRoute {
  unit_id: number;
  routes: IData[];
}

interface IData {
  end: ILocation;
  start: ILocation;
}

export interface ILocation {
  lat: number;
  lng: number;
}
