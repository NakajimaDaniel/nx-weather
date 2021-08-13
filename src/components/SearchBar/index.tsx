
import styles from './styles.module.scss'


import { useCombobox } from 'downshift'

import { useState } from 'react'

const items = [
  'teste',

]

export function SearchBar() {


    const [inputItems, setInputItems] = useState(items)
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
    } = useCombobox({
      items: inputItems,
      onInputValueChange: ({ inputValue }) => {
        setInputItems(
          items.filter(item =>
            item.toLowerCase().startsWith(inputValue.toLowerCase()),
          ),
        )
      },
    })
    return (
      <div className={styles.searchContainer}>
        <div  {...getComboboxProps()}>
          <input {...getInputProps()} placeholder="Search ..." />
        </div>
        <ul {...getMenuProps()}>
          {isOpen &&
            inputItems.map((item, index) => (
              <li
                style={
                  highlightedIndex === index
                    ? { backgroundColor: '#bde4ff' }
                    : {}
                }
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
 