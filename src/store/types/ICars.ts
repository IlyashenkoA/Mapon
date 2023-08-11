export interface ICars {
  cars: ICar[];
}

export interface ICarUnit {
  units: ICar[];
}

export interface ICar {
  number: string;
  unit_id: number;
}
