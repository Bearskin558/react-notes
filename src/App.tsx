import { RouterProvider, createBrowserRouter } from "react-router-dom"

import Layout from "./components/Layout"
import Auth from "./pages/Auth"
import Notes from "./pages/Notes"
import Trash from "./pages/Trash"

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
