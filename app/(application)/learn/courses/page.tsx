import { CourseCard } from '@application/components'
import { CourseProps } from '@/lib/types'

export default async function Page() {
  
  // fetch courses from /api/admin/courses
  let courses: CourseProps[] = []
  await fetch('http://localhost:3000/api/admin/courses')
    .then(async res => {
      courses = await res.json()
    })

  return (
    <div className="container">
      <h3 className="font-semibold text-xl">Courses</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} progress={Math.random()*100} />
        ))}
      </div>
    </div>
  )
}