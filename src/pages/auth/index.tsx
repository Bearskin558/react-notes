import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectIsAuthentificated } from "../../features/user/userSlice"
import { Box } from "@mui/material"
import LoginFrom from "../../components/loginForm"
import RegisterForm from "../../components/registerForm"

type LoginOrRegister = "login" | "register"

const Auth = () => {
  const navigate = useNavigate()
  const isAuthentificated = useAppSelector(selectIsAuthentificated)
  useEffect(() => {
    if (isAuthentificated) navigate("/")
  }, [isAuthentificated])
  const [loginOrRegister, setLoginOrRegister] =
    useState<LoginOrRegister>("login")
  const toggleLoginOrRegister = () => {
    setLoginOrRegister(loginOrRegister === "login" ? "register" : "login")
  }
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {loginOrRegister === "login" ? (
        <LoginFrom toggleLoginOrRegister={toggleLoginOrRegister} />
      ) : (
        <RegisterForm toggleLoginOrRegister={toggleLoginOrRegister} />
      )}
    </Box>
  )
}

export default Auth
