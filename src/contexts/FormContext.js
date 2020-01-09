import React, { createContext, useContext } from 'react'

const FormContext = createContext()

export const FormProvider = ({ children, ...other }) => {
    return <FormContext.Provider value={{ ...other }}>{children}</FormContext.Provider>
}

export const useFormConsumer = () => useContext(FormContext)
