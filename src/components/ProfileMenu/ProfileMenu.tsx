import React from "react"

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { FaRegCircleUser } from "react-icons/fa6"

import { useAppDispatch } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import { logout } from "../../features/user/userSlice"
import { clearState } from "../../features/note/noteSlice"

const ProfileMenu: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onClickLogout = () => {
    dispatch(logout())
    dispatch(clearState())
    navigate("/auth")
  }
  return (
    <Dropdown radius="sm" className="">
      <DropdownTrigger>
        <Button
          children={<FaRegCircleUser size={25} />}
          isIconOnly
          variant="bordered"
        />
      </DropdownTrigger>

      <DropdownMenu variant="flat">
        <DropdownItem
          key="logout"
          onPress={onClickLogout}
          color="danger"
          variant="light"
        >
          Выйти
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default ProfileMenu
