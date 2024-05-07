import { Dispatch, SetStateAction } from 'react'
import Modal from '@admin/components/ui/Modal'

export default function AddEditModal({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Modal setShowModal={setShowModal}>
      <h2>Add New Course</h2>
      <p>Form goes here</p>
    </Modal>
  )
}
