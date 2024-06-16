import React from "react"

import { Checkbox } from "@nextui-org/react"

type Props = {
  isChecked: boolean
  text: string
}

const NoteListItem: React.FC<Props> = ({ isChecked, text }) => {
  return (
    <div className="flex items-center gap-x-2">
      <Checkbox defaultSelected={isChecked} disabled />
      <p className={isChecked ? "opacity-50 line-through" : "opacity-100"}>
        {text}
      </p>
    </div>
  )
}

export default NoteListItem
