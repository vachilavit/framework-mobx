import React, { useRef } from 'react'
import { List, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
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
import useResizeObserver from 'hooks/common/useResizeObserver'
import usePrevious from 'hooks/common/usePrevious'

const rowHeight = 48
const cache = new CellMeasurerCache({
    defaultHeight: rowHeight,
    fixedWidth: true,
})

const useStyles = makeStyles(theme => ({
    root: { width: '100%', height: '100%' },
    searchInput: { padding: theme.spacing(1) },
    hoverItem: { backgroundColor: theme.palette.action.hover },
    selectedItem: { backgroundColor: theme.palette.action.selected },
    selectedItemText: { fontWeight: 'bold' },
    otherMenu: { textAlign: 'center', padding: theme.spacing(1) },
}))

const MyComboboxView = ({
    inputItems,
    // listRef,
    scrollIndex,
    combobox,
    onKeyDownInput,
    createTextFromItem,

    uniqueKey,
    searchKeys,

    label,
    placeholder,
    rowsMax = 10,
}) => {
    cache.clearAll()

    const classes = useStyles()
    const anchorEl = useRef()
    const inputRef = useRef()
    const inputItemRef = useRef()

    const { width: anchorElWidth } = useResizeObserver(anchorEl)
    const widthOfMenu = Math.max(anchorElWidth || 0, 300)

    const previousIsOpen = usePrevious(combobox.isOpen)
    const previousScrollIndex = usePrevious(scrollIndex)

    const textItem = createTextFromItem(combobox.selectedItem, searchKeys)

    let scrollToAlignment = 'auto'
    if (previousIsOpen !== combobox.isOpen && combobox.isOpen) {
        scrollToAlignment = 'center'
    }

    return (
        <div {...combobox.getComboboxProps()} className={classes.root}>
            <TextField
                fullWidth
                multiline
                ref={anchorEl}
                InputLabelProps={combobox.getLabelProps({ shrink: true })}
                InputProps={{
                    ...combobox.getInputProps(), //กัน error
                    value: textItem, //กัน error
                    onChange: () => {}, //กัน error
                    onFocus: () => {}, //กัน error
                    onBlur: () => {}, //กัน error
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
                {...{ inputRef, label, placeholder, rowsMax }}
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
                            onKeyDown: onKeyDownInput,
                            onBlur: () => {}, //กัน error
                        }}
                        className={classes.searchInput}
                        {...{ rowsMax }}
                    />

                    <div
                        onMouseDown={event => {
                            event.preventDefault()
                        }}
                    >
                        {/* <List
                            ref={listRef}
                            height={300}
                            width={widthOfMenu}
                            itemCount={inputItems.length}
                            itemSize={48}
                        >
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
                                        {...combobox.getItemProps({ index })}
                                        onClick={event => {
                                            combobox.selectItem(item)
                                            combobox.closeMenu()
                                        }}
                                        {...{ style }}
                                        ref={() => {}} //กัน error
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
                        </List> */}

                        <List
                            width={widthOfMenu}
                            height={300}
                            rowHeight={cache.rowHeight}
                            rowCount={inputItems.length}
                            scrollToAlignment={scrollToAlignment}
                            scrollToIndex={
                                previousScrollIndex !== scrollIndex
                                    ? scrollIndex
                                    : previousIsOpen !== combobox.isOpen && combobox.isOpen
                                    ? scrollIndex
                                    : undefined
                            }
                            rowRenderer={({ key, index, parent, style }) => {
                                const item = inputItems[index]
                                const isHoverItem = combobox.highlightedIndex === index
                                const beSelectedItem = item[uniqueKey] === combobox.selectedItem?.[uniqueKey]
                                return (
                                    <CellMeasurer cache={cache} key={key} parent={parent} rowIndex={index}>
                                        <ListItem
                                            key={`${item[uniqueKey]}${index}`}
                                            selected={isHoverItem}
                                            // className={clsx({
                                            //     [classes.hoverItem]: isHoverItem,
                                            //     [classes.selectedItem]: beSelectedItem && !isHoverItem,
                                            // })}
                                            {...combobox.getItemProps({ index })}
                                            onClick={event => {
                                                combobox.closeMenu()
                                                combobox.selectItem(item)
                                            }}
                                            {...{ style }}
                                            ref={() => {}} //กัน error
                                        >
                                            <ListItemText
                                                primary={createTextFromItem(item, searchKeys)}
                                                classes={{
                                                    primary: clsx({
                                                        [classes.selectedItemText]: beSelectedItem,
                                                    }),
                                                }}
                                            />
                                        </ListItem>
                                    </CellMeasurer>
                                )
                            }}
                        />
                    </div>
                </Paper>
            </Popover>
        </div>
    )
}

const MyCombobox = ({ name, validate, items = [], uniqueKey = 'value', searchKeys = ['name'], ...other }) => {
    const myCombobox = useMyCombobox({ name, validate, items, uniqueKey, searchKeys })
    return <MyComboboxView {...myCombobox} {...{ uniqueKey, searchKeys }} {...other} />
}

export default MyCombobox
