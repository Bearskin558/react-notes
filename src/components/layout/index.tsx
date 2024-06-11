import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

import Header from "../header"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectIsAuthentificated } from "../../features/user/userSlice"
import { useLazyGetAllNotesQuery } from "../../app/services/noteApi"
import { clearState } from "../../features/note/noteSlice"

const Layout = () => {
  const isAuthentificated = useAppSelector(selectIsAuthentificated)
  const navigate = useNavigate()
  const [triggerGetAllNotes] = useLazyGetAllNotesQuery()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!isAuthentificated) {
      navigate("/auth")
    } else {
      triggerGetAllNotes({ sortBy: "order", order: "asc" })
    }
    return () => {
      dispatch(clearState())
    }
  }, [isAuthentificated])
  const isAuthPage = useLocation().pathname === "/auth"
  return (
    <div className="relative w-screen h-screen flex flex-col font-mono bg-background items-center">
      <div className="w-screen mx-auto px-4 sm:px-10 flex flex-col justify-center">
        <Header />
        <main className="flex flex-row flex-auto mx-auto mt-10 w-full max-sm:mt-6">
          <div className="flex-1">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
