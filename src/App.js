import React from 'react'
import { useLocalStore } from 'mobx-react-lite'
import { useForm, useField } from 'react-final-form-hooks'
import MyTextField from './components/common/MyTextField'

const composeValidators = (...validators) => value =>
    validators.reduce(
        (error, validator) => error || validator(value),
        undefined,
    )
const required = value => (value ? undefined : 'required!!')

const App = () => {
    const state = useLocalStore(() => ({
        typeSubmit: null,
    }))

    const onSubmit = values => {
        console.log(state.typeSubmit, values)
    }

    const form = useForm({
        onSubmit,
        initialValues: {
            test: undefined,
            test2: 'test2',
        },
        subscription: { submitFailed: true },
    })

    const fieldTest = useField('test', form.form, undefined, { value: true })
    console.log(fieldTest.input.value)

    return (
        <div>
            <MyTextField
                name="test"
                form={form.form}
                label="test: "
                validate={composeValidators(required)}
            />
            <MyTextField name="test2" form={form.form} label="test2: " />
            <button
                onClick={event => {
                    state.typeSubmit = 'submit1'
                    form.handleSubmit(event)
                }}
            >
                submit1
            </button>
            <button
                onClick={event => {
                    state.typeSubmit = 'submit2'
                    form.handleSubmit(event)
                }}
            >
                submit2
            </button>
        </div>
    )
}

export default App
