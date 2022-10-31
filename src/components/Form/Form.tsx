import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { bindActionCreators } from "redux";

import Map from "../Map/Map";
import Select from "../Select/Select";
import Input from "../Input/Input";
import Info from "../Info/Info";

import { actionCreators } from "../../store";
import { RootState } from "../../store/reducers";

export interface IFormValues {
    vehicle: string,
    fromPeriod: string,
    toPeriod: string
}

const getDefaultPeriod = () => {
    const date = new Date();

    const fromPeriod = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().slice(0, 10);
    const toPeriod = new Date().toISOString().slice(0, 10);

    return [fromPeriod, toPeriod];
}

const Form: React.FC = () => {
    const { register, handleSubmit } = useForm<IFormValues>();

    const dispatch = useDispatch();
    const [routeList, cars, routeDistance] = useSelector((state: RootState) => [
        state.RouteReducer.routeData[0],
        state.CarReducer.cars[0],
        state.RouteDirectionReducer.routes
    ], shallowEqual)

    const { fetchRoutes } = bindActionCreators(actionCreators, dispatch);

    const onSubmit: SubmitHandler<IFormValues> = (data) => {
        const { fromPeriod, toPeriod, vehicle } = data;

        fetchRoutes(fromPeriod, toPeriod, vehicle);
    }

    const [fromPeriod, toPeriod] = getDefaultPeriod();

    return (
        <main className="main">
            <div className="title">
                <h1>Route report</h1>
            </div>
            <div className="form">
                <form className="form__route" id='route-form' onSubmit={handleSubmit(onSubmit)}>
                    <Select label='Vehicle number' defaultOption='Select vehicle' options={cars} {...register('vehicle')} required />
                    <p>Period</p>
                    <div className="input-period">
                        <div className="input-from-period">
                            <Input type='date' label='From' defaultValue={fromPeriod} name="fromPeriod" register={register} required={false} />
                        </div>
                        <div className="input-to-period">
                            <Input type='date' label='To' defaultValue={toPeriod} name="toPeriod" register={register} required={false} />
                        </div>
                    </div>
                </form>
                {routeList &&
                    <div className="route">
                        <div className="route__map">
                            <Map routes={routeList} dispatch={dispatch} />
                        </div>
                        {routeDistance && <Info routes={routeDistance} />}
                    </div>
                }
            </div>
            <div className="submit">
                <button type='submit' className="submit__button" form='route-form'>Generate</button>
            </div>
        </main>
    );
}

export default Form;