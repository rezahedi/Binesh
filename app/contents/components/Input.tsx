import React from 'react'

export default function Input({
  type
}: {
  type: string
}) {
  return (
    <input className='border rounded-sm p-2 w-fit' type={type} />
  )
}
