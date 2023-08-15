export interface IRoutes {
  routeData?: IRoute[];
}

export interface IRouteUnit {
  units: IRoute[];
}

export interface IRouteError {
  code: number;
  msg: string;
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
