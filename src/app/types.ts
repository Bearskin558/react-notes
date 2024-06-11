export type User = {
  email: string
  id: string
}

export type Note = {
  id: string
  title: string
  type: "text" | "list"
  content: string | TypeNoteItem[]
  createdAt: Date
  editedAt: Date
  userId: string
  isPinned: boolean
  isDeleted: boolean
  order: number
}

export type ResponseNote = Omit<Note, "content"> & { content: string }

export type PropsToCreateNote = {
  title: string
  type: "text" | "list"
  content: string | TypeNoteItem[]
}
export type PropsToEditNote = {
  id: string
  title?: string
  content?: string | TypeNoteItem[]
  isDeleted?: boolean
  order?: number
}
export type TypeNoteItem = {
  isChecked: boolean
  text: string
}
