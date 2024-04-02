import React from 'react'

export default function page(
  { params }:
  { params: { courseSlug: string } }
) {
  return (
    <div>
      <h1>Course: {params.courseSlug}</h1>
      <b>Lessons or Course Path:</b>
      <div><a href={`./${params.courseSlug}/introduction`}>Introduction</a></div>
      <div><a href={`./${params.courseSlug}/first`}>First Lesson</a></div>
      <div><a href={`./${params.courseSlug}/second`}>Second Lesson</a></div>
      <div><a href={`./${params.courseSlug}/last`}>Last Lesson</a></div>
    </div>
  )
}
