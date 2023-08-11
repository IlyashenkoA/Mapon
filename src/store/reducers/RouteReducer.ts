import { ACTIONS } from '../types/actions';
import { IRoutes } from '../types/IRoutes';

const initialState: IRoutes = {
  routeData: [],
};

type RouteAction = {
  type: string;
  payload: any;
};

export const RouteReducer = (
  state = initialState,
  action: RouteAction
) => {
  switch (action.type) {
    case ACTIONS.FETCH_ROUTES:
      return {
        ...state,
        routeData: [action.payload.data],
      };
    default:
      return state;
  }
};
