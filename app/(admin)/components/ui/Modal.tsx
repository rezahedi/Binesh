import { Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@admin/components/ui/dialog"

export default function Modal({
  setShowModal,
  className,
  children,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>,
  className?: string,
  children: React.ReactNode
}) {
  return (
    <Dialog open onOpenChange={setShowModal}>
      <DialogContent className={className}>
        {children}
      </DialogContent>
    </Dialog>
  )
}
