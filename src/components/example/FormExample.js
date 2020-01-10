import React from 'react'
import useFormExample from 'hooks/example/useFormExample'
import { FormProvider } from 'contexts/FormContext'
import MyTextField from 'components/common/MyTextField'
import MyCombobox from 'components/common/MyCombobox'
import { composeValidators, required } from 'utils/formValidate'

let FormExampleView = ({ state, form, form2 }) => {
    return (
        <FormProvider form={form.form}>
            <div>
                <MyTextField name='test' label='test' validate={composeValidators(required)} />
                <MyCombobox
                    name='test2'
                    label='test2'
                    items={[
                        { value: 1, name: 'option1', name2: 'ลอง1' },
                        { value: 2, name: 'option2', name2: 'ลอง2' },
                        { value: 3, name: 'option3', name2: 'ลอง3' },
                    ]}
                    searchKeys={['name', 'name2']}
                />
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
            <FormProvider form={form2.form}>
                <div>
                    <MyTextField name='test3' label='test3' validate={composeValidators(required)} />
                    <MyTextField name='test4' label='test4' />
                    <button
                        onClick={event => {
                            state.typeSubmit = 'submit1'
                            form2.handleSubmit(event)
                        }}
                    >
                        submit1
                    </button>
                    <button
                        onClick={event => {
                            state.typeSubmit = 'submit2'
                            form2.handleSubmit(event)
                        }}
                    >
                        submit2
                    </button>
                </div>
            </FormProvider>
        </FormProvider>
    )
}

let FormExample = () => {
    const formExample = useFormExample()
    return <FormExampleView {...formExample} />
}

export default FormExample
