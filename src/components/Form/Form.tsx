import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { ICar } from "../../types/ICars";
import './Form.scss';

const Form: React.FC = () => {
    const [carNumber, setCarNumber] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const result = useSelector((state: RootState) => {
        const { CarReducer } = state;

        return CarReducer.units[0];
    })

    const CarNumberHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCarNumber(e.target.value);
    }

    const DateStartHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    }

    const DateEndHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    }

    async function fetchRoute() {
        const response = await axios.get('https://mapon.com/api/v1/route/list.json', {
            params: {
                key: process.env.REACT_APP_MAPON_API,
                from: new Date(startDate).toISOString().split('.')[0] + 'Z',
                till: new Date(endDate).toISOString().split('.')[0] + 'Z',
                unit_id: carNumber,
                include: 'decoded_route'
            }
        });
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetchRoute();
    }

    return (
        <main className="main">
            <header className="header">
                <p className="header__title">Route report</p>
            </header>
            <form className="carForm" id='carForm' onSubmit={onSubmit}>
                <label className="label__vehicle" htmlFor="vehicle">
                    Vehicle number<span className="required">*</span>
                </label>
                <select name='vehicle' id='vehicle' className="vehicle" onChange={CarNumberHandler} value={carNumber} required>
                    <option value=''>Select vehicle</option>
                    {result ? result.units.map((item: ICar) => {
                        return <option key={item.unit_id} value={item.unit_id}>{item.number}</option>
                    }) : null}
                </select>
                <span className="label__period">Period</span>
                <div className="input__period">
                    <div className="input__fromPeriod">
                        <label className="label__fromPeriod" htmlFor="start-date">From</label>
                        <input type='date' name='start-date' id="start-date" className="start-date" onChange={DateStartHandler} value={startDate} />
                    </div>
                    <div className="input__toPeriod">
                        <label className="label__toPeriod" htmlFor="end-date">To</label>
                        <input type='date' name='end-date' id='end-date' className="end-date" onChange={DateEndHandler} value={endDate} />
                    </div>
                </div>
            </form>
            <footer className="footer">
                <button type='submit' className="footer__button" form='carForm'>Generate</button>
            </footer>
        </main>
    );
}

export default Form;