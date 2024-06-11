import React, { memo, useState } from "react"

import { Note } from "../../app/types"
import TextNote from "../textNote"
import ListNote from "../listNote"

type Props = {
  notes: Note[]
  title: string
}

const ContainerForNotes: React.FC<Props> = ({ notes, title }) => {
  return (
    <div className="mb-8">
      <p className="text-xl mb-4">{title}</p>
      <div className="grid grid-cols-[repeat(auto-fit,_250px)] gap-8 max-sm:justify-center">
        {notes.map(note => {
          if (note.type === "list") {
            return <ListNote note={note} key={note.id} />
          }
          return <TextNote note={note} key={note.id} />
        })}
      </div>
    </div>
  )
}

export default ContainerForNotes
