import { CourseProps } from '@/lib/types'
import Link from 'next/link'

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
      {courses.map((course) => (
        <div key={course.id}><Link href={`./courses/${course.slug}`}>{course.name}</Link></div>
      ))}
    </div>
  )
}