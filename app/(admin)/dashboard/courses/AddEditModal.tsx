import { Dispatch, SetStateAction } from 'react'
import Modal from '@admin/components/ui/Modal'
import { Label } from "@admin/components/ui/label"
import { Input } from "@admin/components/ui/input"
import { Textarea } from "@admin/components/ui/textarea"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@admin/components/ui/select"
import { Button } from "@admin/components/ui/button"
import { ImageIcon } from "lucide-react"

export default function AddEditModal({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>
}) {

  // Get form data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
  }

  // Create slug
  const createSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value.toLowerCase().replace(/\s/g, "-")
    const slugInput = document.getElementById("slug") as HTMLInputElement
    slugInput.value = slug
  }

  return (
    <Modal setShowModal={setShowModal}>
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Add New Course</h1>
          <p className="text-gray-500 dark:text-gray-400">Fill out the form to create a new course.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter course name" onChange={createSlug} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" placeholder="Enter course slug" />
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
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="Enter course category" required />
              </div>
            </div>
            <div className='space-y-2'>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input id="image" required type="file" />
              </div>
              <div className="space-y-2 flex flex-col items-center justify-center aspect-square border border-gray-200 rounded-lg">
                <ImageIcon className="w-10 h-10 text-gray-400" />
                <p className="text-gray-400 text-sm">Image will appear here.</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter course description" required />
          </div>
          <Button className="w-full" type="submit">
            Create Course
          </Button>
        </form>
      </div>
    </Modal>
  )
}
