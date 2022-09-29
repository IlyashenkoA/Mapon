import { FETCH_CARS } from "../types/actions"

export const fetchCars = (data: any) => {
    return {
        type: FETCH_CARS,
        payload: data
    }
}