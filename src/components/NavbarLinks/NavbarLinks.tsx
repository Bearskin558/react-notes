import React from "react"

import { Link, useLocation } from "react-router-dom"
import { Link as LinkNext, NavbarContent, NavbarItem } from "@nextui-org/react"

const NavbarLinks = () => {
  const isTrashPage = useLocation().pathname === "/trash"
  return (
    <div className="gap-8 grow-1 flex">
      <NavbarItem isActive={!isTrashPage} className="hidden lg:flex">
        <LinkNext as={Link} to={"/"} className="text-xl">
          Заметки
        </LinkNext>
      </NavbarItem>

      <NavbarItem isActive={isTrashPage} className="hidden lg:flex">
        <LinkNext as={Link} to={"/trash"} className="text-xl">
          Корзина
        </LinkNext>
      </NavbarItem>
    </div>
  )
}

export default NavbarLinks
