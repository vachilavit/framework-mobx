import { useRef } from 'react'
import { useForm, useField } from 'react-final-form-hooks'
import setFieldData from 'final-form-set-field-data'

const useFormExample = () => {
    const typeSubmitRef = useRef()

    const onSubmit = (values, { getFieldState }) => {
        console.log(typeSubmitRef.current, values, getFieldState('test2').data)
    }

    const form = useForm({
        onSubmit,
        initialValues: {
            test: undefined,
            test2: 'AE',
        },
        subscription: { submitFailed: true },
        mutators: { setFieldData },
    })

    const form2 = useForm({
        onSubmit,
        initialValues: {
            test3: undefined,
            test4: 'test4',
        },
        subscription: { submitFailed: true },
    })

    // //ไม่ render ใหม่เมื่อเปลี่ยน (ไว้สำหรับมี event อะไรสักอย่างแล้วต้องการค่า)
    // console.log(form.form.getFieldState('test')?.value)

    // //render ใหม่เมื่อเปลี่ยน (ไว้สำหรับตรวจจับ event onChange ของ field นี้)
    // const fieldTest = useField('test', form.form, undefined, { value: true })
    // console.log(fieldTest.input.value)

    return { typeSubmitRef, form, form2 }
}

export default useFormExample
