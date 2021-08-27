
import algoliasearch from 'algoliasearch/lite';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/dist/client/router';


const searchClient = algoliasearch(
  '602BIBAIH0',
  '47f26875cbaa4eaaef4a0f989fbc93ef'
);

export function SearchBar() {

  const [autocompleteState, setAutocompleteState] = useState({});
  const [itemSelectedId, setItemSelectedId] = useState();
  const [itemSelectedName, setItemSelectedName] = useState();

  const router = useRouter();

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        getSources({ setQuery, refresh, query }) {
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
              onSelect: ({item}) => {
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
      <input className="aa-Input" {...autocomplete.getInputProps({})} placeholder="Search ..." onKeyPress={handleSearchInputKeyPress} />
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
