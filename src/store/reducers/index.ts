import { combineReducers } from 'redux';
import { CarReducer } from './CarReducer';

export const rootReducer = combineReducers({
    CarReducer
});

export type RootState = ReturnType<typeof rootReducer>