import React, { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"

import { IoMdAdd } from "react-icons/io"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react"

import NoteItem from "../noteItem"
import { useCreateNoteMutation } from "../../app/services/noteApi"

export type TypeListNote = {
  title: string
  noteItems: { isChecked: boolean; text: string }[]
}
type Props = {
  isOpen: boolean
  onOpenChange: () => void
}

const CreateListNote: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const [error, setError] = useState("")
  const [createNote, { isLoading }] = useCreateNoteMutation()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeListNote>({
    mode: "onBlur",
    defaultValues: {
      noteItems: [{ isChecked: false, text: "" }],
    },
  })
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "noteItems",
  })
  const onSubmitHandler = async (data: TypeListNote) => {
    const noEmpty = data.noteItems.some(item => item.text.length > 0)
    if (!noEmpty) {
      setError("Заполните хотя бы 1 поле")
      return
    }
    try {
      await createNote({
        title: data.title,
        content: data.noteItems,
        type: "list",
      }).unwrap()
      onOpenChange()
      reset()
      setError("")
    } catch (error) {
      console.log(error)
    }
  }

  const preventDefault = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") e.preventDefault()
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
            action=""
            onSubmit={handleSubmit(onSubmitHandler)}
            className="flex flex-col gap-y-2.5 items-center"
          >
            <Input
              placeholder="Заголовок"
              {...register("title")}
              type="text"
              onKeyDown={e => preventDefault(e)}
            />
            <div className="flex flex-col gap-y-2.5 w-full">
              {fields.map((item, index) => {
                return (
                  <NoteItem
                    register={register}
                    index={index}
                    remove={remove}
                    key={item.id}
                    insert={insert}
                    control={control}
                  />
                )
              })}
            </div>
            <Button
              className="self-start"
              isIconOnly
              children={<IoMdAdd size={15} />}
              size="sm"
              variant="light"
              onClick={() => append({ isChecked: false, text: "" })}
              type="button"
            />
            <p className="text-red-600">{error}</p>
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

export default CreateListNote
