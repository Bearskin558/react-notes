import {
  selectPinnedNotes,
  selectSearch,
  selectUnpinnedNotes,
} from "../../features/note/noteSlice"

import { useAppSelector } from "../../app/hooks"
import CreateNoteButton from "../../components/CreateNoteButton"
import ContainerForNotes from "../../components/ContainerForNotes"
import SortByMenu from "../../components/SortByMenu"
import { Note } from "../../app/types"
import Search from "../../components/Search"

const isMatch = (note: Note, str: string) => {
  if (typeof note.content === "string") {
    return (
      note.content.toLowerCase().match(str) ||
      note.title.toLowerCase().match(str)
    )
  } else {
    return note.content.some(
      item => item.text.match(str) || note.title.toLowerCase().match(str),
    )
  }
}

const Notes = () => {
  const search = useAppSelector(selectSearch)
  const unpinnedNotes: Note[] = []
  const pinnedNotes: Note[] = []
  if (search) {
    unpinnedNotes.push(
      ...useAppSelector(selectUnpinnedNotes).filter(note =>
        isMatch(note, search),
      ),
    )
    pinnedNotes.push(
      ...useAppSelector(selectPinnedNotes).filter(note =>
        isMatch(note, search),
      ),
    )
  } else {
    unpinnedNotes.push(...useAppSelector(selectUnpinnedNotes))
    pinnedNotes.push(...useAppSelector(selectPinnedNotes))
  }

  return (
    <div className="flex flex-col">
      <div className="mb-4 sm:hidden w-full self-center border-solid border-b-1 pb-6 border-slate-800">
        <Search />
      </div>
      <div className="flex justify-between content-between mb-4">
        <CreateNoteButton />
        <SortByMenu />
      </div>

      {pinnedNotes.length > 0 && (
        <ContainerForNotes notes={pinnedNotes} title="Закрепленные заметки" />
      )}
      {unpinnedNotes.length > 0 && (
        <ContainerForNotes notes={unpinnedNotes} title="Другие заметки" />
      )}
    </div>
  )
}

export default Notes
