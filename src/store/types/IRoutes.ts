export interface IRoutes {
  routes: IRoute[];
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
