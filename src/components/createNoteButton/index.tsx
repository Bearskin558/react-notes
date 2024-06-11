import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react"
import { RiText } from "react-icons/ri"
import { MdChecklist } from "react-icons/md"

import CreateTextNote from "../createTextNote"
import CreateListNote from "../createListNote"

const CreateNoteButton = () => {
  const {
    isOpen: isOpenTextModal,
    onOpen: onOpenTextModal,
    onOpenChange: onOpenChangeTextModal,
  } = useDisclosure()
  const {
    isOpen: isOpenListModal,
    onOpen: onOpenListModal,
    onOpenChange: onOpenChangeListModal,
    onClose,
  } = useDisclosure()
  return (
    <>
      {" "}
      <Dropdown>
        <DropdownTrigger className="font-bold">
          <Button>Создать заметку</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onPress={onOpenTextModal} endContent={<RiText />}>
            Текстовая заметка
          </DropdownItem>
          <DropdownItem onPress={onOpenListModal} endContent={<MdChecklist />}>
            Список
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <CreateTextNote
        onOpenChange={onOpenChangeTextModal}
        isOpen={isOpenTextModal}
        onClose={onClose}
      />
      <CreateListNote
        onOpenChange={onOpenChangeListModal}
        isOpen={isOpenListModal}
      />
    </>
  )
}

export default CreateNoteButton
