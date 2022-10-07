import axios from "axios";
import { Dispatch } from "redux"
import { ICars } from "../../types/ICars";
import { ACTIONS } from "../types/actions"

export const fetchCars = () => async (dispatch: Dispatch) => {
    const response = await axios.get<ICars[]>(`https://mapon.com/api/v1/unit/list.json?key=${process.env.REACT_APP_MAPON_API}`);

    dispatch({type: ACTIONS.FETCH_CARS, payload: response.data});
}