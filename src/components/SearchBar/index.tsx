import { Fragment, useEffect, useState } from "react"
import { Combobox, Transition } from '@headlessui/react'
import { useRouter } from "next/router"

import MoonLoader from "react-spinners/ClipLoader";
import { Icon } from "@iconify/react";


type cityUnit = {
  country: string,
  id: number,
  name: string,
  _id: number
} 


export default function SearchBar() {

  const [searchText, setSearchText] = useState("");
  const [cityList, setCityList] = useState([]);
  const [selected, setSelected] = useState<cityUnit>();
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  async function FetchCities(value) { 
    const res = await fetch(`/api/city/${value}`)
    const data = await res.json();

    const cities = data.map(value => {
      return {
        _id: value._id,
        id: value.id,
        name: value.name,
        country: value.country
      }
    })

    setCityList(cities);
  } 
 
  function onChangeInputSearch(e) {
    const newText = e.target.value;
    setSearchText(newText);
    if (newText.charAt(0) === " " || newText.length == 0) {
      //console.log('input value is empty');
    } else {
      FetchCities(newText);
    }
  }

  function handleSearchInputKeyPress(e) {
    if(e.key === 'Enter') {
      if(selected.name == e.target.value) {
        setLoading(true);
        router.push(`/city/${selected.id}`);
        
      }
      else{
        alert('this city does not exist')
      }
      
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [router])
  

  return (
    <div className={" "}>

      <Combobox onChange={setSelected} defaultValue={selected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Icon icon="ic:round-search" className={"absolute left-2 top-2 flex items-center"} width="20px" />
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-20 ml-6 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(city: cityUnit) => city.name}
              onChange={(e) => onChangeInputSearch(e)}
              onKeyUp={(e) => handleSearchInputKeyPress(e)}
            />
            <MoonLoader
              className={"absolute right-3 top-2 flex items-center pr-2"}
              color="#7943CF"
              loading={loading}
              size={20}
            />
            
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setSearchText('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {
                cityList.length === 0 ? (
                  <div className={"py-2 px-4 text-gray-700"} >Nothing found</div>
                ) : (
                  cityList.map((city) => (
                    <Combobox.Option
                      key={city.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-custom-purple-400 text-white' : 'text-gray-900'
                        }`
                      }
                      value={city}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {city.name}, {city.country}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-custom-purple-400'
                              }`}
                            >
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )
              }
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    

    </div>
  )

}