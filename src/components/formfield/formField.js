import {ErrorMessage , Field} from "formik";

const FormField = ({name , label, type="text" , placeholder}) => (
    <label>
        {label}
        <Field name={name}  type={type} placeholder={placeholder} className="input"/>
        <ErrorMessage className='error' component='div' name={name} />
    </label>
)

export default FormField