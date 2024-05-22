import { CourseProps, LessonsProps } from '@/lib/types'
import { notFound } from 'next/navigation'
import { Footprints, MapPin } from 'lucide-react'

export default async function page(
  { params }:
  { params: { courseSlug: string } }
) {
  
  // fetch courses from /api/admin/courses
  let course: CourseProps = await fetch('http://localhost:3000/api/admin/courses/' + params.courseSlug, { method: 'GET' })
    .then(async res => {
      if(res.status === 200) {
        return await res.json()
      }
    })

  if( !course || !course.id ) {
    return notFound()
  }

  // fetch lessons from /api/admin/courses/[courseSlug]/lessons
  const lessons: LessonsProps[] = await fetch('http://localhost:3000/api/admin/courses/' + params.courseSlug + '/lessons', { method: 'GET' })
    .then(async res => {
      if(res.status === 200) {
        return await res.json()
      }
    })

  if( !lessons || lessons.length === 0 ) {
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
        {lessons.map((lesson) => (
          <div key={lesson.id}>
            <button className="group rotate-45 relative inline-flex size-12 items-center justify-center overflow-hidden rounded-full border border-[#a30036] p-6 font-medium text-[#a30036] transition-all duration-100 shadow-[5px_5px_#a30036] hover:translate-y-[3px] hover:shadow-[3px_3px_#a30036] active:translate-y-[7px] active:shadow-[0px_0px_#a30036]">
              <span className='-rotate-45'>
                <Footprints />
              </span>
            </button>
            <a href={`./${params.courseSlug}/${lesson.slug}`}>{lesson.name}</a>
            <p>{lesson.description}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
