import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { Button, Input } from "@nextui-org/react"
import { MdOutlineEmail } from "react-icons/md"
import { IoKeyOutline } from "react-icons/io5"

import { useLoginMutation } from "../../app/services/userApi"
import { hasErrorField } from "../../app/utils/has-error-field"

type Props = {
  toggleLoginOrRegister: () => void
}

type LoginForm = {
  email: string
  password: string
}

const LoginFrom: React.FC<Props> = ({ toggleLoginOrRegister }) => {
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmitHandler = async (data: LoginForm) => {
    try {
      await login(data).unwrap()
      navigate("/")
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
      console.log(error)
    }
  }
  return (
    <form
      className="flex flex-col items-center w-96 max-sm:w-[90%] gap-5 mt-10"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <p className="text-6xl font-bold">Вход</p>
      <Input
        {...register("email", { required: "Введите email" })}
        placeholder="Введите email"
        variant="flat"
        type="email"
        size="lg"
        errorMessage={errors.email?.message}
        isInvalid={Boolean(errors.email)}
        label="email"
        endContent={<MdOutlineEmail size={25} />}
      />
      <Input
        {...register("password", { required: "Введите пароль" })}
        placeholder="Введите password"
        variant="flat"
        type="password"
        size="lg"
        errorMessage={errors.password?.message}
        isInvalid={Boolean(errors.password)}
        label="password"
        endContent={<IoKeyOutline size={25} />}
      />
      {error && <p className="text-danger">{error}</p>}
      <div className="flex justify-between w-full">
        <Button
          onClick={toggleLoginOrRegister}
          color="default"
          type="button"
          variant="ghost"
          className="max-sm:text-xs"
        >
          Создать аккаунт
        </Button>
        <Button isLoading={isLoading} color="primary" type="submit">
          Войти
        </Button>
      </div>
    </form>
  )
}

export default LoginFrom
