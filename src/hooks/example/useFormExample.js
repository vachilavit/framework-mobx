import { useLocalStore } from 'mobx-react-lite'
import { useForm, useField } from 'react-final-form-hooks'

const useFormExample = () => {
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

    const form2 = useForm({
        onSubmit,
        initialValues: {
            test3: undefined,
            test4: 'test4',
        },
        subscription: { submitFailed: true },
    })

    //ไม่ render ใหม่เมื่อเปลี่ยน (ไว้สำหรับมี event อะไรสักอย่างแล้วต้องการค่า)
    console.log(form.form.getFieldState('test')?.value)

    //render ใหม่เมื่อเปลี่ยน (ไว้สำหรับตรวจจับ event onChange ของ field นี้)
    const fieldTest = useField('test', form.form, undefined, { value: true })
    console.log(fieldTest.input.value)

    return { state, form, form2 }
}

export default useFormExample
