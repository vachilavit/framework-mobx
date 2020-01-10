import { useState } from 'react'
import { useCombobox } from 'downshift'

const useMyCombobox = ({ items, uniqueKey, searchKeys }) => {
    const [inputItems, setInputItems] = useState(items)
    const combobox = useCombobox({
        defaultHighlightedIndex: -1,
        items: inputItems,
        itemToString: item =>
            item ? searchKeys.filter(searchKey => !!item[searchKey]).map(searchKey => item[searchKey])?.[0] : '',
        onInputValueChange: ({ inputValue }) => {
            setInputItems(
                items.filter(item =>
                    searchKeys.some(searchKey =>
                        item[searchKey]
                            ?.toString()
                            ?.toLowerCase()
                            ?.includes(inputValue?.toString()?.toLowerCase()),
                    ),
                ),
            )
        },
    })

    // const test = inputItems.findIndex(
    //     selectedItem => combobox.selectedItem?.[uniqueKey] === selectedItem[uniqueKey],
    // )
    // console.log(test)

    const createTextFromItem = (item, searchKeys) =>
        item
            ? searchKeys
                  .filter(searchKey => !!item[searchKey])
                  .map(searchKey => item[searchKey])
                  .join(', ')
            : ''

    return {
        combobox,
        inputItems,
        createTextFromItem,
    }
}

export default useMyCombobox
