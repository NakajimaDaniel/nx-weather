
import algoliasearch from 'algoliasearch/lite';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Loader from "react-loader-spinner";
import Image from 'next/image'

const searchClient = algoliasearch(
  'L4998G5UXB',
  'c1271a9298769d286887fbad97fa030d'
);


type itemProps = {
  item: {
    name: string,
    id: number,

  }
}

export function SearchBar() {

  const [autocompleteState, setAutocompleteState] = useState({});
  const [itemSelectedId, setItemSelectedId] = useState<number>();
  const [itemSelectedName, setItemSelectedName] = useState<string>();

  const router = useRouter();

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },


        getSources({ setQuery, refresh, query, state }) {
          return [
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
              onSelect: (item : itemProps) => {
                setQuery(item.item.name); 
                setItemSelectedId(item.item.id);
                setItemSelectedName(item.item.name);

              },
              

            },
        
          ];
        },
        
      }),
    []
  );

  function handleSearchInputKeyPress(e) {
    if(e.key === 'Enter') {
      if(itemSelectedName == e.target.value) {
        router.push(`/city/${itemSelectedId}`);
      }
      else{
        alert('this city does not exist')
      }
    }
  }


  return (

    <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
      <div className="search-input-container">
        <input className="aa-Input" {...autocomplete.getInputProps({})} placeholder="Search ..." onKeyPress={handleSearchInputKeyPress} />
        {autocompleteState.status == 'loading' ? (
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={20}
            width={20}
          />
        ) : (
          <div className="search-icon" >
            <Image src="/assets/searchIcon.svg"  alt="search-icon" width={25} height={25} layout="fixed" /> 
          </div>
          // <img src="/assets/searchIcon.svg"  /> 
        )}
      </div>
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
                <Image src="/assets/algolia-logo.svg" width={110} height={15} /> 
              </div>
            );
          })}
      </div>
    </div>
  );

}
