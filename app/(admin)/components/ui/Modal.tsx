import { Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
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
      <DialogOverlay className='animate-fade-in bg-white bg-opacity-50 backdrop-blur-md' />
      <DialogContent className={className}>
        {children}
      </DialogContent>
    </Dialog>
  )
}
