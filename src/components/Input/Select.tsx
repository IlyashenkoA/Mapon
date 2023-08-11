import {
  Control,
  Controller,
  FieldName,
} from 'react-hook-form';
import Select from 'react-select';

import { IFormValues } from '../Form';

interface SelectComponentProps {
  label: string;
  defaultOption: string;
  options: { label: string; value: string }[];
  control: Control<IFormValues>;
  required?: boolean;
  name: FieldName<IFormValues>;
}

export const SelectComponent: React.FC<
  SelectComponentProps
> = ({ name, label, options, required, control }) => {
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
            required={required}
          />
        )}
        rules={{ required: required }}
      />
    </div>
  );
};
