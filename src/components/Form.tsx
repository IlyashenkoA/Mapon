import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { bindActionCreators } from 'redux';

import Map from './Map';
import { SelectComponent } from './Input/Select';
import Input from './Input/Input';
import Info from './Info';
import { Button } from './Button';

import { actionCreators } from '../store';
import { RootState } from '../store/reducers';
import { ICar } from '../store/types/ICars';

export interface IFormValues {
  vehicle: string;
  fromPeriod: string;
  toPeriod: string;
}

const getDefaultPeriod = () => {
  const date = new Date();

  const fromPeriod = new Date(
    date.getFullYear(),
    date.getMonth(),
    2
  )
    .toISOString()
    .slice(0, 10);
  const toPeriod = new Date().toISOString().slice(0, 10);

  return [fromPeriod, toPeriod];
};

const Form: React.FC = () => {
  const { register, handleSubmit, control } =
    useForm<IFormValues>();

  const dispatch = useDispatch();

  const routeList = useSelector((state: RootState) => {
    return state.RouteReducer.routeData[0];
  });

  const cars = useSelector((state: RootState) => {
    return state.CarReducer.cars;
  });

  const routeDistance = useSelector((state: RootState) => {
    return state.RouteDirectionReducer.routes;
  });

  const { fetchRoutes } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const onSubmit: SubmitHandler<IFormValues> = data => {
    const { fromPeriod, toPeriod, vehicle } = data;

    fetchRoutes(fromPeriod, toPeriod, vehicle);
  };

  const [fromPeriod, toPeriod] = getDefaultPeriod();

  return (
    <main className='main'>
      <h1 className='main__title'>Route report</h1>
      <div className='main__form'>
        <form
          className='form__route'
          id='route-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <SelectComponent
            label='Vehicle number'
            defaultOption='Select vehicle'
            options={cars.map((car: ICar) => ({
              value: car.unit_id.toString(),
              label: car.number,
            }))}
            control={control}
            name='vehicle'
            required
          />
          <label className='label__period'>Period</label>
          <div className='input__period'>
            <Input
              type='date'
              label='From'
              defaultValue={fromPeriod}
              name='fromPeriod'
              register={register}
              required
            />
            <Input
              type='date'
              label='To'
              defaultValue={toPeriod}
              name='toPeriod'
              register={register}
              required
            />
          </div>
        </form>
        {routeList && (
          <div className='main__route'>
            <div className='route__map'>
              <Map routes={routeList} />
            </div>
            {routeDistance && (
              <Info routes={routeDistance} />
            )}
          </div>
        )}
      </div>
      <div className='main__submit'>
        <Button title='Generate' form='route-form' />
      </div>
    </main>
  );
};

export default Form;
