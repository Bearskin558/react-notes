import { memo, useState } from "react"
import { useForm } from "react-hook-form"
import { debounce } from "lodash"

import { Card, CardBody, CardHeader, Input, Textarea } from "@nextui-org/react"

import { Note } from "../../app/types"
import { useAppDispatch } from "../../app/hooks"
import { editNote } from "../../features/note/noteSlice"
import { useEditNoteMutation } from "../../app/services/noteApi"
import NoteButtonContainer from "../NoteButtonContainer"

type Props = {
  note: Note
}

type TextNote = {
  title: string
  content: string
}

const TextNote = memo<Props>(({ note }) => {
  const [buttonVisibility, setButtonVisibility] = useState<
    "invisible" | "visible"
  >("invisible")
  const dispatch = useAppDispatch()
  const [fetchEditNote] = useEditNoteMutation()
  const { register, handleSubmit } = useForm<TextNote>({
    defaultValues: {
      title: note.title,
      content: note.content as string,
    },
  })

  const onSubmitHandler = async (data: TextNote) => {
    dispatch(editNote({ note, newData: data }))
    await fetchEditNote({ ...note, title: data.title, content: data.content })
  }
  const debounceOnSumbitHandler = debounce(onSubmitHandler, 1000)
  const customHandleSubmit = handleSubmit(data => debounceOnSumbitHandler(data))

  return (
    <Card
      as={"form"}
      onSubmit={handleSubmit(onSubmitHandler)}
      classNames={{
        header: ["pb-0"],
        body: ["pt-0"],
      }}
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
      <CardBody>
        <Textarea
          {...register("content", { onChange: customHandleSubmit })}
          variant="bordered"
          placeholder="Текст..."
        />
      </CardBody>
      <NoteButtonContainer note={note} visibility={buttonVisibility} />
    </Card>
  )
})

export default TextNote
