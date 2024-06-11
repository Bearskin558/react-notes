import React, { useState } from "react"

import { useCreateNoteMutation } from "../../app/services/noteApi"
import { useForm } from "react-hook-form"
import { hasErrorField } from "../../app/utils/has-error-field"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@nextui-org/react"

type TextNote = {
  title: string
  content: string
}

type Props = {
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
}
const CreateTextNote: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const [createNote, { isLoading }] = useCreateNoteMutation()
  const [error, setError] = useState("")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TextNote>({
    defaultValues: {
      title: "",
      content: "",
    },
  })
  const onSubmitHandler = async ({ title, content }: TextNote) => {
    try {
      const markedContent = content.replace(/\n/g, "\n\n")
      await createNote({ title, content: markedContent, type: "text" }).unwrap()
      onOpenChange()
      reset()
    } catch (error) {
      if (hasErrorField(error)) setError(error.data.error)
      console.log(error)
    }
  }
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
    >
      <ModalContent>
        <ModalHeader>
          <p>Создать заметку</p>
        </ModalHeader>
        <ModalBody>
          <form
            className="flex flex-col gap-5 p-2 items-center"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <Input
              color="default"
              type="text"
              placeholder="Заголовок"
              {...register("title")}
            />
            <Textarea
              variant="faded"
              placeholder="Текст заметки"
              {...register("content", { required: "Введите текст" })}
              isInvalid={Boolean(errors.content?.message)}
              errorMessage={errors.content?.message}
              classNames={{
                errorMessage: ["text-base"],
              }}
            />
            <Button
              color="primary"
              variant="solid"
              type="submit"
              size="md"
              className="w-48"
              isLoading={isLoading}
            >
              Создать
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CreateTextNote
