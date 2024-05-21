import { CourseProps } from '@/lib/types'
import { notFound } from 'next/navigation'

const fakeLessonsData = [
  {
    name: "Generalize",
    slug: "introduction",
    description: "Algebra was never meant to be memorized. Learn a new way to see.",
    progress: 100
  },
  {
    name: "Rewrite, Rethink, Redraw",
    slug: "fractions",
    description: "Explore fractal patterns and compound interest in the mathematics of fractions.",
    progress: 0
  },
  {
    name: "Thinking Forwards and Backwards",
    slug: "toggle-tag-mechanic-3",
    description: "To solve new problems, you need to be able to think in several directions.",
    progress: -1
  }
]

export default async function page(
  { params }:
  { params: { courseSlug: string } }
) {
  
  // fetch courses from /api/admin/courses
  let course: CourseProps = {} as CourseProps
  await fetch('http://localhost:3000/api/admin/courses/' + params.courseSlug, { method: 'GET' })
    .then(async res => {
      if(res.status === 200) {
        course = await res.json()
      }
    })

  if(!course) {
    return notFound()
  }

  return (
    <div className="container flex gap-10 flex-col md:flex-row">
      <div className="flex-1">
        <div className="sticky top-10">

          <a href="./" className="inline-block py-4">&lt;- Courses</a>

          <div className="md:mt-10 md:p-8 md:border border-gray-200 rounded-lg">
            <img
              src={course.image} alt={course.name}
              width={96} height={96} loading="lazy"
              className="float-right md:float-none"
            />
            <h1 className="md:my-6 text-2xl md:text-4xl font-bold text-balance">
              Course: {course.name}
            </h1>
            <p className="my-3 md:my-6 text-gray-700 text-balance">
              {course.description}
            </p>
            <b>{course.lessens} Lessons</b>
          </div>

        </div>
      </div>

      <div className="flex-1 py-24 h-[2000px]" style={{backgroundImage: "url('/assets/lesson-path-bg-pattern.svg')", backgroundPositionY: "0", backgroundSize: "100% auto", backgroundRepeat: "repeat"}}>
        <b>Lessons:</b>
        {fakeLessonsData.map((lesson, index) => (
          <div key={index}>
            <a href={`./${params.courseSlug}/${lesson.slug}`}>{lesson.name}</a>
          </div>
        ))}
      </div>

    </div>
  )
}
