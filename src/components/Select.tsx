import { forwardRef } from "react"
import { UseFormRegister } from "react-hook-form";
import { ICar, ICarUnit } from "../store/types/ICars"
import { IFormValues } from "./Form";

const Select = forwardRef<
    HTMLSelectElement,
    { label: string, defaultOption: string, options: ICarUnit } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label, defaultOption, options, required }, ref) => (
    <>
        <label className={`label__${name}`} htmlFor={name}>
            {label}{required && <span className="required">*</span>}
        </label>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur} required={required}>
            <option value="">{defaultOption}</option>
            {options ? options.units.map((item: ICar) => {
                return <option key={item.unit_id} value={item.unit_id}>{item.number}</option>
            }) : null}
        </select>
    </>
));

export default Select;