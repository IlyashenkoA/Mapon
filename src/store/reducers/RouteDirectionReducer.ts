import { ACTIONS } from "./../types/actions";

const initialState: google.maps.DirectionsResult = {
  routes: [],
};

type RouteDirectionAction = {
  type: string;
  payload: google.maps.DirectionsRoute[];
};

export const RouteDirectionReducer = (
  state = initialState,
  action: RouteDirectionAction
) => {
  switch (action.type) {
    case ACTIONS.GET_ROUTE_DIRECTION:
      return {
        ...state,
        routes: [...action.payload],
      };
    default:
      return state;
  }
};
