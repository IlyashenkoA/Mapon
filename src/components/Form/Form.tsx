import React, { useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
import { RootState } from "../../store/reducers";

import Map from "../Map/Map";
import Select from "../Select/Select";

const Form: React.FC = () => {
    const carNumberRef = useRef<HTMLInputElement>(null);
    const fromPeriodRef = useRef<HTMLInputElement>(null);
    const toPeriodRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    const { fetchRoutes } = bindActionCreators(actionCreators, dispatch);

    const [routes, cars] = useSelector((state: RootState) => [
        state.RouteReducer.routeData[0],
        state.CarReducer.carData[0]
    ], shallowEqual)

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (fromPeriodRef.current && toPeriodRef.current && carNumberRef.current) {
            fetchRoutes(fromPeriodRef.current.value, toPeriodRef.current.value, carNumberRef.current.value);
        }
    }

    return (
        <main className="main">
            <header className="header">
                <p className="header__title">Route report</p>
            </header>
            <div className="container">
                <form className="container__form" id='carForm' onSubmit={onSubmit}>
                    <Select cars={cars} ref={carNumberRef} />
                    <span className="label__period">Period</span>
                    <div className="input__period">
                        <div className="input__fromPeriod">
                            <label className="label__fromPeriod" htmlFor="start-date">From</label>
                            <input type='date' name='start-date' id="start-date" className="start-date" ref={fromPeriodRef} />
                        </div>
                        <div className="input__toPeriod">
                            <label className="label__toPeriod" htmlFor="end-date">To</label>
                            <input type='date' name='end-date' id='end-date' className="end-date" ref={toPeriodRef} />
                        </div>
                    </div>
                </form>
                {routes &&
                    <div className="container__route">
                        <div className="route__map">
                            <Map routes={routes} />
                        </div>
                        <div className="route__results">
                            <div className="results__distance">
                                <span>128</span>
                                <label>Km driven</label>
                            </div>
                            <div className="results__time">
                                <span>3h 20m</span>
                                <label>Driving time</label>
                            </div>
                            <div className="results__time">
                                <span>1h 5m</span>
                                <label>Driving time</label>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <footer className="footer">
                <button type='submit' className="footer__button" form='carForm'>Generate</button>
            </footer>
        </main >
    );
}

export default Form;