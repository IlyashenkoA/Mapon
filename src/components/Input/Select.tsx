import {
  Control,
  Controller,
  FieldErrors,
  FieldName,
  RegisterOptions,
} from 'react-hook-form';
import Select from 'react-select';

import { IFormValues } from '../Form';

type SelectComponentProps<T extends keyof IFormValues> = {
  label: string;
  defaultOption: string;
  options: { label: string; value: string }[];
  control: Control<IFormValues>;
  required?: boolean;
  name: FieldName<IFormValues>;
  errors?: FieldErrors<IFormValues>;
  render?: (
    errors: FieldErrors<IFormValues>
  ) => JSX.Element | null;
  registerOptions?: RegisterOptions<IFormValues, T>;
};

export const SelectComponent = <
  T extends keyof IFormValues,
>({
  name,
  label,
  options,
  required,
  control,
  errors,
  render,
  registerOptions,
}: SelectComponentProps<T>) => {
  return (
    <div className='select__group'>
      <label className={`label__${name}`} htmlFor={name}>
        {label}
        {required && <span className='required'>*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <Select
            options={options}
            onChange={val => onChange(val!.value)}
          />
        )}
        rules={{ required: registerOptions?.required }}
      />
      {errors && render ? render(errors) : null}
    </div>
  );
};
