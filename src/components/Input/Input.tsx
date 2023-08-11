import { Path, UseFormRegister } from 'react-hook-form';
import { IFormValues } from '../Form';

type InputProps = {
  register: UseFormRegister<IFormValues>;
  required: boolean;
  type: string;
  label: string;
  name: Path<IFormValues>;
  defaultValue?: string;
};

const Input: React.FC<InputProps> = ({
  register,
  required,
  type,
  label,
  name,
  defaultValue,
}) => {
  return (
    <div className='input__group'>
      <label className='from-period__label' htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        {...register(name, { required })}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;
