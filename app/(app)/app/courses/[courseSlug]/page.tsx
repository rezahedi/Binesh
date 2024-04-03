const fakeCourseData = {
  name: "Programming with Python",
  description: "Learn the basics of programming with Python",
  img: "https://ds055uzetaobb.cloudfront.net/category-images/Home_LLP_Illustrations_CS_2x-G6468Y.png",
  lessons: 23,
  slug: "programming-with-python",
  category: "CS & Programming",
  level: "2",
  progress: 15
}
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

export default function page(
  { params }:
  { params: { courseSlug: string } }
) {
  return (
    <div className="container flex gap-10 flex-col md:flex-row">
      <div className="flex-1">
        <div className="sticky top-10">

          <a href="./" className="inline-block py-4">&lt;- Courses</a>

          <div className="md:mt-10 md:p-8 md:border border-gray-200 rounded-lg">
            <img
              src={fakeCourseData.img} alt={fakeCourseData.name}
              width={96} height={96} loading="lazy"
              className="float-right md:float-none"
            />
            <h1 className="md:my-6 text-2xl md:text-4xl font-bold text-balance">
              Course: {fakeCourseData.name}
            </h1>
            <p className="my-3 md:my-6 text-gray-700 text-balance">
              {fakeCourseData.description}
            </p>
            <b>{fakeCourseData.lessons} Lessons</b>
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
