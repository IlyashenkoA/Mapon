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
import { IRouteUnit } from '../store/types/IRoutes';

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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const dispatch = useDispatch();

  const routeList = useSelector((state: RootState) => {
    if (state.RouteReducer.routeData)
      return state.RouteReducer.routeData[0];
  }) as IRouteUnit;

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

  const validateDate = (
    value: string,
    {
      toValue,
      maxDifference,
    }: { toValue?: string; maxDifference?: number }
  ) => {
    const date = new Date(value);
    const toDate = toValue ? new Date(toValue) : new Date();

    if (toValue) {
      if (date > toDate) {
        return 'From Period cannot be greater than To Period';
      }
    }

    if (date > toDate) {
      return 'Date cannot be in the future';
    }

    if (maxDifference !== undefined && toValue) {
      const differenceInDays =
        (toDate.getTime() - date.getTime()) /
        (1000 * 60 * 60 * 24);
      if (differenceInDays > maxDifference) {
        return `Date difference should not be greater than ${maxDifference} days`;
      }
    }

    return true;
  };

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
            registerOptions={{
              required: 'Vehicle number is required',
            }}
            errors={errors}
            render={errors => {
              return errors.vehicle ? (
                <>
                  {errors.vehicle.type === 'required' && (
                    <p className='error error-required'>
                      {errors.vehicle.message}
                    </p>
                  )}
                </>
              ) : null;
            }}
          />
          <label className='label__period'>Period</label>
          <div className='input__period'>
            <Input
              type='date'
              label='From'
              defaultValue={fromPeriod}
              name='fromPeriod'
              register={register}
              registerOptions={{
                required: 'From period is required',
                validate: value =>
                  validateDate(value, {
                    toValue: getValues('toPeriod'),
                    maxDifference: 31,
                  }),
              }}
              errors={errors}
              render={errors => {
                const validationMessage = errors.fromPeriod
                  ? errors.fromPeriod.message
                  : '';

                return (
                  <>
                    {validationMessage && (
                      <p className='error error-required'>
                        {validationMessage}
                      </p>
                    )}
                    {errors.fromPeriod ? (
                      <>
                        {errors.fromPeriod.type ===
                          'required' && (
                          <p className='error error-required'>
                            {errors.fromPeriod.message}
                          </p>
                        )}
                      </>
                    ) : null}
                  </>
                );
              }}
            />
            <Input
              type='date'
              label='To'
              defaultValue={toPeriod}
              name='toPeriod'
              register={register}
              registerOptions={{
                required: 'To period is required',
                validate: value =>
                  validateDate(value, {
                    maxDifference: 31,
                  }),
              }}
              errors={errors}
              render={errors => {
                const validationMessage = errors.toPeriod
                  ? errors.toPeriod.message
                  : '';
                return (
                  <>
                    {validationMessage && (
                      <p className='error error-required'>
                        {validationMessage}
                      </p>
                    )}
                    {errors.toPeriod ? (
                      <>
                        {errors.toPeriod.type ===
                          'required' && (
                          <p className='error error-required'>
                            {errors.toPeriod.message}
                          </p>
                        )}
                      </>
                    ) : null}
                  </>
                );
              }}
            />
          </div>
        </form>
        {routeList ? (
          <div className='main__route'>
            <div className='route__map'>
              <Map routes={routeList} />
            </div>
            {routeDistance ? (
              <Info routes={routeDistance} />
            ) : null}
          </div>
        ) : null}
      </div>
      <div className='main__submit'>
        <Button title='Generate' form='route-form' />
      </div>
    </main>
  );
};

export default Form;
