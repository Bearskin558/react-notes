import { RouterProvider, createBrowserRouter } from "react-router-dom"

import Layout from "./components/layout"
import Auth from "./pages/auth"
import Notes from "./pages/notes"
import Trash from "./pages/trash"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/",
        element: <Notes />,
      },
      {
        path: "/trash",
        element: <Trash />,
      },
    ],
  },
])

const App = () => {
  return (
    <div className={` app `}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
