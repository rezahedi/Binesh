import { Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@admin/components/ui/dialog"

export default function Modal({
  setShowModal,
  children,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}) {
  return (
    <Dialog open onOpenChange={setShowModal}>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}
