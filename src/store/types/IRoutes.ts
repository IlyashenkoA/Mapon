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
  route_id: number;
  end: ILocation;
  start: ILocation;
  type: string;
}

interface ILocation {
  address: string;
  lat: number;
  lng: number;
  time: string;
}
