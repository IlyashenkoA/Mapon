import { forwardRef } from "react"
import { ICar, ICarUnit } from "../../store/types/ICars"

interface Props {
    cars: ICarUnit
}

const Select = forwardRef<any, Props>((props, ref) => {
    return (
        <>
            <label className="label__vehicle" htmlFor="vehicle">
                Vehicle number<span className="required">*</span>
            </label>
            <select name='vehicle' id='vehicle' className="vehicle" ref={ref} required>
                <option value=''>Select vehicle</option>
                {props.cars ? props.cars.units.map((item: ICar) => {
                    return <option key={item.unit_id} value={item.unit_id}>{item.number}</option>
                }) : null}
            </select>
        </>
    )
}
)

export default Select;