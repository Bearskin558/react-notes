import React, { useMemo, useState } from "react"
import {
  Control,
  UseFieldArrayInsert,
  UseFieldArrayRemove,
  UseFormRegister,
  useController,
} from "react-hook-form"

import { MdClear } from "react-icons/md"
import { Button, Checkbox, Textarea } from "@nextui-org/react"

import { TypeListNote } from "../CreateListNote"

type Props = {
  register: UseFormRegister<TypeListNote>
  remove: UseFieldArrayRemove
  index: number
  insert: UseFieldArrayInsert<TypeListNote, "noteItems">
  debounceOnSubmit?: () => Promise<void>
  control: Control<TypeListNote, any>
  required?: string
}

const NoteItem: React.FC<Props> = ({
  register,
  remove,
  index,
  insert,
  debounceOnSubmit,
  control,
  required,
}) => {
  const onKeyUpEnterHandler = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()
      insert(index + 1, { isChecked: false, text: "" })
    }
  }
  const { field } = useController({ name: "noteItems", control })
  const [buttonDisplay, setButtonDisplay] = useState<"visible" | "invisible">(
    "invisible",
  )
  const onClickDelete = () => {
    remove(index)
    if (debounceOnSubmit && field.value[index].text.length > 0) {
      debounceOnSubmit()
    }
  }
  return (
    <div
      className="flex gap-x-2.5 justify-between pl-1.5 items-center"
      onMouseOver={() => setButtonDisplay("visible")}
      onMouseOut={() => setButtonDisplay("invisible")}
    >
      <Checkbox
        {...register(`noteItems.${index}.isChecked` as const, {
          onChange: debounceOnSubmit,
        })}
      />
      <Textarea
        {...register(`noteItems.${index}.text` as const, {
          onChange: debounceOnSubmit,
          required,
        })}
        onKeyDown={e => onKeyUpEnterHandler(e)}
        variant="underlined"
        color="primary"
        onFocus={() => setButtonDisplay("visible")}
        onBlur={() => setButtonDisplay("invisible")}
        minRows={1}
      />
      <Button
        children={<MdClear />}
        onPress={onClickDelete}
        isIconOnly
        variant="light"
        color="danger"
        size="sm"
        className={buttonDisplay}
      />
    </div>
  )
}

export default NoteItem
