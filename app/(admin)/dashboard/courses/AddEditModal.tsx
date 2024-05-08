import { Dispatch, SetStateAction } from 'react'
import Modal from '@admin/components/ui/Modal'
import { Label } from "@admin/components/ui/label"
import { Input } from "@admin/components/ui/input"
import { Textarea } from "@admin/components/ui/textarea"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@admin/components/ui/select"
import { Button } from "@admin/components/ui/button"

export default function AddEditModal({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Modal setShowModal={setShowModal}>
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Add New Course</h1>
          <p className="text-gray-500 dark:text-gray-400">Fill out the form to create a new course.</p>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter course name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" placeholder="Enter course slug" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter course description" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input id="image" required type="file" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="Enter course category" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" type="submit">
            Create Course
          </Button>
        </form>
      </div>
    </Modal>
  )
}
