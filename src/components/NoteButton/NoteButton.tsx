import { Button, Tooltip } from "@nextui-org/react"
import React from "react"

import {
  useDeleteNoteMutation,
  useEditNoteMutation,
} from "../../app/services/noteApi"
import { Note } from "../../app/types"
import { useAppDispatch } from "../../app/hooks"
import {
  deleteNote,
  moveToTrash,
  restoreFromTrash,
  toPinNote,
  toUnpinNote,
} from "../../features/note/noteSlice"

type Props = {
  type: "delete" | "pin" | "unpin" | "restore" | "trash"
  icon: JSX.Element
  label: string
  note: Note
}

const NoteButton: React.FC<Props> = ({ type, icon, note, label }) => {
  const [fetchDeleteNote] = useDeleteNoteMutation()
  const [fetchEditNote] = useEditNoteMutation()
  const dispatch = useAppDispatch()

  const onClickHandler = async () => {
    switch (type) {
      case "delete":
        dispatch(deleteNote(note))
        await fetchDeleteNote({ id: note.id }).unwrap()
        break
      case "pin":
        dispatch(toPinNote(note))
        await fetchEditNote({ ...note, isPinned: true }).unwrap()
        break
      case "unpin":
        dispatch(toUnpinNote(note))
        await fetchEditNote({ ...note, isPinned: false }).unwrap()
        break
      case "restore":
        dispatch(restoreFromTrash(note))
        await fetchEditNote({ ...note, isDeleted: false }).unwrap()
        break
      case "trash":
        dispatch(moveToTrash(note))
        await fetchEditNote({ ...note, isDeleted: true }).unwrap()
    }
  }

  return (
    <Tooltip placement="right" key={label} content={label}>
      <Button
        className="z-10"
        isIconOnly
        children={icon}
        onClick={onClickHandler}
        variant="light"
      ></Button>
    </Tooltip>
  )
}

export default NoteButton
