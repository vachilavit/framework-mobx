import { useState } from 'react'
import { useCombobox } from 'downshift'

const useMyCombobox = ({ options }) => {
    const [inputItems, setInputItems] = useState(options)
    const {
        getLabelProps,
        getComboboxProps,
        getInputProps,
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
        isOpen,
        highlightedIndex,
    } = useCombobox({
        items: inputItems,
        onInputValueChange: ({ inputValue }) => {
            setInputItems(options.filter(item => item.toLowerCase().startsWith(inputValue.toLowerCase())))
        },
    })

    return {
        inputItems,
        getLabelProps,
        getComboboxProps,
        getInputProps,
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
        isOpen,
        highlightedIndex,
    }
}

export default useMyCombobox
