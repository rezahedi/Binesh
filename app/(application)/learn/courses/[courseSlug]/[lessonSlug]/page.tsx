import React from 'react'

export default function page(
  { params }:
  { params: { courseSlug: string, lessonSlug: string } }
) {
  console.log(params)
  return (
    <div>
      <h1>Course: {params.courseSlug} / Lesson: {params.lessonSlug}</h1>
    </div>
  )
}
