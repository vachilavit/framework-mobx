import React from 'react'
import useMyCombobox from 'hooks/common/useMyCombobox'

const MyComboboxView = ({
    inputItems,
    getLabelProps,
    getComboboxProps,
    getInputProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    isOpen,
    highlightedIndex,
}) => {
    return (
        <div>
            <label {...getLabelProps()}>Choose an element:</label>
            <div {...getComboboxProps()}>
                <input {...getInputProps()} />
                <button {...getToggleButtonProps()}>&#8595;</button>
            </div>
            <ul {...getMenuProps()}>
                {isOpen &&
                    inputItems.map((item, index) => (
                        <li
                            style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
                            key={`${item}${index}`}
                            {...getItemProps({ item, index })}
                        >
                            {item}
                        </li>
                    ))}
            </ul>
        </div>
    )
}

const MyCombobox = ({ options, ...other }) => {
    const myCombobox = useMyCombobox({ options })
    return <MyComboboxView {...other} {...myCombobox} />
}

export default MyCombobox
