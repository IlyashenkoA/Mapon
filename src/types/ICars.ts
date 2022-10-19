export interface ICars {
    units: ICar[]
}

export interface ICar {
    avg_fuel_consumption: IAvgFuel
    box_id: number
    car_reg_certificate: string
    company_id: number
    country_code: string
    created_at: string
    direction: number
    fuel_type: string
    icon: string
    ignition_total_time: number
    label: string
    last_updated: string
    lat: number
    lng: number
    movement_state: IMovementState
    number: string
    shortcut: string
    speed: number
    state: IState
    type: string
    unit_id: number
    vehicle_title: any
    vin: string
}

interface IAvgFuel {
    measurement: string
    norm: number
}

interface IMovementState {
    duration: number
    name: string
    start: string
}

interface IState {
    debug_info: object
    duration: number
    name: string
    start: string
}