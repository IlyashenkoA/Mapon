import axios from 'axios';
import { Dispatch } from 'redux';

import { ICarUnit } from '../types/ICars';
import { IRouteUnit } from '../types/IRoutes';
import { ACTIONS } from '../types/actions';

export const fetchCars =
	(setIsLoading: (value: boolean) => void) => async (dispatch: Dispatch) => {
		setIsLoading(true);
		try {
			const response = await axios.get<ICarUnit>(
				`https://mapon.com/api/v1/unit/list.json?key=${process.env.REACT_APP_MAPON_API}`
			);

			dispatch({ type: ACTIONS.FETCH_CARS, payload: response.data });
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};

export const fetchRoutes =
	(fromPeriod: string, toPeriod: string, carNumber: string) =>
	async (dispatch: Dispatch) => {
		const response = await axios.get<IRouteUnit>(
			'https://mapon.com/api/v1/route/list.json',
			{
				params: {
					key: process.env.REACT_APP_MAPON_API,
					from: new Date(fromPeriod).toISOString().split('.')[0] + 'Z',
					till: new Date(toPeriod).toISOString().split('.')[0] + 'Z',
					unit_id: carNumber,
					include: 'decoded_route',
				},
			}
		);

		dispatch({ type: ACTIONS.FETCH_ROUTES, payload: response.data });
	};

export const fetchRouteDirection = (data: google.maps.DirectionsResult) => {
	return { type: ACTIONS.GET_ROUTE_DIRECTION, payload: data.routes };
};
