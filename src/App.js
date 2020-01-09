import React from 'react'
import FormExample from 'components/example/FormExample'
import MyCombobox from 'components/common/MyCombobox'

const App = () => {
    return (
        <>
            <FormExample />
            <MyCombobox options={['awefsc', '123ewfa', 'df312']} />
        </>
    )
}

export default App
