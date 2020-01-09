import React from 'react'
import useMyTextField from 'hooks/common/useMyTextField'
import TextField from '@material-ui/core/TextField'

const MyTextFieldView = ({ label, field }) => {
    const error = !!(field.meta.touched && field.meta.error)
    const helperText = field.meta.touched ? field.meta.error : undefined

    return <TextField {...{ label, error, helperText }} {...field.input} />
}

const MyTextField = ({ name, form, validate, ...other }) => {
    const myTextField = useMyTextField({ name, form, validate })
    return <MyTextFieldView {...other} {...myTextField} />
}

export default MyTextField
