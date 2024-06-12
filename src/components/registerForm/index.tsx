import React, { useState } from "react"
import { useForm } from "react-hook-form"

import { Button, Input } from "@nextui-org/react"
import { MdOutlineEmail } from "react-icons/md"
import { IoKeyOutline } from "react-icons/io5"
import { FaRegUser } from "react-icons/fa6"

import { useRegisterMutation } from "../../app/services/userApi"
import { hasErrorField } from "../../app/utils/has-error-field"

type Props = {
  toggleLoginOrRegister: () => void
}

type RegisterForm = {
  email: string
  name: string
  password: string
}

const RegisterForm: React.FC<Props> = ({ toggleLoginOrRegister }) => {
  const [error, setError] = useState("")
  const [registerUser, { isLoading, isSuccess }] = useRegisterMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  })
  const registerHandler = async (data: RegisterForm) => {
    setError("")
    try {
      await registerUser(data).unwrap()
    } catch (error) {
      if (hasErrorField(error)) setError(error.data.error)
    }
  }
  return (
    <form
      className="flex flex-col items-center w-96 max-sm:w-[90%] gap-5 mt-10"
      onSubmit={handleSubmit(registerHandler)}
    >
      <p className="text-6xl max-sm:text-5xl font-bold">Регистрация</p>
      <Input
        {...register("email", { required: "Введите email" })}
        placeholder="email"
        variant="flat"
        type="email"
        size="lg"
        errorMessage={errors.email?.message}
        isInvalid={Boolean(errors.email)}
        endContent={<MdOutlineEmail size={25} />}
        label="email"
      />
      <Input
        {...register("name", { required: "Введите имя" })}
        placeholder="name"
        variant="flat"
        type="text"
        size="lg"
        errorMessage={errors.name?.message}
        isInvalid={Boolean(errors.name)}
        endContent={<FaRegUser size={25} />}
        label="name"
      />

      <Input
        {...register("password", { required: "Введите пароль" })}
        placeholder="password"
        variant="flat"
        type="password"
        size="lg"
        errorMessage={errors.password?.message}
        isInvalid={Boolean(errors.password)}
        endContent={<IoKeyOutline size={25} />}
        label="password"
      />
      {error && <p className="text-danger">{error}</p>}
      {isSuccess && (
        <p className="text-success">Вы успешно зарегистрировались</p>
      )}
      <div className="flex justify-between w-full">
        <Button
          onClick={toggleLoginOrRegister}
          color="default"
          type="button"
          variant="ghost"
          className="max-sm:text-xs"
        >
          Уже есть аккаунт?
        </Button>
        <Button
          isLoading={isLoading}
          color="primary"
          type="submit"
          className="max-w-44"
        >
          Зарегистрироваться
        </Button>
      </div>
    </form>
  )
}

export default RegisterForm
