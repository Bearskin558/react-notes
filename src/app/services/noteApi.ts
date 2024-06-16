import { Note, PropsToCreateNote } from "../types"
import { api } from "./api"

export const noteApi = api.injectEndpoints({
  endpoints: builder => ({
    createNote: builder.mutation<Note, PropsToCreateNote>({
      query: userData => ({
        url: "/notes",
        method: "POST",
        body: userData,
      }),
    }),
    editNote: builder.mutation<Note, Note>({
      query: userData => ({
        url: `/notes/${userData.id}`,
        method: "PUT",
        body: userData,
      }),
    }),
    deleteNote: builder.mutation<Note, { id: string }>({
      query: userData => ({
        url: `/notes/${userData.id}`,
        method: "DELETE",
        body: userData,
      }),
    }),
    getAllNotes: builder.query<Note[], void>({
      query: () => ({
        url: `/notes`,
        method: "GET",
      }),
    }),
    clearTrashNotes: builder.mutation<Note[], void>({
      query: () => ({
        url: "/notes",
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useCreateNoteMutation,
  useEditNoteMutation,
  useDeleteNoteMutation,
  useGetAllNotesQuery,
  useLazyGetAllNotesQuery,
  useClearTrashNotesMutation,
} = noteApi

export const {
  endpoints: { createNote, editNote, deleteNote, getAllNotes, clearTrashNotes },
} = noteApi
