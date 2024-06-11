import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { noteApi } from "../../app/services/noteApi"
import { Note, TypeNoteItem } from "../../app/types"
import { RootState } from "../../app/store"

export type SortByParams = {
  sortBy: "title" | "createdAt" | "order"
  order: "desc" | "asc"
}

interface InitialState {
  unpinnedNotes: Note[]
  pinnedNotes: Note[]
  trashNotes: Note[]
  sortByParams: SortByParams
  search: string
}

const initialState: InitialState = {
  unpinnedNotes: [],
  pinnedNotes: [],
  trashNotes: [],
  sortByParams: {
    sortBy: "createdAt",
    order: "desc",
  },
  search: "",
}

export type PropsMoveToTrash = {
  id: string
  isPinned: boolean
}

type PropsToEditListNote = {
  note: Note
  newData: {
    title: string
    content: TypeNoteItem[] | string
  }
}

type StateKey = "unpinnedNotes" | "pinnedNotes" | "trashNotes"

const returnKey = (note: Note): StateKey => {
  if (note.isDeleted) return "trashNotes"
  if (note.isPinned) return "pinnedNotes"
  return "unpinnedNotes"
}

const returnStateKey = (note: Note): StateKey => {
  return !note.isDeleted
    ? note.isPinned
      ? "pinnedNotes"
      : "unpinnedNotes"
    : "trashNotes"
}

const slice = createSlice({
  name: "note",
  initialState,
  reducers: {
    clearState: () => initialState,

    setSortByParams: (state, action: PayloadAction<SortByParams>) => {
      const { sortBy, order } = action.payload
      state.sortByParams = { sortBy, order }
      state.unpinnedNotes.sort((a, b) => {
        if (order === "asc") {
          return a[sortBy].toString().localeCompare(b[sortBy].toString())
        }
        return b[sortBy].toString().localeCompare(a[sortBy].toString())
      })
      state.pinnedNotes.sort((a, b) => {
        if (order === "asc") {
          return a[sortBy].toString().localeCompare(b[sortBy].toString())
        }
        return b[sortBy].toString().localeCompare(a[sortBy].toString())
      })
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },

    editNote: (state, action: PayloadAction<PropsToEditListNote>) => {
      const { note, newData } = action.payload
      const key = returnKey(note)
      state[key] = state[key].map(item =>
        note.id === item.id
          ? { ...item, title: newData.title, content: newData.content }
          : item,
      )
    },

    deleteNote: (state, action: PayloadAction<Note>) => {
      state.trashNotes = state.trashNotes.filter(
        item => item.id !== action.payload.id,
      )
    },

    moveToTrash: (state, action: PayloadAction<Note>) => {
      const key = returnKey(action.payload)
      state[key] = state[key].filter(item => item.id !== action.payload.id)
      state.trashNotes.push({ ...action.payload, isDeleted: true })
    },

    restoreFromTrash: (state, action: PayloadAction<Note>) => {
      const key = action.payload.isPinned ? "pinnedNotes" : "unpinnedNotes"
      state[key].push({ ...action.payload, isDeleted: false })
      state.trashNotes = state.trashNotes.filter(
        item => item.id !== action.payload.id,
      )
    },

    toPinNote: (state, action: PayloadAction<Note>) => {
      state.unpinnedNotes = state.unpinnedNotes.filter(
        item => item.id !== action.payload.id,
      )
      state.pinnedNotes.push({ ...action.payload, isPinned: true })
    },

    toUnpinNote: (state, action: PayloadAction<Note>) => {
      state.pinnedNotes = state.pinnedNotes.filter(
        item => item.id !== action.payload.id,
      )
      state.unpinnedNotes.push({ ...action.payload, isPinned: false })
    },

    toClearTrashNotes: state => {
      state.trashNotes = []
    },
  },

  extraReducers: builder => {
    builder.addMatcher(
      noteApi.endpoints.createNote.matchFulfilled,
      (state, action) => {
        state.unpinnedNotes.push(action.payload)
      },
    )

    builder.addMatcher(
      noteApi.endpoints.getAllNotes.matchFulfilled,
      (state, action) => {
        state.pinnedNotes = []
        state.unpinnedNotes = []
        state.trashNotes = []
        action.payload.map(item => {
          const key = returnStateKey(item)
          return state[key].push(item)
        })
      },
    )
  },
})

export default slice.reducer
export const {
  clearState,
  setSortByParams,
  setSearch,
  editNote,
  deleteNote,
  restoreFromTrash,
  toPinNote,
  toUnpinNote,
  moveToTrash,
  toClearTrashNotes,
} = slice.actions

export const selectUnpinnedNotes = (state: RootState) =>
  state.note.unpinnedNotes
export const selectTrashNotes = (state: RootState) => state.note.trashNotes
export const selectPinnedNotes = (state: RootState) => state.note.pinnedNotes
export const selectSortByParams = (state: RootState) => state.note.sortByParams
export const selectSearch = (state: RootState) => state.note.search
