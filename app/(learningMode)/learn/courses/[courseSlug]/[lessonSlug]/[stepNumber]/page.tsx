import React from 'react'

export default function page(
  { params }:
  { params: { courseSlug: string, lessonSlug: string, stepNumber: string } }
) {
  console.log(params)
  return (
    <div>
      <h1>Course: {params.courseSlug} / Lesson: {params.lessonSlug} / Step: {params.stepNumber}</h1>

      <div className='font-bold text-2xl'>{params.stepNumber}</div>
    </div>
  )
}
