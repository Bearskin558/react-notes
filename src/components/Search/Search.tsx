import React, { useCallback, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { setSearch } from "../../features/note/noteSlice"
import { debounce } from "lodash"
import { Input } from "@nextui-org/react"

const Search = () => {
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState("")
  const setSearchDebounce = useCallback(
    debounce(value => dispatch(setSearch(value)), 500),
    [],
  )
  const onChangeHandler = (text: string) => {
    setInputValue(text)
    setSearchDebounce(text.toLocaleLowerCase())
  }

  return (
    <Input
      size="md"
      isClearable
      placeholder="поиск..."
      onChange={e => onChangeHandler(e.target.value)}
      onClear={() => onChangeHandler("")}
      value={inputValue}
      variant="flat"
    />
  )
}

export default Search
