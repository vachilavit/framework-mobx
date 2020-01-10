import React, { useRef } from 'react'
import { FixedSizeList as List } from 'react-window'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Popover from '@material-ui/core/Popover'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import useMyCombobox from 'hooks/common/useMyCombobox'

const useStyles = makeStyles(theme => ({
    root: { width: '100%', height: '100%' },
    searchInput: { padding: theme.spacing(1) },
    highlighted: { fontWeight: 'bold' },
    otherMenu: { textAlign: 'center', padding: theme.spacing(1) },
}))

const MyComboboxView = ({
    combobox,
    inputItems,
    inputHighlightedIndex,
    createTextFromItem,

    uniqueKey,
    searchKeys,

    label,
    placeholder,
    rowsMax = 10,
}) => {
    const classes = useStyles()
    const anchorEl = useRef()
    const inputRef = useRef()
    const inputItemRef = useRef()
    const textItem = createTextFromItem(combobox.selectedItem, searchKeys)
    return (
        <div {...combobox.getComboboxProps()}>
            <TextField
                fullWidth
                multiline
                ref={anchorEl}
                value={textItem}
                InputLabelProps={combobox.getLabelProps({ shrink: true })}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment
                            position='end'
                            onClick={() => {
                                inputRef.current.focus()
                            }}
                        >
                            <ArrowDropDownIcon color='action' />
                        </InputAdornment>
                    ),
                }}
                {...{ label, placeholder, rowsMax }}
                onClick={event => {
                    event.preventDefault()
                    combobox.setInputValue('')
                    combobox.openMenu()
                    setImmediate(() => {
                        inputItemRef.current.focus()
                    })
                }}
            />

            <Popover
                open={combobox.isOpen}
                keepMounted
                anchorEl={anchorEl.current}
                onClose={() => {
                    combobox.closeMenu()
                }}
            >
                <Paper square>
                    <div {...(combobox.isOpen ? combobox.getMenuProps({}, { suppressRefError: true }) : {})}>
                        <TextField
                            fullWidth
                            multiline
                            inputRef={inputItemRef}
                            placeholder={textItem || placeholder}
                            InputProps={combobox.getInputProps()}
                            {...{ rowsMax }}
                        />

                        <div
                            onMouseDown={event => {
                                event.preventDefault()
                            }}
                        >
                            <List height={100} width={300} itemCount={inputItems.length} itemSize={50}>
                                {({ index, style }) => {
                                    const item = inputItems[index]
                                    return (
                                        <ListItem
                                            key={`${item[uniqueKey]}${index}`}
                                            selected={combobox.highlightedIndex === index}
                                            style={style}
                                            {...combobox.getItemProps({
                                                index,
                                                item,
                                            })}
                                        >
                                            <ListItemText
                                                primary={createTextFromItem(item, searchKeys)}
                                                classes={{
                                                    primary: clsx({
                                                        [classes.highlighted]:
                                                            item[uniqueKey] === combobox.selectedItem?.[uniqueKey],
                                                    }),
                                                }}
                                            />
                                        </ListItem>
                                    )
                                }}
                            </List>
                        </div>
                    </div>
                </Paper>
            </Popover>
        </div>
    )
}

const MyCombobox = ({ items = [], uniqueKey = 'value', searchKeys = ['name'], ...other }) => {
    const myCombobox = useMyCombobox({ items, uniqueKey, searchKeys })
    return <MyComboboxView {...myCombobox} {...{ uniqueKey, searchKeys }} {...other} />
}

export default MyCombobox
