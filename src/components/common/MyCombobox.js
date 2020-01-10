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
    hoverItem: { backgroundColor: theme.palette.action.hover },
    selectedItem: { backgroundColor: theme.palette.action.selected },
    selectedItemText: { fontWeight: 'bold' },
    otherMenu: { textAlign: 'center', padding: theme.spacing(1) },
}))

const MyComboboxView = ({
    combobox,
    inputItems,
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
        <div {...combobox.getComboboxProps()} className={classes.root}>
            <TextField
                fullWidth
                multiline
                ref={anchorEl}
                InputLabelProps={combobox.getLabelProps({ shrink: true })}
                InputProps={{
                    //กัน error
                    ...combobox.getInputProps(),
                    value: textItem,
                    onChange: () => {},
                    onFocus: () => {},
                    onBlur: () => {},

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
                }}
            />

            <Popover
                open={combobox.isOpen}
                anchorEl={anchorEl.current}
                onClose={() => {
                    combobox.closeMenu()
                }}
            >
                <Paper square {...(combobox.isOpen ? combobox.getMenuProps({}, { suppressRefError: true }) : {})}>
                    <TextField
                        autoFocus
                        fullWidth
                        multiline
                        inputRef={inputItemRef}
                        placeholder={textItem || placeholder}
                        InputProps={{
                            ...combobox.getInputProps(),

                            //กัน error
                            onBlur: () => {},
                        }}
                        className={classes.searchInput}
                        {...{ rowsMax }}
                    />

                    <div
                        onMouseDown={event => {
                            event.preventDefault()
                        }}
                    >
                        <List height={300} width={300} itemCount={inputItems.length} itemSize={48}>
                            {({ index, style }) => {
                                const item = inputItems[index]
                                const isHoverItem = combobox.highlightedIndex === index
                                const beSelectedItem = item[uniqueKey] === combobox.selectedItem?.[uniqueKey]
                                return (
                                    <ListItem
                                        key={`${item[uniqueKey]}${index}`}
                                        className={clsx({
                                            [classes.hoverItem]: isHoverItem,
                                            [classes.selectedItem]: beSelectedItem && !isHoverItem,
                                        })}
                                        style={style}
                                        {...combobox.getItemProps({
                                            index,
                                            // item,
                                        })}
                                        onClick={event => {
                                            // setTimeout(() => {
                                            combobox.selectItem(item)
                                            // }, 0)
                                            combobox.closeMenu()
                                        }}
                                    >
                                        <ListItemText
                                            primary={createTextFromItem(item, searchKeys)}
                                            // classes={{
                                            //     primary: clsx({
                                            //         [classes.selectedItemText]:
                                            //             beSelectedItem
                                            //     }),
                                            // }}
                                        />
                                    </ListItem>
                                )
                            }}
                        </List>
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
