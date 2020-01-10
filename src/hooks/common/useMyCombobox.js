import { useState, useEffect } from 'react'
import { useCombobox } from 'downshift'

const useMyCombobox = ({ items, uniqueKey, searchKeys }) => {
    const [inputItems, setInputItems] = useState(items)
    const [inputHighlightedIndex, setInputHighlightedIndex] = useState(0)
    const combobox = useCombobox({
        defaultHighlightedIndex: 0,
        items: inputItems,
        itemToString: item =>
            item ? searchKeys.filter(searchKey => !!item[searchKey]).map(searchKey => item[searchKey])?.[0] : '',
        onInputValueChange: ({ inputValue }) => {
            const filtered = items.filter(item =>
                searchKeys.some(searchKey =>
                    item[searchKey]
                        ?.toString()
                        ?.toLowerCase()
                        ?.includes(inputValue?.toString()?.toLowerCase()),
                ),
            )
            setInputItems(filtered)
        },
        onSelectedItemChange: ({ selectedItem }) => {
            setInputHighlightedIndex(
                inputItems.findIndex(inputItem => selectedItem?.[uniqueKey] === inputItem[uniqueKey]),
            )
        },
    })

    useEffect(() => {
        if (combobox.isOpen) {
            combobox.setHighlightedIndex(inputHighlightedIndex)
        }
    }, [combobox.isOpen])

    const createTextFromItem = (item, searchKeys) => {
        return item
            ? searchKeys
                  .filter(searchKey => !!item[searchKey])
                  .map(searchKey => item[searchKey])
                  .join(', ')
            : ''
    }

    return {
        combobox,
        inputItems,
        createTextFromItem,
    }
}

export default useMyCombobox
