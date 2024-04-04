'use client'
import { useState } from 'react'
import { Streak } from '@application/components'

export default function StreakButton() {
  const [modal, setModal] = useState(false)
  
  return (
    <button onClick={()=>setModal(!modal)} className='relative'>
      3⚡
      {modal && (
        <div className='absolute -right-3 bg-white border rounded-lg p-4 w-28 shadow-md'>
          <Streak />
        </div>
      )}
    </button>
  )
}
