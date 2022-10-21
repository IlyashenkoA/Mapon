import { RouteReducer } from './RouteReducer';
import { combineReducers } from 'redux';
import { CarReducer } from './CarReducer';

export const rootReducer = combineReducers({
    CarReducer,
    RouteReducer
});

export type RootState = ReturnType<typeof rootReducer>