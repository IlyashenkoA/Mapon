export interface ICars {
    units: ICar[]
}

export type ICar = {
    avg_fuel_consumption: AvgFuel
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
    movement_state: MovementState
    number: string
    shortcut: string
    speed: number
    state: State
    type: string
    unit_id: number
    vehicle_title: any
    vin: string
}

type AvgFuel = {
    measurement: string
    norm: number
}

type MovementState = {
    duration: number
    name: string
    start: string
}

type State = {
    debug_info: object
    duration: number
    name: string
    start: string
}