import React from 'react'
import useMyTextField from '../../hooks/common/useMyTextField'

const MyTextFieldView = ({ label, field }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...field.input} />
            {field.meta.error && field.meta.touched && (
                <label>{field.meta.error}</label>
            )}
        </div>
    )
}

const MyTextField = ({ name, form, validate, ...other }) => {
    const myTextField = useMyTextField({ name, form, validate })
    return <MyTextFieldView {...other} {...myTextField} />
}

export default MyTextField
