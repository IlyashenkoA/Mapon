import { combineReducers } from "redux";

import { RouteReducer } from "./RouteReducer";
import { CarReducer } from "./CarReducer";
import { RouteDirectionReducer } from './RouteDirectionReducer';

export const rootReducer = combineReducers({
  CarReducer,
  RouteReducer,
  RouteDirectionReducer
});

export type RootState = ReturnType<typeof rootReducer>;
