import React, { useState } from "react"

import { Button, Tooltip } from "@nextui-org/react"

type Props = {
  icon: JSX.Element
  onClickHandle: () => void
  label: string
  top?: string
  bottom?: string
}

const NoteAction: React.FC<Props> = ({
  icon,
  onClickHandle,
  label,
  top,
  bottom,
}) => {
  const classes = top ? `top-${top}` : `bottom-${bottom}`
  return (
    <Tooltip placement="right" key={label} content={label}>
      <Button
        isIconOnly
        children={icon}
        variant="solid"
        color="primary"
        onClick={onClickHandle}
        className={`absolute right-0 ${classes}`}
      />
    </Tooltip>
  )
}

export default NoteAction
