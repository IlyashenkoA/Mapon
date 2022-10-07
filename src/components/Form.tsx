import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { ICar } from "../types/ICars";
import './Form.scss';

const Form: React.FC = () => {
    const [carNumber, setCarNumber] = useState<number>(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const result = useSelector((state: RootState) => {
        const { CarReducer } = state;

        return CarReducer.units[0];
    })

    const CarNumberHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const car = result ? result.units.filter((unit: ICar) => {return e.target.value === unit.number}) : null;
        setCarNumber(car.unit_id);
    }

    const DateStartHandler = (e: React.ChangeEvent<HTMLDataElement>) => {
        setStartDate(e.target.value);
    }

    const DateEndHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    }

    async function fetchRoute() {
        const response = await axios.get(`https://mapon.com/api/v1/route/list.json?key=${process.env.REACT_APP_MAPON_API}?from=${startDate}?till${endDate}?unit_id=${carNumber}`);

        console.log(response.data)
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetchRoute();
    }

    return (
        <div className="main">
            <div className="header">
                <p className="header__text">Route report</p>
            </div>
            <form className="form" id='form' onSubmit={onSubmit}>
                <label className="label__text" htmlFor="vehicle">
                    Vehicle number<span className="required">*</span>
                </label>
                <select name='vehicle' id='vehicle' className="vehicle" onChange={CarNumberHandler} value={carNumber} required>
                    <option value=''>Select vehicle</option>
                    {result ? result.units.map((item: ICar) => {
                        return <option key={item.unit_id}>{item.number}</option>
                    }) : null}
                </select>
                <label className="label__text">Period</label>
                <div className="form__input--grouped">
                    <div className="input__group">
                        <label className="label__text" htmlFor="start-date">From</label>
                        <input type='date' name='start-date' id="start-date" className="start-date" onChange={DateStartHandler} value={startDate} />
                    </div>
                    <div className="input__group">
                        <label className="label--text" htmlFor="end-date">To</label>
                        <input type='date' name='end-date' id='end-date' className="end-date" onChange={DateEndHandler} value={endDate} />
                    </div>
                </div>
            </form>
            <div className="footer">
                <button type='submit' className="footer__button" form='form'>Generate</button>
            </div>
        </div>
    );
}

export default Form;