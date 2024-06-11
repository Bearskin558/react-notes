import React from "react"

import { useCurrentQuery } from "../../app/services/userApi"

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <p>Загрузка...</p>
  }
  return children
}

export default AuthGuard
