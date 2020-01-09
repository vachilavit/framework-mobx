import { useField } from 'react-final-form-hooks'
import { useFormConsumer } from 'contexts/FormContext'

const useMyTextField = ({ name, validate }) => {
    const formConsumer = useFormConsumer()
    const field = useField(name, formConsumer.form, validate)
    return { field }
}

export default useMyTextField
