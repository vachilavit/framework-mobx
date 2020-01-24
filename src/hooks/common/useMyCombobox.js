import { useState, useEffect } from 'react'
import { useField } from 'react-final-form-hooks'
import { useFormConsumer } from 'contexts/FormContext'
import { useCombobox } from 'downshift'

const useMyCombobox = ({ name, validate, items, uniqueKey, searchKeys }) => {
    const formConsumer = useFormConsumer()
    const field = useField(name, formConsumer.form, validate)
    const [inputItems, setInputItems] = useState(items)
    const [inputHighlightedIndex, setInputHighlightedIndex] = useState(-1)
    const [scrollIndex, setScrollIndex] = useState(0)
    // const listRef = useRef()

    const combobox = useCombobox({
        selectedItem: items.filter(item => field.input.value === item[uniqueKey])?.[0],
        items: inputItems,
        // itemToString: item => searchKeys.filter(searchKey => !!item[searchKey]).map(searchKey => item[searchKey])?.[0],
        highlightedIndex: inputHighlightedIndex,
        onIsOpenChange: ({ isOpen, selectedItem }) => {
            if (isOpen) {
                const selectedItemIndex = items.findIndex(item => selectedItem?.[uniqueKey] === item[uniqueKey])
                combobox.setHighlightedIndex(selectedItemIndex)
                setInputHighlightedIndex(selectedItemIndex)
                setScrollIndex(selectedItemIndex)
                // setTimeout(() => {
                //     listRef.current.scrollToItem(selectedItemIndex, 'smart')
                // }, 0)
            }
        },
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
            setInputHighlightedIndex(-1)
            setScrollIndex(0)
            // setTimeout(() => {
            //     listRef.current.scrollToItem(0)
            // }, 0)
        },
        onHighlightedIndexChange: ({ highlightedIndex }) => {
            if (highlightedIndex !== -1) {
                setInputHighlightedIndex(highlightedIndex)
            }
        },
        onSelectedItemChange: ({ selectedItem }) => {
            field.input.onChange(selectedItem[uniqueKey])
        },
    })

    useEffect(() => {
        formConsumer.form.mutators.setFieldData(name, { ...combobox.selectedItem })
    }, [combobox.selectedItem])

    const onKeyDownInput = event => {
        const { key } = event
        const previousIndex = combobox.highlightedIndex <= 0 ? inputItems.length - 1 : combobox.highlightedIndex - 1
        const nextIndex = combobox.highlightedIndex >= inputItems.length - 1 ? 0 : combobox.highlightedIndex + 1
        switch (key) {
            case 'ArrowUp':
                event.preventDefault()
                combobox.setHighlightedIndex(previousIndex)
                setScrollIndex(previousIndex)
                // listRef.current.scrollToItem(previousIndex)
                break
            case 'ArrowDown':
                event.preventDefault()
                combobox.setHighlightedIndex(nextIndex)
                setScrollIndex(nextIndex)
                // listRef.current.scrollToItem(nextIndex)
                break
            case 'Enter':
                event.preventDefault()
                combobox.selectItem(inputItems[combobox.highlightedIndex])
                setScrollIndex(nextIndex)
                combobox.closeMenu()
                break
            default:
                break
        }
    }

    const createTextFromItem = (item, searchKeys) => {
        return item
            ? searchKeys
                  .filter(searchKey => !!item[searchKey])
                  .map(searchKey => item[searchKey])
                  .join(', ')
            : ''
    }

    return {
        inputItems,
        // listRef,
        scrollIndex,
        combobox,
        onKeyDownInput,
        createTextFromItem,
    }
}

export default useMyCombobox
