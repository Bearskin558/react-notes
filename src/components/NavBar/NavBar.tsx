import React from "react"
import { Link, useLocation } from "react-router-dom"

import { Button } from "@nextui-org/react"

const NavBar: React.FC = () => {
  const path = useLocation().pathname
  return (
    <div className="flex flex-col items-center gap-8 w-48">
      <Button
        as={Link}
        to="/"
        size="lg"
        variant="solid"
        color={path === "/" ? "primary" : "default"}
        type="button"
      >
        Заметки
      </Button>

      <Button
        as={Link}
        type="button"
        to="/trash"
        size="lg"
        variant="solid"
        color={path === "/trash" ? "primary" : "default"}
      >
        Корзина
      </Button>
    </div>
  )
}

export default NavBar
