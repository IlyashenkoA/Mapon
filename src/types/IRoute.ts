export interface IRoutes {
    units: IRoute[]
}

export type IRoute = {
    unit_id: number
    routes: any[]
}


type decoded_route = {
    points: point[]
}

type point = {
    gmt: string
    lat: number
    lng: number
    speed: number
}

type countries = {
    code: string
    distance: number
    time: number
}

type route_details = {
    type: string
    group_id: string
    explanation: string
    explanation_time: string
}

type router_fields = {
    client_title: string
    invoice: string
    custom_distance: string
    selected_distance: string
    extra_passengers: string
    extra_expenses: string
    trailer: string
}