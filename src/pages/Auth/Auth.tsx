import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectIsAuthentificated } from "../../features/user/userSlice"
import LoginFrom from "../../components/LoginForm"
import RegisterForm from "../../components/RegisterForm"

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
    <div className="flex flex-col items-center">
      {loginOrRegister === "login" ? (
        <LoginFrom toggleLoginOrRegister={toggleLoginOrRegister} />
      ) : (
        <RegisterForm toggleLoginOrRegister={toggleLoginOrRegister} />
      )}
    </div>
  )
}

export default Auth
