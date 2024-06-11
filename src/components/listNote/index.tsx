import React, { memo, useCallback, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { debounce } from "lodash"

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react"
import { IoMdAdd } from "react-icons/io"

import { TypeListNote } from "../createListNote"
import { Note, TypeNoteItem } from "../../app/types"
import NoteItem from "../noteItem"
import { useAppDispatch } from "../../app/hooks"
import { editNote } from "../../features/note/noteSlice"
import { useEditNoteMutation } from "../../app/services/noteApi"
import NoteButtonContainer from "../noteButtonContainer"

type Props = {
  note: Note
}

const MemoListNote = memo<Props>(({ note }) => {
  const [buttonVisibility, setButtonVisibility] = useState<
    "invisible" | "visible"
  >("invisible")
  const dispatch = useAppDispatch()
  const noteItems: TypeNoteItem[] = []
  const [fetchEditNote, { isSuccess }] = useEditNoteMutation()
  if (Array.isArray(note.content)) {
    noteItems.push(...note.content)
  }

  const { register, control, handleSubmit, reset } = useForm<TypeListNote>({
    defaultValues: {
      title: note.title,
      noteItems,
    },
  })

  const { fields, remove, insert, append } = useFieldArray({
    control,
    name: "noteItems",
  })

  const onSumbitHandler = async (data: TypeListNote) => {
    dispatch(
      editNote({
        note,
        newData: { title: data.title, content: data.noteItems },
      }),
      await fetchEditNote({
        ...note,
        id: note.id,
        content: data.noteItems,
        title: data.title,
      }).unwrap(),
    )
  }
  const debounceOnSumbitHandler = useCallback(
    debounce(onSumbitHandler, 1000),
    [],
  )

  const customHandleSubmit = handleSubmit(data => debounceOnSumbitHandler(data))

  return (
    <Card
      className=""
      classNames={{
        header: ["pb-0"],
        body: ["pt-0"],
      }}
      as={"form"}
      onMouseOver={() => setButtonVisibility("visible")}
      onMouseOut={() => setButtonVisibility("invisible")}
      onFocus={() => setButtonVisibility("visible")}
      onBlur={() => setButtonVisibility("invisible")}
    >
      <CardHeader>
        <Input
          {...register("title", { onChange: customHandleSubmit })}
          variant="underlined"
          placeholder="Заголовок"
        />
      </CardHeader>
      <CardBody className="mb-8 z-20">
        {fields.map((item, index) => {
          return (
            <NoteItem
              register={register}
              index={index}
              remove={remove}
              key={item.id}
              insert={insert}
              debounceOnSubmit={customHandleSubmit}
              control={control}
            />
          )
        })}
        <Button
          className="mt-1"
          isIconOnly
          children={<IoMdAdd size={15} />}
          size="sm"
          variant="light"
          onClick={() => append({ isChecked: false, text: "" })}
          type="button"
        />
      </CardBody>

      <NoteButtonContainer note={note} visibility={buttonVisibility} />
    </Card>
  )
})

export default MemoListNote
