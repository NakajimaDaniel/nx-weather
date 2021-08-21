
// import styles from './styles.module.scss'
// import cityDataList from '../../../city.list.json';
// import { useCombobox } from 'downshift'
// import {useVirtual} from 'react-virtual'

// import { useCallback, useRef, useState } from 'react'
// import { useRouter } from 'next/dist/client/router';


// const data = cityDataList;

// const cityList = data.map(val=>{return val.name})







// export function SearchBar() {

//     const router = useRouter();
//     const [inputValue, setInputValue] = useState('');
//     const items = getItems(inputValue);
//     const listRef = useRef();
//     const rowVirtualizer = useVirtual({
//       size: 5,
//       parentRef: listRef,
//       estimateSize: useCallback(() => 5, []),
//       overscan: 1,
//     })
//     const {
//       getInputProps,
//       getItemProps,
//       getLabelProps,
//       getMenuProps,
//       highlightedIndex,
//       selectedItem,
//       getComboboxProps,
//       isOpen,
//     } = useCombobox({
//       items,
//       inputValue,
//       onInputValueChange: ({ inputValue: newValue }) =>
//         setInputValue(newValue),
//       scrollIntoView: () => {},
//       onHighlightedIndexChange: ({ highlightedIndex }) =>
//         rowVirtualizer.scrollToIndex(highlightedIndex),
//     })

//     const handleInput = (e) => {

//       if(e.key === 'Enter') {

//         const datafilter = data.filter((val)=> { return val.name == inputValue})

//         if(datafilter.length !== 0) {
//           router.push(`city/${datafilter[0].id}`)
//         }

        
//       }
//     }

//     function getItems(search) {
//       return cityList.filter(n => n.toLowerCase().includes(search))
//     }

    


//     return (
//       <div className={styles.searchContainer}>

//         <div {...getComboboxProps()}>
//           <input {...getInputProps({ type: 'text' })}  onKeyPress={handleInput} placeholder="Search ..." />
//         </div>

//         <ul
//           {...getMenuProps({
//             ref: listRef,
//           })}
//         >
//           {isOpen && (
//             <>
//               <li
//                 key="total-size"
//                 // style={{ height: rowVirtualizer.totalSize }}
//               />
//               {rowVirtualizer.virtualItems.map(virtualRow => (
//                 <li
                  
//                   // key={items[virtualRow.index].id}
//                   {...getItemProps({
//                     index: virtualRow.index,
//                     item: items[virtualRow.index],
//                     // style: {
//                     //   backgroundColor:
//                     //     highlightedIndex === virtualRow.index
//                     //       ? 'lightgray'
//                     //       : 'inherit',
//                     //   fontWeight:
//                     //     selectedItem &&
//                     //     selectedItem.id === items[virtualRow.index].id
//                     //       ? 'bold'
//                     //       : 'normal',
//                     //   position: 'absolute',
//                     //   top: 0,
//                     //   left: 0,
//                     //   width: '100%',
//                     //   height: virtualRow.size,
//                     //   transform: `translateY(${virtualRow.start}px)`,
//                     // },
//                   })}
//                 >
//                   {items[virtualRow.index]}
//                 </li>
//               ))}
//             </>
//           )}
//         </ul>
//       </div>



//     )
//   }
 


// import { autocomplete } from '@algolia/autocomplete-js';
// import React, { createElement, Fragment, useEffect, useRef } from 'react';
// import { render } from 'react-dom';

// export function SearchBar(props) {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (!containerRef.current) {
//       return undefined;
//     }

//     const search = autocomplete({
//       container: containerRef.current,
//       classNames: {},
//       renderer: { createElement, Fragment },
//       render({ children }, root) {
//         render(children, root);
//       },
//       detachedMediaQuery: '',

//       ...props,
//     });

//     return () => {
//       search.destroy();
//     };
//   }, [props]);

//   return <div ref={containerRef} />;
// }





import algoliasearch from 'algoliasearch/lite';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/dist/client/router';


// ...
const searchClient = algoliasearch(
  '602BIBAIH0',
  '47f26875cbaa4eaaef4a0f989fbc93ef'
);

export function SearchBar() {
  // (1) Create a React state.
  const [autocompleteState, setAutocompleteState] = useState({});
  const [itemSelected, setItemSelected] = useState('');

  const router = useRouter();

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        onStateChange({ state }) {
          // (2) Synchronize the Autocomplete state with the React state.
          setAutocompleteState(state);
        },
        getSources() {
          return [
            // (3) Use an Algolia index source.
            {
              sourceId: 'name',
              getItemInputValue({ item }) {
                return item.query;
              },
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: 'city_list',
                      query,
                      params: {
                        hitsPerPage: 4,
                        highlightPreTag: '<mark>',
                        highlightPostTag: '</mark>',
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return item.url;
              },
              onSelect:(item)=>{router.push(`./${item.item.id}`)},
            },
          ];
        },
      }),
    []
  );

  // ...

  console.log(itemSelected)
  return (
    <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
      <input className="aa-Input" {...autocomplete.getInputProps({})} placeholder="Search ..." />
      <div className="aa-Panel" {...autocomplete.getPanelProps({})}>
        {autocompleteState.isOpen &&
          autocompleteState.collections.map((collection, index) => {
            const { source, items } = collection;

            return (
              <div key={`source-${index}`} className="aa-Source">
                {items.length > 0 && (
                  <ul className="aa-List" {...autocomplete.getListProps()}>
                    {items.map((item) => (
                      <li
                        key={item.objectID}
                        className="aa-Item"
                        {...autocomplete.getItemProps({
                          item,
                          source,
                        })}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );

}
