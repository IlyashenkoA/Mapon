import {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import { IFormValues } from '../Form';

type InputProps<T extends keyof IFormValues> = {
  register: UseFormRegister<IFormValues>;
  type: string;
  label: string;
  name: T;
  defaultValue?: string;
  errors?: FieldErrors<IFormValues>;
  render?: (
    errors: FieldErrors<IFormValues>
  ) => JSX.Element | null;
  registerOptions?: RegisterOptions<IFormValues, T>;
};

const Input = <T extends keyof IFormValues>({
  register,
  type,
  label,
  name,
  defaultValue,
  errors,
  render,
  registerOptions,
}: InputProps<T>) => {
  return (
    <div className='input__group'>
      <label className='from-period__label' htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        {...register(name, registerOptions)}
        defaultValue={defaultValue}
      />
      {errors && render ? render(errors) : null}
    </div>
  );
};

export default Input;
