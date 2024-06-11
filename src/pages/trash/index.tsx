import {
  selectTrashNotes,
  toClearTrashNotes,
} from "../../features/note/noteSlice"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import { useClearTrashNotesMutation } from "../../app/services/noteApi"
import { MdDeleteOutline } from "react-icons/md"

import ContainerForNotes from "../../components/containerForNotes"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

const Trash = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const trashNotes = useAppSelector(selectTrashNotes)
  const dispatch = useAppDispatch()
  const [fetchToClearTrashNotes] = useClearTrashNotesMutation()
  const onClickHandler = async (onClose: () => void) => {
    dispatch(toClearTrashNotes())
    onClose()
    try {
      await fetchToClearTrashNotes().unwrap
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="relative">
      {trashNotes.length > 0 && (
        <Button
          className="absolute right-0 top-[-4px]"
          color="danger"
          variant="flat"
          onPress={onOpen}
          endContent={<MdDeleteOutline />}
        >
          <span className="max-sm:hidden">Очистить корзину</span>
        </Button>
      )}

      <ContainerForNotes notes={trashNotes} title="Удаленные заметки" />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="p-4">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="self-center">
                Очистить корзину?
              </ModalHeader>
              <ModalBody className="flex flex-row justify-between">
                <Button
                  className="w-[30%]"
                  color="success"
                  onPress={() => onClickHandler(onClose)}
                >
                  Да
                </Button>
                <Button className="w-[30%]" color="danger" onPress={onClose}>
                  Нет
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Trash
