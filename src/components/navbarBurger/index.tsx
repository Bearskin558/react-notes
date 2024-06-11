import React from "react"
import { Link, useLocation } from "react-router-dom"

import { Link as LinkNext, NavbarContent, NavbarItem } from "@nextui-org/react"
import { NavbarMenu, NavbarMenuItem } from "@nextui-org/react"

type Props = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NavbarBurger: React.FC<Props> = ({ setIsMenuOpen }) => {
  const isTrashPage = useLocation().pathname === "/trash"
  return (
    <NavbarMenu className="z-50 w-[100%] mt-4 pt-20 gap-4">
      <NavbarMenuItem isActive={!isTrashPage}>
        <LinkNext
          as={Link}
          to={"/"}
          className="text-xl"
          color="foreground"
          onClick={() => setIsMenuOpen(false)}
        >
          Заметки
        </LinkNext>
      </NavbarMenuItem>
      <NavbarMenuItem isActive={isTrashPage}>
        <LinkNext
          as={Link}
          to={"/trash"}
          className="text-xl"
          onClick={() => setIsMenuOpen(false)}
        >
          Корзина
        </LinkNext>
      </NavbarMenuItem>
    </NavbarMenu>
  )
}

export default NavbarBurger
