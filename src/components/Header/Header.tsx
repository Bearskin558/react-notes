import { useState } from "react"

import { ModeNightOutlined, WbSunnyOutlined } from "@mui/icons-material"
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/react"
import { useTheme } from "next-themes"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import ProfileMenu from "../ProfileMenu"
import { selectTheme, toggleTheme } from "../../features/theme/themeSlice"
import { selectIsAuthentificated } from "../../features/user/userSlice"
import Search from "../Search"
import NavbarLinks from "../NavbarLinks"
import NavbarBurger from "../NavbarBurger"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme: t, setTheme } = useTheme()
  const dispatch = useAppDispatch()
  const theme = useAppSelector(selectTheme)
  const onClickToggleTheme = () => {
    dispatch(toggleTheme())

    if (t === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }
  const isAuthentificated = useAppSelector(selectIsAuthentificated)

  return (
    <Navbar
      className="bg-background py-6 border-b-1 border-gray-800 border-solid justify-between"
      maxWidth="full"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:text-primary",
          "justify-between",
        ],
        wrapper: ["px-0", "justify-between", "gap-0", "w-full"],
        menuItem: ["data-[active=true]:text-primary"],
        content: ["grow-0", "data-[justify=start]:grow-0"],
      }}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {isAuthentificated && (
        <NavbarContent className="lg:hidden grow-0">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="mr-4"
          />
        </NavbarContent>
      )}
      <NavbarContent className="gap-8">
        <NavbarBrand>
          <p className="text-4xl md:mr-4 sm:mr-2 max-sm:text-2xl">
            React Notes
          </p>
          {isAuthentificated && <NavbarLinks />}
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-2">
        {isAuthentificated && (
          <NavbarItem className="max-sm:hidden max-md:w-40 lg:w-60">
            <Search />
          </NavbarItem>
        )}
        <NavbarItem>
          <Button onClick={onClickToggleTheme} isIconOnly variant="bordered">
            {theme === "dark" ? <ModeNightOutlined /> : <WbSunnyOutlined />}
          </Button>
        </NavbarItem>
        {isAuthentificated && (
          <NavbarItem>
            <ProfileMenu />
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarBurger setIsMenuOpen={setIsMenuOpen} />
    </Navbar>
  )
}

export default Header
