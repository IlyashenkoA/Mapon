export interface ICars {
  cars: ICarUnit[];
}

export interface ICarUnit {
  units: ICar[];
}

export interface ICar {
  number: string;
  unit_id: number;
}
