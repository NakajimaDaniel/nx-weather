import { useState } from "react"

export default function SearchBar() {

  const [searchText, setSearchText] = useState();

  function onChangeInputSearch(text) {
    const textValue = text;
    setSearchText(textValue);
    console.log(textValue)
  }

  return (
    <div>
      <input onChange={(text) => onChangeInputSearch(text.target.value)} />
    </div>
  )

}