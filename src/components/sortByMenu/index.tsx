import { RiSortAsc, RiSortDesc } from "react-icons/ri"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  SortByParams,
  selectSortByParams,
  setSortByParams,
} from "../../features/note/noteSlice"

const sortByNames = {
  title: "по заголовку",
  createdAt: "по дате",
  order: "Пользовательская",
}

const SortByMenu = () => {
  const { sortBy, order } = useAppSelector(selectSortByParams)
  const dispatch = useAppDispatch()
  const onChangeSort = (params: SortByParams) => {
    dispatch(setSortByParams(params))
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="light"
          endContent={order === "asc" ? <RiSortAsc /> : <RiSortDesc />}
          className="text-primary"
        >
          <p className="max-sm:hidden">Сортировка</p>
          <span>{sortByNames[sortBy]}</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          endContent={<RiSortAsc />}
          onPress={() => onChangeSort({ sortBy: "createdAt", order: "asc" })}
        >
          По дате создания
        </DropdownItem>
        <DropdownItem
          endContent={<RiSortDesc />}
          onPress={() => onChangeSort({ sortBy: "createdAt", order: "desc" })}
        >
          По дате создания
        </DropdownItem>
        <DropdownItem
          endContent={<RiSortAsc />}
          onPress={() => onChangeSort({ sortBy: "title", order: "asc" })}
        >
          По заголовку
        </DropdownItem>
        <DropdownItem
          endContent={<RiSortDesc />}
          onPress={() => onChangeSort({ sortBy: "title", order: "desc" })}
        >
          По заголовку
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default SortByMenu
