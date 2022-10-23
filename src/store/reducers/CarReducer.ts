import { ACTIONS } from "../types/actions";
import { ICars } from "../types/ICars";

const initialState: ICars = {
  cars: [],
};

type CarAction = {
  type: string;
  payload: any;
};

export const CarReducer = (state = initialState, action: CarAction) => {
  switch (action.type) {
    case ACTIONS.FETCH_CARS:
      return {
        ...state,
        cars: [...state.cars, action.payload.data],
      };
    default:
      return state;
  }
};
