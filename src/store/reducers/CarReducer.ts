import { ACTIONS } from "../types/actions";
import { ICars } from "../types/ICars";

const initialState: ICars = {
  carData: [],
};

type CarAction = {
  type: string;
  payload: any;
}

export const CarReducer = (state = initialState, action: CarAction) => {
  switch (action.type) {
    case ACTIONS.FETCH_CARS:
      return {
        ...state,
        carData: [...state.carData, action.payload.data],
      };
    default:
      return state;
  }
};
