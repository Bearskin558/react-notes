import React from "react"

import { TiPinOutline } from "react-icons/ti"
import { RiUnpinLine } from "react-icons/ri"
import { MdOutlineDeleteOutline } from "react-icons/md"
import { LiaTrashRestoreAltSolid } from "react-icons/lia"

import { Note } from "../../app/types"
import NoteButton from "../noteButton"

type Props = {
  note: Note
  visibility: string
}

const NoteButtonContainer: React.FC<Props> = ({ note, visibility }) => {
  const isPinned = note.isPinned
  const isDeleted = note.isDeleted
  const opacity = visibility === "invisible" ? 0 : 100
  return (
    <div
      className={`flex flex-col absolute right-0 h-full justify-between items-end p-1 ${visibility} opacity-${opacity} transition`}
    >
      {!isDeleted && !isPinned && (
        <NoteButton
          type="pin"
          icon={<TiPinOutline size={18} />}
          label="Закрепить"
          note={note}
        />
      )}
      {!isDeleted && isPinned && (
        <NoteButton
          type="unpin"
          icon={<RiUnpinLine size={18} />}
          label="Открепить"
          note={note}
        />
      )}
      {isDeleted && (
        <NoteButton
          type="restore"
          icon={<LiaTrashRestoreAltSolid size={18} />}
          label="Восстановить"
          note={note}
        />
      )}
      {isDeleted && (
        <NoteButton
          type="delete"
          icon={<MdOutlineDeleteOutline size={18} />}
          label="Удалить навсегда"
          note={note}
        />
      )}
      {!isDeleted && (
        <NoteButton
          type="trash"
          icon={<MdOutlineDeleteOutline size={18} />}
          label="Удалить"
          note={note}
        />
      )}
    </div>
  )
}

export default NoteButtonContainer
