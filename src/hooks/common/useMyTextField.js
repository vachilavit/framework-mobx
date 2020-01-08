import { useField } from 'react-final-form-hooks'

const useMyTextField = ({ name, form, validate }) => {
    const field = useField(name, form, validate)
    return { field }
}

export default useMyTextField
