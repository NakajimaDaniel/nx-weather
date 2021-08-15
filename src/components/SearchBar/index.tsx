
import styles from './styles.module.scss'
import cityDataList from '../../../city.list.json';
import { useCombobox } from 'downshift'
import {useVirtual} from 'react-virtual'

import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/dist/client/router';



// const dataListMap = Object.fromEntries(
//   Object.entries(cityDataList)
//   .map(([ val ]) => { return [val.name]})
// );

const data = cityDataList;

const cityList = data.map(val=>{return val.name})







export function SearchBar() {

    const router = useRouter();
    const [inputValue, setInputValue] = useState('');
    const items = getItems(inputValue);
    const listRef = useRef();
    const rowVirtualizer = useVirtual({
      size: 5,
      parentRef: listRef,
      estimateSize: useCallback(() => 5, []),
      overscan: 1,
    })
    const {
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      highlightedIndex,
      selectedItem,
      getComboboxProps,
      isOpen,
    } = useCombobox({
      items,
      inputValue,
      onInputValueChange: ({ inputValue: newValue }) =>
        setInputValue(newValue),
      scrollIntoView: () => {},
      onHighlightedIndexChange: ({ highlightedIndex }) =>
        rowVirtualizer.scrollToIndex(highlightedIndex),
    })

    const handleInput = (e) => {

      if(e.key === 'Enter') {

        const datafilter = data.filter((val)=> { return val.name == inputValue})

        if(datafilter.length !== 0) {
          router.push(`city/${datafilter[0].id}`)
        }

        
      }
    }

    function getItems(search) {
      return cityList.filter(n => n.toLowerCase().includes(search))
    }

    


    return (
      <div className={styles.searchContainer}>

        <div {...getComboboxProps()}>
          <input {...getInputProps({ type: 'text' })}  onKeyPress={handleInput} placeholder="Search ..." />
        </div>

        <ul
          {...getMenuProps({
            ref: listRef,
          })}
        >
          {isOpen && (
            <>
              <li
                key="total-size"
                // style={{ height: rowVirtualizer.totalSize }}
              />
              {rowVirtualizer.virtualItems.map(virtualRow => (
                <li
                  
                  // key={items[virtualRow.index].id}
                  {...getItemProps({
                    index: virtualRow.index,
                    item: items[virtualRow.index],
                    // style: {
                    //   backgroundColor:
                    //     highlightedIndex === virtualRow.index
                    //       ? 'lightgray'
                    //       : 'inherit',
                    //   fontWeight:
                    //     selectedItem &&
                    //     selectedItem.id === items[virtualRow.index].id
                    //       ? 'bold'
                    //       : 'normal',
                    //   position: 'absolute',
                    //   top: 0,
                    //   left: 0,
                    //   width: '100%',
                    //   height: virtualRow.size,
                    //   transform: `translateY(${virtualRow.start}px)`,
                    // },
                  })}
                >
                  {items[virtualRow.index]}
                </li>
              ))}
            </>
          )}
        </ul>
      </div>



    )
  }
 
